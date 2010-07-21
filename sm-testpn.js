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
  var aOldList = new Array() 

/*
  aOldList[0]="CII CA - "             ; aOldList[1]="CA - CII ";
  aOldList[2]="EBI-Core CA - "        ; aOldList[3]="CA - EBI-Core ";
  aOldList[4]="IT CA - "              ; aOldList[5]="CA - IT ";
  aOldList[6]="MLG_TECH_SUPPORT CA -" ; aOldList[7]="CA - MLG_TECH_SUPPORT";
  aOldList[8]="MWW CA - "             ; aOldList[9]="CA - MWW ";
*/
/*
  aOldList[0]="CII CA - CRM Application Ownership Team";
  aOldList[1]="CA - CII CRM Application Ownership Team";
  aOldList[2]="CII CA - eBusiness Team";
  aOldList[3]="CA - CII eBusiness Team";
  aOldList[4]="CII CA - Rating Team";
  aOldList[5]="CA - CII Rating Team";
  aOldList[6]="EBI-Core CA - Team Notifications";
  aOldList[7]="CA - EBI-Core Team Notifications";
  aOldList[8]="IT CA - Client Systems Infrastructure";
  aOldList[9]="CA - IT Client Systems Infrastructure";
  aOldList[10]="IT CA - DATABASE DB2";
  aOldList[11]="CA - IT DATABASE DB2";
  aOldList[12]="IT CA - DATABASE FINANCIALS";
  aOldList[13]="CA - IT DATABASE FINANCIALS";
  aOldList[14]="IT CA - DATABASE FREIGHT";
  aOldList[15]="CA - IT DATABASE FREIGHT";
  aOldList[16]="IT CA - DATABASE INFORMATICA";
  aOldList[17]="CA - IT DATABASE INFORMATICA";
  aOldList[18]="IT CA - DATABASE INFORMIX";
  aOldList[19]="CA - IT DATABASE INFORMIX";
  aOldList[20]="IT CA - DATABASE MENLO";
  aOldList[21]="CA - IT DATABASE MENLO";
  aOldList[22]="IT CA - DATABASE SQL Server";
  aOldList[23]="CA - IT DATABASE SQL Server";
  aOldList[24]="IT CA - Distributed Systems Administration";
  aOldList[25]="CA - IT Distributed Systems Administration";
  aOldList[26]="IT CA - Document Management FTE";
  aOldList[27]="CA - IT Document Management FTE";
  aOldList[28]="IT CA - DTS Server Support";
  aOldList[29]="CA - IT DTS Server Support";
  aOldList[30]="IT CA - Enterprise Accounting FTE";
  aOldList[31]="CA - IT Enterprise Accounting FTE";
  aOldList[32]="IT CA - Enterprise Infrastructure Services";
  aOldList[33]="CA - IT Enterprise Infrastructure Services";
  aOldList[34]="IT CA - Enterprise Transmissions FTE";
  aOldList[35]="CA - IT Enterprise Transmissions FTE";
  aOldList[36]="IT CA - Enterprise Web Core";
  aOldList[37]="CA - IT Enterprise Web Core";
  aOldList[38]="IT CA - FIT Monitoring Correlation Analysts";
  aOldList[39]="CA - IT FIT Monitoring Correlation Analysts";
  aOldList[40]="IT CA - HRMS";
  aOldList[41]="CA - IT HRMS";
  aOldList[42]="IT CA - Image Operations";
  aOldList[43]="CA - IT Image Operations";
  aOldList[44]="IT CA - Information Security & Compliance";
  aOldList[45]="CA - IT Information Security & Compliance";
  aOldList[46]="IT CA - ITSM - Service Management";
  aOldList[47]="CA - IT ITSM - Service Management";
  aOldList[48]="IT CA - iUSA Con-way";
  aOldList[49]="CA - IT iUSA Con-way";
  aOldList[50]="IT CA - iUSA Logistics";
  aOldList[51]="CA - IT iUSA Logistics";
  aOldList[52]="IT CA - kronos";
  aOldList[53]="CA - IT kronos";
  aOldList[54]="IT CA - Mainframe Software";
  aOldList[55]="CA - IT Mainframe Software";
  aOldList[56]="IT CA - Network Engineering Services";
  aOldList[57]="CA - IT Network Engineering Services";
  aOldList[58]="IT CA - Network Operations";
  aOldList[59]="CA - IT Network Operations";
  aOldList[60]="IT CA - Output Processing";
  aOldList[61]="CA - IT Output Processing";
  aOldList[62]="IT CA - P2D";
  aOldList[63]="CA - IT P2D";
  aOldList[64]="IT CA - Production Control";
  aOldList[65]="CA - IT Production Control";
  aOldList[66]="IT CA - Return and Repair";
  aOldList[67]="CA - IT Return and Repair";
  aOldList[68]="IT CA - SCM Team";
  aOldList[69]="CA - IT SCM Team";
  aOldList[70]="IT CA - STC Core Team";
  aOldList[71]="CA - IT STC Core Team";
  aOldList[72]="IT CA - Storage Mgmt & Capacity Planning";
  aOldList[73]="CA - IT Storage Mgmt & Capacity Planning";
  aOldList[74]="IT CA - Systems Operations";
  aOldList[75]="CA - IT Systems Operations";
  aOldList[76]="IT CA - TSS Deskside Support";
  aOldList[77]="CA - IT TSS Deskside Support";
  aOldList[78]="IT CA - TSS Network Support";
  aOldList[79]="CA - IT TSS Network Support";
  aOldList[80]="IT CA - VMware Server Group";
  aOldList[81]="CA - IT VMware Server Group";
  aOldList[82]="IT CA - Voice Telecomm Services";
  aOldList[83]="CA - IT Voice Telecomm Services";
  aOldList[84]="IT CA - Windows Server Group";
  aOldList[85]="CA - IT Windows Server Group";
  aOldList[86]="IT CA - Windows Server Group";
  aOldList[87]="CA - IT Windows Server Group";
  aOldList[88]="MLG_TECH_SUPPORT CA -";
  aOldList[89]="CA - MLG_TECH_SUPPORT";
  aOldList[90]="MWW CA - European IT Support Team";
  aOldList[91]="CA - MWW European IT Support Team";
*/

