"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_1 = require("pg");
const knex_1 = tslib_1.__importDefault(require("knex"));
const longZero = "00000000000000000000";
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env;
const request_1 = tslib_1.__importDefault(require("request"));
var pool = new pg_1.Pool({
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
});
class Connection {
    constructor() {
        this.getOfDB = (sql, data) => {
            return new Promise((resolve, reject) => {
                pool.query(sql, data).then((result) => {
                    resolve(result.rows);
                }, err => {
                    reject({ code: err.code, message: err.stack });
                });
            });
        };
        this.execute = (sql, data) => {
            return new Promise((resolve, reject) => {
                pool.query(sql, data).then((result) => {
                    resolve(result);
                }, err => {
                    reject({ code: err.code, message: err.stack });
                });
            });
        };
        this.getMaxID = (table, field_name, type, length, extraquery) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getOfDB(`select max(substr(${field_name},${type.length + 1},${length})) as max_id from ${table} ${extraquery}`, []).then((data) => {
                    var max_id = type;
                    if (data[0].max_id == null) {
                        max_id = type + longZero.substring(0, length - type.length - 1) + "1";
                    }
                    else {
                        max_id = type + (longZero.substring(0, length - type.length) + (parseInt(data[0].max_id) + 1)).substr(-(length - type.length));
                    }
                    resolve(max_id);
                }, err => {
                    reject({ code: err.code, mesage: err.stack });
                });
            });
        });
        this.success = { code: 1, message: 'ok' };
        this.knex = knex_1.default;
    }
    postData(url, data) {
        return new Promise((resolve, reject) => {
            var options = { method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: data
            };
            request_1.default(options, function (error, response, body) {
                if (error) {
                    reject({ code: -1, message: error.stack });
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}
exports.default = Connection;
