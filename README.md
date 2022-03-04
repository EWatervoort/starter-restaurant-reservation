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

## Application Images

Dashboard

![Dashboard](https://user-images.githubusercontent.com/85700128/156837558-011f6930-20f2-4efd-9e82-1ec3a8631f23.png)
##

New Reservation

![New Reservation](https://user-images.githubusercontent.com/85700128/156837497-3aa045ab-509e-4d19-ac24-e7d9e89bddae.png)
##

New Table

![Create table](https://user-images.githubusercontent.com/85700128/156837275-8cb0d417-4da6-4779-8e34-fced886db3f9.png)
##

Seat Reservation

![Seat Reservation](https://user-images.githubusercontent.com/85700128/156837583-6def6c0a-dbd4-4c51-a386-a97af2ed08fe.png)
##

Search

![Search](https://user-images.githubusercontent.com/85700128/156837465-140f8552-2481-4d65-862c-06a675bf68fa.png)

## Reservation Data Example

```bash
{
  data: {
    created_at: "2022-03-04T19:53:37.872Z",
    first_name: "Sylphrena",
    last_name: "Honorspren",
    mobile_number: "0118999881",
    people: 4,
    reservation_date: "2023-02-21",
    reservation_id: 57,
    reservation_time: "19:15:00",
    status: "booked",
    updated_at: "2022-03-04T19:53:37.872Z"
  }
}
```

## Table Data Example

```bash
{
  data: {
    capacity: 99
    reservation_id: 57
    table_id: 5
    table_name: "Urithiru"
  }
}
```
