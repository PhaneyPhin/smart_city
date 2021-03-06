"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const DeviceType_controller_1 = tslib_1.__importDefault(require("../controllers/DeviceType.controller"));
const router = express_1.Router();
const deviceType = new DeviceType_controller_1.default();
router.post("/addDeviceType", deviceType.addDeviceType);
router.post("/updateDeviceType", deviceType.updateDeviceType);
router.post("/getDeviceType", deviceType.getDeviceType);
router.post("/deleteDeviceType", deviceType.deleteDeviceType);
exports.default = router;
