import { Request, Response, NextFunction } from 'express'
import ServerError from './ServerError'


const errorHandler = (error: Error | ServerError, _request: Request, response: Response, next: NextFunction): Response | void => {
    
    const errorIsOfTypeServerError = checkIfErrorIsOfTypeServerError(error)
    if (errorIsOfTypeServerError) {
        const errorAsServerError: ServerError = error as ServerError
        return response.status(errorAsServerError.addedStatusCode).json(errorAsServerError.addedMessage)
    }
    next(error)
    return
}

const checkIfErrorIsOfTypeServerError = (error: Error | ServerError): boolean => {
    if ((error as ServerError).addedMessage && (error as ServerError).addedStatusCode && (error as ServerError).addedType) {
        return true
    }
    return false
}

export default errorHandler

