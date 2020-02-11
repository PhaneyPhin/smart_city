import { Router } from 'express';
import User from '../controllers/User.controller';

// Init shared
const router = Router();
const user = new User();
router.post("/getUser", user.getUser);
router.post("/addUser",user.addUser);
router.post("/updateUser",user.updateUser);
router.post("/deleteUser",user.deleteUser);
router.post("/getRole",user.getRole);
router.post("/checkUser",user.checkUser);
router.post('/getUserNoGroup',user.getUserNoGroup);
router.post('/getUserOfGroup',user.getUserOfGroup)
export default router;
