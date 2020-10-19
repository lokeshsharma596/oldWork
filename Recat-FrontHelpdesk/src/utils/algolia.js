import React, { Fragment,useState } from "react"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from "../components/Shared/SearchBox"
import Hits from "../components/Shared/Hits"


const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const Search = (props) => {
  
  const [hits,sethits]=useState([])

  return (
    <Fragment>
      {(props.userinfo) ?
        <InstantSearch searchClient={searchClient} indexName={props.userinfo[0]}  >

          <SearchBox userid={props.userinfo[0]} value1={hits} />

          <Hits />

        </InstantSearch>
        : null}
    </Fragment>
  )
}

// class Search extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         userid:'',
//         hits:[]
//         };
//     }

//     render() {

//       return (
//         <Fragment>  
//         {(this.props.userinfo)?
//          <InstantSearch searchClient={searchClient} indexName={this.props.userinfo[0]}  >

//          <SearchBox userid={this.props.userinfo[0]} value1={this.state.hits}/>

//          <Hits />

//          </InstantSearch>
//          :null}
//          </Fragment>
//       );
//     }
//   }

export default Search;