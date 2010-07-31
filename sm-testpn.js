print("=====================");
print("Start");
print("=====================");

//var bUp = false;
var bUp = true;
var bShw = 1;

/*
// "CM000","CM000"
var aList=new Array();
for (rfc in aList) {
  print("updating -> "+aList[rfc]);
  system.library.cnfcm.SetLateRFC({anTop:aList[rfc],anBot:aList[rfc],abUp:bUp,acShw:bShw});
}
*/

//system.library.cnfcm.SetLateRFC({abUp:bUp,acShw:bShw});
SetLateRFC({abUp:bUp,anShw:bShw});

print("=====================");
print("Done");
print("=====================");

//------------------------------------------------------------------------------------------------------------
function SetLateRFC(aoObj){
//------------------------------------------------------------------------------------------------------------
var oA=DArg({anTop:"all",anBot:0,anGD:3,abUp:true,anShw:1,anWait:0,abSA:false},aoObj);if(oA.abSA){SArg(oA);}
//------------------------------------------------------------------------------------------------------------
// anTop : "all"  -> Range Top value
// anBot : 0      -> Range Bottom value
// anGD  : 0      -> Grace Period Days
// abUp  : true   -> Update the record
// anShw : 1      -> Show the progress level
// anWait: 0      -> Wait between record updates
// abSA  : false  -> Show function call Arguments 
//---------------------------------------------------------------------------------
// Checks for and sets the value of the days an RFC is late
//---------------------------------------------------------------------------------
  var i;var nI;var nMIAD=86400000;var nCnt=0;var cUpSay;var UpShw;var nPreLate;var cUpNot=(oA.abUp) ? "":" <- #NOT#";
  var aList=[];var fRFC=new SCFile("cm3r");var dLate=new Date();var nGetShw=(oA.anShw>2) ? 2:oA.anShw;var rRC;var bUpLk;
  aList = GetLateRFC({anTop:oA.anTop,anBot:oA.anBot,anGD:oA.anGD,abRA:true,anShw:nGetShw,abSA:oA.abSA});
  for(i in aList) {
    if(oA.anShw>=4){nI=parseInt(i)+1;print(" "+nI+"-"+aList[i]);}
    if(fRFC.doSelect("number=\""+aList[i]+"\"")==RC_SUCCESS) {
      nLate = parseInt(((dLate-fRFC.planned_end)/nMIAD));
      cUpSay="not updated";cUpShw=" = ";nPreLate=fRFC.cnf_planned_days;bUpLk=false;
      if(nLate>oA.anGD && nPreLate!=nLate) {
        fRFC.cnf_planned_days=nLate.toString();
        if(oA.abUp && !GetRFCLock({acRFC:fRFC.number})){rRC=fRFC.doUpdate();}
        if(rRC==RC_SUCCESS){nCnt+=1;cUpSay="UPDATED";cUpShw=" > ";}else{cUpSay="not updated - LOCKED";cUpShw=" # ";}
        bUpLk = true;
      }
      if((oA.anShw>=1 && bUpLk) || oA.anShw>=2){print(fRFC.number+" - "+fRFC.current_phase+" - "+nPreLate+cUpShw+nLate+"  <-- "+cUpSay);}
      if(oA.anShw>=3){print("RFCs Date -> "+fRFC.planned_end);}
    }
    if(oA.anWait>=1){WaitHere(oA.anWait);}
  }
  if(oA.anShw>=1){print("updated late RFCs - "+nCnt+" "+cUpNot);}
}

