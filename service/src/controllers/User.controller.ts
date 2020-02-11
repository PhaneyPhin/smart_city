import Connection from '../connection/DBHelper';
import { Request, Response, NextFunction } from 'express';
export default class User extends Connection {
    public getRole=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var roles:any=await this.getOfDB(`select * from role_master`,[]);

            return res.json({...this.success,data:roles});
        }catch(e){
            return res.json(e);
        }
    }
    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            var users:any=await this.getOfDB(`select u.*,r.role_name from user_master u inner join role_master r on u.role_id=r.role_id`,[]);
            return res.json({...this.success,data:users});
        } catch (e) {
            return res.json(e);
        }
    }

    public addUser= async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {username,password,first_name,last_name,email,tel,icon_image,role_id}=req.body;
            await this.execute(`
            insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,1,null)`,[username,password,first_name,last_name,email,tel,icon_image,role_id]);
            return res.json(this.success);
        }catch(e){
            return res.json(e);
        }
    }
    public updateUser=async (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.body);
        try{
            const {username,first_name,last_name,email,tel,icon_image,role_id}=req.body;
            await this.execute(`
            update user_master set first_name=$2,last_name=$3,email=$4,tel=$5,icon_image=$6,role_id=$7 where username=$1`,[username,first_name,last_name,email,tel,icon_image,role_id]);
            return res.json(this.success);
        }catch(e){
            return res.json(e);
        }
    }
    // public changePassword=async (req: Request, res: Response, next: NextFunction) => {
    //     try{
    //         const {username,password}=req.body;
    //         await this.execute(`
    //         update user_master set password=SHA1($2) where username=$1`,[username,password]);
    //         return res.json(this.success);
    //     }catch(e){
    //         return res.json(e);
    //     }
    // }
    public deleteUser=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {username}=req.body;
            await this.execute(`
            update user_master set flag='0' where username=$1`,[username])
            return res.json(this.success);
        }catch(e){
            return res.json(e);
        }
    }
    public changePassword=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {username,password}=req.body;
            await this.execute(`
            update user_master set password=SHA1($2) where username=$1`,[username])
            return res.json(this.success);
        }catch(e){
            return res.json(e);
        }
    }
    public checkUser=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {username}=req.body;
            var users:any=await this.getOfDB(`select username from user_master where username=$1`,[username]);
            if(users.length==0){
                return res.json({...this.success,isUserExist:false})
            }else{
                return res.json({...this.success,isUserExist:true})
            }
        }catch(e){
            return res.json(e);
        }
    }
    public getUserNoGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            var users=await this.getOfDB(`select * from user_master where flag='1' and user_group_id is null or user_group_id=''`,[]);

            return res.json({...this.success,data:users})
        }catch(e){
            return res.json(e);
        }
    }
    public getUserOfGroup=async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {user_group_id}=req.body;
            var users=await this.getOfDB(`select * from user_master where flag='1' and user_group_id=$1`,[user_group_id]);

            return res.json({...this.success,data:users})
        }catch(e){
            return res.json(e);
        }
    }
}
