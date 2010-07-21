print("=====================");
print("Start");
print("=====================");

cRFC = "CM0000026"; /* one CI        */
fCMA = new SCFile("approval");

if(fCMA.doSelect("unique.key = \"" + cRFC + "\"")==RC_SUCCESS) {
 print("Hey I Found it -> "+fCMA.current_pending_groups);
}

iCnt=fCMA.current_pending_groups.length();
print("Array Count is -> "+iCnt);
for(i=0 ; i<iCnt ; i++) {fCMA.current_pending_groups.pop();} 
print("Cleared Value -> "+fCMA.current_pending_groups);

fCMA.current_pending_groups.push("ITSM","DUDE","HELLO");

print("New Value -> "+fCMA.current_pending_groups);
 
fCMA.doUpdate();

print("=====================");
print("Done");
print("=====================");


//fChange = new SCFile("cm3r");

//CMA.current_pending_groups.push("ITSM");
//fCMA.current_pending_groups.push("DUDE");
//fCMA.current_pending_groups.push("HELLO");
  
//fCMA.current_pending_groups={"IT DATABASE FINANCIALS", "IT Client Systems Infrastructure", "IT DATABASE DB2"}
