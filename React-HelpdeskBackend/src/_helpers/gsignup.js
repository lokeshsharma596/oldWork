import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '.';
import { userService } from '../_services';
import config from 'config';
class Gsignup extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(userActions.getAll());
    // }
    constructor(props) {
        super(props);
        this._handlesidebar = this._handlesidebar.bind(this)
        const query = new URLSearchParams(this.props.location.search);
        console.log(query.get('code'));
        if(query.get('code')){
            const { dispatch } = this.props;
            if(window.location.hostname == "localhost")
            var host = 'http://localhost:8082';
            else if(window.location.hostname == "desk.appypie.com")
                var host = 'https://desk.appypie.com/knowledge';
            else
                var host = 'https://www.appypiedesk.com/knowledge';
            let url = 'https://gauth.appypiedesk.com/oauth2/token?grant_type=authorization_code&code='+query.get('code')+'&redirect_uri='+host+'/gsignup&client_id=6nkq3rphk4gae0dchcnfvtpmdj&scope=openid+email';
            console.log(url);
            userService.cognitogoogle(url)
            .then(
                result => { 
                           console.log(result);
                           localStorage.setItem("session_id",result.sub)
                           localStorage.setItem("session_mail",result.email)
                           window.opener.location.href='https://desk.appypie.com/knowledge/signup';
                           
                           self.close();
                          
                    // dispatch(userActions.Sociallogin(result.sub, result.email),function(){
                    //                             this.setState({showgif:!this.state.showgif})
                    //                         });
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
    
    _handlesidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'TOGGLE' })
    }
    
    render() {
        return (
               <div className="loading" style={{display:'block' }}>Loading&#8230;</div>
                    
        );
    }
}

export default Gsignup;