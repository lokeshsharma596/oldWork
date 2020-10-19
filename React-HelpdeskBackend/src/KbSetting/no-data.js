import React from 'react';
import Breadcumb from '../_layouts/breadcumb';
import {connect} from 'react-redux';
import Loader from '../_components/Loader';
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import config from 'config';
import { Auth,Hub } from 'aws-amplify'




class Nodata extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        submitted:false,
        domainname:"",
        portalname:"",
        allowlabel:true,
        allowrating:true,
        allowsharing:true,
        allowcomment:true,
        setid:""
        }
       // this.props.match.params.cayegoryName="Knowledge Base";
    }
    handleChange=(e)=> {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
      }
      handleCheck=(e)=>{
        const { name } = e.target;
        this.setState({
         [name]: e.target.checked
        })
      }
      
    
    ngsubmit = (e) => {
        const { dispatch } = this.props;
        this.setState({ submitted: true });
        if (this.state.domainname && this.state.portalname) {
            this.setState({ loader: !this.state.loader })
            userService.profilesetting(this.state)
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
    }
    render(){
        const {submitted,domainname,portalname,allowlabel,allowrating,allowsharing,allowcomment } = this.state;
        return(
            <div className={'page-wrapper' + (' sidebar-collapse--')} >
                {/* {<Loader />} */}

                {/* {<div className="shadow">&nbsp;</div>} */}
                {this.state.loader && <Loader />}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="category-body pt-0">
                                    <div className="category-tiles">
                                        <div className="category-row">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div className="knowledgeBaseSettings pt-5 pb-5 pl-4 pr-4">
                                                        <div className="no-data">
                                                            <img src={'../../images/no-data.svg'} />
                                                            <p>There is no content to display</p>
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
                {/* <Helpbutton />
                {this.props.showComponent.isnotifyOpen && <NotifySidebar/>} */}
                
                {/* {this.props.showComponent.ishelpOpen && <RightPanelhelp/>} */}
            </div>
        );
    }
}

function mapStateToProps(state) {const showComponent = state.toogle;
    return {showComponent};
}


    const connectedKbSettings = connect(mapStateToProps)(Nodata); export {connectedKbSettings as Nodata}