import Connection from '../connection/DBHelper'
import { Request,Response,NextFunction } from 'express'

export default class EquipmentType extends Connection{
    public getEquipmentType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var equipments=await this.getOfDB(`select * from equipment_master where flag='1'`,[]);

            return res.json({...this.success,data:equipments})
        }catch(e){
            return res.json(e);
        }
    }
    public addEquipmentType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {equipment_type_id,equipment_type_name}=req.body;
            await this.execute(`insert into equipment_type values ($1,$2,1)`,[equipment_type_id,equipment_type_name]);
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public updateEquipmentType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {equipment_type_id,equipment_type_name}=req.body;
            await this.execute(`update equipment_type set equipment_type_name=$2 where equipment_type_id=$1`,[equipment_type_id,equipment_type_name])
        }catch(e){
            return res.json(e);
        }
    }
    public deleteEquipmentType=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {equipment_type_id}=req.body;
            await this.execute(`update equipmet_type set flag='0' where equipment_type_id=$1`,[equipment_type_id])
        }catch(e){
            return res.json(e);
        }
    }

}