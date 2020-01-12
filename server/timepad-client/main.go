package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
)

var debug = false
var secret string
var calendarURL string
var timepadURL string

type Event struct {
	Id string `json:"eventID"`
	Name string `json:"eventName"`
	Description_short string `json:"description"`
	Starts_at string `json:"startTime"`
	Ends_at string `json:"endTime"`
}

type Events struct {
	Auth string `json:"auth"`
	Events []Event `json:"events"`
}

func event2json(events Events) []byte {
	data, err := json.Marshal(&events)
	if (err != nil) {
		log.Println("Can not convert event to json")
		log.Println(err)
	}
	if (debug) {log.Println("data2: " + string(data))}
	return data
}

func addEvents2Calendar(data []byte) *http.Response{
	req, err := http.NewRequest("POST", calendarURL, bytes.NewBuffer(data))
	if (err != nil) {
		log.Fatalln(err)
	}
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Can't add an event to a calendar")
		log.Fatalln(err)
	}
	return resp
}

func AddEvent(events chan Event, done chan int, wg *sync.WaitGroup) {
	defer wg.Done()
	if (debug) {log.Println("AddEvent")}
	var payload Events
	payload.Auth = secret
	for {
		select {
		case event := <-events:
			payload.Events = append(payload.Events, event)
		case <-done:
			if (len(payload.Events) > 0){
				data := event2json(payload)
				resp := addEvents2Calendar(data)
				defer resp.Body.Close()
				log.Println(resp.Status)
			}
			return
		}
	}
}

func makeEvent(data map[string]interface{}) Event {
	if (debug) {log.Println("makeEvent: " + data["name"].(string))}
	return Event{
		Id: fmt.Sprintf("%.0f", data["id"].(float64)),
		Name: data["name"].(string),
		Description_short: data["description_short"].(string),
		Starts_at: data["starts_at"].(string),
		Ends_at: data["ends_at"].(string),
	}
}

func GetEvent(EventID string, wg *sync.WaitGroup, events chan Event) {
	defer wg.Done()
	url := timepadURL + "/" + EventID
	if (debug) {log.Println("GetEvent: " + url)}

	resp, err := http.Get(url)
	if err != nil { log.Fatalln(err) }
	defer resp.Body.Close()

	var ev map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&ev)
	events <- makeEvent(ev)
}

func GetEvents(OrgID string, wg *sync.WaitGroup, events chan Event) {
	defer wg.Done()

	url := timepadURL + "?organization_ids=" + OrgID
	if (debug) {log.Println("GetEvents: " + url)}

	resp, err := http.Get(url)
	if err != nil {log.Fatalln(err)}
	defer resp.Body.Close()

	var result map[string] interface{}
	json.NewDecoder(resp.Body).Decode(&result)

	for _, event := range result["values"].([]interface{}) {
		EventID := fmt.Sprintf("%.0f", event.(map[string] interface{})["id"].(float64))
		wg.Add(1)
		go GetEvent(EventID, wg, events)
	}
}

func getEnv(key, fallback string) string {
    if value, ok := os.LookupEnv(key); ok {
        return value
    }
    return fallback
}

func prepareArgs() (bool, string, string, string){
	debug := flag.Bool("d", false, "debug")
	timepadURL := getEnv("TIMEPAD_URL", "https://api.timepad.ru/v1/events")
	flag.StringVar(&timepadURL, "t", timepadURL, "a URL of the timepad API")
	calendarURL := getEnv("CALENDAR_URL", "https://us-central1-tost-766cf.cloudfunctions.net/addEventsToDatabase")
	flag.StringVar(&calendarURL, "c", calendarURL, "a URL of the API to add events to a Google Calendar")
	secret := getEnv("SECRET", "")
	flag.StringVar(&secret, "s", secret, "a secret token")
	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, "Usage of timepad-client: timepad-client [options] orgID1 [orgID2 orgID3 .. orgIDN]\n")
		flag.PrintDefaults()
	}
	flag.Parse()
	return *debug, timepadURL, calendarURL, secret
}

func main() {
	debug, timepadURL, calendarURL, secret = prepareArgs()
	if(debug) {log.Println(debug, timepadURL, calendarURL, secret)}
	organizations := flag.Args()
	var wgGet, wgPost sync.WaitGroup
	events := make(chan Event, 100)
	done := make(chan int)
	wgPost.Add(1)
	go AddEvent(events, done, &wgPost)
	for _, orgID := range organizations {
		if (debug) {log.Println("orgID:" + orgID)}
		wgGet.Add(1)
		go GetEvents(orgID, &wgGet, events)
	}

	wgGet.Wait()
	if(debug) {log.Println("GetEvents has finished")}
	done <- 0
	wgPost.Wait()
}
