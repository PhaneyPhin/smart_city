"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class DeviceType extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDeviceType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var DeviceTypes = yield this.getOfDB(`select * from device_type where flag='1'`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: DeviceTypes }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addDeviceType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const device_type_id = yield this.getMaxID('device_type', 'device_type_id', 'DT', 7, '');
                const { device_type_name } = req.body;
                yield this.execute(`insert into device_type values ($1,$2,1)`, [device_type_id, device_type_name]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDeviceType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_type_id, device_type_name } = req.body;
                yield this.execute(`update device_type set device_type_name=$2 where device_type_id=$1`, [device_type_id, device_type_name]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteDeviceType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_type_id } = req.body;
                yield this.execute(`update device_master set device_type_id=null where device_type_id=$1`, [device_type_id]);
                yield this.execute(`delete from device_type where device_type_id=$1`, [device_type_id]);
                yield this.execute(`delect from device_type_config where device_type_id=$1`, [device_type_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = DeviceType;
