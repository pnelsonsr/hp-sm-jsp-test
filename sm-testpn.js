print("=====================");
print("Start");
print("=====================");

var aCIUS = new Array();

iRI=0 ; iLI=1 ; iLvl=1; 

aCIUS[iRI]=[iLvl];
print("aCIUS -> " + aCIUS);
aCIUS[iRI][iLI]="Test Sys 1";
print("aCIUS -> " + aCIUS);

iRI=1 ; iLI=1 ; iLvl=2; 

aCIUS[iRI]=[iLvl];
print("aCIUS -> " + aCIUS);
aCIUS[iRI][iLI]="Test Sys 2";
print("aCIUS -> " + aCIUS);

print("aCIUS.length -> " + aCIUS.length);

print("==================");

iRI=0;
for(iLI=0 ; iLI<aCIUS.length ; iLI++) {
  print("aCIUS[" + iRI + "][" + iLI + "] -> " + aCIUS[iRI][iLI]);
}

print("==================");

iLI=1;
for(iRI=0 ; iRI<aCIUS.length ; iRI++) {
  print("aCIUS[" + iRI + "][" + iLI + "] -> " + aCIUS[iRI][iLI]);
}


print("=====================");
print("Done");
print("=====================");
