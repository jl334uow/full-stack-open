const Header = ({head}) => {
    return(
      <>
        <h2>{head}</h2>
      </>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <>
        {parts.map(c => <p key={c.id}>{c.name} {c.exercises}</p>)}
        <p><b>total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</b></p>
      </>
    )
  }
  
  const Course = ({courses}) => {
    return(
      <>
        <h1>Web development curriculum</h1>
        <Header head={courses[0].name}/>
        <Content parts={courses[0].parts}/>
  
        <Header head={courses[1].name}/>
        <Content parts={courses[1].parts}/>
  
      </>
    )
  }

export default Course