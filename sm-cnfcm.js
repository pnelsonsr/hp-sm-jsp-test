//=============================================================================
// Name     : CNF ChM Functions
// CodeJock : Patrick Nelson (nelson.patrick@con-way.com)
// Version  : 0.2.2
// Revision : 2010-201
//=============================================================================

//-----------------------------------------------
  function CalcIt(num1,num2,doWhat) {
//-----------------------------------------------
// Takes any two numbers and an code operand 
// a - add
// s - subtract
// m - multiply
// d - divide
// then calculates returning the result
//-----------------------------------------------
  print("--your in calcIt")
  var result = new Datum()
  if (doWhat == "a") { result = num1 + num2 } 
  if (doWhat == "s") { result = num1 - num2 } 
  if (doWhat == "m") { result = num1 * num2 }
  if (doWhat == "d") { result = num1 / num2 }
  
  return result
}

//-----------------------------------------------
function ClearAD(sAD){
//-----------------------------------------------
// Takes a AD name to operate against 
// sAD - AD name
//-----------------------------------------------
  var fAD = new SCFile("approvaldef");
  var rRC = fAD.doSelect(new QueryCond("name",EQ,sAD)); 
  print("AD -> "+sAD);
  print("start group name -> "+fAD.group_name);
  print("start length -> "+fAD.group_name.length());
  iCnt=fAD.group_name.length();
  bUpdate=false;
  for(i=0 ; i<iCnt ; i++) {
    bUpdate=true;
    fAD.group_name.pop();
    fAD.sequence.pop();
    fAD.condition.pop();
    fAD.short_desc.pop();
  }
  print("end group name -> "+fAD.group_name);
  print("end length -> "+fAD.group_name.length());
  fAD.doUpdate();
  system.functions.cleanup(fAD);
  print("AD -> "+sAD+" Cleared and Saved");
  return true;
}

//-----------------------------------------------
function ClearBS(){
//-----------------------------------------------
  fChange.affected_services=null;
  fChange.doUpdate();
}

//-----------------------------------------------
function ClearBU(){
//-----------------------------------------------
  fChange.cnf_affected_businesses=null;
  fChange.doUpdate();
}

//-----------------------------------------------
  function DateDiff(dBeg,dEnd){
//-----------------------------------------------
  var strDiff;
  var today = new Date();
  var dOccurEnd = dEnd.open_time;
  var dOccurBeg = dBeg.open_time;
  var dResBeg = dBeg.close_time;
  if(dBeg.close_time==null) {
    var dDiff = dOccurEnd - dOccurBeg;
  } else {
    var dDiff = dResBeg - dOccurBeg;
  }
  var diffDays = dDiff/(1000*60*60*24);
  var diffHour = (diffDays-Math.floor(diffDays))*24;
  var diffMins = (diffHour-Math.floor(diffHour))*60;
  var diffSecs = (diffMins-Math.floor(diffMins))*60;
  var strHour  = Math.floor(diffHour).toString();
  var strMins  = Math.floor(diffMins).toString();
  var strSecs  = Math.floor(diffSecs).toString();
  if(strHour.length==1) { strHour="0"+strHour; }
  if(strMins.length==1) { strMins="0"+strMins; }
  if(strSecs.length==1) { strSecs="0"+strSecs; }
  strDiff = Math.floor(diffDays) + " " + strHour + ":" + strMins + ":" + strSecs;
  return strDiff;
}

//-----------------------------------------------
  function Duration(dBeg,dEnd) {
//-----------------------------------------------
  dBeg = Date.parse(dBeg);
  dEnd = Date.parse(dEnd);
  print("dBeg 1 -> " + dBeg);
  print("dEnd 1 -> " + dEnd);
  dSub = dEnd - dBeg;
  dRet = new Date(dSub);
  print("dBeg 2 -> " + dBeg);
  print("dEnd 2 -> " + dEnd);
  print("dRet 2 -> " + dRet);
  if (result < 0) { 
    print("error in risklevel: result less then zero -> duration is set to zero")
    dRet = 0 
  }
  return dRet
}

