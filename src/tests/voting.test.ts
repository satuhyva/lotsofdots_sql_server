import supertest from 'supertest'
import app from '../app'
const server = supertest(app)
import { getRandomNumberWith6Digits } from '../services/votingsService'
import  functions from './testHelperFunctions'
import { Voting } from '../types/Voting'


describe('CREATE NEW VOTING', () => {

    test('A random number with 6 digits can be created.', () => {
        const randomNumber = getRandomNumberWith6Digits()
        expect(typeof randomNumber).toBe('string')
        expect(typeof Number(randomNumber)).toBe('number')
        const numberRegex = /^[0-9]{6}/
        expect(numberRegex.test(randomNumber)).toBe(true)
    })

    test('A new voting can be created and voting number returned if proper input data is provided.', async () => {
        const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
        expect(response.status).toBe(200)
        const newVotingNumber = String(response.body)
        const numberRegex = /^[0-9]{6}/
        expect(numberRegex.test(newVotingNumber)).toBe(true)
    })


    describe('Errors related to voting question', () => {

        test('A new voting cannot be created if question is missing.', async () => {
            const response = await functions.createNewVoting(server, null, true, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('question')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if question is undefined.', async () => {
            const response = await functions.createNewVoting(server, null, true, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('question')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if question is of wrong data type (number).', async () => {
            const response = await functions.createNewVoting(server, 23456, true, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('question')
            expect(response.body).toContain('not a string')
        })

        test('A new voting cannot be created if question is of wrong data type (array).', async () => {
            const response = await functions.createNewVoting(server, ['one', 'two'], true, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('question')
            expect(response.body).toContain('not a string')
        })
    })


    describe('Errors related to showing voting names', () => {

        test('A new voting cannot be created if show names is missing.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', null, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('show names')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if show names is undefined.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', undefined, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('show names')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if show names is of wrong data type (string).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', 'some string', true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('show names')
            expect(response.body).toContain('not a boolean')
        })

        test('A new voting cannot be created if show names is of wrong data type (number).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', 12345, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('show names')
            expect(response.body).toContain('not a boolean')
        })

        test('A new voting cannot be created if show names is of wrong data type (array).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', [1, 2, 3], true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('show names')
            expect(response.body).toContain('not a boolean')
        })
    })


    describe('Errors related to allowed answers count', () => {

        test('A new voting cannot be created if allowed count is missing.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, null, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('allowed count')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if allowed count is undefined.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, undefined, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('allowed count')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if allowed count is of wrong data type (string).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 'some string', ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('allowed count')
            expect(response.body).toContain('not a number')
        })

        test('A new voting cannot be created if allowed count is of wrong data type (boolean).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, true, ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('allowed count')
            expect(response.body).toContain('not a number')
        })

        test('A new voting cannot be created if allowed count is of wrong data type (array).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, [1, 2, 3], ['option 1', 'option 2', 'option 3']) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('allowed count')
            expect(response.body).toContain('not a number')
        })
    })



    describe('Errors related to options', () => {

        test('A new voting cannot be created if options is missing.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 2, null) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('options')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if options is undefined.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 2, undefined) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('options')
            expect(response.body).toContain('missing')
        })

        test('A new voting cannot be created if options is of wrong data type (plain string).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 2, 'option 1') as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('options')
            expect(response.body).toContain('not a string array')
        })

        test('A new voting cannot be created if options is of wrong data type (boolean).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 2, true) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('options')
            expect(response.body).toContain('not a string array')
        })

        test('A new voting cannot be created if options is of wrong data type (array of numbers).', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 2, [1, 2, 3]) as Response
            expect(response.status).toBe(400)
            expect(response.body).toContain('options')
            expect(response.body).toContain('not a string array')
        })
    })



    describe('Voting can be created and voting data retrieved from database.', () => {

        test('Answers to a voting can be added if proper input data is provided.', async () => {
            const response = await functions.createNewVoting(server, 'Some question', true, 3, ['option 1', 'option 2', 'option 3']) as Response
            const votingNumber = String(response.body)
            const votingResponse = await functions.getVoting(server, votingNumber) as Response
            const voting = votingResponse.body as unknown as Voting
            const optionIds = voting.option_votes.map(item => {
                return item.id
            })
            await functions.addAnswers(server, 'Sanna Marin', optionIds)
            await functions.addAnswers(server, 'Angela Merkel', optionIds)
            const votingWithVotesResponse = await functions.getVoting(server, votingNumber) as Response
            const votingWithVotes = votingWithVotesResponse.body as unknown as Voting
            expect(votingWithVotes.question).toBe('Some question')
            expect(votingWithVotes.voting_number).toBe(votingNumber)
            expect(votingWithVotes.show_names).toBe(true)
            expect(votingWithVotes.allowed_count).toBe(3)
            expect(votingWithVotes.option_votes.length).toBe(3)
            expect(votingWithVotes.option_votes[0].option_text).toContain('option')
            expect(votingWithVotes.option_votes[0].option_voters.length).toBe(2)
            expect(votingWithVotes.option_votes[0].option_voters.sort()[0]).toBe('Angela Merkel')
            expect(votingWithVotes.option_votes[0].option_voters.sort()[1]).toBe('Sanna Marin')
        })
    })



})