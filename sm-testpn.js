print("=====================");
print("Start");
print("=====================");

var fRFC=new SCFile("cm3r");var sRFC="CM0000104";var rRC;
if(fRFC.doSelect("number=\""+sRFC+"\"")==RC_SUCCESS) {
  fRFC.cnf_planned_days="8";
  if(!GetRFCLock({acRFC:sRFC})){rRC=fRFC.doUpdate();}
  if(rRC==RC_SUCCESS){print("-> Updated");}else{print("-> Locked");}
}

print("=====================");
print("Done");
print("=====================");


//---------------------------------------------------------------------------------
function GetRFCLock(aoObj) {
//---------------------------------------------------------------------------------
var oA=DArg({acRFC:0,abRN:false,anShw:0,acSA:false},aoObj);if(oA.acSA){SArg(oA);}
//---------------------------------------------------------------------------------
// abRFC : false  - RFC number
// abRN  : false  - Return name of locking user
// anShw : 0      - Level of show process info 
// abSA  : false  - Show function call Arguments 
//---------------------------------------------------------------------------------
// RETURNS the RFC Lock State
//---------------------------------------------------------------------------------
  var sName=system.functions.get_lock_owner("cm3r;"+oA.acRFC);
  if(sName==null){if(oA.anShw>=1){print("#1");}return false;}
  if(oA.abRN) {if(oA.anShw>=1){print("#2");}return sName;} 
  if(oA.anShw>=1){print("#3");}return true;
}

//---------------------------------------------------------------------------------
function SArg(oArgs) {
//---------------------------------------------------------------------------------
// Prints out Args objects members
//---------------------------------------------------------------------------------
  print("SArg begin");
  for(cArg in oArgs){print(" -"+cArg+" -> "+oArgs[cArg]);}
  print("SArg end");
}


//---------------------------------------------------------------------------------
function DArg(outArgs,inArgs) {
//---------------------------------------------------------------------------------
// RETURNS Args object updated with inArgs
//---------------------------------------------------------------------------------
  for(cArgNam in inArgs){outArgs[cArgNam]=inArgs[cArgNam];}
  return outArgs;
}



/*
//-----------------------
// Notes 
//-----------------------



*/
