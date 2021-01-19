import { ValidatedVotingAnswers } from '../src/types/ValidatedVotingAnswers'
import { VotingAnswersRequestBody } from '../src/types/VotingAnswersRequestBody'
import ServerError from './ServerError'


const toValidatedAnswers = (requestBody: unknown): ValidatedVotingAnswers => {
    const body = requestBody as VotingAnswersRequestBody

    return {
        name: parseName(body.name),
        answers: parseAnswers(body.answers)
    }
}


const parseName = (name: unknown): string | null => {
    if (name === undefined) return null
    if (!isString(name)) {
        throw new ServerError(400, 'InputError', 'Voter name is not a string value.')
    }
    return name
}


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const parseAnswers = (answers: unknown): number[] => {
    if (!answers || !isArrayOfNumbers(answers)) {
        throw new ServerError(400, 'InputError', 'Voting answers is missing or is not a number array value.')
    }
    return answers
}

const isArrayOfNumbers = (array: unknown): array is number[] => {
    return Array.isArray(array) && array.every(item => isNumber(item)) && array.length > 0
}

const isNumber = (number: unknown): boolean => {
    return typeof number === 'number' || number instanceof Number
}

export default toValidatedAnswers