//-----------------------------------------------
function GetAGFromCI(sCI){
//-----------------------------------------------
  if(sCI!="") {
    fDevice=new SCFile("device");
    if(fDevice.doSelect("logical.name = \""+sCI+"\"")==RC_SUCCESS) {
      return fDevice.assignment;
    }
  }
  return;
}

//-----------------------------------------------
function GetAGLead(sAG){
//-----------------------------------------------
  if(sAG!="") {
    fAssignment=new SCFile("assignment");
    if(fAssignment.doSelect("name = \""+sAG+"\"")==RC_SUCCESS) {
      return fAssignment.coordinator_change;
    }
  }
  return;
}

//-----------------------------------------------
function GetOperator(sContact){
//-----------------------------------------------
  if(sContact!="") {
    fContact=new SCFile("contacts");
    if(fContact.doSelect("contact.name = \""+sContact+"\"")==RC_SUCCESS) {
      return fContact.operator_id;
    }
  }
  return
}

//-----------------------------------------------
function GetContact(sOperator){
//-----------------------------------------------
  if(sOperator!="") {
    fOperator=new SCFile("operator");
    if(fOperator.doSelect("name = \""+sOperator+"\"")==RC_SUCCESS) {
      return fContact.contact_name;
    }
  }
  return
}

//-----------------------------------------------
function GetAGMem(fFile){
//-----------------------------------------------
  var fOperator = new SCFile( "operator" );
  var iIdx = 0;
  sql = "reviewGroups = \"" + fFile.name +"\"";
  var rc = fOperator.doSelect( sql );
  while (rc == RC_SUCCESS) 	{
    fFile.members[iIdx] = fOperator.name;
    iIdx = system.functions.lng(fFile.members);
    rc = fOperator.getNext();
  }
}

//-----------------------------------------------
function GetAL(fChange) {
//-----------------------------------------------
  print("result 3a -> " + fChange);
  sql = "contact.name = \"" + fChange.orig_operator +"\"";
  var rc = fOperator.doSelect( sql );
  if(rc == RC_SUCCESS) {
    print("result 3b -> " + fOperator.name);
    print("result 3c -> " + fOperator.profile_change);
    for( i=0 ; i<fOperator.profile_change.length() ; i++ ) {
      if(fOperator.profile_change[i] != null) {
        print("result 3d"+i+" -> " + fOperator.profile_change[i]);
      }
    }
  } else {
    print("Failed")
  }
  return fOperator.profile_change;
}

//-----------------------------------------------
function GetCIAG(){
//-----------------------------------------------
  var fDevice = new SCFile("device") ; aAG = new Array();
  for(i=0 ; i<aCIUS.length ; i++) {
    gRC = fDevice.doSelect("logical.name = \"" + aCIUS[i][1] + "\"");
    if(gRC==RC_SUCCESS && IsUnique(aAG,fDevice.assignment)) {
      if(fDevice.assignment!="AUTO") {
        aAG.push(fDevice.assignment);
      }
    }
  }
}

//-----------------------------------------------
function GetCIBI(){
//-----------------------------------------------
  var sBSSrch="Business Service" ; var sBUSrch="Business Unit" ; var sSQL;
  var fDevice=new SCFile("device") ; aBS=new Array() ; aBU=new Array(); 
  for(i=0 ; i<aCIUS.length ; i++) {
    sSQL="logical.name = \""+aCIUS[i][1]+"\"";
    if(fDevice.doSelect(sSQL)==RC_SUCCESS) {
      if(fDevice.subtype==sBSSrch) {
        aBS.push(fDevice.logical_name);
        print("impact analysis - business service -> "+fDevice.logical_name);
      }
      if(fDevice.subtype==sBUSrch) {
        aBU.push(fDevice.logical_name);
        print("impact analysis - business unit -> "+fDevice.logical_name);
      }
    }
  }
}

