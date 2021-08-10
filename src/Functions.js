export const tableCountries = ['Germany', 'Australia', 'United Kingdom of Great Britain and Northern Ireland', 
'India', 'China', 'Russian Federation', 'United States of America', 'Japan', 'Bulgaria', 'Czech Republic', 
'Denmark', 'Hungary', 'Poland', 'Romania', 'Sweden', 'Switzerland', 'Iceland', 'Norway', 'Croatia', 'Turkey', 
'Australia', 'Brazil', 'Canada', 'Hong Kong', 'Indonesia', 'Israel', 'South Korea', 'Mexico', 'Malaysia', 
'New Zealand', 'Philippines', 'Singapore', 'Thailand', 'South Africa', 'France', 'Ireland', 'Spain', 'Estonia', 
'Latvia', 'Lithuania', 'Korea (Republic of)', 'Italy']

export const mainCurrency = {
  code: 'USD',
  symbol: '$',
  name: 'United States of America',
  value: 1
}

export const init_Country = (countries, currency, tableCountries, primary) => {

  let new_country = countries.filter(c => {
    for (let i in tableCountries) {
      if (tableCountries[i] === c.name) return c
     }
  })
  
  let n_country = new_country.map(c => {
    return format_data(c, primary, currency)
  })
  return n_country
}

export const format_data = (country, primary, currency) => {
  let base = getValue(country.currencies[0].code, currency)
  let prime = getValue(primary.code, currency)

  return {
  currency: {
    primary: prime,
    base: {
      ...base,
      symbol: country.currencies[0].symbol,
    }
  },
  primary: country.name === primary.name ? true : false,
  name: country.name,
  alpha3Code: country.alpha3Code,
  cur: country.currencies[0].name,
  flag: country.flag
  }
}

export const calcBase = (base, prime) => {
  let a = (prime / base).toFixed(4)
  return a
}

export const calc = (base, prime) => {
  if(prime.code === 'USD') {
    return base.value
  } 

  if(prime.code !== 'USD'){
    let a = ((1 / prime.value) * base.value).toFixed(4)
    return a
  }
}

export const getValue = (base, currency) => {
  for (let i in currency) {
    if (currency[i].code === base) {
      return currency[i]
    }
  }
}
