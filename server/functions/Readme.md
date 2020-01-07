There are Firebase's functions that provide the REST API to add
events to a google calendar.

Prerequisites:
--------------

It depends on a file `credentials.json` that contains credentials to
access a Google Calendar, the project's database, etc. Please, see the
article
https://medium.com/@smccartney09/integrating-firebase-cloud-functions-with-google-calendar-api-9a5ac042e869
for details

Deployment:
-----------

One has to create a Firebase project and a new application. Then he
has to add code from the index.js to that application and to deploy it
inside Firebase with the command

```
firebase deploy --only functions
```

Then an administrator must create the record `authToken` in a realtime
database and put here a very secure password. See the `auth` field in
the events.json below.

Usage:
------

After deployment, the function will be available by the URL
https://$APPNAME.cloudfunctions.net/addEventsToDatabase

And could be used via REST API, for instance, like:

```
$ curl -i -X POST -H "Content-Type:application/json"  -d @./events.json https://$APPNAME.cloudfunctions.net/addEventsToDatabase
```

where the `events.json` file contains events data:

```
{
    "auth": "Str0ng!paSSw0rt",
    "events": [
        {
            "eventID": "423",
            "eventName": "An event №1",
            "description": "An short description.",
            "startTime": "2020-01-06T16:00:00",
            "endTime": "2020-01-06T16:30:00"
        },
        {
            "eventID": "424",
            "eventName": "An event №2",
            "description": "Another short description.",
            "startTime": "2020-01-06T16:00:00",
            "endTime": "2020-01-06T16:30:00"
        },
        {
            "eventID": "425",
            "eventName": "An event №3",
            "description": "Yet another description.",
            "startTime": "2020-01-06T16:00:00",
            "endTime": "2020-01-06T16:30:00"
        }
    ]

}

```

It relies on an `eventID` to search for an event in the
database. Therefore, this ID should be unique.

Restrictions and limitations:
----------------------------

Currently, it can only add new events. Deletion and updating are not
supported yet.
