import React,{Fragment} from "react"


const Loader = () => {    
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Loader;