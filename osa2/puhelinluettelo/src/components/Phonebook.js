const Person = ({ person, handleRemove }) => {
  return (
    <div className="person">
      {person.name} {person.number}
      <button onClick={() => handleRemove(person)}>delete</button>
    </div>
  )
}
  
  export default Person