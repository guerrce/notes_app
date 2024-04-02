# notes_app

tools/frameworks/libraries used:
front end:
React, Material UI, styled components, axios

backend:
node, express, prisma

database:
postgress

deployment (AWS):
Amplify, EC2, API Gateway

public URL: https://main.dog5okgjaa0mb.amplifyapp.com/


Steps to run locally:

install postgresql
start postrgesql
make a user
set user password
make a database named notes_db

go to notes_api
install backend dependancies
make a .env file with the following field

DATABASE_URL="postgresql://<username>:<user_password>@localhost:5432/notes_db"

run prisma migration

start backend server


go to front_end
install front_end dependancies
start front end server

navigate to http://localhost:3000/
