import { ValidatedNewVoting } from '../src/types/ValidatedNewVoting'
import { NewVotingRequestBody } from '../src/types/NewVotingRequestBody'
import ServerError from './ServerError'


const toValidatedNewVoting = (requestBody: unknown): ValidatedNewVoting => {
    const body = requestBody as NewVotingRequestBody
    return {
        question: parseQuestion(body.question),
        showNames: parseShowNames(body.showNames),
        allowedCount: parseAllowedCount(body.allowedCount),
        options: parseOptions(body.options)
    }
}

const parseQuestion = (question: unknown): string => {
    if (!question || !isString(question)) {
        throw new ServerError(400, 'InputError', 'Voting parameter "question" is missing or is not a string value.')
    }
    return question
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const parseShowNames = (showNames: unknown): boolean => {
    if (showNames === undefined || showNames === null || !isBoolean(showNames)) {
        throw new ServerError(400, 'InputError', 'Voting parameter "show names" is missing or is not a boolean value.')
    }
    return showNames
}

const isBoolean = (value: unknown): value is boolean => {
    return typeof value === 'boolean' || value instanceof Boolean
}

const parseAllowedCount = (allowedCount: unknown): number => {
    if (!allowedCount || !isNumber(allowedCount)) {
        throw new ServerError(400, 'InputError', 'Voting parameter "allowed count" is missing or is not a number value.')
    }
    return allowedCount
}

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number
}

const parseOptions = (options: unknown): string[] => {
    if (!options || !isArrayOfStrings(options)) {
        throw new ServerError(400, 'InputError', 'Voting parameter "options" is missing or is not a string array value.')
    }
    return options
}

const isArrayOfStrings = (options: unknown): options is string[] => {
    return Array.isArray(options) && options.length > 0 && options.every(option => isString(option))
}



export default toValidatedNewVoting


