import React from 'react';
import styled from 'styled-components';

const SuggestionsSearchDiv = styled.div`
	flex: 1;
	align-self: stretch;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-weight: 500;
    position: relative;
    background-color: white;
    input:focus{
      outline: none;
    }

	.tag-search {
		box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
		padding: 9px 10px;
		height: 100%;
		width: 100%;
		display: flex;
		align-self: stretch;
		border: solid 0 $color-divider-gray;
	}

	.search-clear {
		position: absolute; // right: 44px;
		right: 10px !important;
	}

	.search-results {
		position: absolute;
		top: 31px;
		left: 0;
		right: 0;
        display: flex;
        background-color: white;

		.search-ul {
			z-index: 999;
			width: 100%;
			padding: 0;
			margin: 0;
		}

		.search-div {
			box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
			background-color: white;
		}

		.overflow-scroll {
			overflow: auto;
			max-height: 300px;
		}

		.result {
			background-color: white;
			display: flex;
			cursor: pointer;
			padding: 10px;

			&:hover {
				background-color: $color-middle-gray;
            }
            
            &::after {
                display: block;
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translateX(-100%);
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
                animation: loading 1.5s infinite;
              }
        }
    }
    
    position: relative;
    background-color: #E2E2E2;
    
    &.card-image {
      border-radius: 0;
    }
  
    &::after {
      display: block;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
      animation: skeleton 1.5s infinite;
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
};

const SuggestionsSearch = ({ currentSearch, getSuggestions, enterAllowed, suggestions, setSuggestion, placeholder, rightMargin, clearSuggestions }: Props) => (
	<SuggestionsSearchDiv>
		<div className="tag-search Search-Box extra-radius">
			<input
				type="text"
				className="small w-100 bg-white"
				style={{ border: 'none' }}
				value={currentSearch}
				onChange={e => getSuggestions(e.target.value)}
				onKeyDown={e => {
					if (e.key === 'Enter' && enterAllowed) {
						setSuggestion(e.target.value);
					} else if (e.key === 'Escape') {
						clearSuggestions();
					}
				}}
				placeholder={placeholder}
			/>
		</div>
		{currentSearch && currentSearch.length && (
			<div className="search-clear v-center pointer" style={{ right: rightMargin }}>
				<i className="fa fa-times-circle icon-small text-tertiary" onClick={_ => setSuggestion('')} />
			</div>
		)}
		<div className="search-results">
				<ul className="search-ul">
					<div className="search-div small">
		                {!suggestions.length ?
                        [0, 0, 0, 0, 0].map((i,j) => (<li key={j} className="result skeleton" role="presentation" />))
                        : 
			                suggestions.map((y, j) => (
			                	<li key={j} className="result" role="presentation" onClick={() => setSuggestion(y)}>
			                		{y.name}
			                	</li>
			                ))
                        }
					</div>
				</ul>
		</div>

	</SuggestionsSearchDiv>
);

export default SuggestionsSearch;
