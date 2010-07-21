print("=====================");
print("Start");
print("=====================");

runIt({iCnt:5,cFish:"tuna"});
print("=====================");
runIt({});
print("=====================");
runIt({iAmt:10,iOrd:5});

print("=====================");
print("Done");
print("=====================");

function runIt(aoObj) {
  var oArgs=defArgs({iCnt:1,iAmt:2,iLst:3},aoObj);
  for (cArg in oArgs) {print(cArg+" -> "+oArgs[cArg]);}
  print("iCnt -> "+oArgs.iCnt);
}

/*
//-----------------------
// Notes 
//-----------------------

if () {

}

*/