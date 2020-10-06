import React, { useState } from 'react';
import './css/App.css';
import { getCities } from './helper';
import SuggestionsSearch from './components/search';
import styled from 'styled-components';

// const SearchBar = styled.input`
//   width: 45%;
//   background-color: white;
//   position: absolute:
//   top: 40%;
//   min-width: 200px;
//   border: none;
//   border-radius: 3px 0 0 3px;
//   padding: 20px;
//   :focus{
//     outline: none;
//   }
// `;

const SearchButton = styled.button`
  width: 15%;
  background-color: #e8415d;
  position: absolute:
  top: 40%;
  padding-left: 10px;
  border: none;
  min-width: 100px;
  display: block;
  font-color: white;
  border-radius: 2px 2px 0;
  :focus{
    outline: none;
  }
`;

function App() {
  const [ cityName, setCityName ] = useState('');
  const [ cityList, setCityList ] = useState([]);
  const [ searchedCities, setSearchedCities ] = useState([]);

  const getCitiesData = () => {     
    if(cityName.length > 1) {
      getCities(cityName.toLowerCase()).then(res => {
        setCityList(res.slice(1,6));
      }).catch(err => console.log(err));
    }
  }

  const onSubmit = () => {
    if(cityName.length > 1) {
      getCitiesData();
      if(!searchedCities.includes(cityName)) {
        setSearchedCities([{ name: cityName }, ...searchedCities]);
      }
    }
  } 

  const setInput = (cityName) => {
    setCityName(cityName);
    if(cityName === '') {
      setCityList([]);
    } else
      getCitiesData();
  }

  // const removeSuggestion = () => {
  //   setCityName('');
  // }

  return (
    <div className="bg-image">
      <div className="flex-container">
        <SuggestionsSearch
			  	currentSearch={cityName}
			  	getSuggestions={setInput}
			  	setSuggestion={text => setInput(text)}
			  	suggestions={cityList}
			  	clearSuggestions={_ => setInput('')}
			  	placeholder="Search By College Or City"
			  	rightMargin={'44px'}
			  	suggestType
			  	enterAllowed
          onChange={cityName => setInput(cityName)}
			  />

        <SearchButton
          onClick={onSubmit}
          className="white"
        >
          <i className="fas fa-search mr10"></i>
          Search
        </SearchButton>
      </div>




      {/* <ul>
        { cityList.length > 0 && cityList.map(city => <li>{city.name}</li>)}
      </ul>
      <ul>
        { searchedCities.length > 0 && searchedCities.map(cityName => <li style={{color:'red'}}>{cityName}</li>)}
      </ul> */}
    </div>
  );
}

export default App;
