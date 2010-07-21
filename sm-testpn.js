print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

print("-----------------");

aDT      = new Array("56k", "800 dedicated", "800 switched", "atm", "bill number only", "broadband", "centrex", "coin", "dial", "did extension", "did trunk", "dsl", "e1", "frame relay", "icn", "isdn", "isdn bri", "isdn pri", "leased line", "local", "local gs trunk", "local ls line", "metro-ethernet", "mpls", "multi-pt", "oc12", "oc3", "primepath", "pt-pt", "pvc meet", "rcf", "t1", "t1 - isdn ld", "t1 - isdn local", "t1 - ld", "t1 - local", "t3", "vpn-b2b");
fDevType = new SCFile("devtype");
fDevType.doSelect("device.name = \"line\"");

print( "device.name: \n" + fDevType.sub_type);
print( "length     : \n" + fDevType.sub_type.length());

for ( i=0 ; i<fDevType.sub_type.length() ; i++) {
  fDevType.sub_type.pop();
  print("popping");
}

print( "device.name: \n" + fDevType.sub_type);

fDevType.doUpdate();

print( "device.name: \n" + fDevType.sub_type);

for ( i=0 ; i<aDT.length ; i++) {
  fDevType.sub_type.push(aDT[i]);
  print("pushing -> "+aDT[i]);
}

fDevType.doUpdate();

print( "device.name: \n" + fDevType.sub_type);

print("=====================");
print("Done");
print("=====================");
