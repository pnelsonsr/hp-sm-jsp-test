print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

var fAD  = new SCFile("approvaldef");
var fIAG = new SCFile("assignment");
var aIAG = new Array();
var aCAG = new Array();
var aAD  = new Array();
var cAD  = new Array();
var sAL  = ""
var sAD  = "Approval Normal";

// Get the List of IAGs
rRC=fIAG.doSelect(new QueryCond("name", NEQ, "")); 
while (rRC == RC_SUCCESS) 	{
  if(aIAG.length==0) {aIAG[0]=fIAG.name;} else {aIAG.push(fIAG.name);}
  rRC = fIAG.getNext();
}
// Get the List of Approval Definitions
rRC=fAD.doSelect(new QueryCond("name",EQ,sAD)); 
for(i=0 ; i<fAD.group_name.length() ; i++) { 
  if(aAD.length==0) {aAD[0]=fAD.group_name[i];} else {aAD.push(fAD.group_name[i]);}
}
// Insert IAGs into AD 
for(i=0 ; i<aIAG.length ; i++) {
  if(aIAG[i].substr(0,4)!="TEST") {sAL="CA - "+aIAG[i];} else {sAL=aIAG[i];}
  if(aCAG.length==0) {aCAG[0]=sAL;} else {aCAG.push(sAL);}
}
// Show it
for(i=0 ; i<aCAG.length ; i++) { 
  print("aCAG["+i+"] -> "+aCAG[i]);
}

print("=====================");
print("Done");
print("=====================");
