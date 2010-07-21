print("=====================");
print("Start");
print("=====================");

fAD = new SCFile("approvaldef");
rRC=fAD.doSelect(new QueryCond("name", EQ, "Approval Normal")); 

print("name -> "+fAD.group_name);
print("1 length -> "+fAD.group_name.length());

iCnt=fAD.group_name.length();
bUpdate=false;

for(i=0 ; i<iCnt ; i++) {
  bUpdate=true;
  fAD.group_name.pop();
  fAD.sequence.pop();
  fAD.condition.pop();
}

print("name -> "+fAD.group_name);
print("2 length -> "+fAD.group_name.length());

if(bUpdate) {fAD.doUpdate();}

print("=====================");
print("Done");
print("=====================");
