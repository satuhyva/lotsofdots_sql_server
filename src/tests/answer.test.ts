import supertest from 'supertest'
import app from '../app'
const server = supertest(app)
import  functions from './testHelperFunctions'
import { Voting } from '../types/Voting'


describe('ADD ANSWERS TO VOTING', () => {

    test('Answers to a voting can be added if proper input data is provided.', async () => {
        const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
        const votingNumber = String(response.body)
        const votingResponse = await functions.getVoting(server, votingNumber) as Response
        const voting = votingResponse.body as unknown as Voting
        const optionIds = voting.option_votes.map(item => {
            return item.id
        })
        const addAnswersResponse = await functions.addAnswers(server, 'Sanna Marin', optionIds) as Response
        expect(addAnswersResponse.status).toBe(200)
        expect(addAnswersResponse.body).toContain('successfully')
    })

    test('Answers to a voting can be added even without the name.', async () => {
        const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
        const votingNumber = String(response.body)
        const votingResponse = await functions.getVoting(server, votingNumber) as Response
        const voting = votingResponse.body as unknown as Voting
        const optionIds = voting.option_votes.map(item => {
            return item.id
        })
        const addAnswersResponse = await functions.addAnswers(server, null, optionIds) as Response
        expect(addAnswersResponse.status).toBe(200)
        expect(addAnswersResponse.body).toContain('successfully')
    })


    describe('Errors related to adding name', () => { 

        test('Answers to a voting cannot be added if name is of wrong data type (number).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const votingNumber = String(response.body)
            const votingResponse = await functions.getVoting(server, votingNumber) as Response
            const voting = votingResponse.body as unknown as Voting
            const optionIds = voting.option_votes.map(item => {
                return item.id
            })
            const addAnswersResponse = await functions.addAnswers(server, 2, optionIds) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('name')
            expect(addAnswersResponse.body).toContain('not a string')
        })

        test('Answers to a voting cannot be added if name is of wrong data type (boolean).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const votingNumber = String(response.body)
            const votingResponse = await functions.getVoting(server, votingNumber) as Response
            const voting = votingResponse.body as unknown as Voting
            const optionIds = voting.option_votes.map(item => {
                return item.id
            })
            const addAnswersResponse = await functions.addAnswers(server, true, optionIds) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('name')
            expect(addAnswersResponse.body).toContain('not a string')
        })

        test('Answers to a voting cannot be added if name is of wrong data type (array of strings).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const votingNumber = String(response.body)
            const votingResponse = await functions.getVoting(server, votingNumber) as Response
            const voting = votingResponse.body as unknown as Voting
            const optionIds = voting.option_votes.map(item => {
                return item.id
            })
            const addAnswersResponse = await functions.addAnswers(server, ['Sanna Marin', 'Angela Merkel'], optionIds) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('name')
            expect(addAnswersResponse.body).toContain('not a string')
        })

    })

    describe('Errors related to adding answers', () => { 

        test('Answers to a voting cannot be added if answers are missing.', async () => {
            await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const addAnswersResponse = await functions.addAnswers(server, 'Angela Merkel', null) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('answers')
            expect(addAnswersResponse.body).toContain('not a number array')
        })

        test('Answers to a voting cannot be added if answers are of wrong data type (string array).', async () => {
            await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const addAnswersResponse = await functions.addAnswers(server, 'Angela Merkel', ['1', '2']) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('answers')
            expect(addAnswersResponse.body).toContain('not a number array')
        })

        test('Answers to a voting cannot be added if answers are of wrong data type (string).', async () => {
            await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const addAnswersResponse = await functions.addAnswers(server, 'Angela Merkel', '1') as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('answers')
            expect(addAnswersResponse.body).toContain('not a number array')
        })

        test('Answers to a voting cannot be added if answers are of wrong data type (boolean).', async () => {
            await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const addAnswersResponse = await functions.addAnswers(server, 'Angela Merkel', true) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('answers')
            expect(addAnswersResponse.body).toContain('not a number array')
        })

        test('Answers to a voting cannot be added if answers are of wrong data type (simple number).', async () => {
            await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const addAnswersResponse = await functions.addAnswers(server, 'Angela Merkel', 2) as Response
            expect(addAnswersResponse.status).toBe(400)
            expect(addAnswersResponse.body).toContain('answers')
            expect(addAnswersResponse.body).toContain('not a number array')
        })

    })


})