//-----------------------------------------------
function GetCIList(cRFC){
//-----------------------------------------------
  //---------------------
  // Global Assignment
  //---------------------
  bHead  = true ; iCICnt = 0 ; iLvl = 0 ; iRI = -1 ; iLI = 1 ; bMore = true ;
  aCI = new Array() ; aCIUS = new Array() 
  fCIRel = new SCFile("cirelationship") ; fChange = new SCFile("cm3r");
  //---------------------
  // Local Assignment
  //---------------------
  var i = 0 ; var gRC ; var sSql ; var test = false;
  //======================================================
  //                   Main Code
  //======================================================
  if(fChange.doSelect("number = \"" + cRFC + "\"")!=RC_SUCCESS) {
    return 1;
  }
  iCICnt = (fChange.assets.getSize()==1 && fChange.assets[0]==null) ? 0 : fChange.assets.getSize() ;
  if(!iCICnt) {
    return 2;
  }
  for(i=0 ; i<iCICnt ; i++) {
    iRI++ ; aCIUS[iRI]=[iLvl] ; aCIUS[iRI][iLI]=fChange.assets[i];    
  }
  for(i=0 ; i<iCICnt ; i++) {
    iLvl=1 ; bHead = true
    GetRelCI();
  }
  while(bMore) {
    iLvl++ ; iLCICnt = aCIUS.length ; bHead = false;
    GetRelCI();
    if(iLvl>50) {bMore=false;} //safety valve
  }
  return 0;
  //=====
  // eom
  //=====
}

//-----------------------------------------------
function GetCISOX(){
//-----------------------------------------------
  var fDevice = new SCFile("device") ; aAG = new Array() ; var bSOX = false;
  for(i=0 ; i<aCIUS.length ; i++) {
    gRC = fDevice.doSelect("logical.name = \"" + aCIUS[i][1] + "\"");
    if(gRC==RC_SUCCESS && aAG,fDevice.soxClassification=="In scope") {
      bSOX=true;
      break;
    }
  }
  return bSOX;
}

//-----------------------------------------------
function GetChangeAG(fChange){
//-----------------------------------------------
  var fOperator = new SCFile( "operator" );
  print("result 3a -> " + fChange.orig_operator);
  sql = "contact.name = \"" + fChange.orig_operator +"\"";
  var rc = fOperator.doSelect( sql );
  if(rc == RC_SUCCESS) {
    print("result 3b -> " + fOperator.name);
    print("result 3c -> " + fOperator.profile_change);
    for( i=0 ; i<fOperator.profile_change.length() ; i++ ) {
      if(fOperator.profile_change[i] != null) {
        print("result 3d"+i+" -> " + fOperator.profile_change[i]);
      }
    }
  } else {
    print("Failed")
  }
  return fOperator.profile_change;
}

//-----------------------------------------------
function GetCI(fChange) {
//-----------------------------------------------
  print("result 3a -> " + fChange.assets);
  return fChange.assets;
}

//-----------------------------------------------
function GetCIType(sCI){
//-----------------------------------------------
  if(sCI!="") {
    fDevice=new SCFile("device");
    if(fDevice.doSelect("logical.name = \""+sCI+"\"")==RC_SUCCESS) {
      return fDevice.type;
    }
  }
  return;
}

