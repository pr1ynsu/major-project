#----------------------------------------------------------------
# Generated CMake target import file for configuration "Debug".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gr2_graphite2" for configuration "Debug"
set_property(TARGET gr2_graphite2 APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(gr2_graphite2 PROPERTIES
  IMPORTED_IMPLIB_DEBUG "${_IMPORT_PREFIX}/lib/graphite2.lib"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/bin/graphite2.dll"
  )

list(APPEND _cmake_import_check_targets gr2_graphite2 )
list(APPEND _cmake_import_check_files_for_gr2_graphite2 "${_IMPORT_PREFIX}/lib/graphite2.lib" "${_IMPORT_PREFIX}/bin/graphite2.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
