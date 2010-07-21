print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------
//sCI="AADADB";                //Applications and Software
//sCI="Net Backup Server 2";   //computer
//sCI="BMCPDS";                //database
//sCI="bipdp2.con-way.com";    //networkcomponents
  sCI="Big Hard Disk";         //storage
//sCI="";

  sOwningTeam = system.library.cnfcm.GetAGFromCI(sCI);
  if(sOwningTeam==null | sOwningTeam=="AUTO") {
    sOwningTeam = ""
    sOwner = "hamilton, jim";
  } else {
    sOwner = system.library.cnfcm.GetAGLead(sOwningTeam);
  }
  sAssignedTeam=sOwningTeam;
  if(sOwner==null) {sOwner = "hamilton, jim";}
  sAssignedTo=sOwner;
  sChangeManager=sOwner
  
  print("sOwningTeam -> "+sOwningTeam);
  print("sOwner -> "+sOwner);
  print("sAssignedTeam -> "+sAssignedTeam);
  print("sAssignedTo -> "+sAssignedTo);

  sCIType=system.library.cnfcm.GetCIType(sCI);
  if(sCIType!=null) {
    print("Type -> "+sCIType);
  } else {
    print("Type -> NONE");
  }
  
  if(sCIType=="Applications and Software") {
    sService="Applications";
  } else if(sCIType=="computer") {
    sService="Hardware";
  } else if(sCIType=="database") {
    sService="Database";
  } else if(sCIType=="networkcomponents") {
    sService="Network";
  } else if(sCIType=="storage") {
    sService="Storage";
  } else {
    sService="";
  }  

  if(sService!=null) {
    print("Service -> "+sService);
  } else {
    print("Service -> NONE");
  }



print("=====================");
print("Done");
print("=====================");
