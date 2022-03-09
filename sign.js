var form = document.getElementById( "form" );
var user_name = document.getElementById( "name" );
var email = document.getElementById( "email" );
var password = document.getElementById( "password" );
var button = document.getElementById( "signin" );
var error = document.getElementById( "error" );

button.addEventListener( 'click' , () => {
   var user_data = {
     name : user_name.value,
     email : email.value,
     password : password.value
   }

   if( user_data.name && user_data.email && user_data.password ){
      checkData( user_data.email , () => {
         form.submit();
      })
   } else putMessage( 0 );
})

function checkData( email , callback ){
   var request = new XMLHttpRequest();
   request.open( "GET" , "/getData" );
   request.send();

   request.addEventListener( 'load', () => {
      if( request.status === 200 ){
         var response = JSON.parse( request.responseText );
         !response[ email ] ? callback( ) : putMessage( 100 );
      }
   })
}

function putMessage( status ){
   error.innerText = status === 0 ? 
                     "Please fill the form appropriatly" : 
                     "Account already exists"; 
   clearAllInputs();
}

function clearAllInputs(){
   user_name.value = "";
   email.value = "";
   password.value = "";
}