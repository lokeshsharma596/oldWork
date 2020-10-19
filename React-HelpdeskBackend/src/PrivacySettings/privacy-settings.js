import React from 'react';
import { connect } from 'react-redux';
import Loader from '../_components/Loader';
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import config from 'config';

class privacySettings extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loader:false,
            news_special:true,
            product_feature:true,
            product_subscription:true,
            product_feedback:true,
            agree:true,
            id:""
        }
    }
    feedBack = (e) => {
        e.preventDefault();
        //this.setState({feedBackShow: !this.setState.feedBackShow})
        const { dispatch } = this.props;
        dispatch({ type: 'FeedbackToggle' })
    }
    
    exportcsv = (e) => {
        e.preventDefault();
        //this.setState({feedBackShow: !this.setState.feedBackShow})
        const { dispatch } = this.props;
        dispatch({ type: 'ExportToggle' })
    }
    prefrencepop=(e)=>{
        e.preventDefault();
       // this.setState({ loader:!this.state.loader })
        userService.sendotp(this.state)
        .then((response)=>{
                if(response.status == 200)
                { 
         //         this.setState({ loader:!this.state.loader })
                  const { dispatch } = this.props;
                  dispatch({ type: 'PopupToggle' })
                }
        })
    }
    handleCheck=(e)=>{
    const { name } = e.target;
    this.setState({
     [name]: e.target.checked
    })
  }
    
  componentDidMount(){
    this.setState({ loader:!this.state.loader })
    userService.privacydetail(this.state)
    .then((response)=>{
            if(response.status == 200)
            { 
            this.setState({ loader:!this.state.loader })
              if(response.data.length>0){
              
              this.setState({ news_special:response.data[0].newsSpecial })
              this.setState({ product_feature:response.data[0].productFeature})
              this.setState({ product_subscription:response.data[0].productSubscription})
              this.setState({ product_feedback:response.data[0].productFeedback})
              this.setState({ agree:response.data[0].agree})
              this.setState({ id:response.data[0].id})
              }
            }
            else{
                this.setState({ loader:!this.state.loader }) 
            }

    })
  }
    
    
    ngsubmit=(e)=>{
        e.preventDefault();
        const { dispatch } = this.props;
        this.setState({ submitted: true });
            this.setState({ loader: !this.state.loader })
            userService.privacysetting(this.state)
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ loader: !this.state.loader })
                        dispatch(alertActions.apimessage(response.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 3000)

                    }

                })
      }
    render(){
        return(
            <div className="page-wrapper">
            {this.state.loader && <Loader />}
              <div className="container-fluid main-container">
                <div className="centerMainContainer">
                    <div className="container">
                        <div className="privacy-heading-title">
                            <h4 className="card-title">Privacy Settings</h4>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <div className="profile-manage mb-4">
                                    <div className="profile-manage-up k-flex align-items-flex-start px-4 py-4">
                                        <div className="profile-manage-side mr-4">
                                            <img src={`${config.path}/images/privacy-settings/pro-two-email.svg`} />
                                        </div>
                                        <div className="profile-manage-aside">
                                            <div className="pri-setting-titles">
                                                <h5 className="card-title mb-1">Knowledge Email Settings</h5>
                                                <p className="card-body-text">Set your preferences: Please let us know the information you would like to receive from us in future and press “Save Changes”.</p>
                                            </div>
                                            <div className="prod-two-emai-sett pt-3">
                                                <div className="rightFeilds-no pt-2">
                                                   <span className="checkBoxDesign">
                                                       <label className="containerCheckBox">
                                                           <input type="checkbox" name="news_special" checked={this.state.news_special} onChange={this.handleCheck}   />
                                                           <span className="checkmark" />
                                                           <span className="title">News & Special Offers</span>
                                                        </label>
                                                    </span>
                                                    <span className="checkBoxDesign">
                                                        <label className="containerCheckBox">
                                                            <input type="checkbox" name="product_feature" checked={this.state.product_feature} onChange={this.handleCheck}  />
                                                            <span className="checkmark" />
                                                            <span className="title">Product feature update related to notifications</span>
                                                        </label>
                                                    </span>
                                                    <span className="checkBoxDesign">
                                                        <label className="containerCheckBox">
                                                            <input type="checkbox" name="product_subscription" checked={this.state.product_subscription} onChange={this.handleCheck}  />
                                                            <span className="checkmark" />
                                                            <span className="title">Product subscription related notification</span>
                                                        </label>
                                                    </span>
                                                    <span className="checkBoxDesign">
                                                        <label className="containerCheckBox">
                                                            <input type="checkbox" name="product_feedback" checked={this.state.product_feedback} onChange={this.handleCheck} />
                                                            <span className="checkmark" />
                                                            <span className="title">Product feedback & testing</span>
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-manage-down text-center border-top px-4 py-3">
                                        <p className="card-body-text"><a href="#" onClick={this.ngsubmit}>Save Changes</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <div className="profile-manage mb-4">
                                    <div className="pri-setting-titles px-4 pt-4">
                                        <h5 className="card-title mb-1">Automated Processing</h5>
                                        <p className="card-body-text">Provide consent for processing of personal data </p>
                                    </div>
                                    <div className="profile-manage-up k-flex align-items-center px-4 py-4">
                                        <div className="profile-manage-side mr-4">
                                            <img src={`${config.path}/images/privacy-settings/auto-pro.svg`} />
                                        </div>
                                        <div className="profile-manage-aside">
                                            <div className="prod-two-emai-sett pt-3">
                                                <div className="rightFeilds-no pt-3">
                                                   <span className="checkBoxDesign">
                                                       <label className="containerCheckBox">
                                                           <input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleCheck} />
                                                           <span className="checkmark" />
                                                           <span className="card-body-text">I hereby agree that my personal data may be processed for needs of automation individual decision making.</span>
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-manage-down text-center border-top px-4 py-3">
                                        <p className="card-body-text"><a href="#" onClick={this.ngsubmit}>Save Changes</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <div className="profile-manage mb-4">
                                    <div className="pri-setting-titles px-4 pt-4">
                                        <h5 className="card-title mb-1">Data Portability</h5>
                                        <p className="card-body-text">Your Account and Your Data</p>
                                    </div>
                                    <div className="profile-manage-up k-flex align-items-center px-4 py-4">
                                        <div className="profile-manage-side mr-4">
                                            <img src={`${config.path}/images/privacy-settings/data-pro.svg`} />
                                        </div>
                                        <div className="profile-manage-aside">
                                            <p className="card-body-text">Export the personal data in a commonly used, structured and machine readable form. </p>
                                        </div>
                                    </div>
                                    <div className="profile-manage-down text-center border-top px-4 py-3">
                                        <p className="card-body-text"><a href="#" onClick={this.exportcsv}>Export Data</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <div className="profile-manage mb-4">
                                    <div className="pri-setting-titles px-4 pt-4">
                                        <h5 className="card-title mb-1">Delete Your Account</h5>
                                        <p className="card-body-text">We will contact you shortly if you raise this request </p>
                                    </div>
                                    <div className="profile-manage-up k-flex align-items-center px-4 py-4">
                                        <div className="profile-manage-side mr-4">
                                            <img src={`${config.path}/images/privacy-settings/del-account.svg`} />
                                        </div>
                                        <div className="profile-manage-aside">
                                            <p className="card-body-text"><strong>Note :</strong> If you delete your Appy Pie account, which provide Access to various Appy Pie services. You’ll no longer be Able to use any of those services, and your account and Data will be lost.</p>
                                        </div>
                                    </div>
                                    <div className="profile-manage-down text-center border-top px-4 py-3">
                                        <p className="card-body-text"><a href="#" onClick={this.prefrencepop} className="text-danger">Delete Account</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <div className="profile-manage mb-4">
                                    <div className="pri-setting-titles px-4 pt-4">
                                        <h5 className="card-title mb-1">Provide Feedback</h5>
                                        <p className="card-body-text">Please provide you important feedback</p>
                                    </div>
                                    <div className="profile-manage-up k-flex align-items-center px-4 py-4">
                                        <div className="profile-manage-side mr-4">
                                            <img src={`${config.path}/images/privacy-settings/pro-feed.svg`} />
                                        </div>
                                        <div className="profile-manage-aside">
                                            <p className="card-body-text"><strong>Note :</strong> Your account will be deactivated. To resume your account, all you have to do is login with your credentials any time you want. </p>
                                        </div>
                                    </div>
                                    <div className="profile-manage-down text-center border-top px-4 py-3">
                                        <p className="card-body-text"><a href="#" onClick={this.feedBack}>Give Feedback</a></p>
                                    </div>
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
    const showComponent   = state.toogle;
    const authentication   = state.authentication;
    return {
        showComponent,authentication
    };
}

const connectedprivacySettings = connect(mapStateToProps)(privacySettings);
export { connectedprivacySettings as privacySettings };