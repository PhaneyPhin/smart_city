
import { logger } from '../shared';
import { Request, Response, Router, Express } from 'express';
import DeviceGroup from '../controllers/DeviceGroup.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
const router = Router();
const devicegroup=new DeviceGroup();
router.post("/addDeviceGroup",devicegroup.addDeviceGroup);
router.post("/updateDeviceGroup",devicegroup.updateDeviceGroup);
router.post("/getDeviceGroup",devicegroup.getDeviceGroup);
router.post("/deleteDeviceGroup",devicegroup.deleteDeviceGroup);
export default router;
