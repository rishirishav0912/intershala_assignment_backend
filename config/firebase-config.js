// Importing the Firebase Admin SDK
const admin = require("firebase-admin");

// Importing the service account credentials
const serviceAccount = require("./serviceAccount.json");

// Initializing the Firebase Admin SDK with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Exporting the initialized Firebase Admin SDK
module.exports = admin
