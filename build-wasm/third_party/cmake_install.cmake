# Install script for directory: /Users/user/Documents/Enamine/poc-indigo-fork/third_party

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

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/libpng/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/lunasvg/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/cppcodec/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/inchi/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/rapidjson/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/zlib/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/tinyxml2/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/pixman/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/freetype/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/cairo/cmake_install.cmake")
  include("/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/object_threadsafe/cmake_install.cmake")

endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
if(CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "/Users/user/Documents/Enamine/poc-indigo-fork/build-wasm/third_party/install_local_manifest.txt"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()
