import { useState } from 'react'

const Button = ({symbol, set}) => {
  return(
    <>
      <button onClick={() => set((value) => value + 1)}>
        {symbol}
      </button>
    </>
  )
}

const StatisticLine = (props) => {
  return(
    <>
    <p>{props.text} {props.value}{props.end}</p>
    </>
  )
}

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
      <StatisticLine text={"good"} value={good}/>
      <StatisticLine text={"neutral"} value={neutral}/>
      <StatisticLine text={"bad"} value={bad}/>
      <StatisticLine text={"all"} value={good + neutral + bad}/>
      <StatisticLine text={"average"} value={(good + -(bad)/3)/10}/>
      <StatisticLine text={"positive"} value={good/(good + neutral + bad) * 100} end=" %"/>
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
      <Button symbol={'good'} value={good} set={setGood}/>
      <Button symbol={'neutral'} value={neutral} set={setNeutral}/>
      <Button symbol={'bad'} value={bad} set={setBad}/>
      
      <br/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
