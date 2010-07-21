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
  aCAGList[2]="caciicrmapplicationownershipteam@con-way.com"
  aCAGList[3]="CII CA - eBusiness Team";
  aCAGList[4]="CA - CII eBusiness Team";
  aCAGList[5]="caciiebusinessteam@con-way.com"
  aCAGList[6]="CII CA - Rating Team";
  aCAGList[7]="CA - CII Rating Team";
  aCAGList[8]="caciiratingteam@con-way.com"
  aCAGList[9]="EBI-Core CA - Team Notifications";
  aCAGList[10]="CA - EBI-Core Team Notifications";
  aCAGList[11]="caebicoreteamnotifications@con-way.com"
  aCAGList[12]="IT CA - Client Systems Infrastructure";
  aCAGList[13]="CA - IT Client Systems Infrastructure";
  aCAGList[14]="caitclientsystemsinfrastructure@con-way.com"
  aCAGList[15]="IT CA - DATABASE DB2";
  aCAGList[16]="CA - IT DATABASE DB2";
  aCAGList[17]="caitdatabasedb2@con-way.com"
  aCAGList[18]="IT CA - DATABASE FINANCIALS";
  aCAGList[19]="CA - IT DATABASE FINANCIALS";
  aCAGList[20]="caitdatabasefinancials@con-way.com"
  aCAGList[21]="IT CA - DATABASE FREIGHT";
  aCAGList[22]="CA - IT DATABASE FREIGHT";
  aCAGList[23]="caitdatabasefreight@con-way.com"
  aCAGList[24]="IT CA - DATABASE INFORMATICA";
  aCAGList[25]="CA - IT DATABASE INFORMATICA";
  aCAGList[26]="caitdatabaseinformatica@con-way.com"
  aCAGList[27]="IT CA - DATABASE INFORMIX";
  aCAGList[28]="CA - IT DATABASE INFORMIX";
  aCAGList[29]="caitdatabaseinformix@con-way.com"
  aCAGList[30]="IT CA - DATABASE MENLO";
  aCAGList[31]="CA - IT DATABASE MENLO";
  aCAGList[32]="caitdatabasemenlo@con-way.com"
  aCAGList[33]="IT CA - DATABASE SQL Server";
  aCAGList[34]="CA - IT DATABASE SQL Server";
  aCAGList[35]="caitdatabasesqlserver@con-way.com"
  aCAGList[36]="IT CA - Distributed Systems Administration";
  aCAGList[37]="CA - IT Distributed Systems Administration";
  aCAGList[38]="caitdistributedsystemsadministration@con-way.com"
  aCAGList[39]="IT CA - Document Management FTE";
  aCAGList[40]="CA - IT Document Management FTE";
  aCAGList[41]="caitdocumentmanagementfte@con-way.com"
  aCAGList[42]="IT CA - DTS Server Support";
  aCAGList[43]="CA - IT DTS Server Support";
  aCAGList[44]="caitdtsserversupport@con-way.com"
  aCAGList[45]="IT CA - Enterprise Accounting FTE";
  aCAGList[46]="CA - IT Enterprise Accounting FTE";
  aCAGList[47]="caitenterpriseaccountingfte@con-way.com"
/*
  aCAGList[0]="IT CA - Client Systems Infrastructure";
  aCAGList[1]="CA - IT Client Systems Infrastructure";
  aCAGList[2]="IT CA - DATABASE FREIGHT";
  aCAGList[3]="CA - IT DATABASE FREIGHT";
*/
for( i=0 ; i<aCAGList.length ; i+=3 ) {
  print("CAG-->" + aCAGList[i] + "<--xx-->" + aCAGList[i+1] + "<--xx");
  sOldCAG = aCAGList[i];
  sNewCAG = aCAGList[i+1];
  sNewEDL = aCAGList[i+2];

  // BEG Profile CAG Name Change --------------------------------------------------------------------- 
  print("[ CAG ]");
  bUpdated=false;
  rRC=fCM3Groups.doSelect(new QueryCond("name", EQ, sOldCAG)); 
//  rRC=fCM3Groups.doSelect(new QueryCond("name", EQ, sNewCAG)); 
  while (rRC == RC_SUCCESS) 	{
    print("    old ->\"" + fCM3Groups.name + "\"");
    print("    new ->\"" + sNewCAG + "\"");
    print("    eDL ->\"" + sNewEDL + "\"");
    fCM3Groups.name      = sNewCAG;
//    fCM3Groups.name      = sOldCAG;
    fCM3Groups.cnf_email = sNewEDL;
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
