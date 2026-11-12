import { Types } from 'mongoose';

export const sampleIds = {
  author: new Types.ObjectId('65a000000000000000000001'),
  answerAuthor: new Types.ObjectId('65a000000000000000000002'),
  question: new Types.ObjectId('65a000000000000000000003'),
  answer: new Types.ObjectId('65a000000000000000000004'),
  tag: new Types.ObjectId('65a000000000000000000005'),
};

const postedOn = new Date('2024-01-15T10:00:00.000Z');

export const sampleData = {
  users: [
    {
      _id: sampleIds.author,
      fixtureKey: 'codask-sample-author',
      email: 'sample-author@example.invalid',
      password: '!login-disabled!',
      first_name: 'Alex',
      last_name: 'Example',
      course_type: 'Web Development',
      questions: [sampleIds.question],
      answers: [],
      saved_tags: [sampleIds.tag],
    },
    {
      _id: sampleIds.answerAuthor,
      fixtureKey: 'codask-sample-answer-author',
      email: 'sample-answer-author@example.invalid',
      password: '!login-disabled!',
      first_name: 'Sam',
      last_name: 'Example',
      course_type: 'Web Development',
      questions: [],
      answers: [sampleIds.answer],
      saved_tags: [],
    },
  ],
  questions: [
    {
      _id: sampleIds.question,
      fixtureKey: 'codask-sample-question',
      author: sampleIds.author,
      posted_on: postedOn,
      title: 'How can I center a div with CSS?',
      problem_description: 'I want to center an element inside its container.',
      solution_tried: 'I tried setting a margin on the element.',
      module: 'CSS',
      tags: [sampleIds.tag],
      answers: [sampleIds.answer],
      saved_by: [],
      status: 'unanswered',
    },
  ],
  answers: [
    {
      _id: sampleIds.answer,
      fixtureKey: 'codask-sample-answer',
      author: sampleIds.answerAuthor,
      question: sampleIds.question,
      posted_on: new Date('2024-01-15T11:00:00.000Z'),
      message: 'Try using flexbox with justify-content and align-items.',
      votes: [],
    },
  ],
  tags: [
    {
      _id: sampleIds.tag,
      fixtureKey: 'codask-sample-tag',
      name: 'CSS',
      description: 'Questions about Cascading Style Sheets.',
      related_questions: [sampleIds.question],
      course_type: 'Web Development',
    },
  ],
};
