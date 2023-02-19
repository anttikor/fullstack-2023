import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const ArvoAnekdootti = () => {
    setSelected(Math.floor(Math.random() * 8))
  }
  const Header = (props) => {
    return (
    <div>
      <h2>{props.header}</h2>
    </div>
    )
  }
  const HowManyVotes = (props) => {
    return(
      <div>
        has {votes[props.index]} votes
      </div>
    )
  }
  const PrintAnecdote = (props) => {
    return(
      <div>
        {anecdotes[props.selected]}
        <HowManyVotes index = {props.selected} />
      </div>
    )
  }
  const MostPopular = () => {
    const maxIndex = votes.indexOf(Math.max(...votes))
    console.log("maxIndex: ", maxIndex)
    return maxIndex
  }
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  const AddToVotes = () => {
    const newNotes = [...votes]
    newNotes[selected] += 1
    console.log("votes: ", newNotes)
    setVotes(newNotes)    
  }

  return (
    <div>
      <Header header="Anecdote of the day" />
      <PrintAnecdote selected = {selected}/>      
      <Button handleClick={ArvoAnekdootti} text="next anecdote" />
      <Button handleClick={AddToVotes} text="vote" />      
      <Header header="Anecdote with most votes" />
      <PrintAnecdote selected = {MostPopular()}/>
    </div>
  )
}

export default App
