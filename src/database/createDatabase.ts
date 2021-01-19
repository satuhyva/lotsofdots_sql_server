import pg from 'pg'
import { queryCreateTableVoting } from './voting'
import { queryCreateTableOption } from './option'
import { queryCreateTableAnswer } from './answer'


const databaseConfigurations = {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'postgres',
    password: 'postgres',
    ssl: false
}

const client = new pg.Client(databaseConfigurations)


const createOrResetDatabase = () => {
    const query =   'DROP TABLE IF EXISTS answer; ' +
                    'DROP TABLE IF EXISTS option; ' +
                    'DROP TABLE IF EXISTS voting; '
        .concat(queryCreateTableVoting)
        .concat(queryCreateTableOption)
        .concat(queryCreateTableAnswer)
    
    client
        .query(query)
        .then(() => {
            console.log('Tables reset or created succesfully!')
            void client.end()
            process.exit()
        })
        .catch(error => {
            console.log(error)
            process.exit()
        })
}



client.connect(error => {
    if (error) throw error
    createOrResetDatabase()
})
