import Connection from '../connection/DBHelper'
import { Request,Response,NextFunction } from 'express';
import moment from 'moment';
/***
 * @Class Device
 * @Action device controll from http
 */
export default class Device extends Connection{
    /**
     * @Function getDevice
     * @Response <code,message,List<device>>
     */
    public getDeviceConfig=async (req: Request,res:Response,next:NextFunction)=>{
        try{
            const {device_id}=req.body;
            let sql=`SELECT field_name from device_master dm
                inner join device_type dt on dm.device_type_id=dt.device_type_id
                inner join device_type_config dtc on dt.device_type_id=dtc.device_type_id
                where dm.device_id=$1`;
            var config_field:any=await this.getOfDB(sql,[device_id]);
            console.log(config_field);
            console.log(device_id)
            console.log(sql);
            var configs:any=await this.getOfDB(`SELECT device_config from device_master where device_id=$1`,[device_id]);
            if(configs.length>0){
                
                const responseObj:any=[];
                var config:any=configs[0].device_config;
               
                try{
                    if(config!=null && config!=""){
                       
                        config=JSON.parse(config);
                        console.log(config)
                    }else{
                        config={};
                    }
                }catch(e){
                    config={};
                }
                console.log(config);
                config_field.forEach((item:any)=>{
                    if(config[item.field_name]!=undefined){
                        responseObj.push({name:item.field_name,value:config[item.field_name]})
                    }else{
                        responseObj.push({name:item.field_name,value:""});
                    }
                })
                return res.json({...this.success,data:responseObj});
            }else{
                return res.json({code:-1,message:'invalid device you choose '});
            }
        }catch(e){
            return res.json(e);
        }
    }
    public updateDeviceConfig=async (req: Request,res:Response,next:NextFunction)=>{
        try{
            const {device_id,config}=req.body;
            await this.execute(`UPDATE device_master set device_config=$1 where device_id=$2`,[config,device_id]);
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public getneratateSimlationTable=async (req: Request,res:Response,next:NextFunction)=>{
        var {num_table,num_column}=req.body;

        try{

            for(var i=0;i<num_table;i++){
               
                // var x:any={length: parseInt(num_column)};
                var columns=Array.from(Array(num_column).keys());
                var sql=`
                CREATE TABLE data_test${i} (
                    data_id     char(5) CONSTRAINT firstkey${i} PRIMARY KEY,
                    ${columns.map((x)=>'column'+x).join(' float8, ')} float8,
                    "date" timestamp 
                );
                
                `;
                // console.log(sql);
                
                await this.execute(sql,[]);
                var promiseArr=[];
                var insertArray:any= Array.from({length: 1000}, () => "");

                insertArray=insertArray.map((item:any,index:number)=>{
                    var column_val= Array.from({length: parseInt(num_column+"")}, () => Math.floor(Math.random() * 40));
                    return `(${index},${column_val.join(',')},'${randomDate('2019-01-01 00:00:00','2019-02-01 00:00:00')}')`
                })
                var sql=`insert into data_test${i} values ${insertArray.join(',')}`;
                await this.execute(sql,[]);

                console.log(`inserted table ${i}`)
                
                     
            }
            return res.json({...this.success})
        }catch(e){
            return res.json(e);
        }
    }
    
    public deleteGenneratedTable=async (req: Request,res:Response,next:NextFunction)=>{
        try{
            await this.execute(`SELECT footgun('public', 'data_test')`,[]);
            return res.json({...this.success});

        }catch(e){
            return res.json(e);
        }
    }
    public getDeviceTest=async (req: Request, res: Response, next: NextFunction) => {
        try{
          
            var devices:any=await this.getOfDB(`select table_schema,
                                                        table_name
                                                from information_schema.tables
                                                where table_name like 'data_test%'
                                                    and table_schema not in ('information_schema', 'pg_catalog')
                                                    and table_type = 'BASE TABLE'
                                                order by table_name,
                                                        table_schema;`,[]);
            devices=devices.map((item:any)=>{
                                   return {
                                    device_id:item.table_name,
                                    device_name:item.table_name
                                   }
                                })
            return res.json({...this.success,data:devices})
        }catch(e){
            return res.json(e);
        }
    }
    public getDevice=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var devices=await this.getOfDB(`select * from device_master where flag='1'`,[]);
            return res.json({...this.success,data:devices})
        }catch(e){
            return res.json(e);
        }
    }
    /**
     * @Function getDeviceGroup
     * @Avoid Get device that has no group
     * @Response <code,message>
     */
    public getDeviceNoGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var devices=await this.getOfDB(`select * from device_master where flag='1' and device_group_id is null or device_group_id=''`,[]);