//-----------------------------------------------
function GetImpact(cRFC,bClear,bAShow){
//-----------------------------------------------
  var iRC ;
  var bSOX = false;
  //var bShow = bAShow;
  var bShow = false;
  print("impact analysis for RFC \""+cRFC+"\"");
  iRC = system.library.cnfcm.GetCIList(cRFC);
  if(iRC==1) {
    print("impact analysis -> \""+cRFC+"\" does not exist");
    return;
  } else if(iRC==2) {
    print("impact analysis -> \""+cRFC+"\" has NO CIs assigned");
    return;
  } else {
    if(bShow) {
      print("this is the CI list:");
      for(i=0 ; i<aCIUS.length ; i++) {print("-> " + aCIUS[i][0] + " - " + aCIUS[i][1]);}
    }
  }
//#######################################################################################################################
  print("impact analysis -> getting new RFC AL list");
  iRC = system.library.cnfcm.GetCIAG();
  if(bShow) {
    print("AG list:");
    if(aAG.length>0) {
      for(i=0 ; i<aAG.length ; i++) {print("-> " + aAG[i]);}
    } else {
      print("-> no AGs in CI tree");
    }
  }
  print("impact analysis -> setting new RFC AL list");
  iRC = system.library.cnfcm.SetAL(bShow);
  if(bShow) {print("the new RFC AL list:");}
  if(fChange.cnf_approval_list.length()>0) {
    for(i=0 ; i<fChange.cnf_approval_list.length() ; i++) {
      if(bShow) {print("-> " + fChange.cnf_approval_list[i]);}
    }
  } else {
    if(bShow) {print("-> no AGs in RFC AL");}
  }
//#######################################################################################################################
  
  print("impact analysis -> SOX check ->"+bSOX);
  bSOX = system.library.cnfcm.GetCISOX();
  if(bShow) {
    print("SOX Status: ");
    if(bSOX) {
      print("-> SOX is In Scope");
    } else {
      print("-> SOX is NOT In Scope");
    }
  }
  print("impact analysis -> setting SOX value -> "+bSOX);
  iRC = system.library.cnfcm.SetSOX(bSOX);
  if(bShow) {
    print("RFC SOX -> " + fChange.cnf_sox);
  }
//#######################################################################################################################
  print("impact analysis -> getting new impacted BS and BU lists");
  iRC = system.library.cnfcm.GetCIBI();
  if(bShow) {
    print("the BS CI list:");
    if(aBS.length>0) {
      for(i=0 ; i<aBS.length ; i++) {print("-> " + aBS[i]);}
    } else {
      print("-> no BS in CI tree");
    }
  }
  if(bShow) {
    print("current RFC impacted BS list:");
    if(fChange.affected_services.length()>0 && fChange.affected_services[0]!=null) {
      for(i=0 ; i<fChange.affected_services.length() ; i++) {print("-> " + fChange.affected_services[i]);}
    } else {
      print("-> no impacted BSs in RFC");
    }
  }
  print("impact analysis -> setting new impacted BS list");
  iRC = system.library.cnfcm.SetBS(bShow);
  if(bShow) {print("RFC impacted BS list:");}
  if(fChange.affected_services.length()>0) {
    for(i=0 ; i<fChange.affected_services.length() ; i++) {
      if(bShow) {print("-> " + fChange.affected_services[i]);}
    }
  } else {
    if(bShow) {print("-> no impacted BSs in RFC");}
  }
//#######################################################################################################################
  if(bShow) {
    print("this is the BU CI list:");
    if(aBU.length>0) {
      for(i=0 ; i<aBU.length ; i++) {print("-> " + aBU[i]);}
    } else {
      print("-> no BUs in CI tree");
    }
  }
  bShow=false;
  if(bShow) {print("RFC impacted BU list:");}
  if(fChange.cnf_affected_businesses.length()>0 && fChange.cnf_affected_businesses[0]!=null) {
    for(i=0 ; i<fChange.cnf_affected_businesses.length() ; i++) {
      if(bShow) {print("-> " + fChange.cnf_affected_businesses[i]);}
    }
  } else {
    if(bShow) {print("-> no impacted BUs in RFC");}
  }
  print("impact analysis -> setting new impacted BU list:");
  iRC = system.library.cnfcm.SetBU(bShow);
  if(bShow) {print("RFC impacted BU list:");}
  if(fChange.cnf_affected_businesses.length()>0) {
    for(i=0 ; i<fChange.cnf_affected_businesses.length() ; i++) {
      if(bShow) {print("-> " + fChange.cnf_affected_businesses[i]);}
    }
  } else {
    if(bShow) {print("-> no impacted BUs in RFC");}
  }
  print("impact analysis -> saving RFC");
  fChange.doUpdate();
  return "Good";
}

