"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class EquipmentType extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getEquipmentType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var equipments = yield this.getOfDB(`select * from equipment_master where flag='1'`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: equipments }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addEquipmentType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { equipment_type_id, equipment_type_name } = req.body;
                yield this.execute(`insert into equipment_type values ($1,$2,1)`, [equipment_type_id, equipment_type_name]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateEquipmentType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { equipment_type_id, equipment_type_name } = req.body;
                yield this.execute(`update equipment_type set equipment_type_name=$2 where equipment_type_id=$1`, [equipment_type_id, equipment_type_name]);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteEquipmentType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { equipment_type_id } = req.body;
                yield this.execute(`update equipmet_type set flag='0' where equipment_type_id=$1`, [equipment_type_id]);
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = EquipmentType;
