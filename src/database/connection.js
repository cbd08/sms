const admin=require('firebase-admin');

var serviceAccount = require("../../billetera-201814244-firebase-adminsdk-q2301-5f7aa84ce8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://billetera-201814244-default-rtdb.firebaseio.com/'
})

module.exports={
    admin,
};