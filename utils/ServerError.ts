class ServerError extends Error {

    addedStatusCode: number
    addedMessage: string
    addedType: string

    constructor(addedStatusCode: number, addedType: string, addedMessage: string) {
        super()
        this.addedStatusCode = addedStatusCode
        this.addedMessage = addedMessage
        this.addedType = addedType
    }

}

export default ServerError


