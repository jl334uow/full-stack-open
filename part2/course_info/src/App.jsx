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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App