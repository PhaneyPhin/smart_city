
import { logger } from '../shared';
import { Request, Response, Router, Express } from 'express';
import EquipmentType from '../controllers/EquipmentType.controller';
// import Auth from '../controllers/Auth.controller';


// Init shared
const router = Router();
const equipmentType=new EquipmentType();
router.post("/addEquipmentType",equipmentType.addEquipmentType);
router.post("/updateEquipmentType",equipmentType.updateEquipmentType);
router.post("/getEquipmentType",equipmentType.getEquipmentType);
router.post("/deleteEquipmentType",equipmentType.deleteEquipmentType);
export default router;
