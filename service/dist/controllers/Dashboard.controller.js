"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBHelper_1 = tslib_1.__importDefault(require("../connection/DBHelper"));
const moment_1 = tslib_1.__importDefault(require("moment"));
var async = require('async');
class DashboardController extends DBHelper_1.default {
    constructor() {
        super(...arguments);
        this.getChartOption = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { chart_type_id, chart_name, series, height } = req.body;
            console.log(req.body);
            try {
                var charts = yield this.getOfDB(`select * from chart_type where chart_type_id=$1`, [chart_type_id]);
                console.log(charts);
                if (charts.length > 0) {
                    var option = JSON.parse(charts[0].chart_type_option);
                    option.title = { text: chart_name };
                    option.height = height;
                    option.series = [];
                    async.eachSeries(series, (item, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        var { column_name, device_id } = item;
                        console.log(item);
                        var sql = `select "date",${column_name} as column from "${device_id}" where ${column_name} is not null order by "date" `;
                        console.log(sql);
                        var serieData = yield this.getOfDB(sql, []);
                        console.log(serieData);
                        option.series.push({
                            name: column_name,
                            data: serieData.map((item1) => {
                                var { date, column } = item1;
                                return [moment_1.default(date).valueOf(), column];
                            })
                        });
                        next();
                    }), () => {
                        return res.json(Object.assign(Object.assign({}, this.success), { chartOption: option }));
                    });
                }
                else {
                    return res.json({ code: -1, messsage: 'no data' });
                }
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.getChartType = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var chart_titles = yield this.getOfDB(`select chart_type_id,chart_type_name from chart_type`, []);
                console.log(111);
                return res.json(Object.assign(Object.assign({}, this.success), { data: chart_titles }));
            }
            catch (e) {
                return res.json(e);
            }
        });
    }
}
exports.default = DashboardController;
