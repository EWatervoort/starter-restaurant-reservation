import React, { useState } from "react";
import { listReservations } from "../utils/api"
import ReservationTile from "../AddReservation/ReservationTile";

function SearchForm() {
  const [number, setNumber] = useState('');
  const [found, setFound] = useState(false)
  const [reservations, setReservations] = useState([]);

  const changeHandler = (event) => {
    setNumber(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    const { signal } = controller
    setFound(false)
    try {
      const response = await listReservations({ mobile_number: number }, signal)
      setReservations(response)
      if (reservations.length > 0) {
        setFound(true)
      }
      setNumber("")
    } catch(e) {
      console.log(e)
    }
    return () => {
      controller.abort()
    }
  }

  const list = reservations && reservations.map((reservation, i) => {
    return (
      <ReservationTile key={i} reservation={reservation} />
    )
  })


  return (
    <div className="container">
      <h1>Search by Number</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">
          <span className="h5">
            Mobile Number
          </span>
          <br />
          <input 
            id ="mobile_number"
            type = "text"
            name = "mobile_number"
            required = {true}
            onChange={changeHandler}
            value = {number}
            placeholder="Enter a customer's phone number"
          />
        </label>
        <br />

        <button type = "submit" className="btn btn-primary my-2">Find</button>
      </form>
      <div className="container">
        <div className="row">
          {
            reservations.length > 0 && list
          }
        </div>
      </div>
      {
            !found && <p className="alert alert-danger">No reservations found</p>
          }
    </div>
  )
}

export default SearchForm