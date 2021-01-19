import ServerError from './ServerError'
import { Request, Response, NextFunction } from 'express'


const unknownEndpoint = (request: Request, _response: Response, next: NextFunction): void => {
    const message = `UNKNOWN ENDPOINT! Caused by a ${request.method} request to ${request.url}.`
    const serverError = new ServerError(404, 'Unknown endpoint', message)
    return next(serverError)
}


export default unknownEndpoint