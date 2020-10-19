import React from 'react';
class Loader extends React.Component {
  constructor() {
    super();
  }
  
  

  render() {

    return (
           <div className="mainLoader">
                  <div className="container">
                    <div className="gooey">
                        <span className="dot"></span>
                        <div className="dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                    </div>
                  </div>
              </div>
    );
  }
}

export default Loader;