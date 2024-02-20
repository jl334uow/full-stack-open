import personService from '../services/persons'

const Contact = ({person}) => {

    return(
      <form onSubmit={(event) => window.confirm('Delete ' + person.name + '?') ? personService.remove(person.id) : event.preventDefault()}>
        {person.name} {person.number}
        <button type="submit">delete</button>
        <br/>
      </form>
    )
  }

export default Contact