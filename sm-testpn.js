print("=====================");
print("Start");
print("=====================");

var sTheRFC = "CM0000104";
var bDoUpdt = false;
var bShowIt = true;

system.library.cnfcm.SetLateRFC({acDoUpdate:bDoUpdt,acShowIt:bShowIt});

print("=====================");
print("Done");
print("=====================");


/*
//-----------------------
// Notes 
//-----------------------

system.library.cnfcm.SetLateRFC({acDoUpdate:bDoUpdt,acShowIt:bShowIt});
system.library.cnfcm.SetLateRFC({acRFC:sTheRFC,acDoUpdate:bDoUpdt,acShowIt:bShowIt});
system.library.cnfcm.SetLateRFCTest({acRFC:sTheRFC,acDoUpdate:bDoUpdt,acShowIt:bShowIt});

*/