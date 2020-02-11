
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
// import Auth from '../controllers/Auth.controller';
import DashboardController from '../controllers/Dashboard.controller';
import EquipmentController from '../controllers/Equipment.Controller';

// Init shared
const router = Router();
const equipment = new EquipmentController();
router.post("/getEquipment", equipment.getEquipment);
router.post("/getFieldEquipment", equipment.getFieldEquipment);
router.post("/addEquipment",equipment.addEquipment);
router.post("/updateEquipment",equipment.updateEquipment);
router.post("/deleteEquipment",equipment.deleteEquipment);

export default router;
