"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class EquipmentController extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getEquipment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var equipments = yield this.getOfDB(`select * from equipment_master where flag=1`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: equipments }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getFieldEquipment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { equipment_id } = req.body;
            try {
                var sql = `SELECT column_name
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name   = 'data_${equipment_id}'
                        ;`;
                console.log(sql);
                var column = yield this.getOfDB(sql, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: column }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addEquipment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { equipment_id, equipment_name, device_id, equipment_type_id, icon_img } = req.body;
                yield this.execute(`insert into equipment_master values ($1,$2,1,$3,$4,$5)`, [equipment_id, equipment_name, device_id, equipment_type_id, icon_img]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateEquipment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { equipment_id, equipment_name, device_id, equipment_type_id, icon_img } = req.body;
                yield this.execute(`update equipment_master set equipment_name=$2,device_id=$3,equipment_type_id=$4,icon_img=$5 where equipment_id=$1`, [equipment_id, equipment_name, device_id, equipment_type_id, icon_img]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteEquipment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { equipment_id } = req.body;
                this.execute(`delete from equipment_master where equipment_id=$1`, [equipment_id]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = EquipmentController;
