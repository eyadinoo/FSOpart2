import { useState, useEffect } from 'react'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import Persons from "./Persons.jsx"
import axios from 'axios'
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newNum, setNewNum] = useState('')
    const [message, setMessage] = useState('')


    useEffect(()=>{
        personService.getAll()
            .then(data => {
                setPersons(data)
            })
    })

    const addName = (e) => {
        e.preventDefault()
        const foundPerson = persons.find(x => x.name===newName)
        if(foundPerson === undefined){
            const newPerson = {name:newName, number:newNum}
            personService.addPerson(newPerson)
                .then(data => {
                    setPersons(persons.concat(data))
                })
            setMessage(`${newName} has been added to the phonebook`)
        }
        else if(window.confirm(`${newName} is already in the phonebook. Change the number?`)){
            personService.updatePerson(foundPerson,newNum)
                .then(data => {
                    setPersons(persons.map(p => p.id === foundPerson.id ? data : p))
                })
        }
        setNewName('')
        setNewNum('')
    }

    const deletePerson = (person) =>{
        if(window.confirm(`Delete ${person.name}?`)){
            personService.deletePerson(person.id)
            setPersons(persons.filter(p => p.id !== person.id))
        }
    }

    return (
        <div>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
            <PersonForm newName={newName} setNewName={setNewName} newNum={newNum} setNewNum={setNewNum} addName={addName}/>
            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
        </div>
    )
}




export default App