//-----------------------------------------------
function GetOpAG(fChange){
//-----------------------------------------------
  var fOperator = new SCFile( "operator" );
  print("result 3a -> " + fChange.orig_operator);
  sql = "contact.name = \"" + fChange.orig_operator +"\"";
  var rc = fOperator.doSelect( sql );
  if(rc == RC_SUCCESS) {
    print("result 3b -> " + fOperator.name);
    print("result 3c -> " + fOperator.profile_change);
    for( i=0 ; i<fOperator.profile_change.length() ; i++ ) {
      if(fOperator.profile_change[i] != null) {
        print("result 3d"+i+" -> " + fOperator.profile_change[i]);
      }
    }
  } else {
    print("Failed")
  }
  return fOperator.profile_change;
}

//-----------------------------------------------
function GetRelCI(){
//-----------------------------------------------
  //---------------------
  // Local Assignment
  //---------------------
  var iCnt  = (bHead) ? iCICnt : iLCICnt;
  var bFMore = true ; var iLast = 0 ; var i ; var sSQL
  //======================================================
  //                   Main Code
  //======================================================
  for(i=0 ; i<iCnt ; i++) {
	if(iLvl>2 && aCIUS[i][0]!=iLvl-1) {
      continue;
	}
    print("impact analysis -> getting related CIs");
    //sSQL = "related.cis = \"" + aCIUS[i][iLI] + "\"";
    sSQL = "relationship.name = \"" + aCIUS[i][iLI] + "\"";
    if(fCIRel.doSelect(sSQL)==RC_SUCCESS) {
      print("impact analysis -> checking related CIs");
      if(IsUnique(aCIUS,fCIRel.logical_name)) {
        iRI++ ; aCIUS[iRI]=[iLvl] ; aCIUS[iRI][iLI]=fCIRel.logical_name;
        print("impact analysis - ci relationship -> "+aCIUS[iRI][iLI]);
      }
      while(bFMore) {
        if(fCIRel.getNext()==RC_SUCCESS) {
          if(IsUnique(aCIUS,fCIRel.logical_name)) {
            iRI++ ; aCIUS[iRI]=[iLvl] ; aCIUS[iRI][iLI]=fCIRel.logical_name;
            print("impact analysis - ci relationship -> "+aCIUS[iRI][iLI]);
	      }
        } else {
          bFMore = false;
        }
      }
    } else {
      bMore = false;
    }
  }
  //=====
  // eom
  //=====
}

//-----------------------------------------------
function IsUnique(a2LookAt,s2Look4){
//-----------------------------------------------
  var s2LookAt = a2LookAt.toString();
  return (s2LookAt.indexOf(s2Look4)<0) ? true : false ;
}

