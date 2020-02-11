"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class DeviceGroupType extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getDeviceGroupType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var deviceGroupTypes = yield this.getOfDB(`select * from device_group_type where flag='1'`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: deviceGroupTypes }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addDeviceGroupType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_group_type_id, device_group_type_name } = req.body;
                yield this.execute(`insert into device_group_type values ($1,$2,1)`, [device_group_type_id, device_group_type_name]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDeviceGroupType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_group_type_id, device_group_type_name } = req.body;
                yield this.execute(`update device_group_type set device_group_type_name=$2 where device_group_type_id=$1`, [device_group_type_id, device_group_type_name]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteDeviceGroupType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { device_id } = req.body;
                yield this.execute(`update device_group_type set flag='0' where device_group_type_id=$1`, [device_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = DeviceGroupType;
