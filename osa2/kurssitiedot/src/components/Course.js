    const Header = ({ name }) => {
        return (
        <div>
            <h1>{name}</h1>
        </div>
        )
    }

  const CourseName = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>{name} - {exercises} points</p>
      </div>
    )
  }
  
  const Content = ({ course }) => {    
    return (
      <div>
        {course.parts.map(part => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }

  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0);
    return (
      <div>
        <p>
          <strong>Total exercises: {sum}</strong>
        </p>
      </div>
    )
  }

 const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <Header name="Web development curriculum" />
            <CourseName name={course.name} />
            <Content course={course} />
            <Total course={course} />
          </div>
        ))}
      </div>
    )
  }

  export default Course