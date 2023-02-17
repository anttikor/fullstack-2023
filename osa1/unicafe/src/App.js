import { useState } from 'react'

const StatisticLine = ({name, value}) => {
  return (
    <div>
      {name} {value}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100
  if (total === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine name="good" value={good} />
      <StatisticLine name="neutral" value={neutral} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="all" value={total} />
      <StatisticLine name="average" value={average.toFixed(1)} />
      <StatisticLine name="positive" value={`${positive.toFixed(1)}%`} />
    </div>
  )
  }

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)        
  }

  
  return (
    <div>
      
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App