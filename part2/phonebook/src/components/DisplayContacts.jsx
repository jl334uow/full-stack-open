import Contact from './Contact.jsx'

const DisplayContacts = ({namesToShow}) => {
  return(
      <>
          {namesToShow.map(person => <Contact key={person.name} person={person}/>)}
      </>
  )
}

export default DisplayContacts