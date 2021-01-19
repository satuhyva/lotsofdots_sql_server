import environmentVariables from '../utils/configurations'
import http from 'http'
import app from './app'


const server = http.createServer(app)
const PORT = environmentVariables.PORT


server.listen(PORT, () => {
    console.log(`LotsOfDots sql server running on port ${PORT as string}`)
})

