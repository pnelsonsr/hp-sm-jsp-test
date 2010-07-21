print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

//dMyDate1=system.functions.tod();
//dMyDate2=system.functions.date(system.functions.tod() + '1 00:00:00'); 

print("-----------------");

fChange = new SCFile("cm3r");
fChange.doSelect("number = \"CM0004640\"");


  dNow         = new XMLDate(new Date());
  dPlanStart   = dNow.getDatum();
  dNow.addDuration("PT1H");
  dPlanEnd     = dNow.getDatum(); 
  dActualStart = dPlanStart
  dActualEnd   = dPlanEnd

fChange.planned_start=dActualStart;
print( "dActualStart: \n" + dActualStart);
fChange.planned_end=dActualEnd;
print( "dActualEnd: \n"+ dActualEnd);
fChange.doUpdate();
print("start -> "+fChange.planned_start);
print("end   -> "+fChange.planned_end);






//print( "Creating XMLDate object..." );
//var d = new XMLDate( new Date() );
//var dStart = d.getDatum();
//fChange.planned_start=d.getDatum();

//print( "The value of the new XMLDate object is: \n" + d.getDatum() );


//print( "Adding 0 year, 0 months, 0 days, and 1 hours to date..." );
//d.addDuration( "PT1H" );
//var dEnd = d.getDatum();
//fChange.planned_end=d.getDatum();
//print( "The value of the new XMLDate object is: \n"+ d.getDatum() );

//fChange.doUpdate();
//print("start -> "+fChange.planned_start);
//print("end   -> "+fChange.planned_end);

//dMyDate1=system.functions.date(dur.getSCDateTimeString());

//print("my date 1 -> "+dMyDate1);
//print("my date 2 -> "+dMyDate2);


print("=====================");
print("Done");
print("=====================");
