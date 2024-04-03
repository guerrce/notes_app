# notes_app

## tools/frameworks/libraries used:
### front end:
React, Material UI, styled components, axios

### backend:
node, express, prisma

### database:
postgress

### deployment (AWS):
Amplify, EC2, API Gateway

## public URL:
https://main.dog5okgjaa0mb.amplifyapp.com/


## Steps to run locally:
### Install homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install node with nvm
```
brew install nvm
nvm install 20
nvm use 20
```


### install and start postgresql
install using homebrew
```
brew install postgresql
```
start the server
```
pg_ctl -D /usr/local/var/postgres start
```
connect to the server
```
psql postgres
```

Once you're inside the postgres server create a database
```
CREATE DATABASE notes_db;
```

*Optional: make a new user and set it as the owner of the db
```
CREATE USER <username>;
ALTER USER <username> WITH SUPERUSER;
ALTER USER <username> WITH PASSWORD <user_pw>;
ALTER DATABASE notes_db OWNER TO <username>;
```

### Clone the repo
```
git clone https://github.com/guerrce/notes_app.git
```

This is a mono repo, so both the front end and the back end are in this repo


### Set up and start the backend
go to the back end folder
```
cd notes_app/notes_api
```

install backend dependancies
```
npm install
```

make a .env file with the following field
```
DATABASE_URL="postgresql://<username>:<user_password>@localhost:5432/notes_db"
```

run the migration
```
npx prisma migrate dev --name init
```

start backend server
```
npm start
```


### Set up and start the backend
Open a new terminal window
go to front end folder
```
cd /notes_app/front_end
```

install front_end dependancies
```
npm install
```

start front end server
```
npm start
```

navigate to `http://localhost:3000/`
