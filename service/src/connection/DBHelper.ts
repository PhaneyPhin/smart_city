// const Pool = require('pg').Pool;
import { Pool } from 'pg';
import knex from 'knex';
const longZero="00000000000000000000";
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env;
import request from 'request';

// Create Pool connection
var pool = new Pool({
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
});

/**
 * @Class Connection
 * @Avoid to help query of db
 */
export default class Connection {
    /**
     * @Function getOfDB
     * @Return Promse of selecting database
     */
    public getOfDB = (sql: string, data: any) => {
        
        return new Promise((resolve, reject) => {
            pool.query(sql, data).then((result) => {
                resolve(result.rows);
            }, err => {
                reject({ code: err.code, message: err.stack })
            })
        })
    }
    /**
     * @Function execute
     * @Avoid executing query to DB
     * @Return Promise
     */
    public execute = (sql: string, data: any) => {
       
        return new Promise((resolve, reject) => {
            pool.query(sql, data).then((result) => {
                resolve(result);
            }, err => {
                reject({ code: err.code, message: err.stack })
            })
        })
    }
    /**
     * @Function getmaxID
     * @Avoid get new max ID from table
     * @params table,field_name,type(prefix of feild),length,extraquery(adding where condiction to function)
     * @Return Promise of getID
     */
    public getMaxID = async (table: string, field_name: string, type: string, length: number, extraquery: string) => {
        return new Promise((resolve, reject) => {
            this.getOfDB(`select max(substr(${field_name},${type.length + 1},${length})) as max_id from ${table} ${extraquery}`, []).then((data: any) => {
                var max_id = type;
                if (data[0].max_id == null) {
                    max_id = type + longZero.substring(0, length - type.length - 1) + "1";
                } else {
                    max_id = type + (longZero.substring(0, length - type.length) + (parseInt(data[0].max_id) + 1)).substr(-(length - type.length));

                }
                resolve(max_id);
            }, err => {
                reject({code:err.code,mesage:err.stack});
            })
        })
    }

    /**
     * @Var success
     * @Value {code :1, message: 'ok'}
     */
    public success = { code: 1, message: 'ok' };
    public knex=knex;
    public postData(url:string, data:Object) {
        return new Promise((resolve, reject) => {
          var options = { method: 'POST',
          url: url,
          headers: 
          { 
            'Content-Type': 'application/x-www-form-urlencoded' },
          form: data 
          };
      
          //console.log(options);
          request(options, function (error:any, response:any, body:any) {
            //console.log(body);
            //console.log(response)
            if (error) {
              reject({code:-1,message:error.stack});
            } else {
              resolve(JSON.parse(body))
              //console.log(body);
            }
          });
      
        })
      }
    
}

