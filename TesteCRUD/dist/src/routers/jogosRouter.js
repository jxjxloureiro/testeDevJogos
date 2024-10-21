"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jogosRepository_1 = __importDefault(require("../repositories/jogosRepository"));
const log_1 = require("../../middlewares/log");
const jogosRouter = express_1.default.Router();
jogosRouter.use(log_1.logRequest);
jogosRouter.post('/jogos', (req, res) => {
    const jogo = req.body;
    jogosRepository_1.default.criar(jogo, (id) => {
        if (id) {
            res.status(201).location(`/jogos/${id}`).send();
        }
        else {
            res.status(400).send();
        }
    });
});
jogosRouter.get('/jogos', (req, res) => {
    jogosRepository_1.default.lerTodos((jogo) => res.json(jogo));
});
jogosRouter.get('/jogos/:id', (req, res) => {
    const id = +req.params.id;
    jogosRepository_1.default.ler(id, (Jogo) => {
        if (Jogo) {
            res.json(Jogo);
        }
        else {
            res.status(404).send();
        }
    });
});
jogosRouter.put('/jogos/:id', (req, res) => {
    const id = +req.params.id;
    jogosRepository_1.default.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
jogosRouter.delete('/jogos/:id', (req, res) => {
    const id = +req.params.id;
    jogosRepository_1.default.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    });
});
exports.default = jogosRouter;
