import React from 'react';
import { connect } from 'react-redux';

import config from 'config';

class RightPanelhelp extends React.Component {
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
            <div className="rightPanelSection">
                    <div className="filterRightPanel">
                        <div className="rightPanelHeader categoryRightPanelHeader">
                            <ul>
                                <li className="closing" onClick={this._handlerightsidebar}>
                                    <span className="circlebtn">
                                        <img src={`${config.path}/images/icon/rightpanel/multiply.svg`} alt=""/>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="bodyRightPanel scrollbar">
                            <div className="rightPanelMain">
                                <div className="rightPanelNotification">
                                    <div className="notifictionFeilds recent-activity">
                                        <div className="helpDetails">
                                            <h3 className="card-title">What Is Draft?</h3>
                                            <p className="text-mutede">Sed ut perspiciatis unde omnis iste natus error sit
                                                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                                                ipsa quae ab</p>
                                            <p className="text-mutede">illo inventore veritatis et quasi architecto beatae
                                                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                                                qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                                                non numquam eius modi tempora incidunt ut labore et dolore magnam
                                                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                                                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                                                commodi</p>
                                        </div>
                                        <div className="helpDetails">
                                            <h3 className="card-title">Tutorial Goes Here</h3>
                                            <div className="video">
                                                <video width="100%" controls>
                                                    <iframe width="100%" height="345"
                                                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                                                    </iframe>
                                                </video>
                                            </div>
                                            <p className="text-mutede">Sed ut perspiciatis unde omnis iste natus error sit
                                                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                                                ipsa quae ab</p>
                                            <p className="text-mutede">illo inventore veritatis et quasi architecto beatae
                                                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                                                qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                                                non numquam eius modi tempora incidunt ut labore et dolore magnam
                                                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                                                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                                                commodi</p>
                                        </div>
                                        <div className="helpDetails">
                                            <h3 className="card-title">What Is Knowledge Base?</h3>
                                            <p className="text-mutede">Sed ut perspiciatis unde omnis iste natus error sit
                                                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                                                ipsa quae ab</p>
                                            <p className="text-mutede">illo inventore veritatis et quasi architecto beatae
                                                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                                                qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                                                non numquam eius modi tempora incidunt ut labore et dolore magnam
                                                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                                                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                                                commodi</p>
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

const connectedRightPanelhelp = connect(mapStateToProps)(RightPanelhelp);
export { connectedRightPanelhelp as RightPanelhelp }; 