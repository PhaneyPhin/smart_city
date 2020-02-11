import Connection from '../connection/DBHelper'
import { Request,Response,NextFunction } from 'express'

export default class DeviceType extends Connection{
    public getDeviceType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var DeviceTypes=await this.getOfDB(`select * from device_type where flag='1'`,[]);

            return res.json({...this.success,data:DeviceTypes})
        }catch(e){
            return res.json(e);
        }
    }
    public addDeviceType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const device_type_id:any =await this.getMaxID('device_type','device_type_id','DT',7,'');
            const {device_type_name}=req.body;
            await this.execute(`insert into device_type values ($1,$2,1)`,[device_type_id,device_type_name]);
            return  res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public updateDeviceType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_type_id,device_type_name}=req.body;
            await this.execute(`update device_type set device_type_name=$2 where device_type_id=$1`,[device_type_id,device_type_name]);
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public deleteDeviceType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_type_id}=req.body;
            await this.execute(`update device_master set device_type_id=null where device_type_id=$1`,[device_type_id])
            await this.execute(`delete from device_type where device_type_id=$1`,[device_type_id]);
            await this.execute(`delect from device_type_config where device_type_id=$1`,[device_type_id]);
            return res.json({...this.success})
        }catch(e){
            return res.json(e);
        }
    }
    
}