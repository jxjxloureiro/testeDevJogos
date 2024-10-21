import JogoModel from "../models/jogos";
import database from "./database";

const jogosRepository = {
    criar: (jogo: JogoModel, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO jogos (nome, descricao, produtora, ano, idadeMinima) VALUES (?,?,?,?,?)'
        const params = [jogo.nome, jogo.descricao, jogo.produtora, jogo.ano, jogo.idadeMinima]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (jogos: JogoModel[]) => void) => {
        const sql = 'SELECT * FROM jogos'
        const params: any[] = []
        database.all(sql, params, (_err, rows:any) => {
            console.log(rows);
            callback(rows)
        })
    },
    ler: (id: number, callback: (Jogo?: JogoModel) => void) => {
        const sql = 'SELECT * FROM jogos WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row:any) => callback(row))
    },
    atualizar: (id: number, jogo: JogoModel, callback: (notFound: boolean) =>
    void) => {
        const sql ='UPDATE jogos SET nome = ?, descricao = ?, produtora = ?, ano = ?, idadeMinima = ? WHERE id = ?'
        const params = [jogo.nome, jogo.descricao, jogo.produtora, jogo.ano, jogo.idadeMinima, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM jogos WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}

export default jogosRepository