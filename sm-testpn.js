print("=====================");
print("Start");
print("=====================");

  cRFC = "CM0000026"; /* one CI*/
  fChange = new SCFile("cm3r");
  aCI = new Array() ; aCIUS = new Array() 
  aCI.push("IT DATABASE FINANCIALS","IT Client Systems Infrastructure","IT DATABASE DB2");

print("aCI -> "+aCI);
print("Length -> "+aCI.length);

if(fChange.doSelect("number = \"" + cRFC + "\"")==RC_SUCCESS) {
 print("Hey I Found it -> "+fChange.cnf_approval_list);
}

for(i=0 ; i<aCI.length ; i++) {
  if(i==0 && fChange.cnf_approval_list.length()==1) {
    fChange.cnf_approval_list[0]=aCI[i];
    print("add -> "+aCI[i]);
  } else {
    fChange.cnf_approval_list.push(aCI[i]);
    print("push -> "+aCI[i]);
  }
} 

print("New Value -> "+fChange.cnf_approval_list);
print("Length -> "+fChange.cnf_approval_list.length());

fChange.doUpdate();

print("=====================");
print("Done");
print("=====================");
