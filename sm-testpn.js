print("=====================");
print("Start");
print("=====================");

//--------------------------
// Test Variable Assignment
//--------------------------
//cRFC = "CM0000268"; /* zero CIs       */
  cRFC = "CM0000267"; /* one CI         */
//cRFC = "CM0000266"; /* two CIs        */
//cRFC = "RC9999999"; /* Bad RFC Number */

  var fAssignment = new SCFile( "assignment" );
  print("result 1 -> " + fAssignement);
  sql = "contact.name = \"" + fChange.orig_operator +"\"";
  var rc = fOperator.doSelect( sql );
  if(rc == RC_SUCCESS) {
    print("result 3b -> " + fOperator.name);
    print("result 3c -> " + fOperator.profile_change);
    for( i=0 ; i<fOperator.profile_change.length() ; i++ ) {
      if(fOperator.profile_change[i] != null) {
        print("result 3d"+i+" -> " + fOperator.profile_change[i]);
      }
    }
  } else {
    print("Failed")
  }



print("=====================");
print("Done");
print("=====================");