//---------------------------------------------------------------------------------------------------------------------------------------
function GetLateRFC(aoObj) {
//---------------------------------------------------------------------------------------------------------------------------------------
var oA=DArg({anTop:"all",anBot:0,anGD:3,abAll:false,abNew:false,abNot:false,abRA:false,anShw:1,abSA:false},aoObj);if(oA.abSA){SArg(oA);}
//---------------------------------------------------------------------------------------------------------------------------------------
// anTop : "all"  -> Range Top value
// anBot : 0      -> Range Bottom value
// anGD  : 3      -> Grace period
// abAll : false  -> All records including New
// abNew : false  -> Show only New records
// abNot : false  -> Show Not late records
// abRA  : false  -> Return Array
// anShw : 1      -> Show the progress level
// abSA  : true   -> Show function call Arguments 
//---------------------------------------------------------------------------------
// RETURNS an array of RFC numbers
//---------------------------------------------------------------------------------
  if(oA.abAll==true && oA.abNew==true){oA.abAll=false;oA.abNew=true;}
  var nLate=0;var nOpen=0;var bLate=false;var sSQL;var rRC;var nMIAD=86400000;var sSay;
  var dLate=new Date();var fCM3R=new SCFile("cm3r");if(oA.abRA){var aList=[];}
  dLate.setDate(dLate.getDate()-oA.anGD);
  if(oA.anShw>=1){print("Date Late -> "+dLate);}
  if(oA.anTop.toLowerCase()=="all"){oA.anTop=GetLastRFC();}
  if(oA.anTop<oA.anBot){oA.anBot=0;}
  sSQL  = "current.phase<>\"Closed\" ";
  sSQL += "AND (number>=\""+PadRFCNum({acRFC:oA.anBot})+"\" ";
  sSQL += "AND number<=\"" +PadRFCNum({acRFC:oA.anTop})+"\")";
  if(oA.anShw>=3){print("SQL -> "+sSQL);}
  rRC = fCM3R.doSelect(sSQL); 
  while(rRC==RC_SUCCESS) 	{
    nOpen++;bOver=(parseInt((dLate-fCM3R.planned_end)/nMIAD)>0) ? true:false;
    if(oA.abAll){bLate = (fCM3R.planned_end!=null && bOver) ? true:false;}
      else if(oA.abNew){bLate = (fCM3R.current_phase=="New" && fCM3R.planned_end!=null && bOver) ? true:false;}
      else {bLate = (fCM3R.current_phase!="New" && fCM3R.planned_end!=null && bOver) ? true:false;
    }
    if(oA.anShw>=1){sSay=fCM3R.number;}
    if(oA.anShw>=2){sSay=fCM3R.number+" - "+fCM3R.current_phase+" - "+fCM3R.cnf_planned_overdue+" - "+fCM3R.cnf_planned_days;}
    if(oA.anShw>=4){sSay=DPadRFCNum({acRFC:fCM3R.number});}
    if(bLate) {
      nLate++;
      if(oA.abRA) {
        aList.push(fCM3R.number);
      } else {
        if(oA.anShw>=1 && oA.anShw<=3){print("Late -> "+sSay);}
        if(oA.anShw>=4){print(sSay);}
      }
    } else {
      if(oA.anShw>=1 && oA.abNot){print("Not -> "+sSay);}
    }
    rRC = fCM3R.getNext();
  }
  if(oA.abRA){return aList.sort();}
  if(oA.anShw>=1){print("Open RFCs -> "+nOpen);print("Late RFCs -> "+nLate);}
}

//---------------------------------------------------------------------------------
function GetLastRFC() {
//---------------------------------------------------------------------------------
// RETURNS the last RFC number used
//---------------------------------------------------------------------------------
  var fNum=new SCFile("number");
  fNum.doSelect("name=\"cm3r\"");
  return fNum.number;
}

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

//---------------------------------------------------------------------------------
function PadRFCNum(aoObj) {
//---------------------------------------------------------------------------------
var oA=DArg({acRFC:0,acSA:false},aoObj);if(oA.acSA){SArg(oA);}
//---------------------------------------------------------------------------------
// abRFC : false  -> RFC number
// abSA  : false  -> Show function call Arguments 
//---------------------------------------------------------------------------------
// RETURNS the RFC correctly padded
//---------------------------------------------------------------------------------
  var sPad = "";
  if(oA.acRFC.toString().substr(0,2)=="CM"){return oA.acRFC;}
  if(oA.acRFC<0){oA.acRFC=0;}
  if(oA.acRFC<10) {sPad="CM000000";}
    else if(oA.acRFC<100) {sPad="CM00000";}
    else if(oA.acRFC<1000) {sPad="CM0000";}
    else if(oA.acRFC<10000) {sPad="CM000";}
    else if(oA.acRFC<100000) {sPad="CM00";}
    else if(oA.acRFC<1000000) {sPad="CM0";}
    else {sPad = "CM";
  }
  return sPad+oA.acRFC;
}

//---------------------------------------------------------------------------------
function DPadRFCNum(aoObj) {
//---------------------------------------------------------------------------------
var oA=DArg({acRFC:0,acSA:false},aoObj);if(oA.acSA){SArg(oA);}
//---------------------------------------------------------------------------------
// abRFC : false  -> RFC number
// abSA  : false  -> Show function call Arguments 
//---------------------------------------------------------------------------------
// RETURNS the RFC correctly de-padded
//---------------------------------------------------------------------------------
  var sDPad;var sRFC;var bZeros=true;
  if(oA.acRFC.toString().substr(0,2)!="CM"){return oA.acRFC;}
  sRFC = oA.acRFC.toString().substr(2,7);
  while(bZeros){if(sRFC.substr(0,1)=="0"){sRFC=sRFC.substr(1);} else {bZeros=false;}}
  return sRFC;
}


/*
//-----------------------
// Notes 
//-----------------------



*/
