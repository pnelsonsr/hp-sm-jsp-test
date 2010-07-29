print("=====================");
print("Start");
print("=====================");

var bUp = false;
//var bUp = true;
var bShw = 1;

/*
// "CM000","CM000"
var aList=new Array();
for (rfc in aList) {
  print("updating -> "+aList[rfc]);
  system.library.cnfcm.SetLateRFC({anTop:aList[rfc],anBot:aList[rfc],abUp:bUp,acShw:bShw});
}
*/

system.library.cnfcm.SetLateRFC({abUp:bUp,acShw:bShw});

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

SetLateRFC()

 anTop : "all"  -> Range Top value
 anBot : 0      -> Range Low value
 anGD  : 0      -> Grace Period Days
 abUp  : true   -> Update the record
 anShw : 1      -> Show the progress level
 anWait: 0      -> Wait between record updates
 abSA  : false  -> Show function call Arguments 

*/