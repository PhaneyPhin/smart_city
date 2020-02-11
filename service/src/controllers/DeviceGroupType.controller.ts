import Connection from '../connection/DBHelper'
import { Request,Response,NextFunction } from 'express'

export default class DeviceGroupType extends Connection{
    public getDeviceGroupType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var deviceGroupTypes=await this.getOfDB(`select * from device_group_type where flag='1'`,[]);

            return res.json({...this.success,data:deviceGroupTypes})
        }catch(e){
            return res.json(e);
        }
    }
    public addDeviceGroupType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_group_type_id,device_group_type_name}=req.body;
            await this.execute(`insert into device_group_type values ($1,$2,1)`,[device_group_type_id,device_group_type_name]);
            return res.json({...this.success})
        }catch(e){
            return res.json(e);
        }
    }
    public updateDeviceGroupType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_group_type_id,device_group_type_name}=req.body;
            await this.execute(`update device_group_type set device_group_type_name=$2 where device_group_type_id=$1`,[device_group_type_id,device_group_type_name])
            return res.json({...this.success})
        }catch(e){
            return res.json(e);
        }
    }
    public deleteDeviceGroupType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_id}=req.body;
            await this.execute(`update device_group_type set flag='0' where device_group_type_id=$1`,[device_id]);
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }

}