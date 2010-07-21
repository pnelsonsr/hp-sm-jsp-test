print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

var aAL   = new Array("CII CRM Application Ownership Team","MWW European IT Support Team","Con-way EDI Team","EBI-Core Team");
var aIAGS = new Array("CII","IT ","MWW","Con-way","EBI-Core");
var aCAGS = new Array();

  for(i=0 ; i<aAL.length ; i++) {
    for(j=0 ; j<aIAGS.length ; j++) {
      if( aAL[i].substr(0,aIAGS[j].length) == aIAGS[j].substr(0,aIAGS[j].length) ) {
        aCAGS.push(aIAGS[j]+" CA - "+aAL[i].substring(aIAGS[j].length+1,aAL[i].length));
        break;
      } else {
        sAL=aAL[i];
      }
    }
  }

print("aIAGS -> "+aIAGS);
print("=====================");
for(i=0 ; i<aAL.length ; i++) { 
  print("aAL["+i+"] -> "+aAL[i]); 
}
for(i=0 ; i<aCAGS.length ; i++) { 
  print("aCAGS["+i+"] -> "+aCAGS[i]);
}


/*
var aAL   = new Array("CII CRM Application Ownership Team","MWW European IT Support Team","Con-way EDI Team","EBI-Core Team");
//var aCAGS = new Array("CII CA - ","IT CA - ","MWW CA - ","Con-way CA - ","EBI-Core CA - ");
var aCAGS = new Array();

//print("aCAGS -> "+aCAGS);

var aIAGS = new Array("CII","IT ","MWW","Con-way","EBI-Core");

  for(i=0 ; i<aAL.length ; i++) {
    print("# -> "+aAL[i]+" -> "+i);
    for(j=0 ; j<aIAGS.length ; j++) {
      print("1 -> "+aAL[i].substr(0,aIAGS[j].length)+" == "+aIAGS[j].substr(0,aIAGS[j].length)+" -> "+aIAGS[j].length);
      if( aAL[i].substr(0,aIAGS[j].length) == aIAGS[j].substr(0,aIAGS[j].length) ) {
        aCAGS.push(aIAGS[j]+" CA - "+aAL[i].substring(aIAGS[j].length+1,aAL[i].length));
        print(" $$$$ -> "+aCAGS);
        continue;
      }
    }
  }

print("aIAGS -> "+aIAGS);
for(i=0 ; i<aAL.length ; i++) { 
  print("aAL["+i+"] -> "+aAL[i]); 
}
for(i=0 ; i<aCAGS.length ; i++) { 
  print("aCAGS["+i+"] -> "+aCAGS[i]);
}
*/

/*
var aAL   = new Array("CII CRM Application Ownership Team","MWW European IT Support Team","Con-way EDI Team","EBI-Core Team");
//var aCAGS = new Array("CII CA - ","IT CA - ","MWW CA - ","Con-way CA - ","EBI-Core CA - ");
var aCAGS = new Array();

//print("aCAGS -> "+aCAGS);

var aIAGS = new Array("CII","IT ","MWW","Con-way","EBI-Core");

  for(i=0 ; i<aAL.length ; i++) {
    print("# -> "+aAL[i]+" -> "+i);
    for(j=0 ; j<aIAGS.length ; j++) {
      print("1 -> "+aAL[i].substr(0,aIAGS[j].length)+" == "+aIAGS[j].substr(0,aIAGS[j].length)+" -> "+aIAGS[j].length);
      if( aAL[i].substr(0,aIAGS[j].length) == aIAGS[j].substr(0,aIAGS[j].length) ) {
        aCAGS.push(aIAGS[j]+" CA - "+aAL[i].substring(aIAGS[j].length+1,aAL[i].length));
        print(" $$$$ -> "+aCAGS);
        break;
      }
    }
  }

print("aIAGS -> "+aIAGS);
for(i=0 ; i<aAL.length ; i++) { 
  print("aAL["+i+"] -> "+aAL[i]); 
}
for(i=0 ; i<aCAGS.length ; i++) { 
  print("aCAGS["+i+"] -> "+aCAGS[i]);
}

/*
var aAL   = new Array("CII CRM Application Ownership Team","MWW European IT Support Team","Con-way EDI Team","EBI-Core Team");
var aCAGS = new Array();

var aIAGS = new Array("CII","IT ","MWW","Con-way","EBI-Core");

  for(i=0 ; i<aAL.length ; i++) {
    for(j=0 ; j<aIAGS.length ; j++) {
      if( aAL[i].substr(0,aIAGS[j].length) == aIAGS[j].substr(0,aIAGS[j].length) ) {
        aCAGS.push(aIAGS[j]+" CA - "+aAL[i].substring(aIAGS[j].length+1,aAL[i].length));
        break;
      }
    }
  }

print("aIAGS -> "+aIAGS);
for(i=0 ; i<aAL.length ; i++) { 
  print("aAL["+i+"] -> "+aAL[i]); 
}
for(i=0 ; i<aCAGS.length ; i++) { 
  print("aCAGS["+i+"] -> "+aCAGS[i]);
}
*/

/*
var aIAGS = new Array("CII","IT ","MWW","Con-way","EBI-Core");
print(aIAGS[0]+" -> "+aIAGS[0].length);
print(aIAGS[0]+" -> "+aIAGS[0].substring(0,aIAGS[0].length));
*/

print("=====================");
print("Done");
print("=====================");
