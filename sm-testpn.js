print("=====================");
print("Start");
print("=====================");

var sNot="Not ";var sBy=" by -> ";var sBlk="";var bLck;var sOwner;var sSay;
var sRFC="CM0000104";
bLck = GetRFCLock({acRFC:sRFC,abRN:true,anShw:1})
print(((!bLck)?sNot:sBlk)+"Locked"+((bLck)?sBy:sBlk)+((bLck)?bLck:sBlk));

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
