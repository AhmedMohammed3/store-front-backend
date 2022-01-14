# Store Front API

## Description

This project is an API that provide all the functionalities needed for an online store

### API Endpoints

1. Products

    1. Index <b>(GET /products)</b>
    2. Show <b>(GET /products/:id)</b>
    3. Create [token required] <b>(POST /products)</b>
    4. Top 5 most popular products <b>(GET /products/featured)</b>
    5. Products by category (args: product category) <b>(GET /products/category/:category)</b>

1. Users
    1. Index [token required] <b>(GET /users)</b>
    2. Show [token required] <b>(GET /users/:id)</b>
    3. Create N[token required] <b>(POST /users)</b>
1. Orders
    1. Create Order <b>(POST /orders)</b>
    2. Close Order <b>(PUT /orders/:orderId/close)</b>
    3. Current Order by user (args: user id)[token required] <b>(GET /orders/current/:userId)</b>
    4. Completed Orders by user (args: user id)[token required]<b>(GET /orders/completed/:userId)</b>

### ERD

![ERD](https://github.com/AhmedMohammed3/store-front-backend/blob/master/erd.PNG)

## Table of Contents

- [Store Front API](#store-front-api)
  - [Description](#description)
    - [API Endpoints](#api-endpoints)
    - [ERD](#erd)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [NOTES](#notes)
  - [How To Run The Server](#how-to-run-the-server)
  - [Contribute](#contribute)
    - [Adding new features or fixing bugs](#adding-new-features-or-fixing-bugs)

## Installation

1. Open your terminal and run the following commands:<br/>

    1. `git clone https://github.com/AhmedMohammed3/store-front-backend.git`
    2. `cd store-front-backend`
    3. `npm i`

2. Create a file called .env with the following keys and fill it with your own data:<br/>

    1. `PORT`
    2. `DB_HOST`
    3. `DB_USER`
    4. `DB_PASS`
    5. `DB_NAME=store_front`
    6. `DB_TEST_NAME=store_front_test`
    7. `JWT_SECRET`
    8. `BCRYPT_PEPPER`
    9. `BCRYPT_SALT`
    10. `ENV=dev`

3. Run the following set of commands to create your databases<br/>

    1. `psql -U {POSTGRES_USER}`
    2. `CREATE DATABASE store_front;`
    3. `CREATE DATABASE store_front_test;`
    4. `\q`

4. Run the following command to migrate tables:<br/>
    1. `npm run migrate`
5. Run the following command to seed the database:<br/>
    1. `psql -U {POSTGRES_USER} -d store_front -a -f ./seeds/seed.sql`

### NOTES

NOTE That DB is running on the default port 5432 so you don't need to add it to the .env file.

## How To Run The Server

1. Run the following command to start the server:<br/>
    1. `npm run start`

## Contribute

### Adding new features or fixing bugs

1. Open your terminal and clone the repository<br/>
   `git clone https://github.com/AhmedMohammed3/store-front-backend.git`
2. Create your branch<br/>
   `git checkout -b {YOUR_BRANCH_NAME}`
3. run `npm run dev` to start development server (It's automatically building and restarting).
4. Make your edits and review it well.
5. Commit your changes with appropriate message. Follow [these git style guides](https://udacity.github.io/git-styleguide/)<br/>
   `git commit -m {YOUR_COMMIT_MSG}`
6. Push your changes<br/>
   `git push origin {YOUR_BRANCH_NAME}`
7. Create a pull request
