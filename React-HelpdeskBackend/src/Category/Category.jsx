import React from 'react';
import { connect } from 'react-redux';


import Breadcumb from '../_layouts/breadcumb';

import { history } from '../_helpers';
import { RightPanelhelp } from '../_layouts/RightPanelhelp';
import {CreateCategory} from '../_layouts/CreateCategory';
import { NotifySidebar } from '../_layouts/NotifySidebar';
import config from 'config';

class Category extends React.Component {
    
    constructor(props) {
        super(props);
        this._handlecategorysidebar = this._handlecategorysidebar.bind(this)
    }
    
    _onButtonClick(){
        history.replace('/dashboard');
    }
    _handlecategorysidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'CategoryToggle' })
    }
    
    render() {
        const { user } = this.props;
        return (
           /*  <div classNameName="col-md-6 col-md-offset-3">
                <h3>Users from secure api end point:</h3>
                
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div> */
            <div className={'page-wrapper' + (this.props.showComponent.isOpen?' sidebar-collapse': '')}>
            {(this.props.showComponent.ishelpOpen || this.props.showComponent.iscategoryOpen) && <div className="shadow">&nbsp;</div>}
            <div className="container-fluid main-container">
                <div className="centerMainContainer">
                <Breadcumb bredcumb=""/>
                    
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="card-body">
                                <div className="knowledge-category addNewCatSection">
                                    <div className="knowledge-card-alltitle">
                                        <p className="goBack" onClick={this._onButtonClick}><i className="icon customicon-go-back goback-icon"></i>Go Back</p>
                                        <h4 className="card-body-title">Create Your Knowledge Centre</h4>
                                        <p className="card-body-text">Provide your customer with help articles and FAQ’s to
                                            provide help and enable learning.</p>
                                    </div>
                                    <div className="knowledge-row">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                <div className="knowledge-col selectedFirst addNewCat" onClick={this._handlecategorysidebar}>
                                                    <span className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="55.32"
                                                            height="55.32" viewBox="0 0 55.32 55.32">
                                                            <path id="ic_clear_24px"
                                                                d="M38.461,8.37,35.091,5,21.73,18.36,8.37,5,5,8.37,18.36,21.73,5,35.091l3.37,3.37L21.73,25.1l13.36,13.36,3.37-3.37L25.1,21.73Z"
                                                                transform="translate(-3.071 27.66) rotate(-45)"
                                                                fill="#a2abd1" stroke="#a2abd1" strokeWidth="4"></path>
                                                        </svg>
                                                    </span>
                                                    <p className="text-mutede">Add New Category</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Helpbutton /> */}
                
                {this.props.showComponent.isnotifyOpen && <NotifySidebar/>}
                {this.props.showComponent.iscategoryOpen && <CreateCategory/>}
                {this.props.showComponent.ishelpOpen && <RightPanelhelp/>}
            </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    const showComponent   = state.toogle;
    return {
        showComponent
    };
}

const connectedCategory = connect(mapStateToProps)(Category);
export { connectedCategory as Category };