print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------
//cRFC = "CM0000268"; /* zero CIs       */
  cRFC = "CM0000267"; /* one CI         */
//cRFC = "CM0000266"; /* two CIs        */
//cRFC = "RC9999999"; /* Bad RFC Number */

var iRC;

//======================================================
//                   Main Code
//======================================================
iRC = system.library.cnfcm.GetCIList(cRFC);
print("RFC \""+cRFC+"\"");
if(iRC==1) {
  print("\""+cRFC+"\" does not exist");
} else if(iRC==2) {
  print("\""+cRFC+"\" has NO CIs assigned");
} else {
  print("this is the CI list:");
  for(i=0 ; i<aCIUS.length ; i++) {
    print("-> " + aCIUS[i][0] + " - " + aCIUS[i][1]);
  }
}
iRC = system.library.cnfcm.GetCIAG();
print("this is the AG list:");
if(aAG.length>0) {
  for(i=0 ; i<aAG.length ; i++) {
    print("-> " + aAG[i]);
  }
} else {
  print("-> no assignment groups in CI tree");
}
iRC = system.library.cnfcm.GetCIBI();
print("this is the BS CI list:");
if(aBS.length>0) {
  for(i=0 ; i<aBS.length ; i++) {
    print("-> " + aBS[i]);
  }
} else {
  print("-> no business service in CI tree");
}
print("this is the BU AG list:");
if(aBU.length>0) {
  for(i=0 ; i<aBU.length ; i++) {
    print("-> " + aBU[i]);
  }
} else {
  print("-> no business unit in CI tree");
}

print("this is the current RFC IBS list:");
if(fChange.affected_services.length()>0 && fChange.affected_services[0]!=null) {
  for(i=0 ; i<fChange.affected_services.length() ; i++) {
    print("-> " + fChange.affected_services[i]);
  }
} else {
  print("-> no IBS's in RFC");
}
print("this is generating new IBS list:");
iRC = system.library.cnfcm.SetBS();
print("this is the new RFC IBS list:");
if(fChange.affected_services.length()>0) {
  for(i=0 ; i<fChange.affected_services.length() ; i++) {
    print("-> " + fChange.affected_services[i]);
  }
  fChange.doUpdate();
} else {
  print("-> no IBS in RFC");
}

print("this is the current RFC IBU list:");
if(fChange.cnf_affected_businesses.length()>0 && fChange.cnf_affected_businesses[0]!=null) {
  for(i=0 ; i<fChange.cnf_affected_businesses.length() ; i++) {
    print("-> " + fChange.cnf_affected_businesses[i]);
  }
} else {
  print("-> no IBU's in RFC");
}
print("this is generating new IBU list:");
iRC = system.library.cnfcm.SetBU();
print("this is the new RFC IBU list:");
if(fChange.cnf_affected_businesses.length()>0) {
  for(i=0 ; i<fChange.cnf_affected_businesses.length() ; i++) {
    print("-> " + fChange.cnf_affected_businesses[i]);
  }
  fChange.doUpdate();
} else {
  print("-> no IBU in RFC");
}


//bClearEm=true;
bClearEm=false;
if(bClearEm) {
  iRC = system.library.cnfcm.ClearBS();
  print("cleared affected.services from RFC");
  iRC = system.library.cnfcm.ClearBU();
  print("cleared assignment from RFC");
}


//=====
// eom
//=====

print("=====================");
print("Done");
print("=====================");
