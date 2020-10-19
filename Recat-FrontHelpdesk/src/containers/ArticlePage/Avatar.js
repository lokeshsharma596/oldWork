import React from "react"
import readTimeEstimate from "reading-time"
import { UpdateStatus } from "../../utils/functions"
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';

const Avatar = (props) => {
    const baseData = useSelector(state => state.baseReducer)
    const articleData = useSelector(state => state.articleReducer)
    const pathname = useLocation().pathname.split("/")[1]


    return (
        <div className="user-article">

            {(baseData.settings.personal_info.imageurl !== undefined && baseData.settings.personal_info.imageurl.length > 0) ?

                <img src={baseData.settings.personal_info.imageurl} alt="profile-pic" />


                : (baseData.settings.personal_info.imageurl.length === 0 && baseData.settings.personal_info.firstname !== undefined && baseData.settings.personal_info.firstname.length > 0 && baseData.settings.personal_info.lastname.length === 0) ?

                    <div className="avtare-cus-new" style={{ "backgroundColor": baseData.settings.frontendsettings.themescolor }}>
                        {baseData.settings.personal_info.firstname[0].toUpperCase()}
                    </div>

                    : (baseData.settings.personal_info.imageurl.length === 0 && baseData.settings.personal_info.firstname !== undefined && baseData.settings.personal_info.firstname.length > 0 && baseData.settings.personal_info.lastname !== undefined && baseData.settings.personal_info.lastname.length > 0) ?
                        <div className="avtare-cus-new" style={{ "backgroundColor": baseData.settings.frontendsettings.themescolor }}>
                            {`${baseData.settings.personal_info.firstname[0].toUpperCase()}${baseData.settings.personal_info.lastname[0].toUpperCase()}`}
                        </div>
                        : (baseData.settings.personal_info.imageurl.length === 0 && baseData.settings.personal_info.firstname.length === 0) ?
                            <div className="avtare-cus-new" style={{ "backgroundColor": baseData.settings.frontendsettings.themescolor }}>
                                {`${baseData.settings.personal_info.email[0].toUpperCase()}${baseData.settings.personal_info.email[1].toUpperCase()}`}
                            </div>

                            : null}


            <div className="user-article-details">
                {(baseData.settings.personal_info.firstname !== undefined && baseData.settings.personal_info.firstname.length > 0 && baseData.settings.personal_info.lastname !== undefined && baseData.settings.personal_info.lastname.length > 0) ?
                    <>
                        <h4>{baseData.settings.personal_info.firstname[0].toUpperCase()}{baseData.settings.personal_info.firstname.slice(1)} {baseData.settings.personal_info.lastname[0].toUpperCase()}{baseData.settings.personal_info.lastname.slice(1)}
                            <span className="pl-2">

                                {(articleData.article.pinStatus) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                        <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                            <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                            <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                            <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                        </g>
                                    </svg>
                                    : null}
                            </span>
                        </h4>
                    </>


                    : (baseData.settings.personal_info.firstname.length === 0 && baseData.settings.personal_info.lastname.length === 0) ?
                        <>
                            <h4>{baseData.settings.personal_info.email.substring(0, baseData.settings.personal_info.email.lastIndexOf("@"))}
                                <span className="pl-2">

                                    {(articleData.article.pinStatus) ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                            <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                            </g>
                                        </svg>
                                        : null}
                                </span>
                            </h4>
                        </>

                        : (baseData.settings.personal_info.firstname !== undefined && baseData.settings.personal_info.firstname.length > 0 && baseData.settings.personal_info.lastname.length === 0) ?
                            <>
                                <h4>{baseData.settings.personal_info.firstname[0].toUpperCase()}{baseData.settings.personal_info.firstname.slice(1)}
                                    <span className="pl-2">

                                        {(articleData.article.pinStatus) ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                                <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                    <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                    <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                    <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                                </g>
                                            </svg>
                                            : null}
                                    </span>
                                </h4>
                            </>

                            : (baseData.settings.personal_info.firstname.length === 0 && baseData.settings.personal_info.lastname !== undefined && baseData.settings.personal_info.lastname.length > 0) ?
                                <>
                                    <h4>{baseData.settings.personal_info.email.substring(0, baseData.settings.personal_info.email.lastIndexOf("@"))}
                                        <span className="pl-2">

                                            {(articleData.article.pinStatus) ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                                    <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                        <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                        <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                        <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                                    </g>
                                                </svg>
                                                : null}
                                        </span>
                                    </h4>


                                </>

                                : null
                }



                {/* <p>Edited {UpdateStatus(articleData.article.updatedOn)} ago / {readTimeEstimate(articleData.article.description).text}</p> */}





                {(pathname === "preview") ?
                    (Object.keys(props.previewArticle).length > 0) ?
                        <p>Created {UpdateStatus(props.previewArticle.createdON)} ago / {readTimeEstimate(props.previewArticle.description).text}</p>
                        : null
                    : <p>Edited {UpdateStatus(articleData.article.updatedOn)} ago / {readTimeEstimate(articleData.article.description).text}</p>}
            </div>


        </div>
    )
}

export default Avatar;