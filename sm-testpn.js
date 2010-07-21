print("=====================");
print("Start");
print("=====================");

var sTheRFC = "CM0000104";
//SetLateRFC({acRFC:sTheRFC,acDoUpdate:true,acShowIt:false});
SetLateRFC({acRFC:sTheRFC});

print("=====================");
print("Done");
print("=====================");

//-----------------------------------------------
function SetLateRFC(aoObj){
//-----------------------------------------------

  var oArgs=defArgs({acRFC:"all",acDoUpdate:true,acShowIt:false},aoObj);

  print("acRFC      -> "+oArgs.acRFC);
  print("acDoUpdate -> "+oArgs.acDoUpdate);
  print("acShowIt   -> "+oArgs.acShowIt);

}

/*
//-----------------------
// Notes 
//-----------------------

if () {

}

*/