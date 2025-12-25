import { useState, useEffect } from 'react'
import Countries from './Countries.jsx'
import Filter from './Filter.jsx'
import countryService from './services/countries.js'

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(()=>{
        countryService
            .getCountries()
            .then(data => {
                setCountries(data)
            })
    },[])
    return (
        <>
            <Filter filter={filter} setFilter={setFilter}/>
            <Countries filter={filter} countries={countries}/>
        </>
    )
}

export default App
