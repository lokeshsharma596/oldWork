import React from "react"

const LoadMoreSpinner = (props) => {
    return (
        <div >
            <img src={`/images/spinner-${props.type}.svg`} alt="loadMoreSpinner" />
        </div>
    )
}

export default LoadMoreSpinner;