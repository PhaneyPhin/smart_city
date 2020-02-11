"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./LoadEnv");
const Server_1 = tslib_1.__importDefault(require("./Server"));
const shared_1 = require("./shared");
const moment_1 = tslib_1.__importDefault(require("moment"));
const websocket_1 = require("websocket");
const query_string_1 = tslib_1.__importDefault(require("query-string"));
var clients = [];
var m = moment_1.default();
var mqtt = require('mqtt');
const MQTT_SERVER = "localhost";
const MQTT_PORT = "1883";
const MQTT_USER = "";
const MQTT_PASSWORD = "";
m = moment_1.default();
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
});
client.on('connect', function () {
    client.subscribe('demo/#', function (err) {
        if (err) {
        }
    });
});
client.on('message', function (topic, message) {
    var topics = topic.split('/');
    var device_id = topics[1];
    var data = JSON.parse(message.toString());
    data = Object.assign(Object.assign({}, data), { device_id });
    clients.forEach((item, index) => {
        item.sendUTF(JSON.stringify(data));
    });
});
setInterval(() => {
    m = m.add(1, "hours");
    var columns = Array.from({ length: parseInt(20 + "") }, () => Math.floor(Math.random() * 40));
    var data = {};
    data.date = m.unix() * 1000;
    columns.forEach((item, index) => {
        data['column' + index] = item;
    });
    var data1 = {};
    data1.date = m.unix() * 1000;
    columns.forEach((item, index) => {
        data1['column' + index] = item;
    }),
        client.publish("demo/data_test1", JSON.stringify(data));
    client.publish("demo/data_test2", JSON.stringify(data1));
}, 1000);
Server_1.default.post('/addData', (req, res, next) => {
    return res.json({ code: 1, message: 'ok' });
});
const port = Number(process.env.PORT || 3000);
var server = Server_1.default.listen(port, () => {
    shared_1.logger.info('Express server started on port: ' + port);
});
var wsServer = new websocket_1.server({
    httpServer: server
});
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' url' + request.url + '.');
    var x = query_string_1.default.parse(request.url);
    console.log('data', x);
    ;
    var nu = null;
    var connection = request.accept(nu, request.origin);
    var index = clients.push(connection) - 1;
    console.log((new Date()) + ' Connection accepted.');
    connection.on('close', function (connection) {
        clients.splice(index, 1);
    });
});
