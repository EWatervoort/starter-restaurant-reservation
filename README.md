# Periodic Tables
_Capstone Project for Thinkful_

## Summary
A full stack application reservation system.  This application is an internal tool for employees to manage reservations.

Key Features
- create, edit, or cancel a reservation
- create a table
- seat a reservation at a table
- clear a reservation from a table
- search for reservations by phone number

## Link
[Periodic Tables](https://restaurant-client17.herokuapp.com/dashboard)

## Stack
- React
- Node
- Bootstrap
- CSS
- Express
- PostgreSQL
- Knex

## Instalation

Navigate to the root of the repository and install dependencies.
```bash
npm install
```

To run the tests
```bash
npm run test
```

To start the application in development mode locally
```bash
npm run start:dev
```


## API Documentation

| Route                                | Description                                                                       | Method(s)  |
| ------------------------------------ | --------------------------------------------------------------------------------- | ---------- |
| /reservations                        | Returns a list of reservations for the current date or creates a new reservation  | GET/POST   |
| /reservations/:reservation_id        | Returns a reservation from the given id or updates the reservation                | GET/PUT    |
| /reservations/:reservation_id/status | Updates the reservation status                                                    | PUT        |
| /tables                              | Returns a list of tables or creates a new table                                   | GET/POST   |
| /tables/:table_id/seat               | Updates or deletes the reservation for the given table id                         | PUT/DELETE |


