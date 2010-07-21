print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------

print("-----------------");
var sSay; var sTemplate;
fTemplate = new SCFile("Template");
rRC=fTemplate.doSelect(new QueryCond("tablename", EQ, "cm3r")); 
while (rRC == RC_SUCCESS) 	{
  sTemplate = fTemplate.name;
  print("# "+sTemplate);
  for(i=0 ; i<fTemplate.templateInfo.length() ; i++) {
    if(fTemplate.templateInfo[i].field=="cnw.template.used") {
      //print(fTemplate.templateInfo[i].field+" = "+fTemplate.templateInfo[i].value);
      if(fTemplate.templateInfo[i].value==null ) {
        fTemplate.templateInfo[i].value=sTemplate;
        sSay="+ "
      } else {
        sSay="- "
      }
      //print(sSay+fTemplate.templateInfo[i].field+" = "+fTemplate.templateInfo[i].value);
      //print(fTemplate.templateInfo[i].value);
      print(sSay+fTemplate.templateInfo[i].value);
    }
  }  
  fTemplate.doUpdate();  
  rRC = fTemplate.getNext();
}
 

print("=====================");
print("Done");
print("=====================");
