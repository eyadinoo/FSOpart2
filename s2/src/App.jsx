import { useState, useEffect } from 'react'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import Persons from "./Persons.jsx"
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newNum, setNewNum] = useState('')
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

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
            setSuccess(true)
            setMessage(`${newName} has been added to the phonebook`)
            setTimeout(() => {
                setMessage(null)
            },5000)
        }
        else if(window.confirm(`${newName} is already in the phonebook. Change the number?`)){
            personService.updatePerson(foundPerson,newNum)
                .then(data => {
                    setPersons(persons.map(p => p.id === foundPerson.id ? data : p))
                    setSuccess(true)
                    setMessage(`${newName}'s entry has been updated.`)
                })
                .catch(e => {
                    setSuccess(false)
                    setMessage(`${newName}'s entry has already been removed.`)
                })

            setTimeout(() => {
                setMessage(null)
            },5000)
        }
        setNewName('')
        setNewNum('')
    }

    const deletePerson = (person) =>{
        if(window.confirm(`Delete ${person.name}?`)){
            personService.deletePerson(person.id)
                .then(result => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setSuccess(true)
                    setMessage(`${person.name}'s entry has been deleted.`)
                })
                .catch(e => {
                    setSuccess(false)
                    setMessage(`${person.name}'s name has already been deleted`)
                })

            setTimeout(() => {
                setMessage(null)
            },5000)
        }
    }

    return (
        <div>
            <Message message={message} success={success}/>
            <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
            <PersonForm newName={newName} setNewName={setNewName} newNum={newNum} setNewNum={setNewNum} addName={addName}/>
            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
        </div>
    )
}

const Message = ({message, success}) => {
    const messageStyle = {
        color: 'white',
        backgroundColor: success ? '#6fab59' : 'red',
        border: '5px solid black',
        borderRadius: '15px',
        width: '275px',
        textAlign: 'center',
        fontSize: '2em',
        padding: '10px'
    }
    return message ? <div style={messageStyle}>{message}</div> : null
}


export default App