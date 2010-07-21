print("=====================");
print("Start");
print("=====================");

  var fOperator = new SCFile( "operator" );
  var bFirst=true;
  var bUpdated=false;
  var iCnt=1;
  var sNewVal="";
  var sSay="";        ;
  var aOldList = new Array() 
  aOldList[0]="CII CA - "             ; aOldList[1]="CA - CII ";
  aOldList[2]="EBI-Core CA - "        ; aOldList[3]="CA - EBI-Core ";
  aOldList[4]="IT CA - "              ; aOldList[5]="CA - IT ";
  aOldList[6]="MLG_TECH_SUPPORT CA -" ; aOldList[7]="CA - MLG_TECH_SUPPORT";
  aOldList[8]="MWW CA - "             ; aOldList[9]="CA - MWW ";

// CAG Name Change

// Profile CAG Name Change

// Operator CAG Name Change
  rRC=fOperator.doSelect(new QueryCond("contact.name", NEQ, "")); 
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
            //fOperator.doUpdate();
            bUpdated=true;
          }
        }
      }
    }
    rRC = fOperator.getNext();
    iCnt++;
  }
  sSay=(bUpdated) ? "Operator Table Updated" : "No Updates! Operator Table NOT Updated";
  print("###\n" + "### " + sSay + "\n###\n");

print("=====================");
print("Done");
print("=====================");
