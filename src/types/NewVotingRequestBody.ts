export interface NewVotingRequestBody {
    question?: string,
    showNames?: boolean,
    allowedCount?: number,
    options?: string[]
}