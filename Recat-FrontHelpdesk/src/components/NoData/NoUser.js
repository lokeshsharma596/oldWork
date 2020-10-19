import React from "react"

const NoUser = () => {
    return (
        <div className="mainFullWidth">
            <div className="no-content-display">
                <div className="no-content-data">
                    <img src='/images/no-data.svg' />
                    <p>Please Enter Correct URL.</p>
                </div>
            </div>
        </div>
    )
}
export default NoUser;