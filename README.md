# Project 2: Rehearsal application

## Description

This is an application for rehearsing all kinds of topics by creating quizzes
and adding questions to those quizzes. Quizzes are sorted by the topic they
belong to. New topics can only be created by admins, but new questions can be
added to topics by anyone. Using the application requires the user to register.
After registering an logging in, the user can click "topics" to edit quizzes and
create new questions or "quizzes" to try out the existing quizzes.

## Online location of the app

The app can be found behind
[this link](https://rehearsal-application.herokuapp.com/).

## Running the app locally

The app can be run locally by opening a terminal in the folder that contains the
app and typing `docker-compose up` and then navigating to the address
[localhost:7777/](http://localhost:7777/) in the browser.

## Running the tests

The automatic tests can be run by typing this command into the terminal in the
folder that contains the app:

`docker-compose run --rm drill-and-practice deno test --allow-all`
