import './LoadEnv'; // Must be the first import
import app from './Server';
import { logger } from './shared';
import { Server } from 'http';
import moment from 'moment';
import { loggers } from 'winston';
import {server as webSocketServer} from 'websocket';
import queryString from 'query-string';
// Start the server
var clients:any=[];
var m=moment();


var mqtt = require('mqtt');
// var moment=require('moment');
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
    //console.log("MQTT Connect");
    client.subscribe('demo/#', function (err:any) {
        if (err) {
            //console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic:any, message:any) {
    // message is Buffer
    //console.log(topic);
    var topics=topic.split('/');
    var device_id=topics[1];
    // console.log(message);
    var data=JSON.parse(message.toString());
    // var test_client=clients.filter((client:any)=>client.device_id==device_id);
    data={...data,device_id};
    clients.forEach((item:any,index:any)=>{
        item.sendUTF(JSON.stringify(data));
       
    })

    

});

setInterval(()=>{
    m=m.add(1,"hours");
    // console.log(111);
    
    var columns= Array.from({length: parseInt(20+"")}, () => Math.floor(Math.random() * 40));
        var data:any={};
       
        data.date=m.unix()*1000;
        columns.forEach((item,index)=>{
            data['column'+index]=item;
        });
        var data1:any={};
       
        data1.date=m.unix()*1000;
        columns.forEach((item,index)=>{
            data1['column'+index]=item;
        }),
        client.publish("demo/data_test1", JSON.stringify(data));
        client.publish("demo/data_test2", JSON.stringify(data1));
},1000);
app.post('/addData',(req,res,next)=>{
    
    return res.json({code:1,message:'ok'});

})
const port = Number(process.env.PORT || 3000);
// const {clients,startServer}=require('./controllers/Socket.controller');
// startServer();
var server=app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request:any) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' url'+request.url+'.');
    var x=queryString.parse(request.url);
    console.log('data',x);;
    
    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var nu:any=null;
    var connection = request.accept(nu, request.origin); 
    
    var index = clients.push(connection) - 1;
    console.log((new Date()) + ' Connection accepted.');


    // user disconnected
    connection.on('close', function(connection:any) {
      
            // remove user from the list of connected clients
            clients.splice(index, 1);
           
    });

});