print("=====================");
print("Start");
print("=====================");

//var sTheRFC = "2806";
//system.library.cnfcm.SetLateRFC({anTop:sTheRFC,anLow:sTheRFC,abShw:true});
//system.library.cnfcm.SetLateRFC({abUp:false,abShw:true});

//var sTheRFC = "2806";
//system.library.cnfcm.SetLateRFC({anTop:sTheRFC,anLow:sTheRFC,abShw:true});
//system.library.cnfcm.SetLateRFC({abUp:false,abShw:true});

//var aRFCList = new Array("CM0002806","CM0005077","CM0005078","CM0005080","CM0005082");
//for (i in aRFCList) { 
//  print("updating -> "+aRFCList[i]);
//  system.library.cnfcm.SetLateRFC({anTop:aRFCList[i],anLow:aRFCList[i],abUp:false,abShw:true});
//  system.library.cnfcm.SetLateRFC({anTop:aRFCList[i],anLow:aRFCList[i],abShw:true});
//}


var sTheRFC = "104";
system.library.cnfcm.SetLateRFC({anTop:sTheRFC,anLow:sTheRFC,abShw:true});

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

// anTop : "all"  -> Range Top value
// anLow : 0      -> Range Low value
// abUp  : true   -> Update the record
// abShw : false  -> Show the progress
// abSA  : false  -> Show function call Arguments 

*/
