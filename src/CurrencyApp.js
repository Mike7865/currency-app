import React, {useState, useEffect} from 'react';
import './Style/App.css';
import CurrencyContainer from './TableComponents/CurrencyContainer'
import { BrowserRouter as Router } from "react-router-dom";
import { getData } from './Data'
import { init_Country, mainCurrency, tableCountries, format_data } from './Functions'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import HeaderPanel from './HeaderComponents/HeaderPanel';

export default function CurrencyApp() {

  const [all_countries, setCountries] = useState([])
  const [currency, setCurrency] = useState([])
  const [primary, setPrimary] = useState([])
  const [isData, haveData] = useState(false)
  const [initialCountry, initCountry] = useState({})
  
  const data = async () => {
  // get all data from countries
    let data = await getData()
  // set currency to the state
    setCurrency(data.currency)
  // set all countries
    setCountries(data.countriesList)
  // filter initial country
    let new_country = 
    init_Country(data.countriesList, data.currency, tableCountries, mainCurrency)
  // set initial countries
    initCountry(new_country)
  // setPrimary
    setPrimary(mainCurrency)
  }
    
  useEffect(()=>{
    if(isData) return
    haveData(true)
    data() 
  }, [isData])
    
  const changeCurrency = (s_currency, name) =>{
    let n_country = initialCountry.map(c => {
      return {
        ...c,
        primary: c.name === name ? true : false,
        currency: {
          primary: s_currency,
          base: c.currency.base
        }
      }
    })

    initCountry(n_country)
    setPrimary(s_currency)
  }
    
  const change = (val) => {
    let n_country = all_countries.filter(c => {
      return c.name === val
    })

    let a = format_data(n_country[0], primary, currency)

    let b = initialCountry.concat({...a})
    initCountry(b)
  }

  return (
    <Router>
      <div className="currencyApp">
        <React.Fragment>
          <HeaderPanel />
          <CssBaseline />
          <Container maxWidth="sm">
            <CurrencyContainer 
              change={(val)=>change(val)}
              countries={initialCountry}
              changeCurrency={(currency, name)=>changeCurrency(currency, name)} /> 
          </Container>
        </React.Fragment>
      </div>
    </Router>
  );
}