//-----------------------------------------------
function PopulateAD(sAD){
//-----------------------------------------------
  var fAD   = new SCFile("approvaldef");
  var fIAG  = new SCFile("assignment");
  var aIAG  = new Array();
  var sHead = "CA - ";
  var rRC ; var sAL; 
  var sEnCAB = "IT ITSM Enterprise CAB"; 
  var sEnCAG = "CA - IT ITSM Enterprise CAB"; 
  var sEnCon = "cnf.cab.type in $L.file=\"Enterprise\""; 
  var sEmCAB = "IT ITSM Emergency CAB"; 
  var sEmCAG = "CA - IT ITSM Emergency CAB"; 
  var sEmCon = "cnf.cab.type in $L.file=\"Emergency\""; 
  var sCMSeq = 2; 
  var sCMDes = "Auto Regenerated For DEFAULT CAB Role";
  var sALDes = "Auto Regenerated From IAG";
  var sEGrp  = (sAD=="Approval Emergency") ? sEmCAG : sEnCAG;
  var sECon  = (sAD=="Approval Emergency") ? sEmCon : sEnCon;
  rRC=fIAG.doSelect(new QueryCond("name", NEQ, "")); 
  while (rRC == RC_SUCCESS) 	{
    print("-> "+fIAG.name);
    if(fIAG.name!=sEnCAB && fIAG.name!=sEmCAB) {
      if(aIAG.length==0) {aIAG[0]=fIAG.name;} else {aIAG.push(fIAG.name);}
    }
    rRC = fIAG.getNext();
  }
  rRC=fAD.doSelect(new QueryCond("name",EQ,sAD)); 
  print("AD -> "+sAD);
  if(fAD.group_name[0]!=sEGrp) {
    fAD.group_name[0] = sEGrp;
    fAD.sequence[0]   = sCMSeq;
    fAD.condition[0]  = sECon;
    fAD.short_desc[0] = sCMDes;
    print("Added CAB Group -> "+sEGrp);
  } else {
    print("CAB Group in AD already -> "+sEGrp);
  }
  for(i=0 ; i<aIAG.length ; i++) {
    if(aIAG[i].substr(0,5)==sHead) {
      sAL=aIAG[i];
    } else {
      sAL=sHead+aIAG[i];
    }
    if(system.library.cnfcm.IsUnique(fAD.group_name,sAL)) { 
      fAD.group_name.push(sAL);
      fAD.sequence.push(1);
      fAD.condition.push("index(\""+aIAG[i]+"\",cnf.approval.list in $L.file)>0");
      fAD.short_desc.push(sALDes);
      print("pushed -> "+sAL);
    } else {
      print("AG in AD already -> "+sAL);
    }
  }
  fAD.doUpdate();  
  system.functions.cleanup(fAD);
  system.functions.cleanup(fIAG);
  system.functions.cleanup(aIAG);
  print("AD -> "+sAD+" Populated and Saved");
  return true;
}

//-----------------------------------------------
  function RiskLevel(num1,num2) {
//-----------------------------------------------
  //print("--your in riskLevel")
  if (num1 <= 0 | num2 <= 0) {
    //print("error in risklevel: a second field value is missing -> risk is set to zero")
    return 0
  }
  result = num1 * num2
  if (result < 0) { 
    //print("error in risklevel: result less then zero -> so risk is set to zero")
    result = 0 
  }
  return result
}

//-----------------------------------------------
function SayIt(sSayWhat,iSayHow){
//-----------------------------------------------
  if(sSayWhat!=null) {
   sRTE="callrad";
   sApp="message.fc";
   rteVal=new SCDatum;
   if(iSayHow==null) {iSayHow=1;}
   aPNam=new SCDatum();aPNam.push("index");aPNam.push("text");aPNam.push("name");   
   aPVal=new SCDatum();aPVal.push(iSayHow);aPVal.push(sSayWhat);aPVal.push(system.functions.operator());
   system.functions.rtecall(sRTE,rteVal,sApp,aPNam,aPVal);
  }
}

//-----------------------------------------------
function SetAL(bShow){
//-----------------------------------------------
  for(i=0 ; i<aAG.length ; i++) {
    if(IsUnique(fChange.cnf_approval_list,aAG[i])) {
      fChange.cnf_approval_list[i] = aAG[i];
      if(bShow) {print("-> "+aAG[i]+" added");}
    } else {
      if(bShow) {print("-> "+aAG[i]+" is dup");}
    }   
  }
}

