import React from "react";
import { useHistory } from "react-router-dom";
import { deleteTable } from "../utils/api";


function TableTile({ table }) {
  const history = useHistory();

  const deleteButton = async (event) => {
    if (window.confirm(`Is this table ready to seat new guests? This cannot be undone.`)) {
      await deleteTable(table.table_id);
      history.go(0)
    }
  }

  return (
    <div className="card" style={{width: '18rem'}}>
    <div className="card-body">
      <h5 className="card-title">{table.table_name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{`Capacity: ${table.capacity}`}</h6>
      <p className="card-text" data-table-id-status={table.table_id}>{ table.reservation_id === null ? 'Free' : `Occupied`}</p>
      { table.reservation_id && <button type="button" data-table-id-finish={table.table_id} className="btn btn-danger" onClick={deleteButton} key={table.Id}>Finish</button>}
    </div>
  </div>
  )
}

export default TableTile