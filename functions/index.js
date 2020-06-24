const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const usersCollection = db.collection("queue");

exports.request = functions.https.onCall(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', '*');   
    if (request.method === 'OPTIONS') {
        response.end();
    }
    else {
        const user = request.query.text;
        const writeResult = await admin.firestore().collection('queue').add({user: user})
        .then(snapshot => {
            response.status(200).send({status: 200, message: `Thank you for joining the stream ${user}`});
        });
        response.json({result: `Streamer with the ID; ${writeResult.user} added to the queue.`});
    }
});

exports.myUppercaseFunction = functions.https.onCall(async (data, context) => {
    console.log(data.coolMsg);
    const user = data.coolMsg;
    const writeResult = await admin.firestore().collection('queue').add({user: user})
    .then(snapshot => {
        return response.status(200).json({
            message: 'Email sent succesfully.'
        })
    });
  });


//Executes when the cloud firestore is written to, its going to add the time stamp 
exports.assignMatchTime = functions.firestore.document('/queue/{userId}')
    .onCreate((snap, context) => {
        const userId = context.params.userId;
        const user = snap.after.data();


        //I can access the parameter {userId} with 'context.params'
        console.log('Adding the time variable to ', context.params.user, user);

        var date = user.toUpperCase();

        return snap.ref.parent.child(userId).set(date);

    });



exports.scheduledMatchUpdateV2 = functions.pubsub.schedule('*/5 * * * *').onRun(async (context) => {
    const db = admin.firestore();
    var date = new Date();
    //once we figure this out, we can compare the invididuals join date to hte server time to decide if their in the queue.
    timeNow = date.getMinutes();
    const batch = db.batch();
    let currentQueue = db.collection('queue');
    currentQueue.get().then(function(querySnapshot) {
        if (!querySnapshot.empty){
            querySnapshot.forEach(function(doc) {
                let docData = doc.data();
                if (docData.time == 30 || docData.time == 0);
                {
                 console.log("time equals correctly");
                }
                console.log(doc.id, ' => ', doc.data());
                const matchLobby = db.doc(`match/${docData.user}`);
                batch.set(matchLobby, doc.data());
                // Could we add more parameters here, or should we wait.. also how do we 
                // make a new collection
                //batch.delete(doc.data());
        });
        return batch.commit();
        }
    })
    .catch(err => {
        return Promise.reject(err);
    })
});
