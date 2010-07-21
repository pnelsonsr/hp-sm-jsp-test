print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

print("-----------------");

if (!system.functions.gui()) {
  if (record.approval_status="approved") {
    var getchange = new SCFile("cm3r");
    var query ="number=\""+record.unique_key+"\"";
    var rc = getchange.doSelect(query);
    if (rc==RC_SUCCESS) {
      if (getchange.current_phase== "Pending Acceptance" || getchange.current_phase== "Pending Approval") {
        getchange.doAction("close");
      } else {
        print("DEBUG: Incorrect Phase")
      }
    } else {
      print("ERROR: No Change for Approval found")
    }
  }
}

print("-----------------");
 

print("=====================");
print("Done");
print("=====================");
