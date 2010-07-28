print("=====================");
print("Start");
print("=====================");

//var sRFC = "104";
//system.library.cnfcm.SetLateRFC({anTop:sRFC,anLow:sRFC,abUp:false});

//var aList = new Array("CM0002806","CM0005077","CM0005078","CM0005080","CM0005082");
//for (rfc in aList) { 
//  print("updating -> "+aList[rfc]);
//  system.library.cnfcm.SetLateRFC({anTop:aList[rfc],anLow:aList[rfc],abUp:false});
//  system.library.cnfcm.SetLateRFC({anTop:aList[rfc],anLow:aList[rfc]});
//}

//var sRFC = "104";
//system.library.cnfcm.SetLateRFC({anTop:sRFC,anLow:sRFC,abUp:false,anShw:1});
system.library.cnfcm.SetLateRFC({abUp:false});

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

 anTop : "all"  -> Range Top value
 anLow : 0      -> Range Low value
 abUp  : true   -> Update the record
 anShw : 1      -> Show the progress level
 abSA  : false  -> Show function call Arguments 

*/