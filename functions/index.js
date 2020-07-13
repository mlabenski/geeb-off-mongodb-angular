const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const usersCollection = db.collection("queue");


function time(minutes) {
    if (minutes>29) {
        return 0;
    }
    else {
        return 30;
    }
}

exports.request = functions.https.onCall(async (data, context) => {
    const user = data.user;
    var date = new Date();
    var dateJoined = time(date.getMinutes());
    if(!(typeof user === 'string') || user.length === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'one arguments "text" containing the message text to add.');
    }
    return await admin.firestore().collection('queue').add({
        user: user,
        timeJoined: dateJoined,
        round: 0
    }).then(() => {
        console.log('User added to the queue');
        return {user: user, timeJoined: dateJoined, round: 0};
    });
});




exports.scheduledMatchUpdateV2 = functions.pubsub.schedule('*/5 * * * *').onRun(async (context) => {
    const db = admin.firestore();
    var date = new Date();
    //once we figure this out, we can compare the invididuals join date to hte server time to decide if their in the queue.
    timeNow = date.getMinutes();
    let batch = db.batch();
    let queueBatch = db.batch();
    let currentQueue = db.collection('queue');
    currentQueue.get().then(function(querySnapshot) {
        if (!querySnapshot.empty){
            querySnapshot.forEach(doc => {
                let docData = doc.data();
                if (docData.time == 30 || docData.time == 0);
                {
                 console.log("time equals correctly");
                }
                console.log(doc.id, ' => ', doc.data());
                const matchLobby = db.doc(`match/${docData.user}`);
                batch.set(matchLobby, doc.data());
                db.collection('queue').doc(doc.id).delete();
        });
        return batch.commit();
        }
    })
    .catch(err => {
        return Promise.reject(err);
    })
});

exports.changePlayer = functions.pubsub.schedule('*/1 * * * *').onRun(async (context) => {
    const db = admin.firestore();
    let lobbyDB = db.collection('match');
    let currentPlayerDB = db.collection('currentPlayer');
    let batch = db.batch();
    lobbyDB.get().then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
            let docData = doc.data();
            if (docData.round == 0){
                //console.log(`found a ${docData.user} user that is now up! `)
                const currentPlayer = db.doc(`currentPlayer/${docData.user}`);
                batch.set(currentPlayer, doc.data());
                return batch.commit().then(function() {
                    console.log("added a new player");
                    return null;
                });
                //return db.collection('match').doc(doc.id).update({round: 2});
                //return batch.commit();
            }
        })
    })
});