import axios from 'axios';
import { mainCurrency } from './Functions';

export const getData = async () => {

  let currencyUrl = `https://api.frankfurter.app/currencies`;

  let currencyValue = `https://api.frankfurter.app/latest?from=USD`;

  let countriesData = `https://restcountries.eu/rest/v2/all`;

  // get all currency
  let currencyNames = await query(currencyUrl)
  // get all country
  let countries = await query(countriesData)
  // get all currency val
  let currencyVal = await query(currencyValue)
  if(!currencyNames || !countries || !currencyVal) return false

  // return result
  return filterResult(currencyNames, countries, currencyVal.rates)
}

// query function
const query = async (url) => {
  let result = await axios.get(url)
    .then(res => {
      // fallback if there is any error
      if(res.status !== 200) return false
      if(res.status === 200) return res.data
    })
    .catch(err => {
      // fallback if there is any error
      if(err) return false
    })
  return result
}

// filter the result
const filterResult = async (currencies, countries, rates) => {

  // new set of countries based on the currency
  let countriesList = await countries.filter(country => {
    for (let i in currencies){
      if(i === country.currencies[0].code) return country
    }
  })

  // create currency data
  let currency = generate_currency(currencies, rates)
  
  return {countriesList, currency}
}

// sort all currencies and rates and put in one data
const generate_currency = (currencies, rates) => {
  let h = []
  for (let i in currencies) {
    for (let x in rates) {
      if (i === x) {
        h.push({
          code: i,
          name: currencies[i],
          value: rates[i]
        })
      }
    }
  }
    h.push(mainCurrency)
  return h 
}
