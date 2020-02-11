"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
var async = require('async');
class DeviceGroup extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDeviceGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var deviceGroups = yield this.getOfDB(`select * from device_group where flag=1`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: deviceGroups }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addDeviceGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_group_name, device_group_type, selected } = req.body;
                const device_group_id = yield this.getMaxID('device_group', 'device_group_id', 'G', 7, "");
                yield this.execute(`insert into device_group values ($1,$2,$3,'1')`, [device_group_id, device_group_name, 1]);
                async.eachSeries(selected, (item, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var result = yield this.execute(`update device_master set device_group_id=$1 where device_id=$2`, [device_group_id, item]);
                    console.log(item);
                    next();
                }), () => {
                    return res.json(Object.assign({}, this.success));
                }, (err) => {
                    return res.json({ code: 1, message: err.stack });
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDeviceGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_group_id, device_group_name, device_group_type, selected } = req.body;
                yield this.execute(`update device_group set device_group_name=$2,device_group_type=$3 where device_group_id=$1`, [device_group_id, device_group_name, 1]);
                yield this.execute(`update device_master set device_group_id=null where device_group_id=$1`, [device_group_id]);
                async.eachSeries(selected, (item, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var result = yield this.execute(`update device_master set device_group_id=$1 where device_id=$2`, [device_group_id, item]);
                    console.log(item);
                    next();
                }), () => {
                    return res.json(Object.assign({}, this.success));
                }, (err) => {
                    return res.json({ code: 1, message: err.stack });
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteDeviceGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_group_id } = req.body;
                yield this.execute(`update device_master set device_group_id=null where device_group_id=$1`, [device_group_id]);
                yield this.execute(`delete from device_group where device_group_id=$1`, [device_group_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = DeviceGroup;
