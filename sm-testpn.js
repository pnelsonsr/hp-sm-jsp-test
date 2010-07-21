print("=====================");
print("Start");
print("=====================");

  var sAD="Approval Normal";
//var sAD="Approval Emergency";
//var sAD="Approval Standard";

system.library.cnfcm.ClearAD(sAD);
//system.library.cnfcm.PopulateAD(sAD);

print("=====================");
print("Done");
print("=====================");
