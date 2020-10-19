import React, { Fragment } from 'react';
import { Link } from "react-router-dom"
import { urlFormat } from "../../utils/functions"
import { useSelector } from "react-redux"

const Footer = () => {

    const baseData = useSelector(state => state.baseReducer)

    return (
        <Fragment>

            <div className="mainFullWidth mainFullWidthfooter">
                <div className="footer">
                    <div className="container">
                        <div className="footerMenuSection k-flex align-items-center">
                            <div className="footer-menu">
                                <ul className="list-style-none">



                                    {(baseData.settings.frontendsettings.folderlinkurl !== undefined && baseData.settings.frontendsettings.folderlinkurl.length > 0) ?

                                        (baseData.settings.frontendsettings.folderlinkurl[0] !== undefined && baseData.settings.frontendsettings.folderlinkurl[0].length > 0) ?
                                            <li>
                                                <a href={urlFormat(baseData.settings.frontendsettings.folderlinkurl[0])} target="_blank" className="li">
                                                    {baseData.settings.frontendsettings.Footerlink[0]}
                                                </a>

                                            </li>
                                            : null

                                                (baseData.settings.frontendsettings.folderlinkurl[1] !== undefined && baseData.settings.frontendsettings.folderlinkurl[1].length > 0) ?
                                                <li>

                                                    <a href={urlFormat(baseData.settings.frontendsettings.folderlinkurl[1])} target="_blank" className="li">
                                                        {baseData.settings.frontendsettings.Footerlink[1]}
                                                    </a>

                                                </li>
                                                : null

                                                    (baseData.settings.frontendsettings.folderlinkurl[2] !== undefined && baseData.settings.frontendsettings.folderlinkurl[2].length > 0) ?
                                                    <li>

                                                        <a href={urlFormat(baseData.settings.frontendsettings.folderlinkurl[2])} target="_blank" className="li">
                                                            {baseData.settings.frontendsettings.Footerlink[2]}
                                                        </a>

                                                    </li>
                                                    : null



                                        : null}

                                    <li>
                                        <Link to="/">{baseData.settings.frontendsettings.Headerlink[0]}</Link>
                                    </li>

                                    <li>
                                        <Link to="/categories">{baseData.settings.frontendsettings.Headerlink[1]}</Link>
                                    </li>


                                </ul>
                            </div>

                            <div className="footer-social">
                                <ul className="list-style-none">



                                    {(baseData.settings.frontendsettings.facebook !== undefined && baseData.settings.frontendsettings.facebook.length > 0) ?
                                        <li>
                                            <a href={urlFormat(baseData.settings.frontendsettings.facebook)} target="_blank" className="fb">


                                                <svg id="_001-facebook-logo" data-name="001-facebook-logo" xmlns="http://www.w3.org/2000/svg" width="10.326" height="19.1" viewBox="0 0 10.326 19.1">
                                                    <path id="Path_7" data-name="Path 7" d="M32.014,0,29.538,0a4.35,4.35,0,0,0-4.581,4.7V6.868h-2.49a.389.389,0,0,0-.389.39V10.4a.389.389,0,0,0,.389.389h2.49V18.71a.389.389,0,0,0,.389.389H28.6a.389.389,0,0,0,.389-.389V10.787H31.9a.389.389,0,0,0,.389-.389V7.257a.39.39,0,0,0-.39-.39H28.985V5.03c0-.883.21-1.331,1.361-1.331h1.668a.389.389,0,0,0,.389-.389V.393A.39.39,0,0,0,32.014,0Z" transform="translate(-22.077)" fill="#d5d5d5" />
                                                </svg>
                                            </a>
                                        </li>
                                        : null}

                                    {(baseData.settings.frontendsettings.twitter !== undefined && baseData.settings.frontendsettings.twitter.length > 0) ?
                                        <li>

                                            <a href={urlFormat(baseData.settings.frontendsettings.twitter)} target="_blank" className="tt">


                                                <svg xmlns="http://www.w3.org/2000/svg" width="22.961" height="19.1" viewBox="0 0 22.961 19.1">
                                                    <path id="_002-twitter" data-name="002-twitter" d="M22.6,36.713a9.092,9.092,0,0,1-1.583.534,4.936,4.936,0,0,0,1.3-2.075h0a.259.259,0,0,0-.379-.3h0a9.135,9.135,0,0,1-2.42,1,.617.617,0,0,1-.151.019.642.642,0,0,1-.424-.162,4.95,4.95,0,0,0-3.275-1.236,5.293,5.293,0,0,0-1.568.242,4.8,4.8,0,0,0-3.232,3.455,5.281,5.281,0,0,0-.117,1.823.177.177,0,0,1-.045.139.184.184,0,0,1-.137.062H10.55a12.98,12.98,0,0,1-8.921-4.766h0a.259.259,0,0,0-.424.033h0A4.956,4.956,0,0,0,2.01,41.5a4.436,4.436,0,0,1-1.129-.437h0a.259.259,0,0,0-.384.223h0a4.956,4.956,0,0,0,2.891,4.566H3.282a4.454,4.454,0,0,1-.834-.08h0a.259.259,0,0,0-.3.333h0a4.961,4.961,0,0,0,3.919,3.374A9.135,9.135,0,0,1,.955,51.031H.383a.379.379,0,0,0-.371.286A.392.392,0,0,0,.2,51.75a13.587,13.587,0,0,0,6.827,1.841,13.773,13.773,0,0,0,5.834-1.238,12.884,12.884,0,0,0,4.269-3.2,14.025,14.025,0,0,0,2.614-4.378,13.83,13.83,0,0,0,.888-4.791v-.075a.842.842,0,0,1,.315-.656,9.784,9.784,0,0,0,1.968-2.16h0a.259.259,0,0,0-.32-.38Z" transform="translate(0 -34.491)" fill="#d5d5d5" />
                                                </svg>


                                            </a>
                                        </li>
                                        : null}

                                    {(baseData.settings.frontendsettings.linkdin !== undefined && baseData.settings.frontendsettings.linkdin.length > 0) ?
                                        <li>

                                            <a href={urlFormat(baseData.settings.frontendsettings.linkdin)} target="_blank" className="li">

                                                <svg id="_005-linkedin-logo" data-name="005-linkedin-logo" xmlns="http://www.w3.org/2000/svg" width="19.988" height="19.1" viewBox="0 0 19.988 19.1">
                                                    <path id="LinkedIn" d="M19.988,21.268v7.39H15.7V21.763c0-1.732-.62-2.914-2.17-2.914a2.344,2.344,0,0,0-2.2,1.567,2.931,2.931,0,0,0-.142,1.045v7.2H6.908s.058-11.677,0-12.887h4.285V17.6c-.009.014-.02.028-.028.042h.028V17.6a4.255,4.255,0,0,1,3.862-2.129C17.874,15.468,19.988,17.309,19.988,21.268ZM2.425,9.558a2.233,2.233,0,1,0-.057,4.454H2.4a2.234,2.234,0,1,0,.028-4.454Zm-2.17,19.1H4.538V15.77H.255Z" transform="translate(0 -9.558)" fill="#d5d5d5" />
                                                </svg>


                                            </a>

                                        </li>
                                        : null}

                                    {(baseData.settings.frontendsettings.instagram !== undefined && baseData.settings.frontendsettings.instagram.length > 0) ?
                                        <li>

                                            <a href={urlFormat(baseData.settings.frontendsettings.instagram)} target="_blank" className="ig">

                                                <svg id="_006-instagram" data-name="006-instagram" xmlns="http://www.w3.org/2000/svg" width="20.335" height="20.335" viewBox="0 0 20.335 20.335">
                                                    <g id="Group_18" data-name="Group 18">
                                                        <g id="Group_17" data-name="Group 17">
                                                            <path id="Path_8" data-name="Path 8" d="M13.98,0H6.355A6.355,6.355,0,0,0,0,6.355V13.98a6.355,6.355,0,0,0,6.355,6.355H13.98a6.355,6.355,0,0,0,6.355-6.355V6.355A6.355,6.355,0,0,0,13.98,0Zm4.448,13.98a4.453,4.453,0,0,1-4.448,4.448H6.355A4.453,4.453,0,0,1,1.906,13.98V6.355A4.453,4.453,0,0,1,6.355,1.906H13.98a4.453,4.453,0,0,1,4.448,4.448Z" transform="translate(0 0)" fill="#d5d5d5" />
                                                        </g>
                                                    </g>
                                                    <g id="Group_20" data-name="Group 20" transform="translate(5.084 5.084)">
                                                        <g id="Group_19" data-name="Group 19">
                                                            <path id="Path_9" data-name="Path 9" d="M133.084,128a5.084,5.084,0,1,0,5.084,5.084A5.084,5.084,0,0,0,133.084,128Zm0,8.261a3.177,3.177,0,1,1,3.177-3.177A3.182,3.182,0,0,1,133.084,136.261Z" transform="translate(-128 -128)" fill="#d5d5d5" />
                                                        </g>
                                                    </g>
                                                    <g id="Group_22" data-name="Group 22" transform="translate(14.955 4.025)">
                                                        <g id="Group_21" data-name="Group 21">
                                                            <ellipse id="Ellipse_8" data-name="Ellipse 8" cx="0.677" cy="0.677" rx="0.677" ry="0.677" fill="#d5d5d5" />
                                                        </g>
                                                    </g>
                                                </svg>


                                            </a>

                                        </li>
                                        : null}



                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >

    )
}
export default Footer;