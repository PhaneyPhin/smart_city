import Connection from '../connection/DBHelper';
import { Request, Response, NextFunction } from 'express';
export default class EquipmentController extends Connection {
    public getEquipment = async (req: Request, res: Response, next: NextFunction) => {
        try {

            /*
            e.*,d.lat,d.lon,d.device_icon from device_group dg 
                    inner join device_master d on d.device_group_id=dg.device_group_id
                    inner join equipment_master e on e.device_id=d.device_id
                    inner join equipment_type et on e.equipment_type_id=et.equipment_type_id
            */
            var equipments = await this.getOfDB(`select * from equipment_master where flag=1`, []);
            return res.json({ ...this.success, data: equipments });
        } catch (e) {
            return res.json(e);
        }
    }
    public getFieldEquipment = async (req: Request, res: Response, next: NextFunction) => {

        const { equipment_id } = req.body;
        try {
            var sql = `SELECT column_name
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name   = 'data_${equipment_id}'
                        ;`
            console.log(sql);

            var column = await this.getOfDB(sql, [])
            return res.json({ ...this.success, data: column })
        } catch (e) {
            return res.json(e);
        }
    }
    public addEquipment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {equipment_id,equipment_name,device_id,equipment_type_id,icon_img}=req.body;
            await this.execute(`insert into equipment_master values ($1,$2,1,$3,$4,$5)`,[equipment_id,equipment_name,device_id,equipment_type_id,icon_img]);
            return res.json(this.success);
        } catch (e) {
            return res.json(e);
        }
    }
    public updateEquipment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {equipment_id,equipment_name,device_id,equipment_type_id,icon_img}=req.body;
            await this.execute(`update equipment_master set equipment_name=$2,device_id=$3,equipment_type_id=$4,icon_img=$5 where equipment_id=$1`,[equipment_id,equipment_name,device_id,equipment_type_id,icon_img]);
            return res.json(this.success);
        } catch (e) {
            return res.json(e);
        }
    }
    public deleteEquipment = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {equipment_id}=req.body;
            this.execute(`delete from equipment_master where equipment_id=$1`,[equipment_id]);
            return res.json(this.success);
        }catch(e){
            return res.json(e);
        }
    }


}