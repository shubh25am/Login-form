var form = document.getElementById( "form" );
var button = document.getElementById( "login" );
var email = document.getElementById( "email" );
var password = document.getElementById( "password" );
var error = document.getElementById( "error" );

button.addEventListener( 'click' , () => {
    var data = {
       email : email.value,
       password : password.value
    }
    if( data && data.password ){
       makeGetRequest( data, () => {
          form.submit();
       })
    } else putMessage( 0 );
})

function makeGetRequest( user_data , callback ){
    var request = new XMLHttpRequest();
    request.open( "GET" , "/getData" );
    request.send();

    request.addEventListener( 'load', () => {
       if( request.status === 200 ){
          var data = JSON.parse( request.responseText );
          if( data[ user_data.email ] ){
              data[ user_data.email ].password === user_data.password ?
              callback() :
              putMessage( 150 );
          } else putMessage( 100 );
       }
    })
}

function putMessage( status ){
    error.innerText = status === 0 ? 
                      "Please fill the form appropriatly" :
                      status === 100 ?
                      "Account doesn't exist" :
                      "Invalid email or password";
    clearAllInputs();
}

function clearAllInputs(){
    email.value = "";
    password.value = "";
}