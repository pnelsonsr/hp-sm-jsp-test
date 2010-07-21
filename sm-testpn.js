print("=====================");
print("Start");
print("=====================");

var d1 = new Date(); 
var d2 = new Date();

d1="03/23/09 13:22:11";
d2="03/24/09 10:20:10";

print("d1 -> " + d1);
print("d2 -> " + d2);

print("=====================");

result = system.library.cnfcm.Duration(d1,d2);
print("result 1 -> " + result);

print("=====================");
print("Done");
print("=====================");
