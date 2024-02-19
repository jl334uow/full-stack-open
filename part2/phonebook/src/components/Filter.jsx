const Filter = ({filteredName, handleFilteredNameChange}) => {
    return(
      <>
        filter shown with <input value={filteredName} onChange={handleFilteredNameChange}/>
      </>
    )
  }

  export default Filter