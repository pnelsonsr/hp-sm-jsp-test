print("=====================");
print("Start");
print("=====================");

var thestuff="";

thestuff += "1 -> \n";
thestuff += "2 -> \n";
thestuff += "3 -> \n";
thestuff += "4 -> \n";
thestuff += "5 -> \n";
thestuff += "6 -> \n";
thestuff += "7 -> \n";
thestuff += "8 -> \n";

function writeToFile( path, binary, object ) {
  print( "Writing " + path + " to file..." );
  var output = writeFile( path, binary, object );
  print( "The number of bytes written to file was: " + output );
  return output
}

thestuff += "9 -> \n";
print(thestuff);
print("C:\\sm.log");
writeToFile( "C:\\sm.log", null, thestuff ); 

print("=====================");
print("Done");
print("=====================");
