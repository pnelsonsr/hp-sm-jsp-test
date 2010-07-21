print("=====================");
print("Start");
print("=====================");

  var fCM3Profile = new SCFile( "cm3profile" );
  var fCM3Groups  = new SCFile( "cm3groups"  );
  var fOperator   = new SCFile( "operator"   );
  var bFirst=true;
  var bUpdated=false;
  var iCnt=1;
  var sNewVal="";
  var sSay="";        ;
  var aCAGList = new Array() 

  aCAGList[0]="CII CA - CRM Application Ownership Team";
  aCAGList[1]="CA - CII CRM Application Ownership Team";
  aCAGList[2]="CII CA - eBusiness Team";
  aCAGList[3]="CA - CII eBusiness Team";
  aCAGList[4]="CII CA - Rating Team";
  aCAGList[5]="CA - CII Rating Team";
  aCAGList[6]="EBI-Core CA - Team Notifications";
  aCAGList[7]="CA - EBI-Core Team Notifications";
  aCAGList[8]="IT CA - Client Systems Infrastructure";
  aCAGList[9]="CA - IT Client Systems Infrastructure";
  aCAGList[10]="IT CA - DATABASE DB2";
  aCAGList[11]="CA - IT DATABASE DB2";
  aCAGList[12]="IT CA - DATABASE FINANCIALS";
  aCAGList[13]="CA - IT DATABASE FINANCIALS";
  aCAGList[14]="IT CA - DATABASE FREIGHT";
  aCAGList[15]="CA - IT DATABASE FREIGHT";
  aCAGList[16]="IT CA - DATABASE INFORMATICA";
  aCAGList[17]="CA - IT DATABASE INFORMATICA";
  aCAGList[18]="IT CA - DATABASE INFORMIX";
  aCAGList[19]="CA - IT DATABASE INFORMIX";
  aCAGList[20]="IT CA - DATABASE MENLO";
  aCAGList[21]="CA - IT DATABASE MENLO";
  aCAGList[22]="IT CA - DATABASE SQL Server";
  aCAGList[23]="CA - IT DATABASE SQL Server";
  aCAGList[24]="IT CA - Distributed Systems Administration";
  aCAGList[25]="CA - IT Distributed Systems Administration";
  aCAGList[26]="IT CA - Document Management FTE";
  aCAGList[27]="CA - IT Document Management FTE";
  aCAGList[28]="IT CA - DTS Server Support";
  aCAGList[29]="CA - IT DTS Server Support";
  aCAGList[30]="IT CA - Enterprise Accounting FTE";
  aCAGList[31]="CA - IT Enterprise Accounting FTE";
  aCAGList[32]="IT CA - Enterprise Infrastructure Services";
  aCAGList[33]="CA - IT Enterprise Infrastructure Services";
  aCAGList[34]="IT CA - Enterprise Transmissions FTE";
  aCAGList[35]="CA - IT Enterprise Transmissions FTE";
  aCAGList[36]="IT CA - Enterprise Web Core";
  aCAGList[37]="CA - IT Enterprise Web Core";
  aCAGList[38]="IT CA - FIT Monitoring Correlation Analysts";
  aCAGList[39]="CA - IT FIT Monitoring Correlation Analysts";
  aCAGList[40]="IT CA - HRMS";
  aCAGList[41]="CA - IT HRMS";
  aCAGList[42]="IT CA - Image Operations";
  aCAGList[43]="CA - IT Image Operations";
  aCAGList[44]="IT CA - Information Security & Compliance";
  aCAGList[45]="CA - IT Information Security & Compliance";
  aCAGList[46]="IT CA - ITSM - Service Management";
  aCAGList[47]="CA - IT ITSM - Service Management";
  aCAGList[48]="IT CA - iUSA Con-way";
  aCAGList[49]="CA - IT iUSA Con-way";
  aCAGList[50]="IT CA - iUSA Logistics";
  aCAGList[51]="CA - IT iUSA Logistics";
  aCAGList[52]="IT CA - kronos";
  aCAGList[53]="CA - IT kronos";
  aCAGList[54]="IT CA - Mainframe Software";
  aCAGList[55]="CA - IT Mainframe Software";
  aCAGList[56]="IT CA - Network Engineering Services";
  aCAGList[57]="CA - IT Network Engineering Services";
  aCAGList[58]="IT CA - Network Operations";
  aCAGList[59]="CA - IT Network Operations";
  aCAGList[60]="IT CA - Output Processing";
  aCAGList[61]="CA - IT Output Processing";
  aCAGList[62]="IT CA - P2D";
  aCAGList[63]="CA - IT P2D";
  aCAGList[64]="IT CA - Production Control";
  aCAGList[65]="CA - IT Production Control";
  aCAGList[66]="IT CA - Return and Repair";
  aCAGList[67]="CA - IT Return and Repair";
  aCAGList[68]="IT CA - SCM Team";
  aCAGList[69]="CA - IT SCM Team";
  aCAGList[70]="IT CA - STC Core Team";
  aCAGList[71]="CA - IT STC Core Team";
  aCAGList[72]="IT CA - Storage Mgmt & Capacity Planning";
  aCAGList[73]="CA - IT Storage Mgmt & Capacity Planning";
  aCAGList[74]="IT CA - Systems Operations";
  aCAGList[75]="CA - IT Systems Operations";
  aCAGList[76]="IT CA - TSS Deskside Support";
  aCAGList[77]="CA - IT TSS Deskside Support";
  aCAGList[78]="IT CA - TSS Network Support";
  aCAGList[79]="CA - IT TSS Network Support";
  aCAGList[80]="IT CA - VMware Server Group";
  aCAGList[81]="CA - IT VMware Server Group";
  aCAGList[82]="IT CA - Voice Telecomm Services";
  aCAGList[83]="CA - IT Voice Telecomm Services";
  aCAGList[84]="IT CA - Windows Server Group";
  aCAGList[85]="CA - IT Windows Server Group";
  aCAGList[86]="IT CA - Windows Server Group";
  aCAGList[87]="CA - IT Windows Server Group";
  aCAGList[88]="MLG_TECH_SUPPORT CA -";
  aCAGList[89]="CA - MLG_TECH_SUPPORT";
  aCAGList[90]="MWW CA - European IT Support Team";
  aCAGList[91]="CA - MWW European IT Support Team";
