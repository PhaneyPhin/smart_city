
import { logger } from '../shared';
import { Request, Response, Router, Express } from 'express';
import UserGroupController from '../controllers/UserGroup.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
const router = Router();
const usergroup=new UserGroupController();
router.post("/addUserGroup",usergroup.adduserGroup);
router.post("/updateUserGroup",usergroup.updateuserGroup);
router.post("/getUserGroup",usergroup.getUserGroup);
router.post("/deleteUserGroup",usergroup.deleteuserGroup);
router.post('/getDeviceForUserGroup',usergroup.getDeviceForUserGroup);
export default router;
