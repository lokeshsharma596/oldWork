import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';

import { userActions } from '../_actions';

class Helpbutton extends React.Component {
    constructor(props) {
        super(props);
        this._handlerightsidebar = this._handlerightsidebar.bind(this)
    }
    _handlerightsidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'HelpToggle' })
    }

    render() {
        return (
            <div className="helps">
                    <div className="inner-help">
                        <button className="btn-help" onClick={this._handlerightsidebar}>
                            <img src={`${config.path}/images/icon/solution/help.svg`} alt="" />
                        </button>
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

const connectedHelpbutton = connect(mapStateToProps)(Helpbutton);
export { connectedHelpbutton as Helpbutton }; 