/*
  aCAGList[0]="IT CA - Client Systems Infrastructure";
  aCAGList[1]="CA - IT Client Systems Infrastructure";
  aCAGList[2]="IT CA - DATABASE FREIGHT";
  aCAGList[3]="CA - IT DATABASE FREIGHT";
*/
for( i=0 ; i<aCAGList.length ; i+=2 ) {
  print("CAG-->" + aCAGList[i] + "<--xx-->" + aCAGList[i+1] + "<--xx");
  sOldCAG = aCAGList[i];
  sNewCAG = aCAGList[i+1];


  // BEG Profile CAG Name Change --------------------------------------------------------------------- 
  print("[ CAG ]");
  bUpdated=false;
  rRC=fCM3Groups.doSelect(new QueryCond("name", EQ, sOldCAG)); 
  while (rRC == RC_SUCCESS) 	{
    print("    old ->\"" + fCM3Groups.name + "\"");
    print("    new ->\"" + sNewCAG + "\"");
    fCM3Groups.name = sNewCAG;
    fCM3Groups.doUpdate();
    bUpdated=true;
    print("     ->UPDATED<-");
    rRC = fCM3Groups.getNext();
  }
  sSay=(bUpdated) ? "CAG Table Updated" : "No Updates! CAG Table NOT Updated";
  sShw=(bUpdated) ? "###" : "***";
  print(sShw + "\n" + sShw + " " + sSay + "\n" + sShw + "\n");
  // END Profile CAG Name Change ---------------------------------------------------------------------


  // BEG CAG Name Change -----------------------------------------------------------------------------
  print("[ Profiles ]");
  bUpdated=false;
  print("-= Name =-");
  rRC=fCM3Profile.doSelect(new QueryCond("name", EQ, sOldCAG)); 
  while (rRC == RC_SUCCESS) 	{
    print("    old ->\"" + fCM3Profile.name + "\"");
    print("    new ->\"" + sNewCAG + "\"");
    fCM3Profile.name = sNewCAG;
    fCM3Profile.doUpdate();
    bUpdated=true;
    print("     ->UPDATED<-");
    rRC = fOperator.getNext();
  }
  print("-= AG =-");
  rRC=fCM3Profile.doSelect(new QueryCond("approval.groups", EQ, sOldCAG)); 
  while (rRC == RC_SUCCESS) 	{
    print("  name ->\"" + fCM3Profile.name + "\"");
    for( j=0 ; j<fCM3Profile.approval_groups.length() ; j++ ) {
      if(fCM3Profile.approval_groups[j] == sOldCAG) { 
        print("    old ->\"" + fCM3Profile.approval_groups[j] + "\"");
        print("    new ->\"" + sNewCAG + "\"");
        fCM3Profile.approval_groups[j]=sNewCAG;
        fCM3Profile.doUpdate();
        bUpdated=true;
        print("     ->UPDATED<-");
      }
    }
    rRC = fCM3Profile.getNext();
  }
  sSay=(bUpdated) ? "Profile Table Updated" : "No Updates! Profile Table NOT Updated";
  sShw=(bUpdated) ? "###" : "***";
  print(sShw + "\n" + sShw + " " + sSay + "\n" + sShw + "\n");
  // END CAG Name Change -----------------------------------------------------------------------------


  // BEG Operator CAG Name Change --------------------------------------------------------------------
  print("[ Operators ]");
  bUpdated=false;
  rRC=fOperator.doSelect(new QueryCond("profile.change", EQ, sOldCAG)); 
  while (rRC == RC_SUCCESS) 	{
    print("  name ->\"" + fOperator.name + "\"");
    for( j=0 ; j<fOperator.profile_change.length() ; j++ ) {
      if(fOperator.profile_change[j] == sOldCAG) { 
        print("    old ->\"" + fOperator.profile_change[j] + "\"");
        print("    new ->\"" + sNewCAG + "\"");
        fOperator.profile_change[j]=sNewCAG;
        fOperator.doUpdate();
        bUpdated=true;
        print("     ->UPDATED<-");
      }
    }
    rRC = fOperator.getNext();
  }
  sSay=(bUpdated) ? "Operator Table Updated" : "No Updates! Operator Table NOT Updated";
  sShw=(bUpdated) ? "###" : "***";
  print(sShw + "\n" + sShw + " " + sSay + "\n" + sShw + "\n");
  // END Operator CAG Name Change --------------------------------------------------------------------


}


print("=====================");
print("Done");
print("=====================");
