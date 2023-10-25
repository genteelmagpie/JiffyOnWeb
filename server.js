// Import Statements? - Sorta

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module to handle file paths.
const { initializeApp } = require('firebase/app'); // Import the initializeApp function
const firebaseConfig = require('./secrets/firebaseConfig'); // Path to your Firebase config file
// Using CommonJS syntax to import necessary functions
const { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } = require('firebase/auth');
const { getDatabase, ref, set, push } = require('firebase/database');
const { dataSorter, toTitleCase } = require('./importantFunctions.js');



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

app.use(bodyParser.urlencoded({ extended: true }));

// Define the static file directory (public) before defining routes.
app.use(express.static(path.join(__dirname, '/public')));


// GLOBAL VARIABLES START

let actualDuration, duration = -1;
let startTime, endTime, subject, subCat = "";

// GLOBAL VARIABLES END

// THE GETTING OF WEB PAGES 

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

app.get('/timelogger', (req, res) => {
  // Display the login form
  res.sendFile(__dirname + '/timeLogger.html');
});

app.get('/success', (req, res) => {
  // Display the login form
  res.sendFile(__dirname + '/success.html');
});

app.get('/secrets', (req, res) => {

  const user = auth.currentUser; // Check if the user is logged in

  if (user) {
    // User is signed in, serve the 'secrets.html' page
    res.sendFile(__dirname + '/secrets.html');
    // console.log(user)
    // console.log(user.uid)
    // writeUserData(user.uid, user.email)
  } else {
    // User is signed out, you can handle this as needed, e.g., redirect to the login page
    res.redirect('/');
  }
});



// THE POSTING ON WEB PAGES 

app.post('/register', (req, res) => {
  // Access the form data
  const email = req.body.email;
  const password = req.body.password;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User signed up successfully
    const user = userCredential.user;
    console.log(user)
    console.log(" Creation of the new user is successful.")

    sendEmailVerification(user)
    .then(() => {
      console.log(" Email verification sent.")
    })
    .catch((error) => {
      console.error('Error sending email verification:', error);
    });

    // Send an alert to the client and stay on the current page
    res.send('<script>alert("Account Creation Successful. Welcome!"); window.location.href = "/";</script>');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(error)
  });



});

app.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user)
      console.log("Login of the user is successful.");
      res.redirect('/secrets')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(error);
    });
});

app.post('/forgotpassword', (req, res) => {
  const email = req.body.email;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log(" Reset Email has been sent.")
    res.send('<script>alert("Reset Email has been sent!"); window.location.href = "/";</script>');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(" Reset Email could not be sent.")
    console.log(error)
    // res.send('<script>alert("Sign Out Failed.!"); window.location.href = "/";</script>');
    res.send('<script>alert("Reset Email could not be sent!")</script>');
    
  });
});

app.post('/logout', (req, res) => {

  signOut(auth).then(() => {
    res.redirect("/")
  }).catch((error) => {
    res.send('<script>alert("Sign Out Failed.!"); window.location.href = "/";</script>');
  });
});

// app.post('/timelogger', (req, res) => {
  
//   const obj = dataSorter(req.body)
//   const stuts = DatabaseWrite(obj)
//   console.log(stuts)
//   if (stuts === true){
//     res.send('<script>showSuccessMessageAndRedirect();</script>');
//   }else{
//     console.log(" Failed to successfully post your data.")
//   }
// });


function DatabaseWrite(payload) {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser; // Check if the user is logged in
    if (user) {
      const studyLogListRef = ref(db, `studyLogs/${user.uid}`);
      const newPostRef = push(studyLogListRef);

      set(newPostRef, payload)
        .then(() => {
          console.log('Data updated successfully');
          resolve(true); // Resolve the Promise with true on success
        })
        .catch((error) => {
          console.error('Data update error:', error);
          reject(false); // Reject the Promise with false on error
        });
    } else {
      console.log("User is not signed in.");
      reject(false); // Reject the Promise if the user is not signed in
    }
  });
}

app.post('/timelogger', (req, res) => {
  const obj = dataSorter(req.body);

  DatabaseWrite(obj)
    .then((stuts) => {
      console.log(stuts);
      if (stuts === true) {
        res.send('<script>showSuccessMessageAndRedirect();</script>');
      } else {
        console.log("Failed to successfully post your data.");
        // Handle the error as needed
      }
    })
    .catch((error) => {
      console.error("Failed to successfully post your data:", error);
      // Handle the error as needed
    });
});


auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, you can redirect them to 'secrets.html' or do other actions.
    console.log('User is signed in');
    // You can also use `res.redirect('/secrets')` here if needed.
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});



// DATABASE MANAGEMENT START

function writeUserData(userId, email) {
  set(ref(db, 'users/' + userId), {
    email: email,
  });
  console.log(" Wrote the data.")
}

// function DatabaseWrite(payload){
  
//   const user = auth.currentUser; // Check if the user is logged in
//   if (user) {
//     // User is signed in, serve the 'secrets.html' page
//     const studyLogListRef = ref(db, `studyLogs/${user.uid}`);
//     const newPostRef = push(studyLogListRef)
//     set(newPostRef, payload)
//     .then(() => {
//       console.log('Data updated successfully');
//       return true;
//     })
//     .catch((error) => {
//       console.error('Data update error:', error);
//       return false;
//     });
// }};


// function DatabaseWrite(payload) {
//   return new Promise((resolve, reject) => {
//     const user = auth.currentUser; // Check if the user is logged in
//     if (user) {
//       const studyLogListRef = ref(db, `studyLogs/${user.uid}`);
//       const newPostRef = push(studyLogListRef);

//       set(newPostRef, payload)
//         .then(() => {
//           console.log('Data updated successfully');
//           resolve(true); // Resolve the Promise with true on success
//         })
//         .catch((error) => {
//           console.error('Data update error:', error);
//           reject(false); // Reject the Promise with false on error
//         });
//     } else {
//       console.log("User is not signed in.");
//       reject(false); // Reject the Promise if the user is not signed in
//     }
//   });
// }



// DATABASE MANAGEMENT END




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
