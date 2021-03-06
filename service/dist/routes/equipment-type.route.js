"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const EquipmentType_controller_1 = tslib_1.__importDefault(require("../controllers/EquipmentType.controller"));
const router = express_1.Router();
const equipmentType = new EquipmentType_controller_1.default();
router.post("/addEquipmentType", equipmentType.addEquipmentType);
router.post("/updateEquipmentType", equipmentType.updateEquipmentType);
router.post("/getEquipmentType", equipmentType.getEquipmentType);
router.post("/deleteEquipmentType", equipmentType.deleteEquipmentType);
exports.default = router;
