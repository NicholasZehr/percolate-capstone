import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Index, Highlight, connectStateResults } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const searchClient = algoliasearch(
  'JP955S508F',
  '3de80a48e4011b0c171789a11801fb58'
);


export const Search = () => (
  <InstantSearch indexName="coffees" searchClient={searchClient}>
  <SearchBox />
  {isSearch?(
  <div className="search-results">
  <Results>
  </Results>
  </div>
  ):(null)}
</InstantSearch>
);

function Hit(props) {
  console.log(props.hit)
  return (
    <div>
    <Link to={`/${props.hit.path}`}>
      <img src={props.hit.imageUrl} align="left" alt={props.hit.name} />
      <p>ID: {props.hit.objectID}</p>
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-objectID">
        <Highlight attribute="objectID" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
    </Link>
    </div>

  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

const IndexResults = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>
        No results have been found in
        {searchResults ? ` ${searchResults.index}` : ''}
      </div>
    )
);
const AllResults = connectStateResults(({ allSearchResults, children }) => {
  const hasResults =
    allSearchResults &&
    Object.values(allSearchResults).some(results => results.nbHits > 0);
  return !hasResults ? (
    <div>
      <div>We're sorry, but we don't have anything that matches your search</div>
      <Index indexName="coffees" />
      <Index indexName="Users" />
      <Index indexName="businesses" />
    </div>
  ) : (
    children
  );
});

const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <AllResults>
  <Index indexName="coffees">
    <IndexResults>
    <p>Coffees: </p>
    <Hits hitComponent={Hit}/>
    </IndexResults>
  </Index>
  <Index indexName="Users">
    <IndexResults>
    <p>Users: </p>
    <Hits hitComponent={Hit}/>
    </IndexResults>
  </Index>
  <Index indexName="businesses">
    <IndexResults>
    <p>businesses:</p>
    <Hits hitComponent={Hit}/>
    </IndexResults>
  </Index>
  </AllResults>
  ) : (
    null
  )
);

const isSearch= connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (true):(false))
