print("=====================");
print("Start");
print("=====================");

var fChange = new SCFile( "cm3r" );
var aCI     = new Array();
var aAG     = new Array();
var iIdx    = 0;
var cSql    = "number = \"CM0000267\"";
var gRC     = fChange.doSelect( cSql );
print("result 1a -> " + fChange);
print("result 1b -> " + aAG.length);
print("=====================");

aCI.push(system.library.cnfcm.GetCI(fChange));
if(aCI.length = 1) {
  aAG.push(system.library.cnfcm.GetAG(aCI));
} else if (aCI.length > 1) {
  for( i=0 ; i<aCI.length() ; i++ ) {
    print("result 3c" + i + " -> " + aCI[i]);
  }
}




if(aAG.length > 0) {
 aAG.push(system.library.cnfcm.GetAG(fChange));
 print("result 2a -> " + aAG);
} else {
 aAG.push(system.library.cnfcm.GetAG(fChange));
 print("result 2a -> " + aAG);
}

print("result 1c -> " + aAG.length);


print("=====================");
print("Done");
print("=====================");
