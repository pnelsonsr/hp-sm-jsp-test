print("=====================");
print("Start");
print("=====================");

var fChange = new SCFile( "cm3r" );
var aAG= new Array();
var sql = "number = \"CM0000267\"";
var rc = fChange.doSelect( sql );

print("result 1a -> " + fChange);
print("result 1b -> " + aAG.length);
print("=====================");

if(aAG.length > 0) {
 aAG.push(system.library.cnfcm.GetOpAG(fChange));
 print("result 2a -> " + aAG);
} else {
 aAG.push(system.library.cnfcm.GetOpAG(fChange));
 print("result 2a -> " + aAG);
}

print("result 1c -> " + aAG.length);


print("=====================");
print("Done");
print("=====================");
