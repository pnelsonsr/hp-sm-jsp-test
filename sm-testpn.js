print("=====================");
print("Start");
print("=====================");

//-----------------------------------------------
function ClearCP(sCP){
//-----------------------------------------------
// Takes a AD name to operate against 
// sCP - AD name
//-----------------------------------------------
  var fCP = new SCFile("cm3profile");
  var rRC = fCP.doSelect(new QueryCond("name",EQ,sCP)); 
  print("AD -> "+sCP);
  print("start group name -> "+fCP.group_name);
  print("start length -> "+fCP.group_name.length());
  iCnt=fCP.group_name.length();
  bUpdate=false;
  for(i=0 ; i<iCnt ; i++) {
    bUpdate=true;
    fCP.group_name.pop();
    fCP.sequence.pop();
    fCP.condition.pop();
  }
  print("end group name -> "+fCP.group_name);
  print("end length -> "+fCP.group_name.length());
  fCP.doUpdate();
  system.functions.cleanup(fCP);
  print("AD -> "+sCP+" Cleared and Saved");
  return true;
}

//-----------------------------------------------
function PopulateCP(sCP){
//-----------------------------------------------
  var fCP = new SCFile("cm3profile");
  var fAG = new SCFile("assignment");
  var aAL = new Array();
  var rRC;
  rRC=fAG.doSelect(new QueryCond("name", NEQ, "")); 
  while (rRC == RC_SUCCESS) 	{
    print("-> "+fAG.name);
    if(aAL.length==0) {aAL[0]=fAG.name;} else {aAL.push(fAG.name);}
    rRC = fAG.getNext();
  }
  rRC=fCP.doSelect(new QueryCond("name",EQ,sCP)); 
  print("AD -> "+sCP);
  bUpdate=false;
  for(i=0 ; i<aAL.length ; i++) {
    if(system.library.cnfcm.IsUnique(fCP.group_name,aAL[i])) { 
      bUpdate=true;
      if(i==0 && fCP.group_name[0]==null) {
        fCP.group_name[0]=aAL[i];
        fCP.sequence[0]=1;
        fCP.condition[0]="index(\""+aAL[i]+"\",cnf.approval.list in $L.file)>0";
        print("added ->"+aAL[i]);
      } else {
        fCP.group_name.push(aAL[i]);
        fCP.sequence.push(1);
        fCP.condition.push("index(\""+aAL[i]+"\",cnf.approval.list in $L.file)>0");
        print("pushed ->"+aAL[i]);
      }
    } else {
      print("AG in AD already -> "+aAL[i]);
    }
  }
  fCP.doUpdate();  
  system.functions.cleanup(fCP);
  system.functions.cleanup(fAG);
  system.functions.cleanup(aAL);
  print("AD -> "+sCP+" Populated and Saved");
  return true;
}

  var sCP="";

  system.library.cnfcm.ClearCP(sCP);
//system.library.cnfcm.populateCP(sCP);




print("=====================");
print("Done");
print("=====================");
