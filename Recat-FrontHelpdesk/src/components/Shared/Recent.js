import React, { useEffect, Fragment, useState } from "react"
import { db } from "../../utils/db"
import { Link } from "react-router-dom"
import { validateUrl } from "../../utils/functions"
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';


const Recent = (props) => {
    const [state, setstate] = useState({
        recent_articles: [],
        recent_home: [],
        isEmpty: false,
    })

    const baseData = useSelector(state => state.baseReducer)
    const pathname = useLocation().pathname.split("/")[1]

    useEffect(() => {

        let cquery = db.collection('article');
        cquery = cquery.where("UserId", "==", baseData.settings.usersettings.userId)
        cquery = cquery.where("IsDelete", "==", 0)
        cquery = cquery.where("Ispublish", "==", 1)
        cquery = cquery.where("visibleStatus", "==", (baseData.IsAuthenticated === true) ? true : "[1]")
        cquery = cquery.orderBy("createdON", "desc").limit(10)
            .onSnapshot((documentSet => {
                if (documentSet.empty) {
                    setstate({ ...state, isEmpty: true })
                }
                else {
                    var recent_articles = []
                    documentSet.forEach(doc => {
                        recent_articles.push({
                            id: doc.id,
                            name: doc.data().name,
                            pinStatus: doc.data().pinStatus
                        });
                    })
                    setstate({ ...state, recent_articles: recent_articles, recent_home: recent_articles.slice(0, 4), isEmpty: false })
                }
            }))

        return () => cquery()

    }, [baseData.settings.usersettings.userId])







    return (
        <Fragment>
            {(useLocation().pathname === "/") ?
                <div className="mainFullWidth">
                    <div className="tilesSection aticaHelpDesk mt-5 mb-4">
                        <div className="container">
                            <div className="row">

                                <h5 className="mb-4">Recent Added Articles</h5>


                                {state.recent_home.length > 0 ?

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel-group aticaAcoordian mb-5" id="accordion1">


                                        <div className="panel panel-default help-desk-list">

                                            <ul>
                                                {state.recent_home.map((data, i) => (
                                                    <Fragment key={i}>


                                                        <li>
                                                            <Link to={`/article/${validateUrl(data.name)}-${data.id}`}>{data.name} </Link>
                                                            <span className="pin-article  ml-auto">
                                                                {(data.pinStatus) ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                                                        <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                                            <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                                            <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                                            <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                                                        </g>
                                                                    </svg>
                                                                    : null}

                                                            </span>
                                                            <figure><svg xmlns="http:www.w3.org/2000/svg" width="7.41" height="12" viewBox="0 0 7.41 12"><path id="ic_chevron_right_24px" d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z" transform="translate(-8.59 -6)" fill="#d1d1d1"></path></svg></figure>

                                                        </li>


                                                    </Fragment>
                                                ))}
                                            </ul>

                                        </div>


                                    </div>
                                 
                                    : (state.isEmpty) ?
                                        <h5 className="mb-4"> : No articles available currently</h5>

                                        : null
                                }


                            </div>
                        </div>
                    </div>
                </div>


                : (pathname === "article") ?
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                        <div className="related-articles">
                            <h4 className="card-title">Recent Articles</h4>
                            <ul>

                                {state.recent_articles.map((data) => (
                                    <li key={data.id}>
                                        <Link to={`/article/${validateUrl(data.name)}-${data.id}`} >
                                            <a>{data.name}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    : null}
        </Fragment>
    )
}

export default Recent;