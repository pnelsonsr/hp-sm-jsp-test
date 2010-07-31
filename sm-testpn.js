print("=====================");
print("Start");
print("=====================");

sFullRFC="CM0001234";
//sFullRFC="1234";

print("1-> "+sFullRFC);
sDPadRFC=DPadRFCNum({acRFC:sFullRFC})
print("2-> "+sDPadRFC);


//-----------------------------------------------
function DPadRFCNum(aoObj) {
//-----------------------------------------------
var oArgs=DArg({acRFC:0,acSA:false},aoObj);if(oArgs.acSA){SArg(oArgs);}
//-----------------------------------------------
// abRFC : false  -> RFC number
// abSA  : false  -> Show function call Arguments 
//-----------------------------------------------
// RETURNS the RFC correctly padded
//-----------------------------------------------
  var sDPad;var sRFC;var bZeros=true;
  if(oArgs.acRFC.toString().substr(0,2)!="CM"){return oArgs.acRFC;}
  sRFC=oArgs.acRFC.toString().substr(2,7);
  while(bZeros){
    if(sRFC.substr(0,1)=="0"){sRFC=sRFC.substr(1);} else {bZeros=false;}
  }
  return sRFC;
}


print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------



*/

//-----------------------------------------------
function DArg(outArgs,inArgs) {
//-----------------------------------------------
// RETURNS Args object updated with inArgs
//-----------------------------------------------
  for (cArgNam in inArgs) {outArgs[cArgNam] = inArgs[cArgNam];}
  return outArgs;
}

