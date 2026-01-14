import {Types, Document} from "mongoose";

export interface Question extends Document {
    author: Types.ObjectId,
    posted_on: Date,
    title: string,
    problem_description: string,
    solution_tried: string,
    module: string,
    github_repo: string,
    status: string,
    tags: Types.ObjectId[],
    answers: Types.ObjectId[],
    saved_by: Types.ObjectId[]
}