import React from "react";

function ReservationTile({ reservation }) {

  return (
    <div className="card">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>Name: {reservation.first_name} {reservation.last_name}</p>
          <p>Phone Number: {reservation.mobile_number}</p>
          <p>Number of People in Party : {reservation.people} </p>
          <p>Reservation Time: {reservation.reservation_time.substring(0, 5)}</p>
          <p data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
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
        </blockquote>
      </div>
    </div>
  )
}

export default ReservationTile