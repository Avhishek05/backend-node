var serviceAccount = require("./react-slack-clone-930f1-firebase-adminsdk-daw0p-62aae08dfd.json");
var admin = require("firebase-admin");

try {
	admin.app();
  console.log("callled")
} catch(e) {
  console.log("callled, e", e)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-slack-clone-930f1.firebaseio.com"
  
  });
}

  exports.admin = admin;
