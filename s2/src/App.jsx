import { useState } from 'react'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import Persons from "./Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040-1234567'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newNum, setNewNum] = useState('')


    const addName = (e) => {
        e.preventDefault()
        if(persons.find(x => x.name===newName) === undefined){
            const newPerson = {name:newName, number:newNum}
            setPersons(persons.concat(newPerson))
        }
        else{
            alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
        setNewNum('')
    }

    return (
        <div>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
            <PersonForm newName={newName} setNewName={setNewName} newNum={newNum} setNewNum={setNewNum} addName={addName}/>
            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter}/>
        </div>
    )
}




export default App