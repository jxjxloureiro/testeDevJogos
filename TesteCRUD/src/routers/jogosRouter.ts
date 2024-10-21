import express from 'express'
import JogoModel from '../models/jogos'
import jogosRepository from '../repositories/jogosRepository'
import { logRequest } from '../../middlewares/log';

const jogosRouter = express.Router()
jogosRouter.use(logRequest);

jogosRouter.post('/jogos', (req, res) => {
    
    const jogo: JogoModel = req.body
    jogosRepository.criar(jogo, (id) => {
        if (id) {
            res.status(201).location(`/jogos/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

jogosRouter.get('/jogos', (req, res) => {
    jogosRepository.lerTodos((jogo) => res.json(jogo))
})

jogosRouter.get('/jogos/:id', (req, res) => {
    const id: number = +req.params.id
    jogosRepository.ler(id, (Jogo) => {
        if (Jogo) {
            res.json(Jogo)
        } else {
            res.status(404).send()
        }
    })
})

jogosRouter.put('/jogos/:id', (req, res) => {
    const id: number = +req.params.id
    jogosRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

jogosRouter.delete('/jogos/:id', (req, res) => {
    const id: number = +req.params.id
    jogosRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
export default jogosRouter