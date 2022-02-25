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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">
          Mobile Number
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
        <button type = "submit" className="btn btn-primary">Find</button>
      </form>
      {
        reservations.length > 0 && list
      }
      {
        !found && <p className="alert alert-danger">No reservations found</p>
      }
    </>
  )
}

export default SearchForm