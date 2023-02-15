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
  const [eka, toka, kolmas] = props.osat
  return (
    <div>
      <Part name = {eka.name} Part points = {eka.exercises}/>
      <Part name = {toka.name} Part points = {toka.exercises}/>
      <Part name = {kolmas.name} Part points = {kolmas.exercises}/>
    </div>
  )  
}

const Total = (props) => {
  const [eka, toka, kolmas] = props.points_total
  return (
    <div>
      <p>Total points: {eka.exercises + toka.exercises + kolmas.exercises}</p>
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course = {course.name} />
      <Content osat = {course.parts}/>
      <Total points_total = {course.parts}/>

      

    </div>
  )
}


export default App