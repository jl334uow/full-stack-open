import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return(
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + -(bad)/3)/10}</p>
      <p>positive {good/(good + neutral + bad) * 100} %</p>
    </>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood((good) => good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral((neutral) => neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad((bad) => bad + 1)}>
        bad
      </button>
      
      <br/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
