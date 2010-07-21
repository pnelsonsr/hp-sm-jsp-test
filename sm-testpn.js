print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------
  aAL = "CII CRM Application Ownership Team"; 
  aCA = "CII CA - CRM Application Ownership Team"; 
  aAL = "IT Client Systems Infrastructure"; 
  aCA = "IT CA - Client Systems Infrastructure"; 
  aAL = "MWW European IT Support Team"; 
  aCA = "MWW CA - European IT Support Team"; 

print(aAL.substring(0,3));
if(aAL.substring(0,3)=="CII") {
  sAL="CII CA - "+aAL.substring(4,aAL.length);
} else if(aAL.substring(0,3)=="IT ") {
  sAL="IT CA - "+aAL.substring(3,aAL.length);
} else if(aAL.substring(0,3)=="MWW") {
  sAL="MWW CA - "+aAL.substring(4,aAL.length);
} else {
  sAL=aAL;
}
print(sAL);
print(aCA);

print("=====================");
print("Done");
print("=====================");
