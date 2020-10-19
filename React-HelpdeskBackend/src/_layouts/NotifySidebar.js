import React from 'react';
import { connect } from 'react-redux';
import {time_ago} from '../_helpers/auth-header'
import config from 'config';
import { userService } from '../_services';

class NotifySidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            notify:[]
        }
        this._handlerightsidebar = this._handlerightsidebar.bind(this)

    }
    _handlerightsidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'NotifyToggle' })
    }
    static getDerivedStateFromProps(nextProps){
        userService.updatenotification()
        .then((response)=>{
                console.log(response.status);
    
        })
        return {
            notify:nextProps.notify
        }
      }
    
      handlelink=(notifyid,articleId,articlename)=>{
          const user = JSON.parse(localStorage.getItem('user'));
          userService.notificationread(notifyid)
          .then((response)=>{
            window.open(`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}article/${articlename.replace(/ /g, "-")}-${articleId}`, '_blank');
      
          })
         
      }

    render() {
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
                                {(this.state.notify.lenght > 0) &&<li className="help">
                                    <span className="markAllAsRead">Mark all as read</span>
                                </li>}
                            </ul>
                        </div>
                        <div className="bodyRightPanel scroll-2">
                            <div className="rightPanelMain">
                                <div className="rightPanelNotification">
                                    <div className="notifictionFeilds recent-activity">
                                    { this.state.notify.map((item, i) => {
                                        return (<div className={"notificationHeading px-4 py-2 cursor-pointer "+ ((item.IsRead==1)?'notificationHeadingWhite':'')} key={i}>
                                            <h5 className="card-title" onClick={()=>this.handlelink(item.id,item.articleId,item.articlename.name)}>{item.type}</h5>
                                            <p className="card-body-text">{item.text}</p>
                                            <p className="noti-time">{time_ago(parseInt(item.createdON))}</p>
                                        </div>
                                        )
                                            })   
                                        }
                                       
                                        {(this.state.notify.length == 0) && <div className="notificationHeading px-4 py-2 notificationHeadingWhite">   
                                            <p className="card-body-text">Notification not available.</p>
                                        </div>} 
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

const connectedNotifySidebar = connect(mapStateToProps)(NotifySidebar);
export { connectedNotifySidebar as NotifySidebar }; 