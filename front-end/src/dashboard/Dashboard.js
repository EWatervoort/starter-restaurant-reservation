import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next } from "../utils/date-time"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ defaultDate }) {

  const params = new URLSearchParams(window.location.search)
  let date = params?.get("date") || defaultDate;
  console.log(date)

 
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const nextHandle = (event) => {
    event.preventDefault();
    date = next;
    console.log(date)

  }


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <button type= "button" className="btn btn-secondary" onClick={nextHandle}>Next</button>
      {/* <button type= "button" className="btn btn-secondary" onClick={previousHandle}>Previous</button>
      <button type= "button" className="btn btn-secondary" onClick={todayHandle}>Today</button> */}
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