//-----------------------------------------------
function SetBS(bShow){
//-----------------------------------------------
  for(i=0 ; i<aBS.length ; i++) {
    if(IsUnique(fChange.affected_services,aBS[i])) {
      fChange.cnf_affected_services_no = false;
      fChange.affected_services[i] = aBS[i];
      if(bShow) {print("-> "+aBS[i]+" added");}
    } else {
      if(bShow) {print("-> "+aBS[i]+" is dup");}
    }   
  }
}

//-----------------------------------------------
function SetBU(bShow){
//-----------------------------------------------
  for(i=0 ; i<aBU.length ; i++) {
    if(IsUnique(fChange.cnf_affected_businesses,aBU[i])) {
      fChange.cnf_affected_businesses_no = false;
      fChange.cnf_affected_businesses[i] = aBU[i];
      if(bShow) {print("-> "+aBU[i]+" added");}
    } else {
      if(bShow) {print("-> "+aBU[i]+" is dup");}
    }   
  }
}

//-----------------------------------------------
function SetSOX(bSOX){
//-----------------------------------------------
  fChange.cnf_sox=bSOX;
  fChange.doUpdate();
}

//-----------------------------------------------
function DArg(outArgs,inArgs) {
//-----------------------------------------------
// RETURNS Args object updated with inArgs
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
// RETURNS the last RFC number used
//-----------------------------------------------
  var fNum=new SCFile("number");
  fNum.doSelect("name=\"cm3r\"");
  return fNum.number;
}

