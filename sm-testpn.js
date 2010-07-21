print("=====================");
print("Start");
print("=====================");

var fAD = new SCFile("approvaldef");
var fAG = new SCFile("assignment");
var aAL = new Array();
var rRC;
rRC=fAG.doSelect(new QueryCond("name", NEQ, "")); 
while (rRC == RC_SUCCESS) 	{
  print("-> "+fAG.name);
  if(aAL.length==0) {aAL[0]=fAG.name;} else {aAL.push(fAG.name);}
  rRC = fAG.getNext();
}
rRC=fAD.doSelect(new QueryCond("name", EQ, "Approval Normal")); 
bUpdate=false;
for(i=0 ; i<aAL.length ; i++) {
  if(system.library.cnfcm.IsUnique(fAD.group_name,aAL[i])) { 
    bUpdate=true;
    if(i==0 && fAD.group_name[0]==null) {
      fAD.group_name[0]=aAL[i];
      fAD.sequence[0]=1;
      fAD.condition[0]="index(\""+aAL[i]+"\",cnf.approval.list in $L.file)>0";
      print("added ->"+aAL[i]);
    } else {
      fAD.group_name.push(aAL[i]);
      fAD.sequence.push(1);
      fAD.condition.push("index(\""+aAL[i]+"\",cnf.approval.list in $L.file)>0");
      print("pushed ->"+aAL[i]);
    }
  
  } else {
    print("AG in AD already -> "+aAL[i]);
  }
}
fAD.doUpdate();  
system.functions.cleanup(fAD);


print("=====================");
print("Done");
print("=====================");
