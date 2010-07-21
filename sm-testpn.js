print("=====================");
print("Start");
print("=====================");


nLate = 3;nLateCnt = 0;nOpenCnt = 0;
bLate = false;
dLate = new Date();
dLate.setDate(dLate.getDate()-nLate)
print("Date Late -> "+dLate);
fCM3R = new SCFile("cm3r");
rRC=fCM3R.doSelect("current.phase<>\"Closed\""); 
while (rRC == RC_SUCCESS) 	{
  nOpenCnt +=1;
  //bLate = (fCM3R.current_phase!="New" && fCM3R.planned_end!=null && parseInt((dLate-fCM3R.planned_end)/86400000)>0) ? true:false;
  bLate = (fCM3R.current_phase=="New" && fCM3R.planned_end!=null && parseInt((dLate-fCM3R.planned_end)/86400000)>0) ? true:false;
  //bLate = (fCM3R.planned_end!=null && parseInt((dLate-fCM3R.planned_end)/86400000)>0) ? true:false;
  if (bLate) {
    nLateCnt += 1;
    print("Open -> "+fCM3R.number+" - "+fCM3R.current_phase);
    print("  - Overdue - "+fCM3R.planned_end);
  }
  rRC = fCM3R.getNext();
}
print("Open RFCs -> "+nOpenCnt);
print("Late RFCs -> "+nLateCnt);

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