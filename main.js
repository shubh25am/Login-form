const express = require('express')
const session = require('express-session')
const fs = require('fs')
const app = express()
const port = 3000

app.use( express.static("public") )
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() )

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.get('/', (req, res) => {
	res.sendFile( __dirname + "/public/home.html" );
})

app.get('/auth', (req, res) => {
   req.session.is_logged_in ? 
   res.redirect("/logout") : 
   res.redirect("/login");
})

app.route('/login').get( (req, res) => {
   res.sendFile( __dirname + "/public/login.html" );
})
.post( (req,res) => {
   fs.readFile( "data.txt" , "utf-8" , (err,data) => {
      if( err ) return ;
      data = JSON.parse( data );
      req.session.is_logged_in = data[ req.body.email ].name;
      res.redirect( '/' );
   })
})

app.route('/signIn').get( (req, res) => {
   res.sendFile( __dirname + "/public/sign.html" );
})
.post( (req, res) => {
   fs.readFile( "data.txt" , "utf-8" , (err, data) => {
      if( err ) return ;
      let users_data = data ? JSON.parse( data ) : {};
      users_data[ req.body.email ] = {
         name: req.body.user_name,
         password: req.body.password
      };
      fs.writeFile( "data.txt" , JSON.stringify( users_data ) , (err) => {
         if( err ) return ;
         req.session.is_logged_in = req.body.user_name;
         res.redirect( '/' );
      })
   })
})

app.get('/getData', (req, res) => {
   fs.readFile( "data.txt", "utf-8" , (err, data) => {
      if( err ) return ;
      data = data ? JSON.parse( data ) : {};
      res.json( data );
   })
})

app.get('/getUser', (req, res) => {
    res.json( req.session.is_logged_in );
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect( '/' );
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})