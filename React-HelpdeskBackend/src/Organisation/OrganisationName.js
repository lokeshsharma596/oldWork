import React from 'react';
import { history } from '../_helpers';
import ColorPicker from 'react-input-colorpicker';
import Loader from '../_components/Loader';
import { userService } from '../_services';
import config from 'config';
import Policy from '../_components/policy'

class OrganisationName extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitted:false,
            domainName:localStorage.getItem('domainname')?localStorage.getItem('domainname'):"",
            color:localStorage.getItem('color')?localStorage.getItem('color'):"#1b223c",
            loader:false,
            error:"",
        }
        localStorage.removeItem('session_id');
        localStorage.removeItem('session_mail');
        if((this.props.location.pathname == "/step3") && (!localStorage.getItem('color') || !localStorage.getItem('domainname')) ){
            
            history.replace('/colortheme');
        }
        if(this.props.location.pathname == "/colortheme" && !localStorage.getItem('domainname')){
            history.replace('/orgname');
        }
        if(!localStorage.getItem('color'))
        localStorage.setItem( 'color', "#1b223c" ); 
        var host = window.location.host; 
        let parts = host.split("."); 
        console.log(parts);
        console.log(parts.length);
        
        console.log(window.location.host);
        console.log(window.location.port);
        console.log(window.location.protocol)
        
        // if(parts.length == 3 && parts[0] != 'www' && parts[0] != 'desk')
        // history.replace("/login");
  
        
    }
    changeHandler=(colors)=> {
        this.setState({color:colors.color});
        localStorage.setItem( 'color', colors.color );  
    }
    
    handleChange=(e)=> {
        const { name, value } = e.target;
        var values= value.replace(/[^\w\s]/gi, "");
        // this.setState({ [name]: value.replace(/[^\w\s]/gi, "") });
        // localStorage.setItem( [name], value.replace(/[^\w\s]/gi, "") ); 
        this.setState({ [name]: values });
        localStorage.setItem("orgname",values);
        localStorage.setItem( 'color', "#1b223c" );  
        localStorage.setItem( [name], (values.replace(/\s/g, "")).toLowerCase()); 
    }
    _handleChange=(e)=> {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        localStorage.setItem( [name], value );  
    }
    ngsubmit = (e) => {
        this.setState({ submitted: true });
        if (this.state.domainname.trim()) {
            this.setState({ loader: !this.state.loader })
            userService.organizationcheck((this.state.domainname.replace(/\s/g, "")).toLowerCase())
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ loader: !this.state.loader })
                        if(response.count == 0){
                          this.setState({ error: "" })
                          history.replace('/colortheme');
                        
                        }
                        else{
                        localStorage.setItem( 'domainname',(this.state.domainname.replace(/\s/g, "")).toLowerCase()+(response.count));
                        history.replace('/colortheme');
                        }

                    }

                })
          // history.replace("/step2")
        }
    }
    nextstep=(e) =>{
       history.replace("/signup")
    //    var url = window.location.protocol+"//"+window.location.host;
    //     console.log(url);
    //    var redirectFile = 'https://commonlogin.appypie.com/login?frompage='+url+'/&website='+url;
    //    window.location.href=redirectFile;  
    }
    getcolor=(type)=>{
        localStorage.setItem( 'color', type );
        this.setState({'color':type})
    }
    render(){
        const location = this.props.location.pathname;
        const {submitted,domainname,color,error} = this.state;
        return(
            <div className="organisation-bg main-bg">
            {this.state.loader && <Loader />}
                <div className="header-getstarted">
                    <div className="container">
                        <div className="getstarted-header k-flex align-items-center">
                            <div className="logo-section">
                                <img src={`${config.path}/images/logo.svg`} />
                            </div>
                            {/* <div className="menu-section">
                                <ul>
                                    <li>
                                        Log in
                                    </li>
                                    <li>
                                        Sign Up
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="main-getstarted">
                    <div className="container">
                        <div className="getstarted-section organisation organisation-name">
                         {(location == '/orgname') && <div className="getstarted-content step-one-organisation">
                                <div className="organisation-para pb-2">
                                    <p>Step 1</p>
                                    <h3 className="card-title">Enter The Name of your organization</h3>
                                </div>
                                <div className="create-categroy-feilds create-knowledgeFeilds mt-4 mb-2">
                                    <div className={'md-form md-outline' + (submitted && (!domainname || error) ? ' has-error' : '')}>
                                        <input type="text" id="inputMDEx71" className="form-control" name="domainname" value={domainname}  onChange={this.handleChange} />
                                        <label htmlFor="inputMDEx71" className>Enter Organization Name *</label>
                                        {submitted && !domainname &&
                                            <div className="invalid-feedback">Base Domain is required.</div>
                                        }
                                        {submitted && error &&
                                            <div className="invalid-feedback">{error}.</div>
                                        }
                                    </div>
                                </div>
                                <p className="note-organisation"><strong>Note : </strong>This will serve as the name of your Knowledge Base. Don’t worry you can change this later in the settings section.</p>
                                <div className="button-oraganition mt-4 pt-2">
                                    <button className="btn-organition" onClick={this.ngsubmit}>Next</button>
                                </div>
                            </div>}
                            {(location == '/colortheme') &&  <div className="getstarted-content step-two-organisation">
                                <div className="organisation-para pb-2">
                                    <p>Step 2</p>
                                    <h3 className="card-title mb-0">Choose a Color Theme for your knowledge base</h3> 
                                </div>
                                <div className="lapy-screen color-thems-lapy">
                                    <div className="color-thems-select">
                                        <ul>
                                            <li className={(color == '#1b223c')?'selected':''} onClick={()=>this.getcolor('#1b223c')}><span style={{background: '#1b223c'}}>&nbsp;</span></li>
                                            <li className={(color == '#acacac')?'selected':''} onClick={()=>this.getcolor('#acacac')}><span style={{background: '#acacac'}}>&nbsp;</span></li>
                                            <li className={(color == '#bf659c')?'selected':''} onClick={()=>this.getcolor('#bf659c')} ><span style={{background: '#bf659c'}}>&nbsp;</span></li>
                                            <li className={(color == '#3a7ac4')?'selected':''} onClick={()=>this.getcolor('#3a7ac4')}><span style={{background: '#3a7ac4'}}>&nbsp;</span></li>
                                           
                                            <li className={(color == '#81beb9')?'selected':''} onClick={()=>this.getcolor('#81beb9')}><span style={{background: '#81beb9'}}>&nbsp;</span></li>
                                            <li>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19.799" height="19.799" viewBox="0 0 19.799 19.799">
                                                         <path id="ic_clear_24px" d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(9.899 -7.071) rotate(45)" fill="#cecece"/>
                                                    </svg>
                                                </span>
                                                {/* <input type="color" name="color" value={color} onChange={this._handleChange}/> */}
                                                <ColorPicker
                                                    color={'#36c'}
                                                    onChange={this.changeHandler}
                                                    mode='RGB'
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="lapy-screens-designs pt-3">
                                        <div className="lapy-img-data">
                                            <img src={`${config.path}/images/lapy.svg`} />
                                            <div className="website-in-lapy">
                                                <div className="lapy-html-view">
                                                    <div className="bgSpace" style={{background: color}}>
                                                        <div className="container-lapy">
                                                            <p>Knowledge Base / Categories</p>
                                                            <div className="brandLogo">
                                                                <img src={`${config.path}/images/nira.svg`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="headingTitleSearch mt-4 mb-2">
                                                        <div className="container-lapy">
                                                            <div className="headingTitleSearch-details">
                                                                <h2 className="card-title">atica Analytics</h2>
                                                                <p className="text-mutede">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                  <div className="tilesection">
                                                      <div className="container-lapy">
                                                          <div className="tile-sec-new k-flex justify-content-center align-items-center ">
                                                            <div className="tiles-box atica-help-desk mr-2">
                                                                <div className="tiles-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.383" height="14.672" viewBox="0 0 14.383 14.672">
                                                                        <g id="Group_1876" data-name="Group 1876" transform="translate(0 0)">
                                                                            <path id="Path_1738" data-name="Path 1738" d="M276.087,75.43a1.044,1.044,0,0,1,.532.108q3.137,1.466,6.275,2.932c.15.07.368.1.364.328,0,.214-.211.243-.355.311q-3.167,1.484-6.337,2.96a1.116,1.116,0,0,1-.977.005q-3.222-1.5-6.442-3.008c-.122-.057-.268-.1-.267-.278s.149-.218.271-.275q3.2-1.5,6.4-2.989A1.07,1.07,0,0,1,276.087,75.43Z" transform="translate(-268.88 -75.427)" fill={color}/>
                                                                            <path id="Path_1739" data-name="Path 1739" d="M270.779,106.722a1.117,1.117,0,0,1,.51.122q2.108.987,4.218,1.971a1.26,1.26,0,0,0,1.126,0c1.405-.659,2.813-1.312,4.218-1.971a1.2,1.2,0,0,1,1.042-.015c.384.171.762.355,1.143.534.113.053.226.114.225.26s-.113.207-.226.26q-3.242,1.513-6.485,3.025a1.122,1.122,0,0,1-.978-.008q-3.223-1.5-6.443-3.007c-.12-.056-.247-.11-.248-.268s.124-.215.244-.271q.55-.257,1.1-.517A1.226,1.226,0,0,1,270.779,106.722Z" transform="translate(-268.881 -100.289)" fill={color}/>
                                                                            <path id="Path_1740" data-name="Path 1740" d="M276.045,130.3a1.112,1.112,0,0,1-.627-.157q-3.085-1.443-6.171-2.884c-.15-.07-.368-.1-.361-.331.006-.213.213-.239.357-.31.322-.16.65-.307.975-.46a1.217,1.217,0,0,1,1.084,0c1.371.641,2.747,1.272,4.114,1.924a1.426,1.426,0,0,0,1.316,0c1.373-.655,2.756-1.29,4.135-1.933a1.187,1.187,0,0,1,1.042-.007c.375.173.748.35,1.121.527.118.056.245.11.238.273s-.126.2-.237.251l-4.4,2.059c-.679.317-1.359.632-2.036.952A1.076,1.076,0,0,1,276.045,130.3Z" transform="translate(-268.884 -115.632)" fill={color}/>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <div className="tiles-details">
                                                                    <h5 className="card-title mb10">atica Help Desk</h5>
                                                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque  </p>
                                                                </div>
                                                            </div>
                                                            <div className="tiles-box atica-help-desk">
                                                                <div className="tiles-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.383" height="14.672" viewBox="0 0 14.383 14.672">
                                                                        <g id="Group_1876" data-name="Group 1876" transform="translate(0 0)">
                                                                            <path id="Path_1738" data-name="Path 1738" d="M276.087,75.43a1.044,1.044,0,0,1,.532.108q3.137,1.466,6.275,2.932c.15.07.368.1.364.328,0,.214-.211.243-.355.311q-3.167,1.484-6.337,2.96a1.116,1.116,0,0,1-.977.005q-3.222-1.5-6.442-3.008c-.122-.057-.268-.1-.267-.278s.149-.218.271-.275q3.2-1.5,6.4-2.989A1.07,1.07,0,0,1,276.087,75.43Z" transform="translate(-268.88 -75.427)" fill={color}/>
                                                                            <path id="Path_1739" data-name="Path 1739" d="M270.779,106.722a1.117,1.117,0,0,1,.51.122q2.108.987,4.218,1.971a1.26,1.26,0,0,0,1.126,0c1.405-.659,2.813-1.312,4.218-1.971a1.2,1.2,0,0,1,1.042-.015c.384.171.762.355,1.143.534.113.053.226.114.225.26s-.113.207-.226.26q-3.242,1.513-6.485,3.025a1.122,1.122,0,0,1-.978-.008q-3.223-1.5-6.443-3.007c-.12-.056-.247-.11-.248-.268s.124-.215.244-.271q.55-.257,1.1-.517A1.226,1.226,0,0,1,270.779,106.722Z" transform="translate(-268.881 -100.289)" fill={color}/>
                                                                            <path id="Path_1740" data-name="Path 1740" d="M276.045,130.3a1.112,1.112,0,0,1-.627-.157q-3.085-1.443-6.171-2.884c-.15-.07-.368-.1-.361-.331.006-.213.213-.239.357-.31.322-.16.65-.307.975-.46a1.217,1.217,0,0,1,1.084,0c1.371.641,2.747,1.272,4.114,1.924a1.426,1.426,0,0,0,1.316,0c1.373-.655,2.756-1.29,4.135-1.933a1.187,1.187,0,0,1,1.042-.007c.375.173.748.35,1.121.527.118.056.245.11.238.273s-.126.2-.237.251l-4.4,2.059c-.679.317-1.359.632-2.036.952A1.076,1.076,0,0,1,276.045,130.3Z" transform="translate(-268.884 -115.632)" fill={color}/>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <div className="tiles-details">
                                                                    <h5 className="card-title mb10">atica Help Desk</h5>
                                                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque  </p>
                                                                </div>
                                                            </div>
                                                          </div>
                                                      </div>
                                                  </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-oraganition mt-4 pt-2">
                                    <button className="btn-organition" onClick={this.nextstep}>Next</button>
                                </div>
                            </div> } 

                            {(location == '/step3') &&  <div className="container login-signup-adding-article adding-article step-three-organisation">
                                <div className="row alignItemsSectionForm k-flex align-items-center">
                                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                                        <div className="organisation-para pb-2 text-left">
                                            <p>Step 3</p>
                                            <h3 className="card-title">Login / Signup<br />To start adding articles to<br />Your knowledge base</h3>
                                        </div>
                                        <div className="adding-article-btn text-left">
                                            <a className="btn-page adding-article-btn-signUp" href={`${config.path}/signup`} style={{'text-transform': 'capitalize'}}>Proceed</a>       
                                            {/* <a className="btn-page adding-article-btn-login" href="login">Login</a> */}
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
                                    <div className="right-side">
                                    <div className="lapy-screens-designs pt-3">
                                        <div className="lapy-img-data lapy-img-data-right">
                                            <div className="right-lapy-frame">
                                                <span className="front-lapy-scree-1"></span>
                                                <span className="front-lapy-scree-2"></span>
                                            </div>
                                            <div className="website-in-lapy website-in-lapy-right">
                                                <div className="lapy-html-view">
                                                    <div className="bgSpace" style={{background: color}}>
                                                        <div className="container-lapy">
                                                            <p>Knowledge Base / Categories</p>
                                                            <div className="brandLogo">
                                                                <img src={`${config.path}/images/nira.svg`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="headingTitleSearch mt-4 mb-2">
                                                        <div className="container-lapy">
                                                            <div className="headingTitleSearch-details">
                                                                <h2 className="card-title">atica Analytics</h2>
                                                                <p className="text-mutede">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                  <div className="tilesection">
                                                      <div className="container-lapy">
                                                          <div className="tile-sec-new k-flex justify-content-center align-items-center ">
                                                            <div className="tiles-box atica-help-desk mr-2">
                                                                <div className="tiles-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.383" height="14.672" viewBox="0 0 14.383 14.672">
                                                                        <g id="Group_1876" data-name="Group 1876" transform="translate(0 0)">
                                                                            <path id="Path_1738" data-name="Path 1738" d="M276.087,75.43a1.044,1.044,0,0,1,.532.108q3.137,1.466,6.275,2.932c.15.07.368.1.364.328,0,.214-.211.243-.355.311q-3.167,1.484-6.337,2.96a1.116,1.116,0,0,1-.977.005q-3.222-1.5-6.442-3.008c-.122-.057-.268-.1-.267-.278s.149-.218.271-.275q3.2-1.5,6.4-2.989A1.07,1.07,0,0,1,276.087,75.43Z" transform="translate(-268.88 -75.427)" fill={color}/>
                                                                            <path id="Path_1739" data-name="Path 1739" d="M270.779,106.722a1.117,1.117,0,0,1,.51.122q2.108.987,4.218,1.971a1.26,1.26,0,0,0,1.126,0c1.405-.659,2.813-1.312,4.218-1.971a1.2,1.2,0,0,1,1.042-.015c.384.171.762.355,1.143.534.113.053.226.114.225.26s-.113.207-.226.26q-3.242,1.513-6.485,3.025a1.122,1.122,0,0,1-.978-.008q-3.223-1.5-6.443-3.007c-.12-.056-.247-.11-.248-.268s.124-.215.244-.271q.55-.257,1.1-.517A1.226,1.226,0,0,1,270.779,106.722Z" transform="translate(-268.881 -100.289)" fill={color}/>
                                                                            <path id="Path_1740" data-name="Path 1740" d="M276.045,130.3a1.112,1.112,0,0,1-.627-.157q-3.085-1.443-6.171-2.884c-.15-.07-.368-.1-.361-.331.006-.213.213-.239.357-.31.322-.16.65-.307.975-.46a1.217,1.217,0,0,1,1.084,0c1.371.641,2.747,1.272,4.114,1.924a1.426,1.426,0,0,0,1.316,0c1.373-.655,2.756-1.29,4.135-1.933a1.187,1.187,0,0,1,1.042-.007c.375.173.748.35,1.121.527.118.056.245.11.238.273s-.126.2-.237.251l-4.4,2.059c-.679.317-1.359.632-2.036.952A1.076,1.076,0,0,1,276.045,130.3Z" transform="translate(-268.884 -115.632)" fill={color}/>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <div className="tiles-details">
                                                                    <h5 className="card-title mb10">atica Help Desk</h5>
                                                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque  </p>
                                                                </div>
                                                            </div>
                                                            <div className="tiles-box atica-help-desk">
                                                                <div className="tiles-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.383" height="14.672" viewBox="0 0 14.383 14.672">
                                                                        <g id="Group_1876" data-name="Group 1876" transform="translate(0 0)">
                                                                            <path id="Path_1738" data-name="Path 1738" d="M276.087,75.43a1.044,1.044,0,0,1,.532.108q3.137,1.466,6.275,2.932c.15.07.368.1.364.328,0,.214-.211.243-.355.311q-3.167,1.484-6.337,2.96a1.116,1.116,0,0,1-.977.005q-3.222-1.5-6.442-3.008c-.122-.057-.268-.1-.267-.278s.149-.218.271-.275q3.2-1.5,6.4-2.989A1.07,1.07,0,0,1,276.087,75.43Z" transform="translate(-268.88 -75.427)" fill={color}/>
                                                                            <path id="Path_1739" data-name="Path 1739" d="M270.779,106.722a1.117,1.117,0,0,1,.51.122q2.108.987,4.218,1.971a1.26,1.26,0,0,0,1.126,0c1.405-.659,2.813-1.312,4.218-1.971a1.2,1.2,0,0,1,1.042-.015c.384.171.762.355,1.143.534.113.053.226.114.225.26s-.113.207-.226.26q-3.242,1.513-6.485,3.025a1.122,1.122,0,0,1-.978-.008q-3.223-1.5-6.443-3.007c-.12-.056-.247-.11-.248-.268s.124-.215.244-.271q.55-.257,1.1-.517A1.226,1.226,0,0,1,270.779,106.722Z" transform="translate(-268.881 -100.289)" fill={color}/>
                                                                            <path id="Path_1740" data-name="Path 1740" d="M276.045,130.3a1.112,1.112,0,0,1-.627-.157q-3.085-1.443-6.171-2.884c-.15-.07-.368-.1-.361-.331.006-.213.213-.239.357-.31.322-.16.65-.307.975-.46a1.217,1.217,0,0,1,1.084,0c1.371.641,2.747,1.272,4.114,1.924a1.426,1.426,0,0,0,1.316,0c1.373-.655,2.756-1.29,4.135-1.933a1.187,1.187,0,0,1,1.042-.007c.375.173.748.35,1.121.527.118.056.245.11.238.273s-.126.2-.237.251l-4.4,2.059c-.679.317-1.359.632-2.036.952A1.076,1.076,0,0,1,276.045,130.3Z" transform="translate(-268.884 -115.632)" fill={color}/>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                                <div className="tiles-details">
                                                                    <h5 className="card-title mb10">atica Help Desk</h5>
                                                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque  </p>
                                                                </div>
                                                            </div>
                                                          </div>
                                                      </div>
                                                  </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="loginFooterReview registrationImgFilter review-getstartes">
                {/* <Policy/> */}
                        <div className="container review-companies">
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.capterra.com/p/140928/Appy-Pie/" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/capterra.svg`} /></a></div>
                                <div className="reviewratingstar" title="4.5/5">
                                    <div className="star-rating"><span style={{width: '90%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.g2.com/products/appypie/reviews" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/g2-crowd-white1.svg`} /></a></div>
                                <div className="reviewratingstar" title="4.5/5">
                                    <div className="star-rating"><span style={{width: '90%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://gsuite.google.com/marketplace/app/appy_pie/161113010631" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/getapp.svg`} /></a></div>
                                <div className="reviewratingstar" title="4.9/5">
                                    <div className="star-rating"><span style={{width: '98%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.trustpilot.com/review/www.appypie.com" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/gsuite-marketplace-logo.svg`} /></a></div>
                                <div className="reviewratingstar" title="5.0/5">
                                    <div className="star-rating"><span style={{width: '100%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.getapp.com/development-tools-software/a/appy-pie/" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/trustpilot.svg`} /></a></div>
                                <div className="reviewratingstar" title="4.6/5">
                                <div className="star-rating"><span style={{width: '92%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.softwareadvice.com/app-development/appy-pie-profile/" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/soff-advice.svg`} /></a></div>
                                <div className="reviewratingstar" title="4.6/5">
                                    <div className="star-rating"><span style={{width: '92%'}} /></div>
                                </div>
                            </div>
                        </div>
                        <p className="heily-review-related">Highly rated by thousands of customers all over the world</p>
                    </div>
                   
            </div>
        );
    }
}

export default OrganisationName;