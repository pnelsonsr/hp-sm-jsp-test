print("=====================");
print("Start");
print("=====================");

nLate = 3;
nCount = 0;
bLate = false;
dLate = new Date();
dLate.setDate(dLate.getDate()-nLate)
print("Date Late -> "+dLate);
fCM3R = new SCFile("cm3r");
sSql = "open=true";
rRC=fCM3R.doSelect(sSql); 
while (rRC == RC_SUCCESS) 	{
  bUpdate = false;
  if (fCM3R.cnf_planned_overdue==null) {
    print(fCM3R.number+" - "+fCM3R.current_phase+" nulled");
    fCM3R.cnf_planned_overdue = false;
    bUpdate = true;
  }
  bLate = (fCM3R.planned_end!=null && fCM3R.cnf_planned_overdue!=true && parseInt((dLate-fCM3R.planned_end)/86400000)>0) ? true:false;
  if (bLate) {
    print(fCM3R.number+" - "+fCM3R.current_phase+" updated");
    fCM3R.cnf_planned_overdue = true;
    bUpdate = true ; nCount += 1;
  }
  if (bUpdate) {
    fCM3R.doUpdate();
  }
  rRC = fCM3R.getNext();
}
print("Overdue RFCs -> "+nCount);

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