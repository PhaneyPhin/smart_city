"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
const moment_1 = tslib_1.__importDefault(require("moment"));
class Device extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDeviceConfig = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_id } = req.body;
                let sql = `SELECT field_name from device_master dm
                inner join device_type dt on dm.device_type_id=dt.device_type_id
                inner join device_type_config dtc on dt.device_type_id=dtc.device_type_id
                where dm.device_id=$1`;
                var config_field = yield this.getOfDB(sql, [device_id]);
                console.log(config_field);
                console.log(device_id);
                console.log(sql);
                var configs = yield this.getOfDB(`SELECT device_config from device_master where device_id=$1`, [device_id]);
                if (configs.length > 0) {
                    const responseObj = [];
                    var config = configs[0].device_config;
                    try {
                        if (config != null && config != "") {
                            config = JSON.parse(config);
                            console.log(config);
                        }
                        else {
                            config = {};
                        }
                    }
                    catch (e) {
                        config = {};
                    }
                    console.log(config);
                    config_field.forEach((item) => {
                        if (config[item.field_name] != undefined) {
                            responseObj.push({ name: item.field_name, value: config[item.field_name] });
                        }
                        else {
                            responseObj.push({ name: item.field_name, value: "" });
                        }
                    });
                    return res.json(Object.assign(Object.assign({}, this.success), { data: responseObj }));
                }
                else {
                    return res.json({ code: -1, message: 'invalid device you choose ' });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDeviceConfig = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_id, config } = req.body;
                yield this.execute(`UPDATE device_master set device_config=$1 where device_id=$2`, [config, device_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getneratateSimlationTable = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var { num_table, num_column } = req.body;
            try {
                for (var i = 0; i < num_table; i++) {
                    var columns = Array.from(Array(num_column).keys());
                    var sql = `
                CREATE TABLE data_test${i} (
                    data_id     char(5) CONSTRAINT firstkey${i} PRIMARY KEY,
                    ${columns.map((x) => 'column' + x).join(' float8, ')} float8,
                    "date" timestamp 
                );
                
                `;
                    yield this.execute(sql, []);
                    var promiseArr = [];
                    var insertArray = Array.from({ length: 1000 }, () => "");
                    insertArray = insertArray.map((item, index) => {
                        var column_val = Array.from({ length: parseInt(num_column + "") }, () => Math.floor(Math.random() * 40));
                        return `(${index},${column_val.join(',')},'${randomDate('2019-01-01 00:00:00', '2019-02-01 00:00:00')}')`;
                    });
                    var sql = `insert into data_test${i} values ${insertArray.join(',')}`;
                    yield this.execute(sql, []);
                    console.log(`inserted table ${i}`);
                }
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteGenneratedTable = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.execute(`SELECT footgun('public', 'data_test')`, []);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getDeviceTest = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var devices = yield this.getOfDB(`select table_schema,
                                                        table_name
                                                from information_schema.tables
                                                where table_name like 'data_test%'
                                                    and table_schema not in ('information_schema', 'pg_catalog')
                                                    and table_type = 'BASE TABLE'
                                                order by table_name,
                                                        table_schema;`, []);
                devices = devices.map((item) => {
                    return {
                        device_id: item.table_name,
                        device_name: item.table_name
                    };
                });
                return res.json(Object.assign(Object.assign({}, this.success), { data: devices }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getDevice = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var devices = yield this.getOfDB(`select * from device_master where flag='1'`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: devices }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getDeviceNoGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var devices = yield this.getOfDB(`select * from device_master where flag='1' and device_group_id is null or device_group_id=''`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: devices }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getDeviceOfGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_group_id } = req.body;
                var devices = yield this.getOfDB(`select * from device_master where flag='1' and device_group_id=$1`, [device_group_id]);
                return res.json(Object.assign(Object.assign({}, this.success), { data: devices }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getDeviceGkInfo = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var { host, device_id } = req.body;
                var result = yield this.postData(`${host.indexOf('http') > -1 ? host : ('http://' + host)}/gkdevice/alllist`, req.body);
                var devices = result.filter((item) => item.deviceid == device_id);
                console.log(devices);
                if (devices.length > 0) {
                    return res.json(Object.assign(Object.assign({}, this.success), { data: devices[0] }));
                }
                else {
                    return res.json({ code: -1, mesage: `there is no this device in GK server ${host}` });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addDevice = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_name, device_icon, lat, lon, anchor_x, anchor_y, size, device_type_id } = req.body;
                const device_id = yield this.getMaxID('device_master', 'device_id', 'D', 8, '');
                console.log(device_id);
                yield this.execute(`insert into device_master (device_id,device_name,device_icon,flag,lat,lon,anchor_x,anchor_y,size,device_type_id) values ($1,$2,$3,1,$4,$5,$6,$7,$8,$9)`, [device_id, device_name, device_icon, lat, lon, anchor_x, anchor_y, size, device_type_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDevice = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_id, device_group_id, device_name, device_icon, lat, lon, anchor_x, anchor_y, size, device_type_id } = req.body;
                yield this.execute(`update device_master set device_group_id=$2,device_name=$3,device_icon=$4,lat=$5,lon=$6,anchor_x=$7,anchor_y=$8,size=$9,device_type_id=$10 where device_id=$1`, [device_id, device_group_id, device_name, device_icon, lat, lon, anchor_x, anchor_y, size, device_type_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteDevice = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_id } = req.body;
                yield this.execute(`update device_master set flag='0' where device_id=$1`, [device_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getFieldDevice = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { device_id } = req.body;
            try {
                var sql = `SELECT column_name
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name   = '${device_id}'
                        ;`;
                console.log(sql);
                var column = yield this.getOfDB(sql, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: column }));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = Device;
function randomDate(d1, d2) {
    function randomValueBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    var date1 = moment_1.default(d1).unix();
    var date2 = moment_1.default(d2).unix();
    if (date1 > date2) {
        return moment_1.default.unix(randomValueBetween(date2, date1)).format('YYYY-MM-DD HH:mm:ss');
    }
    else {
        return moment_1.default.unix(randomValueBetween(date1, date2)).format('YYYY-MM-DD HH:mm:ss');
    }
}
