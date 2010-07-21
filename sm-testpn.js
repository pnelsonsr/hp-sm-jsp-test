print("=====================");
print("Start");
print("=====================");

  var nCnt = 0;
  var fRFC = new SCFile("cm3r");
  var rRC  = fRFC.doSelect(new QueryCond("cnf.planned.days", EQ, null)); 
  while (rRC==RC_SUCCESS) {
    fRFC.cnf_planned_days = "0";
    print(fRFC.number+" -> updated - "+fRFC.cnf_planned_days);
    //fRFC.doUpdate();
    nCnt += 1;
    rRC = fRFC.getNext();
  }
  print("total null records -> "+nCnt);

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