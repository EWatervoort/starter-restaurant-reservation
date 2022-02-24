import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { createTable } from "../utils/api"

function TableForm() {
  const [table, setTable] = useState({});
  const [hasError, setHasError] = useState('')
  const history = useHistory();

  const changeHandler = (event) => {
    setTable({...table, [event.target.name]: event.target.value })
  }
  
  const changeToNumber = ({ target }) => {
    setTable({
      ...table,
      [target.name]: parseInt(target.value)
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createTable(table);
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
        <label htmlFor="table_name">
          Table Name
          <input 
            id ="table_name"
            type = "text"
            name = "table_name"
            required = {true}
            onChange={changeHandler}
            value = {table.table_name}
          />
        </label>
        <label htmlFor="capacity">
          Capacity
          <input 
            id ="capacity"
            type = "number"
            name = "capacity"
            required = {true}
            onChange={changeToNumber}
            value = {table.capacity}
          />
        </label>
        <button type = "submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      { hasError && <p className='alert alert-danger'>{hasError}</p>}
    </>
  )
}

export default TableForm