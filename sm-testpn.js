print("=====================");
print("Start");
print("=====================");

var fChange = new SCFile( "cm3r" );
var aCI     = "dcxprap030";
var cTable  = null;
var aFields = new Array("operating.system", "os.version", "bios.id", "network.name", "addlIPAddress", "addlSubnet", "addlMacAddress", "physical.mem.total", "machine.name", "subtype");
var aOldVal = new Array(null, null, null, null, null, null, null, null, null, "server nt");
var aNewVal = new Array("Windows 2003", "5.2.3790", "BDZ1JD1", "dcxprap030", "10.0.11.139", "255.255.255.0", "0019B9EC06B0", 4193264, "dcxprap030", "Windows");
//var aFields = new SCDatum("operating.system", "os.version", "bios.id", "network.name", "addlIPAddress", "addlSubnet", "addlMacAddress", "physical.mem.total", "machine.name", "subtype");
//var aOldVal = new SCDatum(null, null, null, null, null, null, null, null, null, "server nt");
//var aNewVal = new SCDatum("Windows 2003", "5.2.3790", "BDZ1JD1", "dcxprap030", "10.0.11.139", "255.255.255.0", "0019B9EC06B0", 4193264, "dcxprap030", "Windows");
var cAct    = "update";
var cFID    = null;

var test = true;
//var test = false;

//------------------------------
// start of actual code
//------------------------------

  var cSubmitter   = "user, ucmdb"; 
  var cOriginator  = "user, ucmdb"; 
  var cType        = "Unplanned";
  var cPhase       = "Open"; 
  var cTitle       = "";
  var aDescription = "Attribute\t\t\tNew Value\t\t\tOld Value\n---------\t\t\t---------\t\t\t---------\n";
  var cPriority    = "1"; /* low */
  var cImpact      = "1"; /* low */
  var cRisk        = "1"; /* low */
  var aInterupSvc  = "N/A";
  var dPlanStart   = system.functions.tod();
  var dActualStart = dPlanStart;
  var aImplPlan    = "Change occurred outside of CM process";
  var aBOPlan      = "*** Identified owner must provide backout plan ***";
  var cCABType     = "Team CAB";
  if(cAct == "update") {
    cTitle = system.functions.scmsg (80, "ddmRule", [aCI]);
    for(i=0 ; i<aFields.length ; i++) {
      aDescription = aDescription + aFields[i] + "\t\t\t" + aNewVal[i] + "\t\t\t" + aOldVal[i] + "\n";
    }
    //ajFields=aFields.toArray(); ajNewVal=aNewVal.toArray(); ajOldVal=aOldVal.toArray();
    //for(i=0 ; i<aFields.length ; i++) {
    //  aDescription = aDescription + ajFields[i] + "\t\t\t" + ajNewVal[i] + "\t\t\t" + ajOldVal[i] + "\n";
    //}
  } else if(cAct == "add") {
    cTitle = system.functions.scmsg(81,"ddmRule",[aCI]);
    aDescription = "CI Added";
  } else if(cAct == "delete") {
    cTitle= system.functions.scmsg(82, "ddmRule", [aCI]);
    aDescription = "CI Deleted";
  } else {
    cTitle= system.functions.scmsg(83, "ddmRule", [aCI]);
    aDescription = "Unknown Action";
  }
  fChange.category           = cType;
  fChange.brief_description  = cTitle;
  fChange.priority           = cPriority;
  fChange.orig_operator      = cSubmitter;
  fChange.requested_by       = cOriginator;
  fChange.current_phase      = cPhase;
  fChange.description[0]     = aDescription;
  fChange.impact             = cImpact;
  fChange.risk               = cRisk;
  fChange.assets[0]          = aCI;
  fChange.outage_comments[0] = aInterupSvc;
  fChange.planned_start      = dPlanStart;
  fChange.cnf_actual_start   = dActualStart;
  fChange.plan[0]            = aImplPlan
  fChange.backout_method[0]  = aBOPlan;
  fChange.cnf_cab_type       = cCABType;

//------------------------------
// end of actual code
//------------------------------

if(test) {
  print("-------------------------------------------");
  print("fChange -> " + fChange);
  print("aCI     -> " + aCI);
  print("cTable  -> " + cTable);
  print("aFields -> " + aFields);
  print("aOldVal -> " + aOldVal);
  print("aNewVal -> " + aNewVal);
  print("cAct    -> " + cAct);
  print("cFID    -> " + cFID);
  print("-------------------------------------------");
  print("aFields.length -> " + aFields.length);
  print("-------------------------------------------");
  print("cType        -> " + cType);
  print("cTitle       -> " + cTitle);
  print("cPriority    -> " + cPriority);
  print("cSubmitter   -> " + cSubmitter);
  print("cOriginator  -> " + cOriginator);
  print("cPhase       -> " + cPhase);
  print("aDescription -> " + aDescription);
  print("cImpact      -> " + cImpact);
  print("cRisk        -> " + cRisk);
  print("aInterupSvc  -> " + aInterupSvc);
  print("dPlanStart   -> " + dPlanStart);
  print("dActualStart -> " + dActualStart);
  print("aImplPlan    -> " + aImplPlan);
  print("aBOPlan      -> " + aBOPlan);
  print("cCABType     -> " + cCABType);
  print("-------------------------------------------");
}

print("=====================");
print("Done");
print("=====================");
