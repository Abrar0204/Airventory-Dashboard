//getting express pack and intitializing
const express = require("express");
const app=express();

//getting body-parser to parse data from ejs files
const bodyParser=require("body-parser");

//getting firebase SDK and initializing it
const admin = require('firebase-admin');
const securityKey='./sihairventory-firebase-adminsdk-j6gdp-a187a78003';
let serviceAccount = require(securityKey);
// const projectID="sihairventory";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sihairventory.appspot.com"
});
const db = admin.firestore();

// const {Storage} = require('@google-cloud/storage');
// const stroage = new Storage({keyFilename:securityKey});

//preliminary steps
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//getting reference to database
let eqRef = db.collection('equipmentData');
let techRef = db.collection('technicianData');
// const bucketName = "sihairventory.appspot.com" ;
var equipment={};

//seeting up routes

/* admin.storage().bucket().get().then(snapshot => {
  console.log(snapshot);
}) */

//index route
app.get("/",(req,res)=>{

  res.redirect("/inventory");

});

app.get("/technician",(req,res)=>{

  // res.render("technician");
  techRef.get().then(snapShot=>{

    // console.log(snapshot);
    //rendering inventory page and sending the data from database to the inventory page
    res.render("technician",{techData:snapShot});

  }).catch(err=>{

    console.log(err);

  });

});

app.get("/inventory",(req,res)=>{
  
  eqRef.get().then(snapshot=>{

    //rendering inventory page and sending the data from database to the inventory page
    res.render("index",{docData:snapshot});

  }).catch(err=>{

    console.log(err);

  });

  /* eqRef.onSnapshot(
    (querysnapshot) =>{

      res.render("index",{docData:querysnapshot});

    }); */

});


app.get("/inventory/new",(req,res)=>{
  
  res.render("addEquipment");

});

app.get("/technician/new",(req,res)=>{
  
  res.render("addTechnician");

});

app.post("/inventory",(req,res)=>{

  //converting date to timestamp format
  var date = new Date(req.body.dateOfInstallation+"T00:00:00");
  var timestamp = admin.firestore.Timestamp.fromDate(date);

  //storing data from form into equipment
  equipment = req.body.equipment;

  //adding timestamp and shelved to the equipment data
  equipment.dateOfInstallation = timestamp;
  equipment.shelved=false;

  //adding equipment data to the database
  let setDoc = eqRef.doc(equipment.qrNumber).set(equipment);

  //redirecting to inventory page
  res.redirect("/");

});

app.post("/technician",(req,res)=>{


  //storing data from form into equipment
  technician = req.body.technician;


  //adding equipment data to the database
  let setDoc = techRef.doc(technician.name).set(technician);

  //redirecting to inventory page
  res.redirect("/technician");

});

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
/* const accountSid = 'AC09502be0dae97ce7347595b83040825b';
const authToken = '5cd9de7124a5692e7b1107a210ebf0fb';
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+91 9962641833 ',
         from: '+91 8939051299'
       })
      .then(call => console.log(call.sid)
      .catch(err => console.log('OOPS'))
      );

      app.post('/voice', (request, response) => {
        // Use the Twilio Node.js SDK to build an XML response
        const twiml = new VoiceResponse();
      
        // Use the <Gather> verb to collect user input
        const gather = twiml.gather({ numDigits: 1 });
        gather.say('For sales, press 1. For support, press 2.');
      
        // If the user doesn't enter input, loop
        twiml.redirect('/voice');
      
        // Render the response as XML in reply to the webhook request
        response.type('text/xml');
        response.send(twiml.toString());
      });
      
      // Create an HTTP server and listen for requests on port 3000
      console.log('Twilio Client app HTTP server running at http://127.0.0.1:3000');
//setting up Port and IP */
/* app.listen(5000,()=>{
  console.log("Server Started");
}); */

app.listen(process.env.PORT,process.env.IP,()=>{
  console.log("Server Started");
});

