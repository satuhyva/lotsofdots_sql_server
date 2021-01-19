import database from '../database/databaseWithConfigurations'
import { ValidatedNewVoting } from '../types/ValidatedNewVoting'
import { DatabaseResponseIdOnly } from '../types/DatabaseResponseIdOnly'
import { Voting } from '../types/Voting'


const getVoting = async (votingNumber: string): Promise<Voting | null> => {

    let fetchedVoting: Voting | null = null
    await database.tx(async transaction => {
        fetchedVoting = await database.one(
            `SELECT question, voting_number, show_names, allowed_count, created, JSON_AGG(JSON_BUILD_OBJECT('id', NESTED.option_id, 'option_text', option_text,'option_voters', NESTED.votes)) AS option_votes FROM 
                (SELECT question, voting_number, show_names, allowed_count, created, option_text, option.id as option_id, ARRAY_AGG(name) as votes FROM voting 
                INNER JOIN option ON option.voting_id = voting.id AND option.deleted = $1 
                LEFT JOIN answer ON answer.option_id = option.id AND answer.deleted = $2
                WHERE voting_number = $3 AND voting.deleted = $4 
                GROUP BY question, voting_number, show_names, allowed_count, created, option_text, option.id) AS NESTED 
            GROUP BY NESTED.question, NESTED.voting_number, NESTED.show_names, NESTED.allowed_count, NESTED.created 
            `,
            [false, false, votingNumber, false])
        return transaction.batch([fetchedVoting])
    })
    return fetchedVoting
}



const createNewVoting = async (newVoting: ValidatedNewVoting): Promise<string | null> => {
    
    const newVotingNumber = await getUniqueRandomNumberString()
    const dateCreated = new Date()

    await database.tx(async transaction => {
        const createdNewVoting: DatabaseResponseIdOnly = await database.one(
            'INSERT INTO voting(question, created, voting_number, show_names, allowed_count) VALUES($1, $2, $3, $4, $5) RETURNING id',
            [newVoting.question, dateCreated, newVotingNumber, newVoting.showNames, newVoting.allowedCount])
            
        const votingIdArray = getVotingIdArray(createdNewVoting.id, newVoting.options.length)
        const addOptions = await database.none(
            'INSERT INTO option(voting_id, option_text) SELECT * FROM unnest($1, $2)',
            [votingIdArray, newVoting.options])    
        return transaction.batch([createdNewVoting, addOptions])
    })

    return newVotingNumber
}


export const getUniqueRandomNumberString = async (): Promise<string | null> => {
    let randomNumber = null
    let continueLooking = true
    while (continueLooking) {
        randomNumber = getRandomNumberWith6Digits()
        const idOfVotingWithNumber: DatabaseResponseIdOnly | null = await database.oneOrNone(
            'SELECT id FROM voting WHERE voting_number = $1 AND deleted = $2',
            [randomNumber, false]
        )
        if (!idOfVotingWithNumber) {
            continueLooking = false
        }
    }   
    return randomNumber 
}


export const getRandomNumberWith6Digits = (): string => {
    return Math.random().toString().substring(3, 9)
}
const getVotingIdArray = (votingId: number, count: number): number[] => {
    const array = new Array(count).fill(votingId) as number[]
    return array
}


export default {
    getVoting,
    createNewVoting,
}