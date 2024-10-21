"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const jogosRepository = {
    criar: (jogo, callback) => {
        const sql = 'INSERT INTO jogos (nome, descricao, produtora, ano, idadeMinima) VALUES (?,?,?,?,?)';
        const params = [jogo.nome, jogo.descricao, jogo.produtora, jogo.ano, jogo.idadeMinima];
        database_1.default.run(sql, params, function (_err) {
            callback(this === null || this === void 0 ? void 0 : this.lastID);
        });
    },
    lerTodos: (callback) => {
        const sql = 'SELECT * FROM jogos';
        const params = [];
        database_1.default.all(sql, params, (_err, rows) => {
            console.log(rows);
            callback(rows);
        });
    },
    ler: (id, callback) => {
        const sql = 'SELECT * FROM jogos WHERE id = ?';
        const params = [id];
        database_1.default.get(sql, params, (_err, row) => callback(row));
    },
    atualizar: (id, jogo, callback) => {
        const sql = 'UPDATE jogos SET nome = ?, descricao = ?, produtora = ?, ano = ?, idadeMinima = ? WHERE id = ?';
        const params = [jogo.nome, jogo.descricao, jogo.produtora, jogo.ano, jogo.idadeMinima, id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
    apagar: (id, callback) => {
        const sql = 'DELETE FROM jogos WHERE id = ?';
        const params = [id];
        database_1.default.run(sql, params, function (_err) {
            callback(this.changes === 0);
        });
    },
};
exports.default = jogosRepository;
