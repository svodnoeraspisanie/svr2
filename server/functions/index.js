const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

const googleCredentials = require('./credentials.json');

const ERROR_RESPONSE = {
    status: "500",
    message: "There was an error adding an event to your Google calendar"
};
const TIME_ZONE = 'Europe/Moscow';

const functions = require('firebase-functions');

const firebaseConfig = {
  apiKey: "AIzaSyA8KaTBLxgkvklobXObMJrixBYvE0e-beg",
  authDomain: "tost-766cf.firebaseapp.com",
  databaseURL: "https://tost-766cf.firebaseio.com",
  projectId: "tost-766cf",
  storageBucket: "tost-766cf.appspot.com",
  messagingSenderId: "485920202939",
  appId: "1:485920202939:web:2f6cc061f37a4bcd2c099e",
  measurementId: "G-D0EWHFQ8EW"
};


const admin = require('firebase-admin');
const firebase = require('firebase');

admin.initializeApp(firebaseConfig); // database access
firebase.initializeApp(firebaseConfig);

exports.getEventFromDatabase = functions.https.onRequest(async (request, response) => {
    return admin.database().ref('/events/' + request.body.eventID).once('value').then((snapshot) => {
	const event = snapshot.val();
	console.log(event);
	if (event) {
	    response.status(200).send(event);
	} else {
	    response.status(404).send(event);
	}

	return;
    });
});

function sameEvents(event1, event2) {
    return event1.eventName === event2.eventName
	&& event1.description === event2.description
	&& event1.startTime === event2.startTime
	&& event1.endTime === event2.endTime;
}

function addEventToDatabase(event) {
    eventID = event.eventID;
    var record = admin.database().ref('/events/' + eventID)
    return record.once('value').then((snapshot) => {
	const existedEvent = snapshot.val();
	if (existedEvent) {
	    if (!sameEvents(event, existedEvent)) {
		record.update(event);
	    }
	} else {
	    record.set(event);
	}
	return
    });
}

exports.addEventsToDatabase = functions.https.onRequest(async (request, response) => {
    return admin.database().ref('/authToken').once("value") // validate the authToken
	.then((snapshot) => {
	    const trueToken = snapshot.val().toString();
	    if (trueToken === request.body.auth) {
		request.body.events.forEach(addEventToDatabase);
		response.status(200).send("Done!");
	    } else {
		response.status(401).send('Not authenticated!');
	    }
	    return
	})
});

function addEvent(event, auth) {
    return new Promise((resolve, reject) => {
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: {
                'summary': event.eventName,
                'description': event.description,
                'start': {
                    'dateTime': event.startTime,
                    'timeZone': TIME_ZONE,
                },
                'end': {
                    'dateTime': event.endTime,
                    'timeZone': TIME_ZONE,
                },
            },
        }, (err, res) => {
            if (err) {
                console.log('Rejecting because of error');
                reject(err);
            }
            console.log('Request successful');
            resolve(res.data);
        });
    });
}

exports.addEventToCalendar = functions.database.ref('/events/{eventID}')
    .onCreate((snapshot, context) => {
	const event = snapshot.val()

    	const oAuth2Client = new OAuth2(
    	    googleCredentials.web.client_id,
    	    googleCredentials.web.client_secret,
    	    googleCredentials.web.redirect_uris[0]
    	);
	oAuth2Client.setCredentials({
    	    refresh_token: googleCredentials.refresh_token
    	});
	addEvent(event, oAuth2Client)
	    .then(data => {
		console.log('An event ' + event.eventName + ' has added.')
		return;
	    })
	    .catch(err => {
		console.error(err);
		return;
	    })
	return 0;
    });