sOldCAG = "CII CA - CRM Application Ownership Team";
sNewCAG = "CA - CII CRM Application Ownership Team";

// CAG Name Change
  rRC=fCM3Profile.doSelect(new QueryCond("name", EQ, sOldCAG)); 

// Profile CAG Name Change
  rRC=fCM3Group.doSelect(new QueryCond("name", EQ, sOldCAG)); 

// Operator CAG Name Change
  bUpdated=false;
  rRC=fOperator.doSelect(new QueryCond("contact.name", EQ, sOldCAG)); 
  while (rRC == RC_SUCCESS) 	{

    bFirst=true;
    for( i=0 ; i<fOperator.profile_change.length() ; i++ ) {
      if(fOperator.profile_change[i] != null) {
        for( j=0 ; j<aOldList.length ; j+=2 ) {
          if(fOperator.profile_change[i].substr(0,aOldList[j].length) == aOldList[j]) { 

            if (bFirst) {print("-> "+fOperator.name);bFirst=false;}
            print("   \"" + fOperator.profile_change[i].substr(0,aOldList[j].length) + "\" = \"" + aOldList[j] + "\"");
            print("    Was -> \"" + fOperator.profile_change[i] + "\"");
            print("Will Be -> \"" + sNewVal + "\"");
            sNewVal = aOldList[j+1] + fOperator.profile_change[i].substr(aOldList[j].length)
            fOperator.profile_change[i]=sNewVal;
            fOperator.doUpdate();
            bUpdated=true;
          }
        }
      }
    }
    rRC = fOperator.getNext();

  }
  sSay=(bUpdated) ? "Operator Table Updated" : "No Updates! Operator Table NOT Updated";
  print("###\n" + "### " + sSay + "\n###\n");

print("=====================");
print("Done");
print("=====================");
