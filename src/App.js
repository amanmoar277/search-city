import React, { useState } from 'react';
import './css/App.css';
import { getCities } from './helper';
import SuggestionsSearch from './components/search';
import styled from 'styled-components';

const SearchButton = styled.button`
  width: 20%;
  height:100%;
  background-color: #e8415d;
  padding-left: 10px;
  border:none;
  min-width: 100px;
  display: block;
  color: white;
  border-radius: 0 2px 2px 0;
`;


const ImageContainer = styled.div`
  height:${props=>props.height};
  width:${props=>props.width};
`;

function App() {
  const [ cityName, setCityName ] = useState('');
  const [ cityList, setCityList ] = useState([]);
  const [ searchedCities, setSearchedCities ] = useState([]);

  const getCitiesData = (cityName) => {     
    if(cityName.length > 1) {
      getCities(cityName.toLowerCase()).then(res => {
        setCityList(res.slice(1,6));
      }).catch(err => console.log(err));
    }
  }

  const onSubmit = () => {
    if(cityName.length > 1) {
      getCitiesData(cityName);
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
      getCitiesData(cityName);
  }
  return (
  <div className="">
    <ImageContainer className="relative" height="70vh" width="100%">
      <img height="100%" width="100%" className="object-fit-cover" src='https://static-assets-amberstudent.imgix.net/images/header_home_1.jpg' alt="cover"/>
      <div className="absolute top-50 left-0 w-100 h-100 z-1">
        <div className="w-100 h-100 h-center flex" >
          <div className="flex w-100 h-60 h-center" style={{width:"58%"}}>
            <div className="h-100" style={{width:"80%"}}>
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
              </div>
              <SearchButton
                onClick={onSubmit}
                className="white h6 pointer"
              >
                <i className="fas fa-search mr10"></i>
                Search
              </SearchButton>
          </div>
        </div>
      </div>
    </ImageContainer>
  </div>
  );
}

export default App;