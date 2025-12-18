const Persons = ({persons, newFilter}) => <ul>{persons.filter((person) => person.name.toLowerCase()
    .includes(newFilter.toLowerCase()))
    .map(person => <Person key={person.name} person={person}/>)}</ul>
const Person = ({person}) => <li>{person.name} {person.number}</li>

export default Persons