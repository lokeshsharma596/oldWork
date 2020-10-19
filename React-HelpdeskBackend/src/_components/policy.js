import React from 'react';
import { Fragment } from "react"

class Policy extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            username: '',
            password: '',
            term:'',
            showgif: false,
            submitted: false,
            showPassw: false,
        };
    }
    // const [state,setstate] =useState({
    //     name:'',
    //     hostname:''
    // })

    // useEffect(() => {
    //     var st= {...state,hostname:window.location.hostname}
    //    setstate(st)
    // }, [])

    // console.log(state);
    
    // const acceptCookies = () =>{
    //   document.cookie = "show=false";
    //     // Cookies.set('show',"false",{ path:state.hostname },{ expires: 7 });
    //     // console.log(Cookies.get('show'));
        
    // }

  
    render() {
        return (
        <Fragment>
            <div className="web-cookies-policy">
  <div className="container bc">
    <div className="cookies-main py-4">
      <div className="container">
        <div className="k-flex align-items-center ">
          <div className="cookes-para">
            <h4 className="card-title color-white mb-2">This website uses cookies</h4>
            <p className="card-body-text color-white">Appy Pie uses cookies on appypie.com &amp; its subdomains to analyse usage of the website, to enable content sharing on social 
              media, and offer ads that match your interests.</p>
          </div>	
          <div className="ml-auto cookies-btn w-350 text-right">
            <button className="btngreen mr-1" >Accept</button>
            <button className="btnCookes">Manage cookies 
                  <span className="arrow-cookies pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.024" height="5.512" viewBox="0 0 10.024 5.512">
                      <path id="Path_2196" data-name="Path 2196" d="M0,0,4.3,4.3,6.457,2.152,8.609,0" transform="translate(0.707 0.707)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                    </svg>
                  </span>
            </button>
          </div>
        </div>
      </div>		
    </div>
    <div className="web-cookies-settings">
      <div className="container">
      <div className="web-manage-cookes position-relative">
      <h4 className="card-title color-white mb-0 br-btm-lightwhite px-3 py-3">Manage Cookies</h4>
      <div className="cookies-settings-accordian py-3 px-3">  
        <div id="accordionCookies" className="accordionCookies">
          <div className="cookies-card py-2 px-2 br-btm-lightwhite">
            <div className="card-header">
              <div className="k-flex align-items-center">
                <div className="flex-grow-1">
                  <a className="card-link" data-toggle="collapse" href="#collapseOne">
                    Analytics Cookies  
                  </a>
                </div>
                <div className="ml-auto px-3">
                  <label className="mb-0 mr-3">
                    <input type="radio" name="onOff" defaultChecked /> <span className="onoff-text">ON</span>
                  </label>
                  <label className="mb-0">
                    <input type="radio" name="onOff" /> <span className="onoff-text">OFF</span>
                  </label>
                </div>
                <div className="cookie-acc-arow">
                  <a className="card-link" data-toggle="collapse" href="#collapseOne">
                    <span className="arrow-cookies">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10.024" height="5.512" viewBox="0 0 10.024 5.512">
                        <path id="Path_2196" data-name="Path 2196" d="M0,0,4.3,4.3,6.457,2.152,8.609,0" transform="translate(0.707 0.707)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div id="collapseOne" className="collapse" data-parent="#accordionCookies">
              <div className="card-body">
                These cookies are used to collect information about how visitors use our site. The information gathered does not identify any individual visitor. It is aggregated and entirely anonymous. 
              </div>
            </div>
          </div>
          <div className="cookies-card py-2 px-2">
            <div className="card-header border-0">
              <div className="k-flex align-items-center">
                <div className="flex-grow-1">
                  <a className="card-link" data-toggle="collapse" href="#collapseTwo">
                    Social media and Advertising  
                  </a>
                </div>
                <div className="ml-auto px-3">
                  <label className="mb-0 mr-3">
                    <input type="radio" name="onOff2" defaultChecked /> <span className="onoff-text">ON</span>
                  </label>
                  <label className="mb-0">
                    <input type="radio" name="onOff2" /> <span className="onoff-text">OFF</span>
                  </label>
                </div>
                <div className="cookie-acc-arow">
                  <a className="card-link" data-toggle="collapse" href="#collapseTwo">
                    <span className="arrow-cookies">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10.024" height="5.512" viewBox="0 0 10.024 5.512">
                        <path id="Path_2196" data-name="Path 2196" d="M0,0,4.3,4.3,6.457,2.152,8.609,0" transform="translate(0.707 0.707)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div id="collapseTwo" className="collapse" data-parent="#accordionCookies">
              <div className="card-body">
                These cookies are used when you share information using a social media sharing button or “like” button on our sites, link your account, or engage with our content on or through a social networking 
                site such as Facebook, Linkedin, Twitter etc. These cookies track your browsing habits and let us show you ads that match your interests.
              </div>
            </div>
          </div>
        </div> 
        <div className="mt-3 text-right">
          <button className="btngreen mr-1">Save Preferences</button>
          <button className="btnCookes">Cancel</button>
        </div>
      </div> 
      </div>
      </div>
    </div>
  </div>
</div>


        </Fragment>
        );
   }
}

export default Policy;