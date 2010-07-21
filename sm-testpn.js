print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------
  sAG="TEST - Storage AG";
//sAG="";
  sAGTL=system.library.cnfcm.GetAGLead(sAG);
  if(sAGTL!=null) {
    print("TeamLead -> "+sAGTL);
  } else {
    print("TeamLead -> NONE");
  }
  system.library.cnfcm.SayIt("Hello");


print("=====================");
print("Done");
print("=====================");
