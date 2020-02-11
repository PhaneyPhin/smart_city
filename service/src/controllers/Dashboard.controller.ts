import Connection from '../connection/DBHelper';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
var async=require('async')
export default class DashboardController extends Connection {
    public getChartOption = async (req: Request, res: Response, next: NextFunction) => {
        const { chart_type_id,chart_name,series,height } = req.body;
        console.log(req.body);
        
        try {
            var charts: any = await this.getOfDB(`select * from chart_type where chart_type_id=$1`, [chart_type_id]);
            console.log(charts);
            if (charts.length > 0) {
                var option=JSON.parse(charts[0].chart_type_option);
             
                
                option.title={text:chart_name};
                option.height=height;
                option.series=[];
                // console.log(option)
                async.eachSeries(series,async (item:any,next:any)=>{
                    var {column_name,device_id}=item;
                    console.log(item)
                    var sql=`select "date",${column_name} as column from "${device_id}" where ${column_name} is not null order by "date" `;
                    console.log(sql );
                  
                    var serieData:any=await this.getOfDB(sql,[]);
                    console.log(serieData);
                    
                    option.series.push({
                        name:column_name,
                        data:serieData.map((item1:any)=>{
                            var {date,column}=item1;
                            return [moment(date).valueOf(),column]
                        })
                    })
                    next();
                },()=>{
                    return res.json({ ...this.success, chartOption: option })
                })
            

               
            }else{
                return res.json({code:-1,messsage:'no data'})
            }
        } catch (e) {
            return res.json(e);
        }

    }
    public getChartType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var chart_titles: any = await this.getOfDB(`select chart_type_id,chart_type_name from chart_type`, []);
            console.log(111);
            return res.json({ ...this.success, data: chart_titles })
        } catch (e) {
            return res.json(e);
        }
    }
}