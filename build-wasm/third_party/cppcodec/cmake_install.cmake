# Install script for directory: /Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local/Cellar/emscripten/5.0.7/libexec/cache/sysroot")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "TRUE")
endif()

# Set path to fallback-tool for dependency-resolution.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base32_crockford.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base32_default_crockford.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base32_default_hex.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base32_default_rfc4648.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base32_hex.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base32_rfc4648.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base64_default_rfc4648.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base64_default_url.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base64_default_url_unpadded.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base64_rfc4648.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base64_url.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/base64_url_unpadded.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/hex_default_lower.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/hex_default_upper.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/hex_lower.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/hex_upper.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/parse_error.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/data" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/data/access.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/data" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/data/raw_result_buffer.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/detail" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/detail/base32.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/detail" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/detail/base64.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/detail" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/detail/codec.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/detail" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/detail/config.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/detail" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/detail/hex.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "headers" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/cppcodec/detail" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/third_party/cppcodec/cppcodec/detail/stream_codec.hpp")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/pkgconfig" TYPE FILE FILES "/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/cppcodec/cppcodec-1.pc")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
if(CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/cppcodec/install_local_manifest.txt"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()
