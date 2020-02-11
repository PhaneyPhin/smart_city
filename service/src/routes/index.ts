import { Router } from 'express';
import AuthRouter from './auth.route'
import UserRouter from './Users';
import DasboardRouter from './dashboard.route';
import CheckLogin from '../middleware/CheckLogin';
import InvoiceRouter from './Invoice';
import EquipmentRouter from './equipment.route';
import DeviceRouter from './device.route';
import DeviceGroupRouter from './device-group.route';
import DeviceGroupTypeRouter from './device-group-type.route';
import EquipmentTypeRouter from './equipment-type.route';
import DeviceTypeConfigRouter from './device-type-config';
import DeviceTypeRouter from './device-type.route';
import UserGroupRouter from './user-group.route';
// Init router and path
const router = Router();
const checkLogin = new CheckLogin();
// Add sub-routes
router.use("/auth", AuthRouter);
router.use("/dashboard", DasboardRouter);
router.use('/equipment', EquipmentRouter);
router.use('/device',DeviceRouter);
router.use('/device-group',DeviceGroupRouter);
router.use('/device-type',DeviceTypeRouter);
router.use('/device-group-type',DeviceGroupTypeRouter);
router.use('/equipment-type',EquipmentTypeRouter);
router.use('/device-type-config',DeviceTypeConfigRouter);
// router.use('**', checkLogin.Check);
router.use('/users', UserRouter);
router.use("/invoice", InvoiceRouter);
router.use('/user-group',UserGroupRouter);


// Export the base-router
export default router;
