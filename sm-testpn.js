print("=====================");
print("Start");
print("=====================");

system.library.cnfcm.SetLateRFC({abShw:true});

/*
var aList=system.library.cnfcm.GetLateRFC({anLow:340,abRA:true,abSA:false});
for (i in aList) { 
  print((parseInt(i)+1)+" -> "+aList[i]);
}
*/

/*
var cBot="CM0000340";
system.library.cnfcm.SetLateRFC({anLow:cBot,abUp:false,abShw:true});
*/

/*
var cTop="CM0000340";var cBot=cTop;
system.library.cnfcm.SetLateRFC({anTop:cTop,anLow:cBot,abUp:false,abShw:true});
*/

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

SetLateRFC()

 anTop : "all"  -> In the range its to top value
 anLow : 0      -> In the range its the low value
 abUp  : true   -> Update the record
 abShw : false  -> Show the progress
 abSA  : false  -> Show Arguments of the function call
 
GetLateRFC()
 
 anTop : "all"  -> In the range its to top value
 anLow : 0      -> In the range its the low value
 anGD  : 3      -> Grace period past the end date
 abAll : false  -> Inlcude All records including New
 abNew : false  -> Show only New records
 abNot : false  -> Show Not late records
 abRA  : false  -> Return Array
 abSA  : true  -> Show Arguments of the function call

*/