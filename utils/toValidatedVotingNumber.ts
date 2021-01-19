import ServerError from './ServerError'
import { VotingNumberRequestParams } from '../src/types/VotingNumberRequestParams'


const toValidatedVotingNumber = (requestParams: unknown): string => {
    const params = requestParams as VotingNumberRequestParams
    return parseVotingNumber(params.votingNumber)
}


const parseVotingNumber = (votingNumber: unknown): string => {
    if (!votingNumber || !isString(votingNumber) || !isOfCorrectLength(votingNumber)) {
        throw new ServerError(400, 'InputError', 'Voting number is not a string value or is not of correct length.')
    }
    return votingNumber
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isOfCorrectLength = (text: string): boolean => {
    return text.length === 6
}


export default toValidatedVotingNumber