import React from "react"

const NoData = () => {
    return (
        <div className="mainFullWidth">
            <div className="no-content-display">
                <div className="no-content-data">
                    <img src='/images/no-data.svg' alt="no content"/>
                    <p>There is no content to display</p>
                </div>
            </div>
        </div>
    )
}
export default NoData;