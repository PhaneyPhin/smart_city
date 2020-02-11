import Connection from '../connection/DBHelper'
import { Request,Response,NextFunction } from 'express'

export default class DeviceTypeConfig extends Connection{
    public getDeviceTypeConfig=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_type_id}=req.body;
            var DeviceTypeConfigs=await this.getOfDB(`select * from device_type_config where device_type_id=$1`,[device_type_id]);

            return res.json({...this.success,data:DeviceTypeConfigs})
        }catch(e){
            return res.json(e);
        }
    }
    public addDeviceTypeConfig=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const config_id:any =await this.getMaxID('device_type_config','config_id','ETC',7,'');
            const {field_name,device_type_id}=req.body;
            await this.execute(`insert into device_type_config values ($1,$2,$3)`,[config_id,field_name,device_type_id]);
            return  res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public updateDeviceTypeConfig=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {config_id,field_name,device_type_id}=req.body;
            await this.execute(`update device_type_config set field_name=$2,device_type_id=$3 where config_id=$1`,[config_id,field_name,device_type_id]);
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public deleteDeviceTypeConfig=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {config_id}=req.body;
        
            await this.execute(`delete from device_type_config where config_id=$1`,[config_id]);
            return res.json({...this.success})
        }catch(e){
            return res.json(e);
        }
    }

}