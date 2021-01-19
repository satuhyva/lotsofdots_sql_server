import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import unknownEndpoint from '../utils/unknownEndpoint'
import errorHandler from '../utils/errorHandler'
import votings from './routes/votings'
import answers from './routes/answers'
import environmentVariables from '../utils/configurations'


const app = express()


app.use(cors())
app.use(express.json())
if (environmentVariables.NODE_ENV !== 'test') {
    app.use(morgan('tiny'))
}


app.get('/healthz', (_request, response) => {
    response.send('OK')
})
app.use('/votings', votings)
app.use('/answers', answers)

app.use(unknownEndpoint)
app.use(errorHandler)


export default app