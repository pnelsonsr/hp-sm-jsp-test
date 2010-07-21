print("=====================");
print("Start");
print("=====================");

SetLateRFC({acUp:true,abShw:true,abSA:false});
//GetLateRFC({anTop:"aLl",anLow:340,abRA:false,abSA:true});

//-----------------------------------------------
function SetLateRFC(aoObj){
//-----------------------------------------------
  var oArgs = DArg({anTop:"all",anLow:0,acUp:false,abShw:false,abSA:false},aoObj);if(oArgs.abSA){SArg(oArgs);}
  var i;var nI;var nMIAD=86400000;var nGrace=3;var nCnt=0;
  var aMyList=[];var fRFC=new SCFile("cm3r");var dLate=new Date();
  aMyList = GetLateRFC({anTop:oArgs.anTop,anLow:oArgs.anLow,anGD:nGrace,abRA:true,abSA:oArgs.abSA});
  dLate.setDate(dLate.getDate()-nGrace);
  if (oArgs.abSA) {print("aMyList -> ");}
  for (i in aMyList) {
    if (oArgs.abSA) {nI=parseInt(i)+1;print(" "+nI+"-"+aMyList[i]);}
    
    if (fRFC.doSelect("number=\""+aMyList[i]+"\"")==RC_SUCCESS) {
      nLate = parseInt((dLate-fRFC.planned_end)/nMIAD);      
      if (nLate>0 && fRFC.cnf_planned_days!=nLate) {
        if (oArgs.abShw) {print("-"+fRFC.number+" ---- "+fRFC.cnf_planned_days+" > "+nLate);}
        fRFC.cnf_planned_days = nLate.toString();
        if (oArgs.acUp) {fRFC.doUpdate();cUpdate = "updated"} else {cUpdate = "not updated";}
        if (oArgs.abShw) {print("-"+fRFC.number+" ---- "+fRFC.cnf_planned_days+" -> "+cUpdate);}
        nCnt += 1;
      } else {
        if (oArgs.abShw) {print("-"+fRFC.number+" - "+fRFC.cnf_planned_days+" = "+nLate);}
      }
           
    }
  }
  if (oArgs.abShw) {print("updated late RFCs -> "+nCnt);}
}

//-----------------------------------------------
function GetLateRFC(aoObj) {
//-----------------------------------------------
  var oArgs=DArg({anTop:"all",anLow:0,anGD:3,abAll:false,abNew:false,abRA:false,abSA:false},aoObj);if(oArgs.abSA){SArg(oArgs);}
  if (oArgs.abAll==true && oArgs.abNew==true) {oArgs.abAll=false;oArgs.abNew=true;}
  var nLate=0;var nOpen=0;var bLate=false;var sSQL;var rRC;var nMIAD=86400000;
  var dLate=new Date();var fCM3R=new SCFile("cm3r");if(oArgs.abRA){var aList=[];}
  dLate.setDate(dLate.getDate()-oArgs.anGD);
  if (!oArgs.abRA) {print("Date Late -> "+dLate);}
  if (oArgs.anTop.toLowerCase()=="all") {oArgs.anTop=GetLastRFC();}
  if (oArgs.anTop<oArgs.anLow) {oArgs.anLow=0;}
  sSQL  = "current.phase<>\"Closed\" ";
  sSQL += "AND (number>=\""+PadRFCNum({acRFC:oArgs.anLow})+"\" ";
  sSQL += "AND number<=\"" +PadRFCNum({acRFC:oArgs.anTop})+"\")";
  if (!oArgs.abRA && oArgs.abSA) {print("SQL -> "+sSQL);}
  rRC=fCM3R.doSelect(sSQL); 
  while (rRC==RC_SUCCESS) 	{
    nOpen++;bOver=(parseInt((dLate-fCM3R.planned_end)/nMIAD)>0) ? true:false;
    if (oArgs.abAll) {bLate = (fCM3R.planned_end!=null && bOver) ? true:false;}
      else if (oArgs.abNew) {bLate = (fCM3R.current_phase=="New" && fCM3R.planned_end!=null && bOver) ? true:false;}
      else {bLate = (fCM3R.current_phase!="New" && fCM3R.planned_end!=null && bOver) ? true:false;
    }
    if (bLate) {
      nLate++;
      if(oArgs.abRA){
        aList.push(fCM3R.number);
      } else {
        print("Open -> "+fCM3R.number+" - "+fCM3R.current_phase+" - "+fCM3R.planned_end);
      }
    }
    rRC = fCM3R.getNext();
  }
  if(oArgs.abRA){
    return aList.sort();
  } else {
    print("Open RFCs -> "+nOpen);
    print("Late RFCs -> "+nLate);
  }
}

//-----------------------------------------------
function DArg(outArgs,inArgs) {
//-----------------------------------------------
  for (cArgNam in inArgs) {outArgs[cArgNam] = inArgs[cArgNam];}
  return outArgs;
}

//-----------------------------------------------
function SArg(oArgs) {
//-----------------------------------------------
  print("SArg begin");
  for (cArg in oArgs) {print(" -"+cArg+" -> "+oArgs[cArg]);}
  print("SArg end");
}

//-----------------------------------------------
function GetLastRFC() {
//-----------------------------------------------
  var fNum=new SCFile("number");
  fNum.doSelect("name=\"cm3r\"");
  return fNum.number;
}

//-----------------------------------------------
function PadRFCNum(aoObj) {
//-----------------------------------------------
  var oArgs=DArg({acRFC:0,acSA:false},aoObj);if(oArgs.acSA){SArg(oArgs);}
  var sPad = "";
  if (oArgs.acRFC.toString().substr(0,2)=="CM") {return oArgs.acRFC;}
  if (oArgs.acRFC<0) {oArgs.acRFC=0;}
  if (oArgs.acRFC<10) {sPad="CM000000";}
    else if (oArgs.acRFC<100) {sPad="CM00000";}
    else if (oArgs.acRFC<1000) {sPad="CM0000";}
    else if (oArgs.acRFC<10000) {sPad="CM000";}
    else if (oArgs.acRFC<100000) {sPad="CM00";}
    else if (oArgs.acRFC<1000000) {sPad="CM0";}
    else {sPad = "CM";
  }
  return sPad+oArgs.acRFC;
}

print("=====================");
print("Done");
print("=====================");

/*
//-----------------------
// Notes 
//-----------------------

if () {

}

    //"number=\""+oArgs.acRFC+"\"")+" AND category <> \"Unplanned\" AND planned.end <> NULL"

    //sSQL = "current.phase<>\"Closed\"";
    //sSQL = "current.phase<>\"Closed\" AND ( number>\"CM000000"+oArgs.acLower+"\" AND number<\"CM0000"+oArgs.acUpper+"\" )";

*/