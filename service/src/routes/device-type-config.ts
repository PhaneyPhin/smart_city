
import { logger } from '../shared';
import { Request, Response, Router, Express } from 'express';
import DeviceTypeConfig from '../controllers/DeviceTypeConfig.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
const router = Router();
const deviceTypeConfig=new DeviceTypeConfig();
router.post("/addDeviceTypeConfig",deviceTypeConfig.addDeviceTypeConfig);
router.post("/updateDeviceTypeConfig",deviceTypeConfig.updateDeviceTypeConfig);
router.post("/getDeviceTypeConfig",deviceTypeConfig.getDeviceTypeConfig);
router.post("/deleteDeviceTypeConfig",deviceTypeConfig.deleteDeviceTypeConfig);
export default router;
