import React from 'react';
import { connect } from 'react-redux';
// First way to import
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {time_ago} from '../_helpers/auth-header'
import config from 'config';



class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loader:true,
            comment:[],
            
        }
    }
    
    componentDidMount() {
        // userService.comment()
        // .then(response => {
        //     if(response.status == 200)
        //     {   
        //         this.setState({loader:!this.state.loader})
        //         this.setState({comment:response.data})
                
        //     }
        // })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({comment:nextProps.getdata})
       
      }

    _handlerightsidebar=()=>{
        const { dispatch } = this.props;
        dispatch({ type: 'CommentToggle' })
    }
    render() {
        const { loggingIn } = this.props;
        const today = new Date();
        const {comment} = this.state;
        return (
    <div className="rightPanelSection">
    
                    <div className="filterRightPanel">
                        <div className="rightPanelHeader categoryRightPanelHeader">
                            <ul>
                         
                                <li className="closing" onClick={this._handlerightsidebar}>
                                    <span className="circlebtn">
                                        <img src={`${config.path}/images/icon/rightpanel/multiply.svg`} alt="" />
                                    </span>
                                </li>
                                <li className="help">
                                    <span className="markAllAsRead">{comment.length} Total Comment</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bodyRightPanel scroll-2">
                            <div className="rightPanelMain">
                                <div className="rightPanelNotification">
                                    <div className="notifictionFeilds recent-activity">
                                    { this.state.comment.map((item, i) => {
                                        return (<div className="notificationHeading px-4 py-2 cursor-pointer" key={i}>  
                                            <h5 className="card-title">{item.commenterEmail}</h5>
                                            <p className="card-body-text">{ReactHtmlParser(item.comment)}</p>
                                            <p className="noti-time">{time_ago(parseInt(item.createdON))}</p>
                                        </div>
                                        )
                                            })
                                        }
                                        <div className="notificationHeading not-show-more">
                                            <a href="#">Show More ></a>
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

const connectedComment = connect(mapStateToProps)(Comment);
export { connectedComment as Comment }; 