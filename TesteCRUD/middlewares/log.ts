import { Request, Response, NextFunction } from 'express';
import database from '../src/repositories/database';

const criarLog = (log: { idjogo: number | null, acao: string, data: Date }, callback: (id?: number) => void) => {
    const sql = 'INSERT INTO logs (idjogo, acao, data) VALUES (?, ?, ?)';
    const params = [log.idjogo, log.acao, log.data];
    database.run(sql, params, function(_err) {
        if (_err) {
            console.error('Erro ao inserir log:', _err.message);
            callback(undefined);
        } else {
            callback(this?.lastID);
        }
    });
};

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const logData = {
        idjogo: req.originalUrl.split('/').pop() ? Number(req.originalUrl.split('/').pop()) : null,
        acao: `${req.method} ${req.originalUrl}`,
        data: new Date()
    };

    criarLog(logData, (id) => {
        if (id) {
            console.log(`Log criado com sucesso. ID: ${id}`);
        } else {
            console.error('Erro ao criar o log.');
        }
    });

    next();
};

export { logRequest };
