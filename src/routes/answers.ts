import { Router } from 'express'
import answersService from '../services/answersService'
import toValidatedAnswers from '../../utils/toValidatedAnswers'
import { ValidatedVotingAnswers } from '../types/ValidatedVotingAnswers'
import ServerError from '../../utils/ServerError'


const answersRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
answersRouter.post('/', async (request, response, next) => {

    let votingAnswers: ValidatedVotingAnswers
    try {
        votingAnswers = toValidatedAnswers(request.body)
    } catch (error) {
        next(error)
        return 
    }
    
    try {
        await answersService.addAnswersToVoting(votingAnswers)
        response.status(200).json('Answers successfully added!')
    } catch (error) {
        const serverError: ServerError = error as ServerError
        serverError.addedMessage = 'Error in adding answers to a voting.'
        serverError.addedStatusCode = 500
        serverError.addedType = 'InternalError'
        next(serverError)
    }
})

export default answersRouter
