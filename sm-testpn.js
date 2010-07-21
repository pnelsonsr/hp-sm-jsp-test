print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

var fAD  = new SCFile("approvaldef");
var fIAG = new SCFile("assignment");
var fCAG = new SCFile("cm3groups");
var aIAG = new Array();
var aCAG = new Array();
var aAD  = new Array();
var cAD  = new Array();
var sAL  = "";
var sAD  = "Approval Normal";


rRC=fIAG.doSelect(new QueryCond("name", NEQ, "")); 
while (rRC == RC_SUCCESS) 	{
  if(aIAG.length==0) {aIAG[0]=fIAG.name;} else {aIAG.push(fIAG.name);}
  rRC = fIAG.getNext();
}
/*
for(i=0 ; i<aIAG.length ; i++) { 
  print("aIAG["+i+"] -> "+aIAG[i]);
}
*/

rRC=fAD.doSelect(new QueryCond("name",EQ,sAD)); 
/*
print(fAD.group_name);
print(fAD.group_name.length());
*/
for(i=0 ; i<fAD.group_name.length() ; i++) { 
  //print("fAD.group_name["+i+"] -> "+fAD.group_name[i]);
  if(aAD.length==0) {aAD[0]=fAD.group_name[i];} else {aAD.push(fAD.group_name[i]);}
}

/*for(i=0 ; i<aAD.length ; i++) { 
  print("aAD["+i+"] -> "+aAD[i]);
}
*/


for(i=0 ; i<aIAG.length ; i++) {

  //print("aIAG[i] ->"+aIAG[i].substr(0,5)+"<-" );

/*
  for(i=0 ; i<aAD.length ; i++) {

    if(aAL[i].substr(0,5)!="CA - ") {
      sAL="CA - "+aAL[i];
    } else {
      sAL=aAL[i];
    }

  }

  if(aAL[i].substr(0,5)!="CA - ") {
    sAL="CA - "+aAL[i];
  } else {
    sAL=aAL[i];
  }
*/

  if(aCAG.length==0) {aCAG[0]="CA - "+aIAG[i];} else {aCAG.push("CA - "+aIAG[i]);}

}


for(i=0 ; i<aCAG.length ; i++) { 
  print("aCAGS["+i+"] -> "+aCAG[i]);
}

print("=====================");
print("Done");
print("=====================");
