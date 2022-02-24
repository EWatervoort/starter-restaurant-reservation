import React, { useState } from "react";
import { listReservations } from "../utils/api"
import ReservationTile from "../AddReservation/ReservationTile";

function SearchForm() {
  const [number, setNumber] = useState({});
  const [hasError, setHasError] = useState('')
  const [reservations, setReservations] = useState([]);

  const changeHandler = (event) => {
    setNumber({...number, [event.target.name]: event.target.value })
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const controller = new AbortController();
  //   const { signal } = controller
  //   try {
  //     const response = await listReservations({ mobile_number: number }, signal)
  //     setReservations(response)
  //   } catch(e) {
  //     console.log(e)
  //   }
  //   return () => {
  //     controller.abort()
  //   }
  // }

  // const list = reservations && reservations.map((reservation, i) => {
  //   return (
  //     <ReservationTile key={i} reservation={reservation} />
  //   )
  // })

  // const handleCancel = (event) => {
  //   event.preventDefault();
  //   history.goBack();
  // }

  // return (
  //   <>
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="mobile_number">
  //         Mobile Number
  //         <input 
  //           id ="mobile_number"
  //           type = "text"
  //           name = "mobile_number"
  //           required = {true}
  //           onChange={changeHandler}
  //           value = {number}
  //           placeholder="Enter a customer's phone number"
  //         />
  //       </label>
  //       <button type = "submit" className="btn btn-primary">Find</button>
  //       {/* <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button> */}
  //     </form>
  //     {/* {
  //       reservations.length > 0 && {list} 
  //     } */}
  //     { hasError && <p className='alert alert-danger'>{hasError}</p>}
  //   </>
  // )
}

export default SearchForm