import Connection from '../connection/DBHelper'
import { Request,Response,NextFunction } from 'express'
var async=require('async');
export default class DeviceGroup extends Connection{
    public getDeviceGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var deviceGroups=await this.getOfDB(`select * from device_group where flag=1`,[]);

            return res.json({...this.success,data:deviceGroups})
        }catch(e){
            return res.json(e);
        }
    }
    public addDeviceGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{

            const {device_group_name,device_group_type,selected}=req.body;
            const device_group_id=await this.getMaxID('device_group','device_group_id','G',7,"");

            await this.execute(`insert into device_group values ($1,$2,$3,'1')`,[device_group_id,device_group_name,1]);

            async.eachSeries(selected,async (item:any,next:any)=>{
                var result=await this.execute(`update device_master set device_group_id=$1 where device_id=$2`,[device_group_id,item]);
                console.log(item);
                next();
            },()=>{
                return res.json({...this.success});
            },(err:any)=>{
                return res.json({code:1,message:err.stack});
            })
            
        }catch(e){
            return res.json(e);
        }
    }
    public updateDeviceGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_group_id,device_group_name,device_group_type,selected}=req.body;
            await this.execute(`update device_group set device_group_name=$2,device_group_type=$3 where device_group_id=$1`,[device_group_id,device_group_name,1]);
            await this.execute(`update device_master set device_group_id=null where device_group_id=$1`,[device_group_id]);
            async.eachSeries(selected,async (item:any,next:any)=>{
                var result=await this.execute(`update device_master set device_group_id=$1 where device_id=$2`,[device_group_id,item]);
                console.log(item);
                next();
            },()=>{
                return res.json({...this.success});
            },(err:any)=>{
                return res.json({code:1,message:err.stack});
            })
            
        }catch(e){
            return res.json(e);
        }
    }
    public deleteDeviceGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_group_id}=req.body;
            await this.execute(`update device_master set device_group_id=null where device_group_id=$1`,[device_group_id])
            await this.execute(`delete from device_group where device_group_id=$1`,[device_group_id]);
            return res.json({...this.success});
            
        }catch(e){
            return res.json(e);
        }
    }

}