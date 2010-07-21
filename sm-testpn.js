print("=====================");
print("Start");
print("=====================");

var bInclNew = false;
var bOnlyNew = false;

//var bInclNew = true;
//var bOnlyNew = false;

//var bInclNew = false;
//var bOnlyNew = true;

//system.library.cnfcm.GetLateRFC();
system.library.cnfcm.GetLateRFC({acInclNew:bInclNew,acOnlyNew:bOnlyNew});


print("=====================");
print("Done");
print("=====================");


/*
//-----------------------
// Notes 
//-----------------------

*/