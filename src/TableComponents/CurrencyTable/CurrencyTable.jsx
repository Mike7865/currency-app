import React from 'react';
import { calcBase, calc } from '../../Functions'
import Fade from 'react-reveal/Fade';

export default function CurrencyTable(props) {

  const changeCurrency = (curr, name) => {
    props.changeCurrency(curr, name)
  }


  const calculate = (currency, primary) => {
    if(primary) return 1
    return calcBase(currency.base.value, currency.primary.value)
  }

  const calcCurrency = (base, prime) => {
    if(base.code === prime.code) return 1
    return calc(base, prime)
  }
  
  return (
    <Fade>
      <div 
        className={`currencyRow ${props.country.primary ? 'mainCurrencyRow' : ''}`}
        onClick={!props.country.primary ? 
          ()=>changeCurrency(props.country.currency.base, props.country.name) : null} >
        <div className="currencyRowDesc left">
          <img className="countryFlag" src={props.country.flag} alt="flag"/>
          <div className="description">
            <p className="descriptionCountry">{props.country.alpha3Code}</p>
            <p className="descriptionCurrency">{props.country.currency.base.name}</p>
          </div>
        </div>
        <div className="currencyRates left">
          <p className="quantity">{props.country.currency.base.symbol} {calcCurrency(props.country.currency.base, props.country.currency.primary)}</p>
          <p className="quantityExchange">
            {props.country.currency.base.symbol} 1 {props.country.currency.base.code} = {props.country.currency.primary.symbol}    {calculate(props.country.currency, props.country.primary)} {props.country.currency.primary.code}</p>
        </div>
      </div>
    </Fade>
  )
}
