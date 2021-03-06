"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
class Invoice extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getInvoiceHistory = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { place_id, start_date, end_date } = req.body;
            if (place_id == undefined || start_date == undefined || end_date == undefined) {
                return res.json({ code: -1, message: "please check parameter" });
            }
            else {
                try {
                    console.log(req.headers.customer_id);
                    var invoices = yield this.getOfDB(`select i.invoice_id from invoice_master i
                    inner join fee_master f on i.fee_id=f.fee_id
                    inner join customer_place cp on f.place_id=cp.place_id
                where cp.customer_id=$1`, [req.headers.customer_id]);
                    res.json(invoices);
                }
                catch (e) {
                    res.json(e);
                }
            }
        });
    }
}
exports.default = Invoice;
