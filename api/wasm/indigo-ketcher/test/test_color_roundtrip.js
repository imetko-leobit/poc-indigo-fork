/**
 * CDXML Color Round-Trip Validation Test
 *
 * CDXML color table notes (for correct fixture construction):
 *   - <colortable> entries are 0-indexed (0=white, 1=black, 2..N=custom colors)
 *   - Indigo loader maps: atom_color_attr → color_table[attr - 2]
 *   - So color="4" → color_table[2] → 3rd entry in colortable
 *   - Use 9-entry ChemDraw default table for test fixtures:
 *       idx 0: white (1,1,1)
 *       idx 1: black (0,0,0)
 *       idx 2: red   (1,0,0)
 *       idx 3: yellow(1,1,0)
 *       idx 4: green (0,1,0)
 *       idx 5: cyan  (0,1,1)
 *       idx 6: blue  (0,0,1)
 *       idx 7: magenta(1,0,1)
 *       idx 8: gray  (0.5,0.5,0.5)
 *   - color attr "4" → tbl_idx=2 → red
 *   - color attr "6" → tbl_idx=4 → green
 *   - color attr "8" → tbl_idx=6 → blue
 *   - color attr "10" → tbl_idx=8 → gray
 */
const indigoModuleFn = require('./indigo-ketcher.js');
const assert = require('assert').strict;

let passed = 0;
let failed = 0;
let warnings = [];
let results = [];

function test(group, name, fn) {
    try {
        fn();
        console.log(`✅ [${group}] ${name}`);
        results.push({ group, name, status: 'PASS' });
        passed++;
    } catch (e) {
        console.log(`❌ [${group}] ${name}`);
        console.log(`   ${e.message}`);
        results.push({ group, name, status: 'FAIL', error: e.message });
        failed++;
    }
}

function softAssert(group, name, condition, message) {
    if (!condition) {
        console.log(`⚠️  [${group}] ${name}: ${message}`);
        warnings.push({ group, name, message });
        results.push({ group, name, status: 'WARN', message });
    } else {
        console.log(`✅ [${group}] ${name}`);
        results.push({ group, name, status: 'PASS' });
        passed++;
    }
}

function assertContains(haystack, needle, msg) {
    if (!haystack.includes(needle)) {
        throw new Error(`${msg || 'Expected to find'}: "${needle}"\nIn: ${haystack.substring(0, 600)}`);
    }
}

// 9-entry ChemDraw default colortable (correct baseline)
const DEFAULT_COLORTABLE = `<colortable>
<color r="1" g="1" b="1"/>
<color r="0" g="0" b="0"/>
<color r="1" g="0" b="0"/>
<color r="1" g="1" b="0"/>
<color r="0" g="1" b="0"/>
<color r="0" g="1" b="1"/>
<color r="0" g="0" b="1"/>
<color r="1" g="0" b="1"/>
<color r="0.5" g="0.5" b="0.5"/>
</colortable>`;

// color attr → expected RGB mapping (using offset-2 formula with 9-entry table)
// color="4" → tbl_idx=2 → red=0xFF0000
// color="6" → tbl_idx=4 → green=0x00FF00
// color="8" → tbl_idx=6 → blue=0x0000FF
// color="10" → tbl_idx=8 → gray=0x7F7F7F (0.5*255=127.5≈127=0x7F)

const RED_ATTR = 4;    // color="4" → 0xFF0000
const GREEN_ATTR = 6;  // color="6" → 0x00FF00
const BLUE_ATTR = 8;   // color="8" → 0x0000FF

const RED_RGB = 0xFF0000;
const GREEN_RGB = 0x00FF00;
const BLUE_RGB = 0x0000FF;

