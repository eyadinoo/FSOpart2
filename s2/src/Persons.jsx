const Persons = ({persons, newFilter, deletePerson}) => <ul>{persons.filter((person) => person.name.toLowerCase()
    .includes(newFilter.toLowerCase()))
    .map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}</ul>
const Person = ({person, deletePerson}) => {
    return (
        <li>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>
    )
}

export default Persons