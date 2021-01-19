import supertest from 'supertest'



const createNewVoting = async (
        server: supertest.SuperTest<supertest.Test>,
        question: unknown,
        showNames: unknown,
        allowedCount: unknown,
        options: unknown
    ): Promise<unknown> => {

    let newVoting = {}
    if (question !== null) {
        newVoting = { ...newVoting, question: question}
    }
    if (showNames !== null) {
        newVoting = { ...newVoting, showNames: showNames}
    }
    if (allowedCount !== null) {
        newVoting = { ...newVoting, allowedCount: allowedCount}
    }
    if (options !== null) {
        newVoting = { ...newVoting, options: options}
    }

    const response = await server
        .post('/votings')
        .send(newVoting)
    return response
}


const getVoting = async (
    server: supertest.SuperTest<supertest.Test>,
    votingNumber: string
): Promise<unknown> => {
    const response = await server
        .get(`/votings/${votingNumber}`)
        .send()
    return response
}


const addAnswers = async (
    server: supertest.SuperTest<supertest.Test>,
    name: unknown,
    answers: unknown
): Promise<unknown> => {

    let answersToSend = {}
    if (name !== null) {
        answersToSend = { ...answersToSend, name: name}
    }
    if (answers !== null) {
        answersToSend = { ...answersToSend, answers: answers}
    }

    const response = await server
        .post('/answers')
        .send(answersToSend)
    return response
}



export default {
    createNewVoting,
    getVoting,
    addAnswers
}