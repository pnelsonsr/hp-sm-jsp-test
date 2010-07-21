print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------
//cRFC = "CM0000070"; /* zero CIs       */
  cRFC = "CM0000003"; /* one CI         */
//cRFC = "CM0000069"; /* two CIs        */
//cRFC = "RC9999999"; /* Bad RFC Number */

//  bClear=true;
    bClear=false;

    bShow=true;
//  bShow=false;

system.library.cnfcm.GetImpact(cRFC,bClear,bShow)

print("=====================");
print("Done");
print("=====================");
