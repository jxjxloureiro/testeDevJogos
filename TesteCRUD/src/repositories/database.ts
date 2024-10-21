import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';

const SQL_JOGOS_CREATE = `
    CREATE TABLE IF NOT EXISTS jogos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        descricao TEXT,
        produtora TEXT,
        ano NUMBER,
        idadeMinima NUMBER
    )`;

const SQL_LOGS_CREATE = `
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idjogo INTEGER,
        acao TEXT NOT NULL,
        data DATE NOT NULL,
        FOREIGN KEY (idjogo) REFERENCES jogos(id)
    )`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Base de dados conectada com sucesso.');

        database.run(SQL_JOGOS_CREATE, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela jogos:', err.message);
            } else {
                console.log('Tabela jogos criada com sucesso.');
            }
        });

        database.run(SQL_LOGS_CREATE, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela logs:', err.message);
            } else {
                console.log('Tabela logs criada com sucesso.');
            }
        });
    }
});

export default database;
