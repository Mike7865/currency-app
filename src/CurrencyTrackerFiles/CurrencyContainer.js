import React, {Fragment} from 'react';

import Select from './CurrencyTrackerComponents/Select'
import Currency from './CurrencyTrackerComponents/Currency'
import Spinner from './Spinner'

const currency = (props) => {
  let currencyList = []
  let primary;
  if(props.countries.length > 0){
      currencyList = props.countries.map((country, i)=> {
        if(!country.primary){
          return (<Currency 
                    key={i}
                    changeCurrency={(currency, name)=>props.changeCurrency(currency, name)}
                    country={country} /> )}
      })
      primary = props.countries.map((count, i)=> {
        if(count.primary){
          return (<Currency 
                    key={i}
                    country={count} /> )}
      })
  }

  let components = (
    <Fragment>

    {/* header */}
      <Header />
    {/* primary */}
      {primary}
    {/* select element */}
      <Select 
        options={props.options}
        change={(val)=>props.change(val)}
        countries={props.countries}/>
    {/* currenct list */}
      {currencyList}
    </Fragment>
  )

  return (
      <div className="App-container">
        {props.countries.length > 0 ? components : <Spinner />}
        {/* <Spinner /> */}
      </div>
  );
}

export default currency