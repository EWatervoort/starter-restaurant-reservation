import React from "react";
import { cancelReservation } from "../utils/api";

function ReservationTile({ reservation }) {

  const cancelButton = async (event) => {
    if (window.confirm(`Do you want to cancel this reservation? This cannot be undone.`)) {
      await cancelReservation(reservation.reservation_id);
      history.go(0)
    }
  }


  return (
    <div className="card">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>Name: {reservation.first_name} {reservation.last_name}</p>
          <p>Phone Number: {reservation.mobile_number}</p>
          <p>Number of People in Party : {reservation.people} </p>
          <p>Reservation Time: {reservation.reservation_time.substring(0, 5)}</p>
          <p data-reservation-id-status={`${reservation.reservation_id}`}>Status: {reservation.status}</p>
          <a href={`/reservations/${reservation.reservation_id}/seat`}>
          {  
            reservation.status === "booked" && 
              <button 
                type="button" 
                className="btn btn-secondary" 
              >
                Seat
              </button>
          }
          </a>
          <a href={`/reservations/${reservation.reservation_id}/edit`}>
            <button type="button" className="btn btn-secondary">Edit</button>
          </a>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={cancelButton}
            data-reservation-id-cancel={`${reservation.reservation_id}`}
          >
            Cancel
          </button>
        </blockquote>
      </div>
    </div>
  )
}

export default ReservationTile