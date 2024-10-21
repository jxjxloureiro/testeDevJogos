"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
const database_1 = __importDefault(require("../src/repositories/database"));
const criarLog = (log, callback) => {
    const sql = 'INSERT INTO logs (idjogo, acao, data) VALUES (?, ?, ?)';
    const params = [log.idjogo, log.acao, log.data];
    database_1.default.run(sql, params, function (_err) {
        if (_err) {
            console.error('Erro ao inserir log:', _err.message);
            callback(undefined);
        }
        else {
            callback(this === null || this === void 0 ? void 0 : this.lastID);
        }
    });
};
const logRequest = (req, res, next) => {
    const logData = {
        idjogo: req.originalUrl.split('/').pop() ? Number(req.originalUrl.split('/').pop()) : null,
        acao: `${req.method} ${req.originalUrl}`,
        data: new Date()
    };
    criarLog(logData, (id) => {
        if (id) {
            console.log(`Log criado com sucesso. ID: ${id}`);
        }
        else {
            console.error('Erro ao criar o log.');
        }
    });
    next();
};
exports.logRequest = logRequest;
