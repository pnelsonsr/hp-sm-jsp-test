print("=====================");
print("Start");
print("=====================");

print("===================InclNew");
system.library.cnfcm.GetLateRFC({abAll:true});

print("===================OlnyNew");
system.library.cnfcm.GetLateRFC({abNew:true});

print("===================Default");
system.library.cnfcm.GetLateRFC();

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

GetLateRFC()

 anTop : "all"  -> Range Top value
 anLow : 0      -> Range Low value
 anGD  : 3      -> Grace period
 abAll : false  -> All records including New
 abNew : false  -> Show only New records
 abNot : false  -> Show Not late records
 abRA  : false  -> Return Array
 abSA  : true   -> Show Arguments of the function call

*/