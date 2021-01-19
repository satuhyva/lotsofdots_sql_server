import { OptionVote } from './OptionVote'

export interface Voting {
    question: string,
    voting_number: string,
    show_names: boolean,
    allowed_count: number,
    created: string,
    option_votes: OptionVote[]
}



