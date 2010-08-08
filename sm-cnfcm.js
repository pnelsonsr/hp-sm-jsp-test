//=============================================================================
// Name     : CNF ChM Functions
// CodeJock : Patrick Nelson (nelson.patrick@con-way.com)
// Version  : 0.2.4b6
// Revision : 2010-220
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
  if(doWhat=="a"){result=num1+num2} 
  if(doWhat=="s"){result=num1-num2} 
  if(doWhat=="m"){result=num1*num2}
  if(doWhat=="d"){result=num1/num2}
  return result
}

//-----------------------------------------------
function ClearAD(sAD){
//-----------------------------------------------
// Takes a AD name to operate against 
// sAD - AD name
//-----------------------------------------------
  var bUpdate=false;var fAD=new SCFile("approvaldef");
  fAD.doSelect(new QueryCond("name",EQ,sAD)); 
  print("AD -> "+sAD);
  print("start group name -> "+fAD.group_name);
  print("start length -> "+fAD.group_name.length());
  for(i=0 ; i<fAD.group_name.length() ; i++) {
    bUpdate=true;
    fAD.group_name.pop();
    fAD.sequence.pop();
    fAD.condition.pop();
    fAD.short_desc.pop();
  }
  print("end group name -> "+fAD.group_name);
  print("end length -> "+fAD.group_name.length());
  if(bUpdate){fAD.doUpdate();}
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
  var dDiff;
  var dOccurEnd = dEnd.open_time;
  var dOccurBeg = dBeg.open_time;
  var dResBeg = dBeg.close_time;
  if(dBeg.close_time==null) {
    dDiff = dOccurEnd - dOccurBeg;
  } else {
    dDiff = dResBeg - dOccurBeg;
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
  return Math.floor(diffDays) + " " + strHour + ":" + strMins + ":" + strSecs;
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
  if(result < 0) { 
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
  return false;
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
  return false;
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
  return false;
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
  return false;
}

//-----------------------------------------------
function GetAGMem(fFile){
//-----------------------------------------------
  var fOperator = new SCFile( "operator" );
  var iIdx = 0;
  sql = "reviewGroups = \"" + fFile.name +"\"";
  var rc = fOperator.doSelect( sql );
  while(rc == RC_SUCCESS) 	{
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
  bHead=true;iCICnt=0;iLvl=0;iRI=-1;iLI=1;bMore=true;
  aCI=new Array();aCIUS=new Array()
  fCIRel=new SCFile("cirelationship");fChange=new SCFile("cm3r");
  //---------------------
  // Local Assignment
  //---------------------
  var i=0;
  //======================================================
  //                   Main Code
  //======================================================
  if(fChange.doSelect("number = \"" + cRFC + "\"")!=RC_SUCCESS) {return 1;}
  iCICnt = (fChange.assets.getSize()==1 && fChange.assets[0]==null) ? 0 : fChange.assets.getSize() ;
  if(!iCICnt) {return 2;}
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
}

//-----------------------------------------------
function GetCISOX(){
//-----------------------------------------------
  var fDevice = new SCFile("device") ; var bSOX = false;
  for(i=0 ; i<aCIUS.length ; i++) {
    gRC = fDevice.doSelect("logical.name = \"" + aCIUS[i][1] + "\"");
    if(gRC==RC_SUCCESS && fDevice.soxClassification=="In scope") {
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
  return false;
}

//-----------------------------------------------
function GetImpact(cRFC){
//-----------------------------------------------
  var iRC;var bSOX=false;var bShow=false;
  print("impact analysis for RFC \""+cRFC+"\"");
  iRC = system.library.cnfcm.GetCIList(cRFC);
  if(iRC==1) {
    print("impact analysis -> \""+cRFC+"\" does not exist");
    return false;
  } else if(iRC==2) {
    print("impact analysis -> \""+cRFC+"\" has NO CIs assigned");
    return false;
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
  return true;
}

//-----------------------------------------------
function GetOpAG(fChange){
//-----------------------------------------------
  var sql;var rc;
  var fOperator = new SCFile( "operator" );
  print("result 3a -> " + fChange.orig_operator);
  sql = "contact.name = \"" + fChange.orig_operator +"\"";
  rc = fOperator.doSelect( sql );
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
  var iCnt=(bHead)?iCICnt:iLCICnt;
  var bFMore=true;var i;var sSQL
  for(i=0 ; i<iCnt ; i++) {
    if(iLvl>2 && aCIUS[i][0]!=iLvl-1) {continue;}
    print("impact analysis -> getting related CIs");
    sSQL = "relationship.name = \"" + aCIUS[i][iLI] + "\"";
    if(fCIRel.doSelect(sSQL)==RC_SUCCESS) {
      print("impact analysis -> checking related CIs");
      if(IsUnique(aCIUS,fCIRel.logical_name)) {
        iRI++;aCIUS[iRI]=[iLvl];aCIUS[iRI][iLI]=fCIRel.logical_name;
        print("impact analysis - ci relationship -> "+aCIUS[iRI][iLI]);
      }
      while(bFMore) {
        if(fCIRel.getNext()==RC_SUCCESS) {
          if(IsUnique(aCIUS,fCIRel.logical_name)) {
            iRI++;aCIUS[iRI]=[iLvl];aCIUS[iRI][iLI]=fCIRel.logical_name;
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
  while(rRC == RC_SUCCESS) 	{
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
  if(num1 <= 0 | num2 <= 0) {
    //print("error in risklevel: a second field value is missing -> risk is set to zero")
    return 0
  }
  result = num1 * num2
  if(result < 0) { 
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

//---------------------------------------------------------------------------------
function DArg(outArgs,inArgs) {
//---------------------------------------------------------------------------------
// RETURNS Args object updated with inArgs
//---------------------------------------------------------------------------------
  for(cArgNam in inArgs){outArgs[cArgNam]=inArgs[cArgNam];}
  return outArgs;
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
  if(oA.abRN){if(oA.anShw>=1){print("#2");}return sName;} 
  if(oA.anShw>=1){print("#3");}return true;
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

//-----------------------------------------------
function SetLateRFCTest(aoObj){
//-----------------------------------------------
var oA=DArg({acRFC:"all",abUp:true,abShw:false,abSA:false},aoObj);if(oA.acSA){SArg(oA);}
//-----------------------------------------------
  print("acRFC -> "+oA.acRFC);
  print("acUp  -> "+oA.abUp);
  print("acShw -> "+oA.abShw);
}

//-----------------------------------------------
function WaitHere(aoObj) {
//-----------------------------------------------
var oA=DArg({anMSec:1000,abSA:false},aoObj);if(oA.abSA){SArg(oA);}
//-----------------------------------------------
// anMSec : 1000  -> Milliseconds to wait
// abSA   : false -> Show function call Arguments 
//-----------------------------------------------
  var dNow=new Date();var dCur=null;
  do {dCur=new Date();} while (dCur-dNow<oA.anMSec);
} 

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
  return true;
}
