const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module to handle file paths.
const { initializeApp } = require('firebase/app'); // Import the initializeApp function
const firebaseConfig = require('./secrets/firebaseConfig'); // Path to your Firebase config file
// Using CommonJS syntax to import necessary functions
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getIdToken } = require('firebase/auth');

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

app.use(bodyParser.urlencoded({ extended: true }));

// Define the static file directory (public) before defining routes.
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  // Display the login form
  res.sendFile(__dirname + '/index.html');
});

app.get('/register', (req, res) => {
  // Display the login form
  res.sendFile(__dirname + '/signUpFirebase.html');
});

app.get('/forgotpassword', (req, res) => {
  // Display the login form
  res.sendFile(__dirname + '/forgotPassword.html');
});


app.post('/register', (req, res) => {
  // Access the form data
  const email = req.body.email;
  const password = req.body.password;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User signed up successfully
    const user = userCredential.user;
    // console.log(user)
    console.log(" Creation of the new user is successful.")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(error)

  });

});

app.post('/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user)
      console.log("Login of the user is successful.");
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(error);
      return false;
    });
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});











// var firebase = window.firebase;

// // Initialize Firebase
// firebase.initializeApp({
//   // Your Firebase configuration goes here
// });

// // Get the login button
// var loginButton = document.getElementById('login-button');

// // Add an event listener to the login button
// loginButton.addEventListener('click', function() {
//   // Get the email and password from the input fields
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;

//   // Sign in the user with email and password
//   firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
//     // The user has successfully signed in
//     // Redirect the user to the main page of your application
//     window.location.href = 'main.html';
//   }).catch(function(error) {
//     // The user failed to sign in
//     // Show an error message to the user
//     alert(error.message);
//   });
// });
