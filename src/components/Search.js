import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'JP955S508F',
  '3de80a48e4011b0c171789a11801fb58',
  'coffees'
);

export const Search = () => (
  <InstantSearch
    indexName="coffees"
    searchClient={searchClient}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
);