            return res.json({...this.success,data:devices})
        }catch(e){
            return res.json(e);
        }
    }

    public getDeviceOfGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_group_id}=req.body;
            var devices=await this.getOfDB(`select * from device_master where flag='1' and device_group_id=$1`,[device_group_id]);

            return res.json({...this.success,data:devices})
        }catch(e){
            return res.json(e);
        }
    }
    public getDeviceGkInfo=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var {host,device_id}=req.body;
            var result:any=await this.postData(`${host.indexOf('http')>-1?host:('http://'+host)}/gkdevice/alllist`, req.body);
            var devices:any=result.filter((item:any)=>item.deviceid==device_id);
            console.log(devices);
            if(devices.length>0){
                return res.json({...this.success,data:devices[0]});
            }else{
                return res.json({code:-1,mesage:`there is no this device in GK server ${host}`})
            }
            
        }catch(e){
            return res.json(e);
        }
        
    }
    public addDevice=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_name,device_icon,lat,lon,anchor_x,anchor_y,size,device_type_id}=req.body;
            const device_id:any=await this.getMaxID('device_master','device_id','D',8,'');
            console.log(device_id);
            await this.execute(`insert into device_master (device_id,device_name,device_icon,flag,lat,lon,anchor_x,anchor_y,size,device_type_id) values ($1,$2,$3,1,$4,$5,$6,$7,$8,$9)`,[device_id,device_name,device_icon,lat,lon,anchor_x,anchor_y,size,device_type_id]);
            return  res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public updateDevice=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {device_id,device_group_id,device_name,device_icon,lat,lon,anchor_x,anchor_y,size,device_type_id}=req.body;
            await this.execute(`update device_master set device_group_id=$2,device_name=$3,device_icon=$4,lat=$5,lon=$6,anchor_x=$7,anchor_y=$8,size=$9,device_type_id=$10 where device_id=$1`,[device_id,device_group_id,device_name,device_icon,lat,lon,anchor_x,anchor_y,size,device_type_id])
            
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public deleteDevice=async (req: Request, res: Response, next: NextFunction) => {
    try{
            const {device_id}=req.body;
            await this.execute(`update device_master set flag='0' where device_id=$1`,[device_id])
            return res.json({...this.success});
        }catch(e){
            return res.json(e);
        }
    }
    public getFieldDevice = async (req: Request, res: Response, next: NextFunction) => {

        const { device_id } = req.body;
        try {
            var sql = `SELECT column_name
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                    AND table_name   = '${device_id}'
                        ;`
            console.log(sql);

            var column = await this.getOfDB(sql, [])
            return res.json({ ...this.success, data: column })
        } catch (e) {
            return res.json(e);
        }
    }

}

function randomDate(d1:any, d2:any){
    function randomValueBetween(min:number, max:number) {
      return Math.random() * (max - min) + min;
    }
    var date1 =moment(d1).unix();
    var date2 = moment(d2).unix();
    
    if( date1>date2){
        return moment.unix(randomValueBetween(date2,date1)).format('YYYY-MM-DD HH:mm:ss');   
    } else{
        return moment.unix(randomValueBetween(date1, date2)).format('YYYY-MM-DD HH:mm:ss');

    }
}