//-----------------------------------------------
function PadRFCNum(aoObj) {
//-----------------------------------------------
var oArgs=DArg({acRFC:0,acSA:false},aoObj);if(oArgs.acSA){SArg(oArgs);}
//-----------------------------------------------
// abRFC : false  -> RFC number
// abSA  : false  -> Show function call Arguments 
//-----------------------------------------------
// RETURNS the RFC correctly padded
//-----------------------------------------------
  var sPad = "";
  if(oArgs.acRFC.toString().substr(0,2)=="CM"){return oArgs.acRFC;}
  if(oArgs.acRFC<0){oArgs.acRFC=0;}
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

//-----------------------------------------------
function SetLateRFCTest(aoObj){
//-----------------------------------------------
var oArgs=DArg({acRFC:"all",abUp:true,abShw:false,abSA:false},aoObj);if(oArgs.acSA){SArg(oArgs);}
//-----------------------------------------------
  print("acRFC -> "+oArgs.acRFC);
  print("acUp  -> "+oArgs.abUp);
  print("acShw -> "+oArgs.abShw);
}

//-----------------------------------------------
function SetLateRFC(aoObj){
//-----------------------------------------------
var oArgs=DArg({anTop:"all",anLow:0,abUp:true,abShw:false,abSA:false},aoObj);if(oArgs.abSA){SArg(oArgs);}
//-----------------------------------------------
// anTop : "all"  -> Range Top value
// anLow : 0      -> Range Low value
// abUp  : true   -> Update the record
// abShw : false  -> Show the progress
// abSA  : false  -> Show function call Arguments 
//-----------------------------------------------
  var i;var nI;var nMIAD=86400000;var nGrace=3;var nCnt=0;
  var aMyList=[];var fRFC=new SCFile("cm3r");var dLate=new Date();
  aMyList = GetLateRFC({anTop:oArgs.anTop,anLow:oArgs.anLow,anGD:nGrace,abRA:true,abSA:oArgs.abSA});
  dLate.setDate(dLate.getDate()-nGrace);
  if(oArgs.abSA){print("aMyList -> ");}
  for (i in aMyList) {
    if(oArgs.abSA){nI=parseInt(i)+1;print(" "+nI+"-"+aMyList[i]);}
    if (fRFC.doSelect("number=\""+aMyList[i]+"\"")==RC_SUCCESS) {
      nLate = parseInt((dLate-fRFC.planned_end)/nMIAD);      
      if (nLate>0 && fRFC.cnf_planned_days!=nLate) {
        if(oArgs.abShw){print("-"+fRFC.number+" ---- "+fRFC.cnf_planned_days+" > "+nLate);}
        fRFC.cnf_planned_days = nLate.toString();
        if(oArgs.abUp){fRFC.doUpdate();cUpdate = "updated"} else {cUpdate = "not updated";}
        if(oArgs.abShw){print("-"+fRFC.number+" ---- "+fRFC.cnf_planned_days+" -> "+cUpdate);}
        nCnt += 1;
      } else {
        if(oArgs.abShw){print("-"+fRFC.number+" - "+fRFC.cnf_planned_days+" = "+nLate);}
      }
    }
  }
  if(oArgs.abShw){print("updated late RFCs -> "+nCnt);}
}

//-----------------------------------------------
function GetLateRFC(aoObj) {
//-----------------------------------------------
var oArgs=DArg({anTop:"all",anLow:0,anGD:3,abAll:false,abNew:false,abNot:false,abRA:false,abSA:false},aoObj);if(oArgs.abSA){SArg(oArgs);}
//-----------------------------------------------
// anTop : "all"  -> Range Top value
// anLow : 0      -> Range Low value
// anGD  : 3      -> Grace period
// abAll : false  -> All records including New
// abNew : false  -> Show only New records
// abNot : false  -> Show Not late records
// abRA  : false  -> Return Array
// abSA  : false  -> Show function call Arguments 
//-----------------------------------------------
// RETURNS an array of RFC numbers
//-----------------------------------------------
  if(oArgs.abAll==true && oArgs.abNew==true){oArgs.abAll=false;oArgs.abNew=true;}
  var nLate=0;var nOpen=0;var bLate=false;var sSQL;var rRC;var nMIAD=86400000;var sSay;
  var dLate=new Date();var fCM3R=new SCFile("cm3r");if(oArgs.abRA){var aList=[];}
  dLate.setDate(dLate.getDate()-oArgs.anGD);
  if(!oArgs.abRA){print("Date Late -> "+dLate);}
  if(oArgs.anTop.toLowerCase()=="all"){oArgs.anTop=GetLastRFC();}
  if(oArgs.anTop<oArgs.anLow){oArgs.anLow=0;}
  sSQL  = "current.phase<>\"Closed\" ";
  sSQL += "AND (number>=\""+PadRFCNum({acRFC:oArgs.anLow})+"\" ";
  sSQL += "AND number<=\"" +PadRFCNum({acRFC:oArgs.anTop})+"\")";
  if(!oArgs.abRA && oArgs.abSA){print("SQL -> "+sSQL);}
  rRC = fCM3R.doSelect(sSQL); 
  while (rRC==RC_SUCCESS) 	{
    nOpen++;bOver=(parseInt((dLate-fCM3R.planned_end)/nMIAD)>0) ? true:false;
    if (oArgs.abAll) {bLate = (fCM3R.planned_end!=null && bOver) ? true:false;}
      else if (oArgs.abNew) {bLate = (fCM3R.current_phase=="New" && fCM3R.planned_end!=null && bOver) ? true:false;}
      else {bLate = (fCM3R.current_phase!="New" && fCM3R.planned_end!=null && bOver) ? true:false;
    }
    sSay = fCM3R.number+" - "+fCM3R.current_phase+" - "+fCM3R.cnf_planned_overdue+" - "+fCM3R.cnf_planned_days;
    if (bLate) {
      nLate++;
      if (oArgs.abRA) {
        aList.push(fCM3R.number);
      } else {
        if(oArgs.abSA){print("Late -> "+sSay);}
      }
    } else {
      if(oArgs.abSA && oArgs.abNot){print("Not -> "+sSay);}
    }
    rRC = fCM3R.getNext();
  }
  if (oArgs.abRA) {
    return aList.sort();
  } else {
    if(oArgs.abSA){print("Open RFCs -> "+nOpen);print("Late RFCs -> "+nLate);}
  }
}
