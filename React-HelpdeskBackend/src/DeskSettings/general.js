import React from 'react'
import { connect } from 'react-redux';
import { userService } from '../_services';
import Loader from '../_components/Loader';
import config from 'config';


class General extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loader:false
        };
    }
    export=(e)=>{
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch({ type: 'ExportToggle' })
    }
    csvOpen=(e)=>{
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch({ type: 'CsvToggle' })
    }
    
    render(){
        return(
            <div className="page-wrapper">
            {this.state.loader && <Loader />}
            <div className="main-desk-settings">
            <div className="desk-Settings-banner-header desk-Settings-bg p20-minus">
                <div className="centerMainContainer container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="py-4">
                                <div className="module-settings">
                                    <h2 className="card-title">Knowledge Settings</h2>
                                    {/* <p className="card-body-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                                        eaque ipsa quae ab illo inventore veritatis.</p> */}
                                </div>
                                <div className="module-settings-search">
                                    {/* <div className="searchHere headerSearch">
                                        <span className="searchIcon">&nbsp;</span>
                                        <input type="text" placeholder="Search here" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="desk-Settings">
                <div className="desk-setting-tabs-row">
                <div className="centerMainContainer container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="module-settings-tabs pt-0">
                                <div className="settings-listing">
                                    <ul>
                                        {/* <li className="seleted">
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg id="Icon_ionic-ios-folder-open" data-name="Icon ionic-ios-folder-open" xmlns="http://www.w3.org/2000/svg" width="35.803" height="30.695" viewBox="0 0 35.803 30.695">
                                                            <path id="Path_2386" data-name="Path 2386" d="M35.2,8.9a1.763,1.763,0,0,0-1.823-1.839H17.841a.591.591,0,0,1-.488-.192l-1.8-1.8-.016-.016A1.737,1.737,0,0,0,14.156,4.5H6.474A1.9,1.9,0,0,0,4.5,6.339v5.835H35.2Z" transform="translate(-1.944 -4.5)" fill="#9d9d9d"/>
                                                            <path id="Path_2387" data-name="Path 2387" d="M4.808,13.219H4.144c-1.023,0-2.022.408-1.878,1.942S4.144,32,4.144,32c.216,1.423.935,2,2,2H34.32c1.015,0,1.679-.624,1.839-2,0,0,1.775-14.78,1.886-16.427s-.711-2.358-1.886-2.358H4.808Z" transform="translate(-2.252 -3.307)" fill="#9d9d9d"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">General</p>
                                            </div>
                                        </li> */}
                                        {/* <li>
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30.664" height="30.664" viewBox="0 0 30.664 30.664">
                                                            <g id="Group_3588" data-name="Group 3588" transform="translate(-709.1 -456.1)">
                                                                <g id="Group_1854" data-name="Group 1854" transform="translate(731.329 460.317)">
                                                                <path id="Path_2401" data-name="Path 2401" d="M814.408,475.3a4.108,4.108,0,1,0,4.108,4.108A4.113,4.113,0,0,0,814.408,475.3Zm0,5.8a1.691,1.691,0,1,1,1.691-1.691A1.695,1.695,0,0,1,814.408,481.1Z" transform="translate(-810.3 -475.3)" fill="#9d9d9d"/>
                                                                </g>
                                                                <g id="Group_1855" data-name="Group 1855" transform="translate(713.317 478.549)">
                                                                <path id="Path_2402" data-name="Path 2402" d="M732.408,558.3a4.108,4.108,0,1,0,4.108,4.108A4.113,4.113,0,0,0,732.408,558.3Zm0,5.8a1.691,1.691,0,1,1,1.691-1.691A1.695,1.695,0,0,1,732.408,564.1Z" transform="translate(-728.3 -558.3)" fill="#9d9d9d"/>
                                                                </g>
                                                                <g id="Group_1856" data-name="Group 1856" transform="translate(709.1 456.1)">
                                                                <path id="Path_2403" data-name="Path 2403" d="M713.252,456.1a4.151,4.151,0,1,0,4.151,4.151A4.157,4.157,0,0,0,713.252,456.1Zm0,5.887a1.735,1.735,0,1,1,1.735-1.735A1.736,1.736,0,0,1,713.252,461.987Z" transform="translate(-709.1 -456.1)" fill="#9d9d9d"/>
                                                                </g>
                                                                <g id="Group_1857" data-name="Group 1857" transform="translate(716.766 463.986)">
                                                                <path id="Path_2404" data-name="Path 2404" d="M768.133,516.133l-1.175-1.175-1.72-1.72-2.019-2.019-1.707-1.707-5.43-5.43-1.707-1.707L751,499" transform="translate(-749.463 -497.463)" fill="#9d9d9d"/>
                                                                <path id="Path_2405" data-name="Path 2405" d="M751.984,497.81a3.848,3.848,0,0,0-2.269,2.08l-1.779-1.779-3.484-3.484a1.538,1.538,0,0,1,2.175-2.175Z" transform="translate(-744.003 -492.003)" fill="#9d9d9d"/>
                                                                <path id="Path_2406" data-name="Path 2406" d="M801.507,550.085a1.5,1.5,0,0,1-.529.094,1.531,1.531,0,0,1-1.087-.45l-2.594-2.594-2.427-2.427-1.779-1.779a3.847,3.847,0,0,0,2.08-2.269l6.073,6.073a.324.324,0,0,0-.046,0,1.691,1.691,0,0,0,0,3.383A1.607,1.607,0,0,0,801.507,550.085Z" transform="translate(-782.308 -529.972)" fill="#9d9d9d"/>
                                                                </g>
                                                                <g id="Group_1858" data-name="Group 1858" transform="translate(719.731 467.171)">
                                                                <path id="Path_2407" data-name="Path 2407" d="M763.76,506.5a6.259,6.259,0,0,0-4.312,1.729,6.109,6.109,0,0,0-.98,1.195,6.192,6.192,0,0,0-.969,3.337,6.269,6.269,0,0,0,6.26,6.26,6.192,6.192,0,0,0,3.336-.969,6.114,6.114,0,0,0,1.2-.98A6.255,6.255,0,0,0,763.76,506.5Zm2.825,8.865A3.834,3.834,0,1,1,767.4,514,3.842,3.842,0,0,1,766.585,515.365Z" transform="translate(-757.5 -506.5)" fill="#9d9d9d"/>
                                                                </g>
                                                                <g id="Group_1859" data-name="Group 1859" transform="translate(731.549 478.329)">
                                                                <path id="Path_2408" data-name="Path 2408" d="M815.408,557.3a4.126,4.126,0,0,0-3.115,1.432,4.131,4.131,0,0,0-.786,1.388,4.108,4.108,0,1,0,3.9-2.82Zm.31,5.77a1.613,1.613,0,0,1-.31.029,1.691,1.691,0,0,1,0-3.383.325.325,0,0,1,.046,0,1.691,1.691,0,0,1,.264,3.352Z" transform="translate(-811.3 -557.3)" fill="#9d9d9d"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">Link Channels</p>
                                            </div>
                                        </li> */}
                                        {/* <li>
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="34.905" height="23.27" viewBox="0 0 34.905 23.27">
                                                            <path id="Icon_awesome-ticket-alt" data-name="Icon awesome-ticket-alt" d="M7.757,10.318H27.148V21.953H7.757ZM32,16.135a2.909,2.909,0,0,0,2.909,2.909v5.818A2.909,2.909,0,0,1,32,27.77H2.909A2.909,2.909,0,0,1,0,24.861V19.044a2.909,2.909,0,0,0,2.909-2.909A2.909,2.909,0,0,0,0,13.226V7.409A2.909,2.909,0,0,1,2.909,4.5H32a2.909,2.909,0,0,1,2.909,2.909v5.818A2.909,2.909,0,0,0,32,16.135Zm-2.909-6.3a1.454,1.454,0,0,0-1.454-1.454H7.272A1.454,1.454,0,0,0,5.818,9.833v12.6a1.454,1.454,0,0,0,1.454,1.454H27.633a1.454,1.454,0,0,0,1.454-1.454Z" transform="translate(0 -4.5)" fill="#9d9d9d"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">Ticketing</p>
                                            </div>
                                        </li> */}
                                        {/* <li className="seleted">
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="33.569" height="34.006" viewBox="0 0 33.569 34.006">
                                                            <g id="Group_4102" data-name="Group 4102" transform="translate(-6768 -511.808)">
                                                                <g id="knowledge" transform="translate(6768 539.459)">
                                                                <g id="Group_3656" data-name="Group 3656" transform="translate(0.03 0)">
                                                                    <g id="Group_3655" data-name="Group 3655">
                                                                    <path id="Path_2432" data-name="Path 2432" d="M33.926,369.59v-1.155c-7.537,0-15.546,1.822-15.6,5.2H16.016c-.052-3.378-8.061-5.2-15.6-5.2v1.155c8.463,0,14.373,2.124,14.44,4.044H.418v1.155H33.926v-1.155H19.486C19.552,371.715,25.462,369.59,33.926,369.59Z" transform="translate(-0.418 -368.435)" fill="#9d9d9d"/>
                                                                    </g>
                                                                </g>
                                                                <g id="Group_3658" data-name="Group 3658" transform="translate(0 2.89)">
                                                                    <g id="Group_3657" data-name="Group 3657" transform="translate(0 0)">
                                                                    <rect id="Rectangle_1594" data-name="Rectangle 1594" width="1.155" height="10.994" transform="translate(0 1.154) rotate(-86.985)" fill="#9d9d9d"/>
                                                                    </g>
                                                                </g>
                                                                <g id="Group_3660" data-name="Group 3660" transform="translate(22.53 2.889)">
                                                                    <g id="Group_3659" data-name="Group 3659" transform="translate(0 0)">
                                                                    <rect id="Rectangle_1595" data-name="Rectangle 1595" width="10.994" height="1.155" transform="translate(0 0.579) rotate(-3.021)" fill="#9d9d9d"/>
                                                                    </g>
                                                                </g>
                                                                </g>
                                                                <g id="Group_3661" data-name="Group 3661" transform="translate(6770.848 511.808)">
                                                                <path id="XMLID_49_" d="M26.2,24.14v.807a1.28,1.28,0,0,1-1.086,1.268l-.2.733a.913.913,0,0,1-.881.676H22.066a.913.913,0,0,1-.881-.676l-.193-.733A1.286,1.286,0,0,1,19.9,24.941v-.807a.776.776,0,0,1,.779-.779h4.746A.785.785,0,0,1,26.2,24.14Zm3.655-10.879a6.771,6.771,0,0,1-1.91,4.723,6.241,6.241,0,0,0-1.671,3.388,1.125,1.125,0,0,1-1.114.949H20.941a1.114,1.114,0,0,1-1.108-.944,6.31,6.31,0,0,0-1.682-3.4,6.8,6.8,0,1,1,11.709-4.718ZM23.822,9.14a.768.768,0,0,0-.767-.767,4.916,4.916,0,0,0-4.911,4.911.767.767,0,1,0,1.535,0,3.38,3.38,0,0,1,3.376-3.376A.764.764,0,0,0,23.822,9.14Zm-.767-4.917a.768.768,0,0,0,.767-.767V.767a.767.767,0,1,0-1.535,0V3.456A.768.768,0,0,0,23.055,4.223Zm-9.032,9.032a.768.768,0,0,0-.767-.767H10.567a.767.767,0,0,0,0,1.535h2.689A.764.764,0,0,0,14.023,13.255Zm21.52-.767H32.854a.767.767,0,0,0,0,1.535h2.689a.767.767,0,1,0,0-1.535ZM15.586,19.644l-1.9,1.9a.766.766,0,0,0,1.08,1.086l1.9-1.9a.766.766,0,0,0-1.08-1.086Zm14.4-12.55a.766.766,0,0,0,.54-.222l1.9-1.9a.768.768,0,0,0-1.086-1.086l-1.9,1.9a.765.765,0,0,0,0,1.086A.779.779,0,0,0,29.984,7.094Zm-14.4-.227a.766.766,0,0,0,1.08-1.086l-1.9-1.9a.768.768,0,1,0-1.086,1.086ZM30.524,19.644a.768.768,0,0,0-1.086,1.086l1.9,1.9a.766.766,0,0,0,1.08-1.086Z" transform="translate(-9.8)" fill="#9d9d9d"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">Knowledge Base</p>
                                            </div>
                                        </li> */}
                                        {/* <li>
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg id="Group_4104" data-name="Group 4104" xmlns="http://www.w3.org/2000/svg" width="31.121" height="31.121" viewBox="0 0 31.121 31.121">
                                                            <path id="Path_2435" data-name="Path 2435" d="M217.724,207.665a10.09,10.09,0,0,0-5.534-8.985,13.722,13.722,0,0,1-13.511,13.511,10.063,10.063,0,0,0,14.1,4.135l4.9,1.355-1.355-4.9A10.024,10.024,0,0,0,217.724,207.665Zm0,0" transform="translate(-186.603 -186.603)" fill="#9d9d9d"/>
                                                            <path id="Path_2436" data-name="Path 2436" d="M23.766,11.883a11.883,11.883,0,1,0-22.119,6.04l-1.6,5.8,5.8-1.6A11.886,11.886,0,0,0,23.766,11.883ZM10.06,9.118H8.236a3.647,3.647,0,1,1,6.108,2.691l-1.549,1.418v1.422H10.971V12.424l2.142-1.96a1.8,1.8,0,0,0,.594-1.346,1.824,1.824,0,0,0-3.647,0Zm.912,7.355h1.824V18.3H10.971Zm0,0" fill="#9d9d9d"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">Community</p>
                                            </div>
                                        </li> */}
                                        {/* <li>
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg id="Group_3545" data-name="Group 3545" xmlns="http://www.w3.org/2000/svg" width="33.135" height="33.135" viewBox="0 0 33.135 33.135">
                                                            <path id="Path_2390" data-name="Path 2390" d="M102.455,92.2a8.593,8.593,0,0,0-1.185-2.859l1.117-1.117-2.579-2.577-1.116,1.116a8.594,8.594,0,0,0-2.859-1.185V84H92.187v1.579a8.593,8.593,0,0,0-2.859,1.185l-1.116-1.116-2.579,2.577,1.117,1.117A8.593,8.593,0,0,0,85.565,92.2H83.983l0,3.646h1.585a8.583,8.583,0,0,0,1.185,2.859l-1.121,1.121,2.577,2.579,1.122-1.122a8.583,8.583,0,0,0,2.859,1.185v1.589h3.646v-1.589a8.587,8.587,0,0,0,2.859-1.185l1.122,1.122,2.577-2.579-1.121-1.121a8.584,8.584,0,0,0,1.185-2.859h1.585V92.2ZM94.01,98.263a4.235,4.235,0,1,1,4.235-4.235A4.235,4.235,0,0,1,94.01,98.263Zm0,0" transform="translate(-77.442 -77.461)" fill="#9d9d9d"/>
                                                            <path id="Path_2391" data-name="Path 2391" d="M5.828,25.625a2.7,2.7,0,0,0-1.305.333A15.28,15.28,0,0,1,19.609,1.6.647.647,0,0,0,19.866.328,16.691,16.691,0,0,0,16.568,0a16.568,16.568,0,0,0-13,26.835,2.719,2.719,0,1,0,2.263-1.21ZM6.835,29.35a1.424,1.424,0,1,1,.417-1.007A1.414,1.414,0,0,1,6.835,29.35Zm0,0" transform="translate(0 0)" fill="#9d9d9d"/>
                                                            <path id="Path_2392" data-name="Path 2392" d="M214.273,36.276a2.712,2.712,0,1,0-.957.878A15.28,15.28,0,0,1,198.258,61.52.647.647,0,0,0,198,62.79a16.7,16.7,0,0,0,3.267.322,16.568,16.568,0,0,0,13-26.836Zm-3.269-.5a1.424,1.424,0,1,1,1.007.417A1.414,1.414,0,0,1,211,35.776Zm0,0" transform="translate(-184.703 -29.977)" fill="#9d9d9d"/>
                                                            <path id="Path_2394" data-name="Path 2394" d="M184.066,178.719a5.348,5.348,0,1,0-5.348,5.348A5.354,5.354,0,0,0,184.066,178.719Zm-9.4,0a4.053,4.053,0,1,1,4.053,4.053A4.058,4.058,0,0,1,174.665,178.719Zm0,0" transform="translate(-162.151 -162.151)" fill="#9d9d9d"/>
                                                            <path id="Path_2395" data-name="Path 2395" d="M338.725,19.1a.648.648,0,1,0-.457-.19A.652.652,0,0,0,338.725,19.1Zm0,0" transform="translate(-316.199 -16.656)" fill="#9d9d9d"/>
                                                            <path id="Path_2396" data-name="Path 2396" d="M155.007,474.359a.647.647,0,1,0,.458.19A.652.652,0,0,0,155.007,474.359Zm0,0" transform="translate(-144.37 -443.66)" fill="#9d9d9d"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">Automations</p>
                                            </div>
                                        </li> */}
                                        {/* <li>
                                            <div className="settings-tabs-col">
                                                <div className="settings-tabs-icon mb-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="41.217" height="26.229" viewBox="0 0 41.217 26.229">
                                                            <path id="Icon_material-people" data-name="Icon material-people" d="M29.6,18.741a5.621,5.621,0,1,0-5.621-5.621A5.6,5.6,0,0,0,29.6,18.741Zm-14.988,0a5.621,5.621,0,1,0-5.621-5.621A5.6,5.6,0,0,0,14.615,18.741Zm0,3.747C10.249,22.488,1.5,24.68,1.5,29.045v4.684H27.729V29.045C27.729,24.68,18.98,22.488,14.615,22.488Zm14.988,0c-.543,0-1.162.037-1.817.094a7.906,7.906,0,0,1,3.691,6.464v4.684H42.717V29.045C42.717,24.68,33.968,22.488,29.6,22.488Z" transform="translate(-1.5 -7.5)" fill="#9d9d9d"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className="card-body-text">Roles</p>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></div></div>

                <div className="desk-settings-show mt-5">
                    <div className="container">
                        <div className="desk-settings-show-row mb-5">
                            {/* <div className="option-desk-setting desk-setting-details pl-4 pr-4 pt-4 pb-4 border-bottom">
                                <div className="option-desk-icon">
                                    <svg id="Icon_ionic-ios-folder-open" data-name="Icon ionic-ios-folder-open" xmlns="http://www.w3.org/2000/svg" width="35.803" height="30.695" viewBox="0 0 35.803 30.695">
                                        <path id="Path_2386" data-name="Path 2386" d="M35.2,8.9a1.763,1.763,0,0,0-1.823-1.839H17.841a.591.591,0,0,1-.488-.192l-1.8-1.8-.016-.016A1.737,1.737,0,0,0,14.156,4.5H6.474A1.9,1.9,0,0,0,4.5,6.339v5.835H35.2Z" transform="translate(-1.944 -4.5)" fill="#9d9d9d"/>
                                        <path id="Path_2387" data-name="Path 2387" d="M4.808,13.219H4.144c-1.023,0-2.022.408-1.878,1.942S4.144,32,4.144,32c.216,1.423.935,2,2,2H34.32c1.015,0,1.679-.624,1.839-2,0,0,1.775-14.78,1.886-16.427s-.711-2.358-1.886-2.358H4.808Z" transform="translate(-2.252 -3.307)" fill="#9d9d9d"/>
                                    </svg>
                                </div>
                                <div className="option-desk-details ">
                                    <h4 className="card-title mb-2">General Settings</h4>
                                    <p className="card-body-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
veritatis et quasi architecto beatae </p>
                                </div>
                            </div> */}
                            <div className="option-desk-setting desk-setting-listing pl-4 pr-4 pt-4 pb-4">
                                <div className="desk-setting-listing-options">
                                    <ul>
                                        <li>
                                            <div className="desk-list-para-icon">
                                                <span><img src={`${config.path}/images/module-settings/basic-settings.svg`} /></span>
                                                <a className="card-body-text" href={`${config.path}/knoBaseSettings`}>Basic Settings</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="desk-list-para-icon">
                                               <span><img src={`${config.path}/images/module-settings/help-portal.svg`} /></span>
                                                {/* <span><img src={'../../images/module-settings/language.svg'} /></span> */}
                                                <a className="card-body-text" href={`${config.path}/settings`} >Help Portal Settings</a>
                                            </div>
                                        </li>
                                        <li onClick={this.csvOpen}>
                                            <div className="desk-list-para-icon">
                                               <span><img src={`${config.path}/images/module-settings/layout_settings.svg`} /></span>
                                                {/* <span><img src={`${config.path}/images/csv.svg`} /></span> */}
                                                <a className="card-body-text" href="#" >Import via .CSV</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="desk-list-para-icon" onClick={this.export}>
                                               <span><img src={`${config.path}/images/module-settings/layout_settings.svg`} /></span>
                                                {/* <span><img src={'../../images/module-settings/language.svg'} /></span> */}
                                                <a className="card-body-text" href="#" >Export</a>
                                            </div>
                                        </li>
                                       
                                        {/* <li>
                                            <div className="desk-list-para-icon" onClick={this.csvOpen}>
                                                <span><img src={`${config.path}/images/csv.svg`} /></span>
                                                <p className="card-body-text">Notification & Sound</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="desk-list-para-icon">
                                                <span><img src={'../../images/module-settings/location.svg'} /></span>
                                                <p className="card-body-text">Location</p>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
        );
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedGeneral = connect(mapStateToProps)(General);
export { connectedGeneral as General }; 