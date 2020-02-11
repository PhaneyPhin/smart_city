"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class User extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getRole = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var roles = yield this.getOfDB(`select * from role_master`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: roles }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var users = yield this.getOfDB(`select u.*,r.role_name from user_master u inner join role_master r on u.role_id=r.role_id`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: users }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.addUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, first_name, last_name, email, tel, icon_image, role_id } = req.body;
                yield this.execute(`
            insert into user_master values ($1,SHA1($2),$3,$4,$5,$6,$7,$8,1,null)`, [username, password, first_name, last_name, email, tel, icon_image, role_id]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.updateUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username, first_name, last_name, email, tel, icon_image, role_id } = req.body;
                yield this.execute(`
            update user_master set first_name=$2,last_name=$3,email=$4,tel=$5,icon_image=$6,role_id=$7 where username=$1`, [username, first_name, last_name, email, tel, icon_image, role_id]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                yield this.execute(`
            update user_master set flag='0' where username=$1`, [username]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.changePassword = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                yield this.execute(`
            update user_master set password=SHA1($2) where username=$1`, [username]);
                return res.json(this.success);
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.checkUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                var users = yield this.getOfDB(`select username from user_master where username=$1`, [username]);
                if (users.length == 0) {
                    return res.json(Object.assign(Object.assign({}, this.success), { isUserExist: false }));
                }
                else {
                    return res.json(Object.assign(Object.assign({}, this.success), { isUserExist: true }));
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserNoGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var users = yield this.getOfDB(`select * from user_master where flag='1' and user_group_id is null or user_group_id=''`, []);
                return res.json(Object.assign(Object.assign({}, this.success), { data: users }));
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getUserOfGroup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { user_group_id } = req.body;
                var users = yield this.getOfDB(`select * from user_master where flag='1' and user_group_id=$1`, [user_group_id]);
                return res.json(Object.assign(Object.assign({}, this.success), { data: users }));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = User;
