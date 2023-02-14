const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>{props.name} - {props.points} points</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name = {props.name} Part points = {props.points}/>
    </div>
  )
}

const Total = (props) => {
  const total = props.points_total.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return (
    <div>
      <p>Total points: {total}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course = {course} />
      <Content name = {part1} points = {exercises1}/>
      <Content name = {part2} points = {exercises2}/>
      <Content name = {part3} points = {exercises3}/>      
      <Total points_total = {[exercises1,exercises2, exercises3]}/>  
    </div>
  )
}


export default App