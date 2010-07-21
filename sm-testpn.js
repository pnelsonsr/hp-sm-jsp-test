print("=====================");
print("Start");
print("=====================");

  var nCnt = 0;
  var fRFC = new SCFile("cm3r");
  var cRFC = "CM0000104";
  
  //var sSql = "open = true";
  //var sSql = "planned.end <> NULL";
  var sSql = "open = true AND category <> \"Unplanned\" AND planned.end <> NULL AND current.phase <> \"New\"";
  //var sSql = "number=\""+cRFC+"\" AND planned.end <> NULL";
  
  print("Hey -> "+sSql);
  rRC = fRFC.doSelect(sSql);
  while (rRC==RC_SUCCESS) {
    print(fRFC.number+" -> could be updated - "+fRFC.planned_end+" - "+fRFC.open);
    nCnt += 1;
    rRC = fRFC.getNext();
  }
  print("total possible records -> "+nCnt);

print("=====================");
print("Done");
print("=====================");


/*
//-----------------------
// Notes 
//-----------------------

if () {

}

*/