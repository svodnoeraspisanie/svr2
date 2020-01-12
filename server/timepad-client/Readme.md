There is the client that utilizes the firebase functions to add an
event from Timepad to a Google Calendar.

INSTALL
=======

A user has to have correctly configured Go environment.
The usual commands:

`go get github.com/yasn0st/svr2`

or

`go get github.com/yasn0st/svr2@mvp2`

works as well.

If a user doesn't have a Go environment he can use Docker as
```
docker run --rm -v "/tmp:/go/bin" golang /bin/bash -c "GO111MODULE=on go get github.com/yasn0st/svr2/server/timepad-client@mvp2"
```

Afterward he can find the executable file in /tmp/timepad-client.

USAGE
=====

A user has to specify the secret (same as `authToken` in
(Deployment)[../functions/Readme.md#Deployment]), and the URL of the
Firebase functions to add events to a Google Calendar:

```
timepad-client -s "Str0ng!paSSw0rt" -c "https://project.cloudfunctions.net/addEventsToDatabase"
```

There is the '-d' flag for a debug reason and also the program can take
values from Environment Variables: TIMEPAD\_URL, CALENDAR\_URL and
SECRET.
