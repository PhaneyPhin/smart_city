import Connection from '../connection/DBHelper'
import { Request, Response, NextFunction } from 'express'
var async = require('async');
export default class UserGroupController extends Connection {
    public getUserGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var userGroups = await this.getOfDB(`select * from user_group`, []);

            return res.json({ ...this.success, data: userGroups })
        } catch (e) {
            return res.json(e);
        }
    }
    public adduserGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { user_group_name, user_group_type, selected, selected_device } = req.body;
            const user_group_id = await this.getMaxID('user_group', 'user_group_id', 'G', 7, "");

            await this.execute(`insert into user_group values ($1,$2)`, [user_group_id, user_group_name]);

            async.eachSeries(selected, async (item: any, next: any) => {
                var result = await this.execute(`update user_master set user_group_id=$1 where username=$2`, [user_group_id, item]);
                console.log(item);
                next();
            }, async () => {
                try {
                    await this.execute(`delete from user_device_group_match where user_group_id=$1`, [user_group_id]);
                    async.eachSeries(selected_device, async (item: any, next: any) => {

                       try{
                        var matching_id = await this.getMaxID('user_device_group_match', 'matching_id', 'M', 8, '');
                        await this.execute(`insert into user_device_group_match values ($1,$2,$3)`, [matching_id, user_group_id, item]);
                       }catch(e){
                           return res.json(e);
                       }
                        next();
                    }, () => {
                        return res.json({ ...this.success });

                    }, (err: any) => {
                        return res.json({ code: -1, message: err.stack });
                    })
                } catch (e) {
                    return res.json(e);
                }

            }, (err: any) => {
                return res.json({ code: -1, message: err.stack });
            })

        } catch (e) {
            return res.json(e);
        }
    }
    public updateuserGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_group_id, user_group_name, user_group_type, selected } = req.body;
            await this.execute(`update user_group set user_group_name=$2 where user_group_id=$1`, [user_group_id, user_group_name]);
            await this.execute(`update user_master set user_group_id=null where user_group_id=$1`, [user_group_id]);
            async.eachSeries(selected, async (item: any, next: any) => {
                var result = await this.execute(`update user_master set user_group_id=$1 where username=$2`, [user_group_id, item]);
                console.log(item);
                next();
            }, () => {
                return res.json({ ...this.success });
            }, (err: any) => {
                return res.json({ code: 1, message: err.stack });
            })

        } catch (e) {
            return res.json(e);
        }
    }
    public deleteuserGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_group_id } = req.body;
            await this.execute(`update user_master set user_group_id=null where user_group_id=$1`, [user_group_id])
            await this.execute(`delete from user_group where user_group_id=$1`, [user_group_id]);
            await this.execute(`DELETE from user_device_group_match m where user_group_id=$1`,[user_group_id]);
            return res.json({ ...this.success });

        } catch (e) {
            return res.json(e);
        }
    }
    public getDeviceForUserGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_group_id } = req.body;
            const device_in_groups: any = await this.getOfDB(`SELECT device_group_id from user_device_group_match where user_group_id=$1`, [user_group_id]);
            const device_out_groups: any = await this.getOfDB(`
                        SELECT dg.device_group_id from device_group dg where dg.device_group_id not in
                    (SELECT device_group_id from user_device_group_match where  user_group_id=$1)`, [user_group_id]);
            return res.json({ ...this.success, device_in_groups: device_in_groups.map((item: any) => item.device_group_id), device_out_groups: device_out_groups.map((item: any) => item.device_group_id) });

        } catch (e) {
            return res.json(e);
        }
    }
    public updateDeviceForUserGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_group_id, device_in_group } = req.body;

            await this.execute(`delete from user_device_group_matching where user_group_id=$1`, [user_group_id]);

            var device_in_group_Arry = device_in_group.split(',');
            await this.execute(`insert into user_device_group_matching values ${
                device_in_group_Arry.map((item: any) => {
                    return "(" + user_group_id + "," + item + ")"
                }).join(',')
                }`, []);
            return res.json({ ...this.success });

        } catch (e) {
            return res.json(e);
        }
    }

}