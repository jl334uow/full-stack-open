const Header = ({head}) => {
  return(
    <>
      <h1>{head}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return(
    <>
      {parts.map(c => <p key={c.id}>{c.name} {c.exercises}</p>)}
    </>
  )
}

const Course = ({course}) => {
  return(
    <>
      <Header head={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App