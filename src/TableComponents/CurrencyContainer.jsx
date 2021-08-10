import React, { Fragment } from 'react';
import CurrencyTable from './CurrencyTable/CurrencyTable';
import Circle from '../CircleComponent/Circle';

export default function CurrencyContainer (props) {
  let currencyList = []
  let primary;

  if(props.countries.length > 0){
    currencyList = props.countries.map((country, i)=> {
      if(!country.primary){
        return (
          <CurrencyTable 
            key={i}
            changeCurrency={(currency, name)=>props.changeCurrency(currency, name)}
            country={country} /> )}
    })
    primary = props.countries.map((count, i)=> {
      if(count.primary){
        return (
          <CurrencyTable
            key={i}
            country={count} /> )}
    })
  }

  let components = (
    <Fragment>
      {primary}
      {currencyList}
    </Fragment>
  )

  return (
    <div className="currencyAppContainer">
      {props.countries.length > 0 ? components : <Circle />}
    </div>
  );
}
