import { Router } from 'express'
import votingsService from '../services/votingsService'
import toValidatedNewVoting from '../../utils/toValidatedNewVoting'
import { ValidatedNewVoting } from '../types/ValidatedNewVoting'
import ServerError from '../../utils/ServerError'
import toValidatedVotingNumber from '../../utils/toValidatedVotingNumber'


const votingsRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
votingsRouter.post('/', async (request, response, next) => {

    let newVoting: ValidatedNewVoting
    try {
        newVoting = toValidatedNewVoting(request.body)
    } catch (error) {
        next(error)
        return 
    }
    
    try {
        const createdNewVotingNumber = await votingsService.createNewVoting(newVoting)
        response.json(createdNewVotingNumber) 
    } catch (error) {
        const serverError: ServerError = error as ServerError
        serverError.addedMessage = 'Error in creating new voting.'
        serverError.addedStatusCode = 500
        serverError.addedType = 'InternalError'
        next(serverError)
    }
})


// eslint-disable-next-line @typescript-eslint/no-misused-promises
votingsRouter.get('/:votingNumber', async (request, response, next) => {

    let votingNumber: string
    try {
        votingNumber = toValidatedVotingNumber(request.params)
    } catch (error) {
        next(error)
        return 
    }
    try {
        const voting = await votingsService.getVoting(votingNumber)
        response.json(voting) 
    } catch (error) {
        console.log('error', error)
        const serverError: ServerError = error as ServerError
        serverError.addedMessage = 'Error in getting the voting.'
        serverError.addedStatusCode = 500
        serverError.addedType = 'InternalError'
        next(serverError)
    }
})

export default votingsRouter

    



