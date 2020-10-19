import { connectHits } from 'react-instantsearch-dom';
import React from "react"

var hits=[];
class Hits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits:[]
    };
  }
  componentWillReceiveProps(a){
    hits=a.hits
  }
  

  render() {
    return (
      <></>
    );
  }
}
export {hits};
export default connectHits(Hits);