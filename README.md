# Hacktober Fest
This project use React + SurrealDB to create a template app

## Setup
Use `npx json-server -p 3500 -w data/db.json` to launch a backend server

### SurrealDB
User `npm install --save surrealdb.js` to install surrealdb sdk

#### Local secrets

```
REACT_APP_NEXT_PUBLIC_SURREAL_ENDPOINT=http://localhost:8000/
REACT_APP_NEXT_PUBLIC_SURREAL_NAMESPACE=org
REACT_APP_NEXT_PUBLIC_SURREAL_DATABASE=users
REACT_APP_ADMIN_PASS=your_pass
REACT_APP_ADMIN_NAME=your_name
```