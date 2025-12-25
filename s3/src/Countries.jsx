import {useState, useEffect} from 'react'
import weatherService from './services/weather.js'
const Countries = ({filter, countries}) => {

    if(!countries) return
    //console.log(countries)

    //countries.forEach(country => console.log(country.name.nativeName))
    const filt = filter.toLowerCase()

    const filteredList = countries.filter(country => {

            const match1 = country.name.common.toLowerCase().includes(filt)
                || country.name.official.toLowerCase().includes(filt)

            const match2 = country.name.nativeName ?
                Object.values(country.name.nativeName).some(lang => {
                    return lang.official.toLowerCase().includes(filt)
                    || lang.common.toLowerCase().includes(filt)
                })
                : false

            const match3 = country.altSpellings ?
                Object.values(country.altSpellings).some(spelling => spelling.toLowerCase().includes(filt))
                : false

            const match4 = country.translations ?
                Object.values(country.translations).some(lang => {
                    return lang.official.toLowerCase().includes(filt)
                    || lang.common.toLowerCase().includes(filt)
                })
                : false

            return match1 || match2 || match3 || match4
        }
    )

    if(filteredList.length > 10) return <p>Too many matches, specify another filter</p>

    const single = filteredList.length===1
    return (
        <ul>
            {filteredList.map(country => {
                return <Country key={country.cca3} country={country} single={single}/>
            })}
        </ul>
    )

    //return <p>ONLY ONE</p>

}

const Country = ({country,single}) => {
    const [basic, setBasic] = useState(!single)
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        weatherService
            .getWeather(country.capital[0])
            .then(data=> {
                setWeather(data)

            })
    },[])
    if(basic){
        return <li>{country.name.common}<button onClick={()=>setBasic(false)}>show</button></li>
    }
    return (
        <div>
            <div style={{display: 'flex'}}>
                <h1>{country.name.common}</h1>
                <button style={{margin:'25px'}} onClick={()=>setBasic(true)}>hide</button>
            </div>
            <p>Capital(s) is {country.capital.join(', ')}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png}/>
            <h2>Weather in {weather.name}</h2>
            <p>{weather.main.temp-273.15} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>Wind {weather.wind.speed}m/s</p>

        </div>
    )
}

export default Countries