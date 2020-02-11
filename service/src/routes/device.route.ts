
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import Device from '../controllers/Device.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
/**
 * @ExpressRouter DeviceRouter
 */
const router = Router();
const device=new Device();
router.post("/addDevice",device.addDevice);
router.post("/updateDevice",device.updateDevice);
router.post("/getDevice",device.getDevice);
router.post("/deleteDevice",device.deleteDevice);
router.post('/getDeviceNoGroup',device.getDeviceNoGroup);
router.post('/getDeviceOfGroup',device.getDeviceOfGroup);
router.post('/getFieldDevice',device.getFieldDevice);
router.post('/getneratateSimlationTable',device.getneratateSimlationTable);
router.post('/getDeviceTest',device.getDeviceTest);
router.post('/deleteGenneratedTable',device.deleteGenneratedTable);
router.post('/getDeviceConfig',device.getDeviceConfig);
router.post('/updateDeviceConfig',device.updateDeviceConfig);
router.post('/getDeviceGkInfo',device.getDeviceGkInfo);
export default router;
