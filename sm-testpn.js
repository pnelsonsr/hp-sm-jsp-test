print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

var sAG="IT Client Systems Infrastructure";

var fIAG = new SCFile("assignment")
var getAssignment = fIAG.doSelect("name#\""+sAG+"\"")
if (getAssignment == RC_SUCCESS) {
  var operatorList = fIAG.operators
  var operatorList=operatorList.getText()
  var sAGCList="operator.id isin "+operatorList
}
print("sAGCList -> "+sAGCList);

// IMEDIATE IF imediate if IMMEDIATE IF immediate if IIF iif

var myVAR=(true) ? "true" : "false";

print("=====================");
print("Done");
print("=====================");
