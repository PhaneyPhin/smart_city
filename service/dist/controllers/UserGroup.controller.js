"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
var async = require('async');
class UserGroupController extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getUserGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var userGroups = yield this.getOfDB(`select * from user_group`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: userGroups }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.adduserGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { user_group_name, user_group_type, selected, selected_device } = req.body;
                const user_group_id = yield this.getMaxID('user_group', 'user_group_id', 'G', 7, "");
                yield this.execute(`insert into user_group values ($1,$2)`, [user_group_id, user_group_name]);
                async.eachSeries(selected, (item, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var result = yield this.execute(`update user_master set user_group_id=$1 where username=$2`, [user_group_id, item]);
                    console.log(item);
                    next();
                }), () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        yield this.execute(`delete from user_device_group_match where user_group_id=$1`, [user_group_id]);
                        async.eachSeries(selected_device, (item, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            try {
                                var matching_id = yield this.getMaxID('user_device_group_match', 'matching_id', 'M', 8, '');
                                yield this.execute(`insert into user_device_group_match values ($1,$2,$3)`, [matching_id, user_group_id, item]);
                            }
                            catch (e) {
                                return res.json(e);
                            }
                            next();
                        }), () => {
                            return res.json(Object.assign({}, this.success));
                        }, (err) => {
                            return res.json({ code: 1, message: err.stack });
                        });
                    }
                    catch (e) {
                        return res.json(e);
                    }
                }), (err) => {
                    return res.json({ code: 1, message: err.stack });
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateuserGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { user_group_id, user_group_name, user_group_type, selected } = req.body;
                yield this.execute(`update user_group set user_group_name=$2 where user_group_id=$1`, [user_group_id, user_group_name]);
                yield this.execute(`update user_master set user_group_id=null where user_group_id=$1`, [user_group_id]);
                async.eachSeries(selected, (item, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    var result = yield this.execute(`update user_master set user_group_id=$1 where username=$2`, [user_group_id, item]);
                    console.log(item);
                    next();
                }), () => {
                    return res.json(Object.assign({}, this.success));
                }, (err) => {
                    return res.json({ code: 1, message: err.stack });
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteuserGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { user_group_id } = req.body;
                yield this.execute(`update user_master set user_group_id=null where user_group_id=$1`, [user_group_id]);
                yield this.execute(`delete from user_group where user_group_id=$1`, [user_group_id]);
                yield this.execute(`DELETE from user_device_group_match m where user_group_id=$1`, [user_group_id]);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getDeviceForUserGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { user_group_id } = req.body;
                const device_in_groups = yield this.getOfDB(`SELECT device_group_id from user_device_group_match where user_group_id=$1`, [user_group_id]);
                const device_out_groups = yield this.getOfDB(`
                        SELECT dg.device_group_id from device_group dg where dg.device_group_id not in
                    (SELECT device_group_id from user_device_group_match where  user_group_id=$1)`, [user_group_id]);
                return res.json(Object.assign(Object.assign({}, this.success), { device_in_groups: device_in_groups.map((item) => item.device_group_id), device_out_groups: device_out_groups.map((item) => item.device_group_id) }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateDeviceForUserGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { user_group_id, device_in_group } = req.body;
                yield this.execute(`delete from user_device_group_matching where user_group_id=$1`, [user_group_id]);
                var device_in_group_Arry = device_in_group.split(',');
                yield this.execute(`insert into user_device_group_matching values ${device_in_group_Arry.map((item) => {
                    return "(" + user_group_id + "," + item + ")";
                }).join(',')}`, []);
                return res.json(Object.assign({}, this.success));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = UserGroupController;
