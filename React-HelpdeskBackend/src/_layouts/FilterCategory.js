import React from 'react';
import { connect } from 'react-redux';
// First way to import
import Calendar from '../_components/calenderComponents';
import moment from 'moment'

//import '../../public/styles.css';



class FilterCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userselect: props.filterdata.userselect,
            allUsers: props.filterdata.allUsers,
            register: props.filterdata.register,
            agents: props.filterdata.agents,
            selectionStart: props.filterdata.selectionStart,
            selectionEnd: props.filterdata.selectionEnd

        };
    }
    
    handlestatus = (e, type) => {
        const userselect = this.state.userselect
        let index
        if (this.state.allUsers)
            userselect.splice(0, userselect.length)
        if (e.target.checked) {
            userselect.push(+e.target.value);
        }

        if (e.target.value == 1 && userselect.length > 0) {
            this.setState({ allUsers: !this.state.allUsers });
            this.setState({ register: false });
            this.setState({ agents: false });
        } if (e.target.value == 2) {
            if (this.state.register) {
                index = this.state.userselect.indexOf(+e.target.value)
                this.state.userselect.splice(index, 1)
            }
            this.setState({ register: !this.state.register });
            this.setState({ allUsers: false });
        } if (e.target.value == 3) {
            if (this.state.agents) {
                index = this.state.userselect.indexOf(+e.target.value)
                this.state.userselect.splice(index, 1)
            }
            this.setState({ agents: !this.state.agents });
            this.setState({ allUsers: false });
        }
        if (userselect.length == 0) {
            userselect.push(1);
            this.setState({ allUsers: true });
        }
    }

    onchange = (val) => {
        console.log(moment(val));
        console.log(moment(val.startDate).valueOf());
        console.log(moment(val.endDate).valueOf());
        this.setState({ selectionStart: moment(val.startDate).valueOf() });
        this.setState({ selectionEnd: moment(val.endDate).valueOf() });
    }
    setdata = () => {
        this.props.getdata(this.state)
    }
    resetforms = () => {
        this.setState({ userselect: [] });
        this.setState({ allUsers: false });
        this.setState({ register: false });
        this.setState({ agents: false});
        this.setState({ selectionStart: 0 });
        this.setState({ selectionEnd: 0 });
        setTimeout(() => {
           this.props.getdata(this.state)
        });
    }
    
    

    render() {
        const { loggingIn } = this.props;
        const today = new Date();
        const { deschide, visiblehide, seohide, categoryname, description, submitted, allUsers, register, agents, tags, seodesc, seotitle } = this.state;
        return (
            <div className="rightPanelSection">
                <div className="filterRightPanel">
                    <div className="rightPanelHeader categoryRightPanelHeader">
                        <ul>
                            <li className="closing" onClick={this.props.onClose}>
                                <span className="circlebtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                        <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                                    </svg>
                                </span>
                            </li>
                            <li>
                                <button className="rightPanelHeaderBtn" onClick={this.resetforms}>Clear All</button>
                            </li>
                        </ul>
                    </div>
                    <div className="bodyRightPanel scroll-2">
                        <div className="rightPanelMain">
                            <div className="rightPanelCategroyDescriptionFeilds">
                                <div className="rightPanelFeilds descriptionFeilds">
                                    <div className="rightFeildsTitle">
                                        <img src="../static/images/icon/rightpanel/right.svg" alt />
                                        <span>Date</span>
                                    </div>
                                    <Calendar selectionStart={this.onchange} getdates={this.state} />
                                </div>
                                <div className="rightPanelFeilds descriptionFeilds">
                                    {/* <div className="rightFeildsTitle">
                                        <img src="../static/images/icon/rightpanel/right.svg" alt />
                                        <span>Owner</span>
                                    </div> */}
                                    {/* <div className="rightFeilds-no mb-3">
                                        <div className="visibleTo">
                                            <span>Jimmy Changa</span>
                                            <span className="selected">Jimmy</span>
                                        </div>
                                    </div> */}
                                </div>
                                {/*<div className="rightPanelFeilds descriptionFeilds mt-3">
                                    <div className="rightFeildsTitle">
                                        <img src="../static/images/icon/rightpanel/right.svg" alt />
                                        <span>Visibility</span>
                                    </div>
                                    <div className="rightFeilds-no mb-3">
                                        <div className="visibleTo">
                                            <span name="users" className={allUsers ? 'selected' : ''}><input onChange={this.handlestatus} type="checkbox" name="userselect" value="1" checked={allUsers ? 'checked' : ''} />All Users</span>
                                            <span name="register" className={register ? 'selected' : ''}><input onChange={this.handlestatus} type="checkbox" name="userselect" value="2" checked={register ? 'checked' : ''} />Registered Users</span>
                                            <span name="agent" className={agents ? 'selected' : ''}><input onChange={this.handlestatus} type="checkbox" name="userselect" value="3" checked={agents ? 'checked' : ''} />Agents</span>
                                        </div>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="rightPanelFooter categoryRightPanelFooter">
                        <button className="rightPanelBtn" onClick={this.setdata}>Apply Filter</button>
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

const connectedFilterCategory = connect(mapStateToProps)(FilterCategory);
export { connectedFilterCategory as FilterCategory }; 