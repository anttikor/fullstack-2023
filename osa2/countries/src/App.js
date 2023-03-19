import React, { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCapital, setSelectedCapital] = useState(null)

  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  const filteredCountries = countries.filter((country) =>
  country.name.toLowerCase().includes(search.toLowerCase()))
  const results = filteredCountries.length <= 10 ? filteredCountries : []

  const getCapital = (name, countries) => {
    const filteredCountries = countries.filter(country => country.name === name)
    const capital = filteredCountries.length > 0 ? filteredCountries[0].capital : null
    return capital
  }
      

  const handleShowButtonClick = (name) => {
    setSearch(name)

    if (selectedCapital === null)
    {
      setSelectedCapital(getCapital(name, results))
    }
    else{
      setSelectedCapital(null)
    }
  }

  const handleSearchChange = (event) => {
    const inputSearch = event.target.value.toLowerCase()
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(inputSearch)
    )
    setSearch(inputSearch)
    if (filteredCountries.length === 1) {
      setSelectedCapital(filteredCountries[0].capital)
    } else {
      setSelectedCapital(null)
    }
  }
  
  useEffect(() => {
    const apiUrls = [
      "https://restcountries.com/v2/all",
      "https://restcountries.eu/v2/all",
      "https://raw.githubusercontent.com/apilayer/restcountries/master/src/main/resources/countriesV1.json" //tässä ei tule liput mukana
    ]
  
    const fetchData = async () => {
      for (const url of apiUrls) {
        try {
          const response = await axios.get(url)
          setCountries(response.data)
          return
        } catch (error) {
          console.log(`Failed to fetch data from ${url}:`, error)
        }
      }
      console.log("Failed to fetch data from all sources")
    }
    fetchData()
  }, [])

  useEffect(() => {
      if (selectedCapital) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCapital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          setWeather(response.data)          
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [selectedCapital, api_key])  


  if (filteredCountries.length > 10){
    return(
      <div>
         <h1>Search country info</h1>
        <form>
          <label>
            find countries:
            <input type="text" value={search} onChange={handleSearchChange} />
          </label>
        </form>   
        <p>Too many matches, specify another filter</p>
      </div>
    )}
  else if (filteredCountries.length > 1)
  {
    return(
    <div>
    <h1>Search country info</h1>
    <form>
      <label>
        find countries:
        <input type="text" value={search} onChange={handleSearchChange} />
      </label>
    </form>   
    
        {results.map((country) => (
          <ul>
          <div key={country.alpha3Code} className="country-container">
            {country.name}
            <button onClick={() => handleShowButtonClick(country.name)}>show</button>
          </div>
          </ul>
        ))}

  </div>
  )}

  else
  {
    return(
    <div>
       <h1>Search country info</h1>
      <form>
        <label>
          find countries:
          <input type="text" value={search} onChange={handleSearchChange} />
        </label>
      </form>      
      <ul>
        {results.map((country) => (
          <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km2</p>
          <h3>languages</h3>
          <ul>
              {country.languages.map((language) => (
                <li key={language.iso639_1}>{language.name}</li>
              ))}
          </ul>
          <img className="country-flag" src={country.flag} alt={`${country.name} flag`} />
          {weather && (
            <div>
              <h3>Weather in {country.capital}</h3>
              <p>temperature {weather.main.temp} Celsius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
              <p>wind {weather.wind.speed}</p>
            </div>
)}
          </div>
        ))}
      </ul>
    </div>
    )}
}

export default App
