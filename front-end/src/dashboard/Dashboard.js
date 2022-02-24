import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import TableTile from "../AddTable/TableTile";
import ReservationTile from "../AddReservation/ReservationTile"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ defaultDate }) {
  const params = new URLSearchParams(window.location.search);
  let startDate = params?.get("date") || defaultDate;
  const [date, setDate] = useState(startDate);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesList, setTablesList] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const getTables = async () => {
      try {
        const response = await listTables(signal);
        setTablesList(response)
      } catch(e) {
        console.log(e)
      }
    }
    getTables();
    return () => {
      controller.abort()
    }
  }, [])

  const tables = tablesList && tablesList.map((table, i) => {
    return (
      <TableTile key={i} table={table} />
    )
  })
  
  const list = reservations && reservations.map((reservation, i) => {
    return (
      <ReservationTile key={i} reservation={reservation} />
    )
  })

  const nextHandle = (event) => {
    event.preventDefault();
    setDate(next(date));
  };

  const previousHandle = (event) => {
    event.preventDefault();
    setDate(previous(date));
  };

  const todayHandle = (event) => {
    event.preventDefault();
    setDate(today());
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      <button type="button" className="btn btn-secondary" onClick={nextHandle}>
        Next
      </button>
      <button type= "button" className="btn btn-secondary" onClick={previousHandle}>Previous</button>
      <button type= "button" className="btn btn-secondary" onClick={todayHandle}>Today</button>
      <ErrorAlert error={reservationsError} />
      {list}
      <br />
      <h3>Tables</h3>
      {tables}
    </main>
  );
}

export default Dashboard;