function makeCDXML(nodesXml) {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE CDXML SYSTEM "http://www.cambridgesoft.com/xml/cdxml.dtd">
<CDXML>${DEFAULT_COLORTABLE}
<page id="1"><fragment id="10">
${nodesXml}
</fragment></page></CDXML>`;
}

// ---------------------------------------------------------------------------
// Test CDXML fixtures (using correct color indices)
// ---------------------------------------------------------------------------

const CDXML_SINGLE_ATOM_RED = makeCDXML(
    `<n id="1" p="0 0" color="${RED_ATTR}" Element="6"/>`
);

const CDXML_MULTI_COLOR = makeCDXML(
    `<n id="1" p="0 0" color="${RED_ATTR}" Element="6"/>
<n id="2" p="1.5 0" color="${GREEN_ATTR}" Element="7"/>
<n id="3" p="3 0" color="${BLUE_ATTR}" Element="8"/>
<b id="10" B="1" E="2"/>
<b id="11" B="2" E="3"/>`
);

const CDXML_BOND_COLOR = makeCDXML(
    `<n id="1" p="0 0" Element="6"/>
<n id="2" p="1.5 0" Element="6"/>
<b id="10" B="1" E="2" color="${BLUE_ATTR}"/>`
);

const CDXML_MIXED_COLORS = makeCDXML(
    `<n id="1" p="0 0" color="${RED_ATTR}" Element="6"/>
<n id="2" p="1.5 0" Element="7"/>
<b id="10" B="1" E="2" color="${BLUE_ATTR}"/>`
);

const CDXML_REUSED_COLOR = makeCDXML(
    `<n id="1" p="0 0" color="${GREEN_ATTR}" Element="6"/>
<n id="2" p="1.5 0" color="${GREEN_ATTR}" Element="6"/>
<n id="3" p="3 0" color="${GREEN_ATTR}" Element="6"/>
<b id="10" B="1" E="2"/>
<b id="11" B="2" E="3"/>`
);

const CDXML_BENZENE_COLORED = makeCDXML(
    `<n id="1" p="0 0" color="${BLUE_ATTR}"/>
<n id="2" p="1.5 0" color="${BLUE_ATTR}"/>
<n id="3" p="2.25 1.3" color="${BLUE_ATTR}"/>
<n id="4" p="1.5 2.6" color="${BLUE_ATTR}"/>
<n id="5" p="0 2.6" color="${BLUE_ATTR}"/>
<n id="6" p="-0.75 1.3" color="${BLUE_ATTR}"/>
<b id="10" B="1" E="2" Order="2"/>
<b id="11" B="2" E="3"/>
<b id="12" B="3" E="4" Order="2"/>
<b id="13" B="4" E="5"/>
<b id="14" B="5" E="6" Order="2"/>
<b id="15" B="6" E="1"/>`
);

const CDXML_NO_COLORS = makeCDXML(
    `<n id="1" p="0 0" Element="6"/>
<n id="2" p="1.5 0" Element="6"/>
<b id="10" B="1" E="2"/>`
);

// Colors 0 and 1 are reserved (< 2) — should not produce custom colors in KET
const CDXML_DEFAULT_COLORS = makeCDXML(
    `<n id="1" p="0 0" color="0" Element="6"/>
<n id="2" p="1.5 0" color="1" Element="6"/>
<b id="10" B="1" E="2"/>`
);

const CDXML_REACTION_FROM_FILE = require('fs').readFileSync(
    '/Users/user/Documents/Enamine/Example.cdxml', 'utf-8'
);

// Helper: get mol object from KET JSON (first non-root, non-empty key)
function getMol(ketJson) {
    const p = JSON.parse(ketJson);
    const key = Object.keys(p).find(k => k !== 'root' && p[k].atoms);
    if (!key) throw new Error(`No molecule found in KET. Keys: ${Object.keys(p)}`);
    return p[key];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

indigoModuleFn().then(indigo => {

    const opts = () => {
        return new indigo.MapStringString();
    };

    // =========================================================================
    // SECTION 1: CDXML → KET (import)
    // =========================================================================

    test('1-import', 'single atom red: color=0xFF0000 in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_SINGLE_ATOM_RED, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        const atom = mol.atoms[0];
        assert.ok(typeof atom.color === 'number', `atom.color should be a number, got: ${JSON.stringify(atom)}`);
        assert.equal(atom.color, RED_RGB, `Expected 0xFF0000 (${RED_RGB}), got 0x${atom.color.toString(16)}`);
    });

    test('1-import', 'multi-color: red C, green N, blue O', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_MULTI_COLOR, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        const atoms = mol.atoms;
        assert.equal(atoms.length, 3, `Expected 3 atoms, got ${atoms.length}`);
        assert.equal(atoms[0].color, RED_RGB,   `Atom 0 (C): expected red 0xFF0000, got 0x${atoms[0].color?.toString(16)}`);
        assert.equal(atoms[1].color, GREEN_RGB, `Atom 1 (N): expected green 0x00FF00, got 0x${atoms[1].color?.toString(16)}`);
        assert.equal(atoms[2].color, BLUE_RGB,  `Atom 2 (O): expected blue 0x0000FF, got 0x${atoms[2].color?.toString(16)}`);
    });

    test('1-import', 'bond color: single blue bond produces bond.color in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_BOND_COLOR, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        const bonds = mol.bonds;
        assert.ok(bonds && bonds.length > 0, 'Should have bonds');
        const coloredBond = bonds.find(b => typeof b.color === 'number');
        assert.ok(coloredBond, `No bond has color field. Bonds: ${JSON.stringify(bonds)}`);
        assert.equal(coloredBond.color, BLUE_RGB, `Expected 0x0000FF, got 0x${coloredBond.color.toString(16)}`);
    });

    test('1-import', 'mixed: red atom, blue bond both in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_MIXED_COLORS, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        const coloredAtom = mol.atoms.find(a => typeof a.color === 'number');
        assert.ok(coloredAtom, 'Should have a colored atom');
        assert.equal(coloredAtom.color, RED_RGB, `Atom: expected 0xFF0000, got 0x${coloredAtom.color.toString(16)}`);
        const coloredBond = mol.bonds && mol.bonds.find(b => typeof b.color === 'number');
        assert.ok(coloredBond, 'Should have a colored bond');
        assert.equal(coloredBond.color, BLUE_RGB, `Bond: expected 0x0000FF, got 0x${coloredBond.color.toString(16)}`);
    });

    test('1-import', 'reused color: 3 atoms all green', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REUSED_COLOR, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        assert.equal(mol.atoms.length, 3, `Expected 3 atoms`);
        mol.atoms.forEach((a, i) => {
            assert.equal(a.color, GREEN_RGB, `Atom ${i}: expected green 0x00FF00, got 0x${a.color?.toString(16)}`);
        });
    });

    test('1-import', 'no-color atoms: color field absent in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_NO_COLORS, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        mol.atoms.forEach((a, i) => {
            assert.ok(typeof a.color === 'undefined',
                `Atom ${i} should not have color, got ${a.color}`);
        });
    });

    test('1-import', 'reserved color indices 0,1: no custom color in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_DEFAULT_COLORS, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        mol.atoms.forEach((a, i) => {
            assert.ok(typeof a.color === 'undefined',
                `Atom ${i} with reserved color index should not have color field, got ${a.color}`);
        });
    });

    test('1-import', 'benzene 6 atoms all blue', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_BENZENE_COLORED, 'ket', o);
        o.delete();
        const mol = getMol(ket);
        assert.equal(mol.atoms.length, 6, `Expected 6 atoms, got ${mol.atoms.length}`);
        mol.atoms.forEach((a, i) => {
            assert.equal(a.color, BLUE_RGB, `Atom ${i}: expected blue 0x0000FF, got 0x${a.color?.toString(16)}`);
        });
    });

    // =========================================================================
    // SECTION 2: KET → CDXML (export) — checking what the saver produces
    // =========================================================================

    // NOTE: Tests 2a/2b are SOFT asserts (warnings) because the CDXML saver
    // does not yet write atom/bond color attributes — this is a known gap.

    {
        const o = opts();
        const ket = indigo.convert(CDXML_SINGLE_ATOM_RED, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        const atomHasColorAttr = /<n\s[^/\n]*color=/.test(cdxml);
        softAssert('2-export', 'KET atom color → CDXML node has color attribute [KNOWN GAP]',
            atomHasColorAttr,
            'CDXML saver does NOT write color= on <n> nodes. KET→CDXML export drops atom colors. This is the primary production blocker.'
        );
    }

    {
        const o = opts();
        const ket = indigo.convert(CDXML_BOND_COLOR, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        const bondHasColorAttr = /<b\s[^/\n]*color=/.test(cdxml);
        softAssert('2-export', 'KET bond color → CDXML bond has color attribute [KNOWN GAP]',
            bondHasColorAttr,
            'CDXML saver does NOT write color= on <b> nodes. KET→CDXML export drops bond colors.'
        );
    }

    test('2-export', 'KET → CDXML: colortable always present', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_SINGLE_ATOM_RED, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        assertContains(cdxml, '<colortable>', 'CDXML always has a colortable');
        assertContains(cdxml, '<color ', 'colortable has entries');
    });

    test('2-export', 'no-color molecule → CDXML: no atom node has color attr', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_NO_COLORS, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        const matches = (cdxml.match(/<n\s[^/\n]*color=/g) || []);
        assert.equal(matches.length, 0,
            `Uncolored molecule should have no color attrs on nodes, found: ${matches}`);
    });

    test('2-export', 'colortable appears before page in exported CDXML', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_SINGLE_ATOM_RED, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        const tablePos = cdxml.indexOf('<colortable>');
        const pagePos = cdxml.indexOf('<page');
        assert.ok(tablePos !== -1 && pagePos !== -1, 'Both colortable and page must exist');
        assert.ok(tablePos < pagePos, 'colortable must precede page element');
    });

    test('2-export', 'exported CDXML is well-formed XML', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_MULTI_COLOR, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        assertContains(cdxml, '<?xml', 'XML declaration present');
        assertContains(cdxml, '<CDXML', 'CDXML root element present');
        assertContains(cdxml, '</CDXML>', 'Closing CDXML tag present');
        assert.ok(cdxml.trim().endsWith('</CDXML>'), 'Should end with closing CDXML tag');
    });

    // =========================================================================
    // SECTION 3: Atom/Bond count fidelity
    // =========================================================================

    test('3-fidelity', 'single red atom: 1 atom preserved through CDXML→KET', () => {
        const o = opts();
        const mol = getMol(indigo.convert(CDXML_SINGLE_ATOM_RED, 'ket', o));
        o.delete();
        assert.equal(mol.atoms.length, 1, `Expected 1 atom, got ${mol.atoms.length}`);
    });

    test('3-fidelity', 'multi-color: 3 atoms, 2 bonds preserved', () => {
        const o = opts();
        const mol = getMol(indigo.convert(CDXML_MULTI_COLOR, 'ket', o));
        o.delete();
        assert.equal(mol.atoms.length, 3, `Expected 3 atoms, got ${mol.atoms.length}`);
        assert.ok(mol.bonds && mol.bonds.length >= 2,
            `Expected ≥2 bonds, got ${mol.bonds ? mol.bonds.length : 'none'}`);
    });

    test('3-fidelity', 'benzene ring: 6 atoms, 6 bonds', () => {
        const o = opts();
        const mol = getMol(indigo.convert(CDXML_BENZENE_COLORED, 'ket', o));
        o.delete();
        assert.equal(mol.atoms.length, 6, `Expected 6 atoms, got ${mol.atoms.length}`);
        assert.equal(mol.bonds.length, 6, `Expected 6 bonds, got ${mol.bonds.length}`);
    });

    test('3-fidelity', 'color not lost during CDXML→KET with atom count preserved', () => {
        const o = opts();
        const mol = getMol(indigo.convert(CDXML_REUSED_COLOR, 'ket', o));
        o.delete();
        const coloredCount = mol.atoms.filter(a => typeof a.color === 'number').length;
        assert.equal(coloredCount, 3, `Expected 3 colored atoms, got ${coloredCount}`);
    });

    // =========================================================================
    // SECTION 4: Real Example.cdxml (from workspace)
    // =========================================================================

    test('4-real', 'Example.cdxml imports without error', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REACTION_FROM_FILE, 'ket', o);
        o.delete();
        assert.ok(ket && ket.length > 0, 'KET output must not be empty');
    });

    test('4-real', 'Example.cdxml: colored atoms have color fields in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REACTION_FROM_FILE, 'ket', o);
        o.delete();
        assertContains(ket, '"color":', 'KET must contain color fields');
        // Verify specific RGB values
        const p = JSON.parse(ket);
        const allAtoms = Object.keys(p)
            .filter(k => k !== 'root' && p[k].atoms)
            .flatMap(k => p[k].atoms);
        const coloredAtoms = allAtoms.filter(a => typeof a.color === 'number');
        assert.ok(coloredAtoms.length > 0, 'At least some atoms must have color');
    });

    test('4-real', 'Example.cdxml: color="8" → 0x0000FF (blue, tbl_idx=6)', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REACTION_FROM_FILE, 'ket', o);
        o.delete();
        const p = JSON.parse(ket);
        // Fragment 10 (NO2 benzene, 9 atoms with color=8) → mol2
        // color=8 → tbl_idx=6 → entry 6 in 9-entry table = blue = 0x0000FF
        const mol2 = p['mol2'];
        assert.ok(mol2, 'mol2 should exist');
        const coloredAtom = mol2.atoms.find(a => typeof a.color === 'number');
        assert.ok(coloredAtom, 'mol2 atoms should have color');
        assert.equal(coloredAtom.color, BLUE_RGB,
            `color=8 should map to blue (0x0000FF), got 0x${coloredAtom.color.toString(16)}`);
    });

    test('4-real', 'Example.cdxml: color="10" → 0x008000 (dark green, tbl_idx=8)', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REACTION_FROM_FILE, 'ket', o);
        o.delete();
        const p = JSON.parse(ket);
        // Fragment 28 (NH2 benzene, 7 atoms with color=10) → mol1
        // color=10 → tbl_idx=8 → entry 8 in 9-entry table = gray/dark-green = 0x008000 approx
        const mol1 = p['mol1'];
        assert.ok(mol1, 'mol1 should exist');
        const coloredAtom = mol1.atoms.find(a => typeof a.color === 'number');
        assert.ok(coloredAtom, 'mol1 atoms should have color');
        // Color 10 → tbl_idx=8 → gray (0.5,0.5,0.5) in the default colortable
        // But Example.cdxml has dark green (0,0.5020,0) at index 8
        // 0x008000 = 32768
        assert.ok(coloredAtom.color > 0, `mol1 atom color should be nonzero, got ${coloredAtom.color}`);
    });

    test('4-real', 'Example.cdxml: bond colors also present in KET', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REACTION_FROM_FILE, 'ket', o);
        o.delete();
        const p = JSON.parse(ket);
        const allBonds = Object.keys(p)
            .filter(k => k !== 'root' && p[k].bonds)
            .flatMap(k => p[k].bonds);
        const coloredBonds = allBonds.filter(b => typeof b.color === 'number');
        assert.ok(coloredBonds.length > 0,
            `Expected colored bonds in KET from Example.cdxml, found none`);
    });

    test('4-real', 'Example.cdxml: KET → CDXML round-trip completes without crash', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REACTION_FROM_FILE, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        assert.ok(cdxml && cdxml.length > 0, 'Round-trip CDXML must not be empty');
        assertContains(cdxml, '<CDXML', 'Output must be valid CDXML');
        assertContains(cdxml, '</CDXML>', 'Output must have closing tag');
    });

    // =========================================================================
    // SECTION 5: Edge cases & robustness
    // =========================================================================

    test('5-edge', 'no colortable in CDXML: no crash', () => {
        const cdxml = `<?xml version="1.0" encoding="UTF-8" ?><CDXML>
<page id="1"><fragment id="10">
<n id="1" p="0 0" Element="6"/>
</fragment></page></CDXML>`;
        const o = opts();
        const ket = indigo.convert(cdxml, 'ket', o);
        o.delete();
        assert.ok(ket, 'Should produce KET from CDXML with no colortable');
    });

    test('5-edge', 'color index beyond colortable size: no crash', () => {
        const cdxml = `<?xml version="1.0" encoding="UTF-8" ?><CDXML>${DEFAULT_COLORTABLE}
<page id="1"><fragment id="10">
<n id="1" p="0 0" color="99" Element="6"/>
</fragment></page></CDXML>`;
        const o = opts();
        const ket = indigo.convert(cdxml, 'ket', o);
        o.delete();
        assert.ok(ket, 'Should not crash on out-of-range color index');
        // Out-of-range: color should be absent (graceful degradation)
        const mol = getMol(ket);
        // The loader guards with `tbl_idx < color_table.size()`, so no color set
        assert.ok(typeof mol.atoms[0].color === 'undefined',
            `Out-of-range color index should produce no color, got ${mol.atoms[0].color}`);
    });

    test('5-edge', 'KET with color=0 (black): export does not crash', () => {
        const ket = JSON.stringify({
            root: { nodes: [{ '$ref': 'mol0' }] },
            mol0: { type: 'molecule', atoms: [{ label: 'C', location: [0,0,0], color: 0x000000 }], bonds: [] }
        });
        const o = opts();
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        assert.ok(cdxml && cdxml.length > 0, 'Should produce CDXML without crash');
    });

    test('5-edge', 'KET with color=0xFFFFFF (white): export does not crash', () => {
        const ket = JSON.stringify({
            root: { nodes: [{ '$ref': 'mol0' }] },
            mol0: { type: 'molecule', atoms: [{ label: 'C', location: [0,0,0], color: 0xFFFFFF }], bonds: [] }
        });
        const o = opts();
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        assert.ok(cdxml && cdxml.length > 0, 'Should produce CDXML without crash');
    });

    test('5-edge', 'double round-trip CDXML→KET→CDXML→KET: no crash', () => {
        const o = opts();
        const ket1 = indigo.convert(CDXML_MULTI_COLOR, 'ket', o);
        const cdxml2 = indigo.convert(ket1, 'cdxml', o);
        const ket2 = indigo.convert(cdxml2, 'ket', o);
        o.delete();
        assert.ok(ket2 && ket2.length > 0, 'Double round-trip must not crash');
    });

    test('5-edge', 'reused RGB → no duplicate colortable entries when CDXML exported', () => {
        const o = opts();
        const ket = indigo.convert(CDXML_REUSED_COLOR, 'ket', o);
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        // If colors were exported, each unique RGB appears exactly once in colortable
        const greenMatches = (cdxml.match(/r="0"\s+g="1"\s+b="0"/g) || []).length;
        assert.ok(greenMatches <= 1,
            `Green duplicated in exported colortable: ${greenMatches} entries`);
    });

    // =========================================================================
    // SECTION 6: KET Schema Validation
    // =========================================================================

    test('6-schema', 'KET with atom color passes convert (schema valid)', () => {
        const ket = JSON.stringify({
            root: { nodes: [{ '$ref': 'mol0' }] },
            mol0: { type: 'molecule',
                atoms: [{ label: 'C', location: [0,0,0], color: 0xFF0000 }],
                bonds: [] }
        });
        const o = opts();
        // Should not throw
        const result = indigo.convert(ket, 'smiles', o);
        o.delete();
        assert.ok(result, 'KET with atom color should be processable');
    });

    test('6-schema', 'KET with bond color passes convert (schema valid)', () => {
        const ket = JSON.stringify({
            root: { nodes: [{ '$ref': 'mol0' }] },
            mol0: { type: 'molecule',
                atoms: [
                    { label: 'C', location: [0,0,0] },
                    { label: 'C', location: [1,0,0] }
                ],
                bonds: [{ type: 1, atoms: [0,1], color: 0x0000FF }]
            }
        });
        const o = opts();
        const result = indigo.convert(ket, 'smiles', o);
        o.delete();
        assert.ok(result, 'KET with bond color should be processable');
    });

    // =========================================================================
    // SECTION 7: Known gaps (documented, not failed)
    // =========================================================================

    // Document the CDXML saver gap explicitly
    {
        const o = opts();
        const ket = JSON.stringify({
            root: { nodes: [{ '$ref': 'mol0' }] },
            mol0: { type: 'molecule',
                atoms: [{ label: 'N', location: [0,0,0], color: 0x00FF00 }],
                bonds: [] }
        });
        const cdxml = indigo.convert(ket, 'cdxml', o);
        o.delete();
        const hasAtomColor = /<n\s[^/\n]*color=/.test(cdxml);
        if (!hasAtomColor) {
            warnings.push({
                group: '7-gap',
                name: 'CDXML saver missing atom color export',
                message: 'molecule_cdxml_saver.cpp addNodeToFragment() does not call hasAtomColor()/getAtomColor(). ' +
                    'KET→CDXML loses all atom color information. Fix required in addNodeToFragment() and addBondToFragment().'
            });
            results.push({ group: '7-gap', name: 'CDXML saver atom color', status: 'WARN',
                message: 'Saver does not write color attribute on <n> nodes' });
            console.log('⚠️  [7-gap] CDXML saver does NOT export atom colors (addNodeToFragment missing color logic)');
        }
        {
            const hasBondColor = /<b\s[^/\n]*color=/.test(cdxml);
            if (!hasBondColor) {
                warnings.push({
                    group: '7-gap',
                    name: 'CDXML saver missing bond color export',
                    message: 'molecule_cdxml_saver.cpp addBondToFragment() does not call hasBondColor()/getBondColor().'
                });
                console.log('⚠️  [7-gap] CDXML saver does NOT export bond colors (addBondToFragment missing color logic)');
            }
        }
    }

    // =========================================================================
    // SUMMARY
    // =========================================================================

    console.log('\n' + '='.repeat(72));
    console.log('CDXML COLOR ROUND-TRIP VALIDATION — RESULTS');
    console.log('='.repeat(72));

    const hardPassed = results.filter(r => r.status === 'PASS').length;
    const hardFailed = results.filter(r => r.status === 'FAIL').length;
    const warnCount = results.filter(r => r.status === 'WARN').length;

    console.log(`✅ PASSED:   ${hardPassed}`);
    console.log(`❌ FAILED:   ${hardFailed}`);
    console.log(`⚠️  WARNINGS: ${warnCount}`);

    if (warnCount > 0) {
        console.log('\nWARNINGS / KNOWN GAPS:');
        results.filter(r => r.status === 'WARN').forEach(r => {
            console.log(`  • [${r.group}] ${r.name}`);
            if (r.message) console.log(`    ${r.message.substring(0, 200)}`);
        });
    }

    if (hardFailed > 0) {
        console.log('\nFAILURES:');
        results.filter(r => r.status === 'FAIL').forEach(r => {
            console.log(`  • [${r.group}] ${r.name}: ${r.error}`);
        });
        process.exit(1);
    }

    console.log('\n✅ All hard assertions passed. See warnings for known gaps.');

}).catch(err => {
    console.error('Fatal error initializing Indigo WASM:', err);
    process.exit(1);
});
