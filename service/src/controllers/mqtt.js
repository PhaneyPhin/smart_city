
var mqtt = require('mqtt');
var moment=require('moment');
const MQTT_SERVER = "localhost";
const MQTT_PORT = "1883";
//if your server don't have username and password let blank.
const MQTT_USER = ""; 
const MQTT_PASSWORD = "";
m=moment();
// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});

client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('demo/abcd', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());

});

// setInterval(()=>{
//     m=m.add(1,"hours");
//     var columns= Array.from({length: parseInt(20+"")}, () => Math.floor(Math.random() * 40));
//         var data={};
       
//         data.date=m.unix()*1000;
//         columns.forEach((item,index)=>{
//             data['column'+index]=item;
//         }),
//         client.publish("demo/abcd", JSON.stringify(data));
// },1000);