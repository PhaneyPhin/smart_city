"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class DeviceTypeConfig extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDeviceTypeConfig = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_type_id } = req.body;
                var DeviceTypeConfigs = yield this.getOfDB(`select * from device_type_config where device_type_id=$1`, [device_type_id]);
                return res.json(Object.assign(Object.assign({}, this.success), { data: DeviceTypeConfigs }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addDeviceTypeConfig = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const config_id = yield this.getMaxID('device_type_config', 'config_id', 'ETC', 7, '');
                const { field_name, device_type_id } = req.body;
                yield this.execute(`insert into device_type_config values ($1,$2,$3)`, [config_id, field_name, device_type_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDeviceTypeConfig = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { config_id, field_name, device_type_id } = req.body;
                yield this.execute(`update device_type_config set field_name=$2,device_type_id=$3 where config_id=$1`, [config_id, field_name, device_type_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteDeviceTypeConfig = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { config_id } = req.body;
                yield this.execute(`delete from device_type_config where config_id=$1`, [config_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = DeviceTypeConfig;
