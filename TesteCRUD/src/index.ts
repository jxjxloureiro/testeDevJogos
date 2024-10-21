import express, { urlencoded } from 'express'
import cors from 'cors'
import jogosRouter from './routers/jogosRouter'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})

app.use(cors());

app.use('/api', jogosRouter)

app.use((req, res) => {
    res.status(404)
})
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})