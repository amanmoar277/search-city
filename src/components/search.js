import React,{useState} from 'react';
import styled from 'styled-components';

const SuggestionsSearchDiv = styled.div`
    background-color:white;
    border-radius:3px 0 0 3px;

    input{
        outline:none;
        border:none;
    }

    .top-60{
        top:60px;
    }

    .drop-down{
        width:100%;
        height:275px;
    }

    .border-bottom{
        border-bottom:solid 0.5px #d9d9d9;
    }
    .loader1{
        height: 5px;
        width: 100px;
        background-color:#E8E8E8;
    }
    .loader2{
        height: 5px;
        width: 60px;
        background-color:#E8E8E8;
    }
    .placeholder-loading::before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 10px;
        width: 100px;
        background: linear-gradient(to right, transparent 0%, #ffffff 50%, transparent 100%);
        animation: load 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }
    
    @keyframes load {
        from {
            left: 0px; 
        }
        to   {
            left: 500px;
        }
    }
`;


type Props = {
    currentSearch: String,
    placeholder: String,
    enterAllowed: boolean,
    getSuggestions: () => void,
    suggestions: Array<any>,
    setSuggestion: () => void,
    clearSuggestions: () => void,
    rightMargin: Number,
    history: Array<any>,
};

const SuggestionsSearch = ({ currentSearch, getSuggestions, enterAllowed, suggestions, setSuggestion, placeholder, rightMargin, clearSuggestions, history }: Props) => {

    const [isFocussed,setIsFocussed] = useState(false);
    return (
    <SuggestionsSearchDiv className="w-100 h-100 bg-white p-20 relative flex f-space-between">
        <input
            className="w-100 h-100 "
            value={currentSearch}
            onChange={e => console.log(e.target.value) || getSuggestions(e.target.value)}
            onKeyDown={e => {
                if (e.key === 'Enter' && enterAllowed) {
                    setSuggestion(e.target.value);
                } else if (e.key === 'Escape') {
                    clearSuggestions();
                }
            }}
            onFocus={()=>setIsFocussed(true)}
            onBlur ={()=>setIsFocussed(false)}
            placeholder={placeholder}
        />
        {currentSearch && currentSearch.length && (
            <div className="v-center pointer" style={{ right: rightMargin }}>
                <i className="far fa-times-circle icon-small text-secondary" onClick={_ => setSuggestion('')} />
            </div>
        )}
        {isFocussed&&<div className=" drop-down absolute top-60 left-0 bg-white fcol shadow scroll-y">
        {!!suggestions.length  &&  (
                    suggestions.map((suggestion,i)=>(
						<a href={`https://amberstudent.com/places/search/${suggestion.canonical_name}`} className="a" key={i} onClick={_ => console.log('click') || window.location.assign(`https://amberstudent.com/places/search/${suggestion.canonical_name}`)}>
                        	<div className="flex  w-100 bg-white ph-20 pv-10 border-bottom pointer" >
                        	    <i className="fas fa-map-marker-alt text-tertiary mr-10" />
                        	    <div className="fcol mb-10">
                        	        <div className=" regular text-primary">{suggestion.name}</div>
                        	        <div className="small text-secondary">{suggestion.secondary_name}</div>
                        	    </div>
                        	</div>
						</a>
                    ))
        )}
        {
            suggestions.length===0 && isFocussed &&(
                <div>
                    {currentSearch.length<2&&<div className="p-20 mb-10 text-secondary small border-bottom">
                            Please type {2 - currentSearch.length} more letter to get new suggestions
                        </div>}
                    {
                        new Array(5).fill(0).map((x,i)=>(
                            
                            <div className="flex  w-100 bg-white ph-20 pv-10 border-bottom" key={i}>
                            <i className="fas fa-map-marker-alt text-tertiary mr-10" />
                            <div className="fcol mb-10 hidden">
                                <div className=" regular text-primary relative loader1 " style={{height:"10px",width:"500px"}}><div className="placeholder-loading" /></div>
                                <div className="small text-secondary relative loader2" style={{height:"10px",width:"500px"}}><div className="placeholder-loading" /></div>
                            </div>
                        </div>
                        ))
                    }
                </div>
            ) 
        }
        </div>}

    </SuggestionsSearchDiv>
);
}

export default SuggestionsSearch;