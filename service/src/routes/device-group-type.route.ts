
import { logger } from '../shared';
import { Request, Response, Router, Express } from 'express';
import DeviceGroupType from '../controllers/DeviceGroupType.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
const router = Router();
const deviceGroupType=new DeviceGroupType();
router.post("/addDeviceGroupType",deviceGroupType.addDeviceGroupType);
router.post("/updateDeviceGroupType",deviceGroupType.updateDeviceGroupType);
router.post("/getDeviceGroupType",deviceGroupType.getDeviceGroupType);
router.post("/deleteDeviceGroupType",deviceGroupType.deleteDeviceGroupType);
export default router;
