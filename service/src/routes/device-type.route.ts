
import { logger } from '../shared';
import { Request, Response, Router, Express } from 'express';
import DeviceType from '../controllers/DeviceType.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
const router = Router();
const deviceType=new DeviceType();
router.post("/addDeviceType",deviceType.addDeviceType);
router.post("/updateDeviceType",deviceType.updateDeviceType);
router.post("/getDeviceType",deviceType.getDeviceType);
router.post("/deleteDeviceType",deviceType.deleteDeviceType);
export default router;
