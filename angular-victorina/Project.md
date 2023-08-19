## Description

An Angular based project on which you can create and play trivia questions.

## Installation

Steps to open the project:

1. Navigate to the project directory: `cd my-angular-project`
2. Install dependencies: `npm install`
3. Run the server `ng s`

## Usage

How to run my Angular project:

- Run development server: `ng serve`
- Open a web browser and go to: `http://localhost:4200`

## Features

1. Authorization on Sign up, Sing in which uses a firebase Auth service.
2. Validation on Sign up, Sign in and Trivia creation.
3. Browsing function so you can see every project created by user.
4. Each user can delete their own quiz.
5. You can your own or other peoples quizes and at the end you get a screen with your correct and incorrect answers.
6. Route guards so that only registered users can play or create trivia questions.

## Structure

1. Each user have their own user collection from firebase authorisation with Email, password, username and generated Id.
2. Each quiz has their own Firestore collection with the quiz having a quizId, author, authorId, title, description, questionCount, and questions.
3. Each question is an Object with a title for the question 4 answers a correct answer in form of a number and a generated Id.

## Dependencies

1. Firebase 9.16 for backend including firebaseStore and firebaseAuthorization
2. uuid for generating Ids.
3. angular 16.
4. rxjs 7.8.0.
