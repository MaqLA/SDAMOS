require("dotenv").config();
const express = require("express");
const https = require("https");
const my_date = require(__dirname + "/my_date.js");
const twilio = require(__dirname + "/twilio.js");

// get body-parser
const app = express();
// use body-parser
app.use(express.static("public"));

const apiKey = process.env.MET_API_KEY;
const halfHour = (1000 * 60) * 30;
const ten = (1000 * 60) * 10;

// forecast data
const {datasetid: set, datacategoryid: cat, locationid: loc, start_date: s, end_date: e} = {
    datasetid: "FORECAST",
    datacategoryid: "GENERAL",
    locationid: "LOCATION:4",
    start_date: `${my_date.todayDashDate()}`, 
    end_date: `${my_date.todayDashDate()}` 
}
let forecastURL =`https://api.met.gov.my/v2.1/data?datasetid=${set}&datacategoryid=${cat}&locationid=${loc}&start_date=${s}&end_date=${e}`;
// Datatype data
let dTypeURL = 'https://api.met.gov.my/v2.1/datatypes';
// Location data
let locationURL = 'https://api.met.gov.my/v2.1/locations?locationcategoryid=STATE';

app.get("/", function(req, res){ 
    res.sendFile(__dirname + "/index.html")
})

app.get("/aware", function(req, res){
    res.sendFile(__dirname + "/aware.html")
})

app.get("/prepared", function(req, res){
    res.sendFile(__dirname + "/prepared.html")
})

app.get("/map", function(req, res){
    res.sendFile(__dirname + "/map.html")
})

app.get("/informed", function(req, res){
    res.sendFile(__dirname + "/informed.html")
})

app.get("/alerts", function(req, res){
    res.sendFile(__dirname + "/alerts.html")
})

app.get("/search", function(req, res){
    res.sendFile(__dirname + "/search.html")
})

// opt-out page

function QuakeCall(){
    // Warning data
    const {datasetid: wset, datacategoryid: wcat, start_date: ws, end_date: we} = {
        datasetid: "WARNING",
        datacategoryid: "QUAKETSUNAMI",
        start_date: `${my_date.todayDashDate()}`,
        end_date: `${my_date.todayDashDate()}`
    }
    let warningURL = `https://api.met.gov.my/v2.1/data?datasetid=${wset}&datacategoryid=${wcat}&start_date=${ws}&end_date=${we}`;
    const options = {
        method: "GET",
        headers: {
            "Authorization" : apiKey
        }
    }
    let apiURL = warningURL;
    https.get(apiURL, options, function(response){
        let apiStatusCode = response.statusCode;
        console.log("--call status code: " + apiStatusCode);
        if(apiStatusCode === 200){
            response.on("data", function(data){
                const apiData = JSON.parse(data);
                let dataCount = apiData.metadata.resultset.count;
                if(dataCount > 0){
                    //console.log(apiData.results);
                    quakeWarningDate = apiData.results[0].date.slice(0,10);
                    quakeWarningValidFrom = apiData.results[0].attributes.valid_from.slice(0,10);
                    quakeWarningTitleEN = apiData.results[0].attributes.title.en;
                    quakeWarningTextEN = apiData.results[0].value.text.en;
                    quakeWarningTextMY = apiData.results[0].value.text.ms;
                    console.log("Data valid from: " + quakeWarningValidFrom);
                    twilio.twilioMessage(quakeWarningTextEN);
                }else {
                    let declaration = "Currently, no declared warnings\n" + my_date.todaySlashDate();
                    console.log(declaration);
                }
            })
        }
    })
}

// Call functions
setInterval(function(){
    //QuakeCall();
}, halfHour)

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on localhost:3000");
})