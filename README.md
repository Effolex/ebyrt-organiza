
# ebyrt-organiza



The project is using SupaBase to host the DataBase

Two heroku nodeJS apps (a proxy and the API itself)

and the Frontend is deployed at Vercel

so your connhection will go as follows:

frontend -> proxy -> api -> db

### Please be patient, the servers get dorment, if you get internal error or 500, try again until the servers are all up at the same time.

## Run Locally

Clone the project

```bash
  git clone git@github.com:Effolex/ebyrt-organiza.git
```

### Frontend

Go to the project directory

```bash
  cd ebyrt-organiza/frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


### Backend

Go to the project directory

```bash
  cd ebyrt-organiza/backend
```

Install dependencies

```bash
  npm install
```

Create a .env key 

```bash
  touch .env
```

Set it to your PostgreSql connection

```bash
  echo "DATABASE_URL=postgres://user:pass@localhost/dbname/postgres?pgbouncer=true"
```

create tables in your PostgreSql

```bash
  npx prisma migrate
```

Build the server

```bash
  npm run build
```



Start the server

```bash
  npm start
```

