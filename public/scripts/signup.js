function myFunction() {
  var x1,x2,y,z, text_1,text_1_1,text_2,text_3,text_4,count,email;

  // Get the value of the input field with id="numb"
  x1 = document.getElementById("first-name").value;
  x2 = document.getElementById("last-name").value;
  y = document.getElementById("password").value;
  z = document.getElementById("username").value;
  email = document.getElementById("email").value;
  
  count = 0;
  // If x is Not a Number or less than one or greater than 10

 if(x1.length == 0){
	 text_1 ="first name cannot be empty";
	 count++;
	 document.getElementById("firstName").innerHTML = text_1;
 }
	if(x2.length == 0){
	 text_1_1 ="last name cannot be empty";
	 count++;
	 document.getElementById("lastName").innerHTML = text_1_1;
 }
 if(y.length == 0){
	 text_2 ="password cannot be empty";
	 count++;
	 document.getElementById("Password").innerHTML = text_2;
 }
 if(z.length == 0){
	 text_3 ="username cannot be empty";
	 count++;
	 document.getElementById("userName").innerHTML = text_3;
 }
 if(email.length == 0){
	 text_4 ="email cannot be empty";
	 document.getElementById("email").innerHTML = text_4;
 }
 if(count == 0){
	 document.getElementById("success").innerHTML = "All inputs valid";
 }
}

function showFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}