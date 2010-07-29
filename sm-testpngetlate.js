print("=====================");
print("Start");
print("=====================");

var nShw = 2 ; var bNot = false ; var bSA = false;

//print("===================InclNew");
//system.library.cnfcm.GetLateRFC({abAll:true,abNot:bNot,anShw:nShw,abSA:bSA});

print("====================OnlyNew");
system.library.cnfcm.GetLateRFC({abNew:true,abNot:bNot,anShw:nShw,abSA:bSA});

print("=======================Late");
system.library.cnfcm.GetLateRFC({abNot:bNot,anShw:nShw,abSA:bSA});

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

GetLateRFC()

 anTop : "all"  -> Range Top value
 anBot : 0      -> Range Low value
 anGD  : 3      -> Grace period
 abAll : false  -> All records including New
 abNew : false  -> Show only New records
 abNot : false  -> Show Not late records
 abRA  : false  -> Return Array
 anShw : 1      -> Show the progress level
 abSA  : true   -> Show function call Arguments 

*/