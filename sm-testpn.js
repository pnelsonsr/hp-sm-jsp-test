print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

var sContact="nelson, patrick";
sTL = system.library.cnfcm.GetOperator(sContact);
print("sTL -> "+sTL);

var sOperator="nelson";
sTL = system.library.cnfcm.GetContact(sOperator);
print("sTL -> "+sTL);

print("=====================");
print("Done");
print("=====================");
