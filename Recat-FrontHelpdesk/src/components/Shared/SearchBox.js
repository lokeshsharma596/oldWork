import React from "react"
import { connectSearchBox } from 'react-instantsearch-dom';
import { hits } from './Hits';
import { Link } from "react-router-dom"
import { useState } from "react"
import { validateUrl } from "../../utils/functions"


const CustomSearchBox = ({ currentRefinement, isSearchStalled, refine, userid, data, value1 }) => {
    const [state, setstate] = useState({
        hots: [],
        show: false
    })


    return (
        <div className="Search-details my-4">
            <span className="search-Feilds-frontend searchFeilds">
                <input type="search"
                    placeholder="Search Articles"
                    value={currentRefinement}
                    onChange={event => {
                        refine(event.currentTarget.value)
                        if (event.currentTarget.value.length == 0) {

                            var st = { ...state, hots: [] }
                            setstate(st)
                        } else {
                            var st = { ...state, hots: hits }
                            setstate(st)
                        }

                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            var st = { ...state, hots: [] }
                            setstate(st)

                        }, 200)
                    }}
                    onFocus={(event) => {
                        refine(event.currentTarget.value)
                        if (event.currentTarget.value.length == 0) {

                            var st = { ...state, hots: [] }
                            setstate(st)
                        } else {
                            var st = { ...state, hots: hits }
                            setstate(st)
                        }

                    }}


                />



                <ul className="search-bare-listings">
                    {state.hots.map(hit => (

                        (hit.type === "article") ?


                            <li>
                                <Link to={`/article/${validateUrl(hit.name)}-${hit.objectID}`}>
                                    <h5 className="card-title mt-0 mb-0 ml-0 mr-0">{hit.name}</h5>
                                    <p>in Article</p>
                                </Link>
                            </li>


                            : (hit.type === "category") ?

                                <li>
                                    <Link to={`/category/${validateUrl(hit.name)}-${hit.objectID}`} >

                                        <h5 className="card-title mt-0 mb-0 ml-0 mr-0">{hit.name}</h5>
                                        <p>in Category</p>
                                    </Link>
                                </li>


                                : (hit.type === "folder") ?

                                    

                                        <li>
                                            <Link to={`/folder/${validateUrl(hit.name)}-${hit.objectID}`}>
                                            <h5 className="card-title mt-0 mb-0 ml-0 mr-0">{hit.name}</h5>
                                            <p>in Folder</p>
                                            </Link>
                                        </li>
                                    
                                    : null

                    ))}
                </ul>



            </span>


        </div>
    )
};


export default connectSearchBox(CustomSearchBox);