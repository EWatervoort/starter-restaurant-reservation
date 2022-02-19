import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { createReservation } from "../utils/api"

function ReservationForm() {
  const [reservation, setReservation] = useState({});
  const [hasError, setHasError] = useState('')
  const changeHandler = (event) => {
    setReservation({...reservation, [event.target.name]: event.target.value })
  }
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createReservation(reservation);
    if (response.error) {
      return setHasError(response.error);
    }
    history.push("/")
  }

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First Name
          <input 
            id ="first_name"
            type = "text"
            name = "first_name"
            required = {true}
            onChange={changeHandler}
            value = {reservation.first_name}
          />
        </label>
        <label htmlFor="last_name">
          Last Name
          <input 
            id ="last_name"
            type = "text"
            name = "last_name"
            required = {true}
            onChange={changeHandler}
            value = {reservation.last_name}
          />
        </label>
        <label htmlFor="mobile_number">
          Mobile Number
          <input 
            id ="mobile_number"
            type = "text"
            name = "mobile_number"
            required = {true}
            onChange={changeHandler}
            value = {reservation.mobile_number}
          />
        </label>
        <label htmlFor="reservation_date">
          Reservation Date
          <input 
            id ="reservation_date"
            type = "date"
            name = "reservation_date"
            required = {true}
            onChange={changeHandler}
            value = {reservation.reservation_date}
          />
        </label>
        <label htmlFor="reservation_time">
          Reservation Time
          <input 
            id ="reservation_time"
            type = "time"
            name = "reservation_time"
            // min = "10:30"
            // max = "21:30"
            required = {true}
            onChange={changeHandler}
            value = {reservation.reservation_time}
          />
        </label>
        <label htmlFor="people">
          People in Party
          <input 
            id ="people"
            type = "number"
            name = "people"
            required = {true}
            onChange={changeHandler}
            value = {reservation.people}
          />
        </label>
        <button type = "submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      { hasError && <p className='alert alert-danger'>{hasError}</p>}
    </>
  )
}

export default ReservationForm