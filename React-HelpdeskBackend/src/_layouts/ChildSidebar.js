import React from 'react';
import { connect } from 'react-redux';
import config from 'config';



class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[]  
        }
        this._handlesidebar = this._handlesidebar.bind(this)
    }
    _handlesidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'TOGGLE' })
    }
    static getDerivedStateFromProps(nextProps){
        return {
            categories:nextProps.categories
        }
      }
    csvOpen=()=>{
        const { dispatch } = this.props;
        dispatch({ type: 'CsvToggle' })
    }

    render() {
        return (
                    <li>
                            <div className="sidebarnavChild">
                                <div className="innerChild">
                                    <div className="sidebarnavChildHeader">
                                        <div className="rightPanelHeader">
                                            <ul>
                                                <li className="closingMenu" onClick={this._handlesidebar}>
                                                    <span>
                                                        <i className="icon customicon-cancel" style={{'font-size': '14px'}}></i>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-menu">
                                        <ul className="sidebar-menu-ul">
                                            <li>
                                                <a href={`${config.path}/categorylisting`}>
                                                    <span className="icon">
                                                        <i className="icon customicon-draft"></i>
                                                    </span>
                                                    <span className="text-menu">Home</span>
                                                    <span className="iconArrow"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`${config.path}/article/alldrafts`}>
                                                    <span className="icon">
                                                        <i className="icon customicon-draft"></i>
                                                    </span>
                                                    <span className="text-menu">All Drafts</span>
                                                    <span className="iconArrow"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`${config.path}/article/allpublish`}>
                                                    <span className="icon">
                                                        <i className="icon customicon-published"></i>
                                                    </span>
                                                    <span className="text-menu">All Published</span>
                                                    <span className="iconArrow"></span>
                                                </a>
                                            </li>
                                            <li >
                                                <a href={`${config.path}/article/allarticle`}>
                                                    <span className="icon">
                                                        <i className="icon customicon-aricales"></i>
                                                    </span>
                                                    <span className="text-menu">All Articles</span>
                                                    <span className="iconArrow"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={this.csvOpen} href="javascript:void(0)">
                                                    <span className="icon">
                                                        <i className="icon customicon-settings"></i>
                                                    </span>
                                                    <span className="text-menu">Import via .CSV</span>
                                                    <span className="iconArrow"></span>
                                                </a>
                                                
                                            </li>
                                        </ul>
                                        <ul className="sidebar-menu-ul">
                                        { this.state.categories.map((item, i) => {
                                            return (<li key={i}>
                                                <a href={`${config.path}/folder/${(item.name).replace(/ /g, "_")}/${item.id}`}>
                                                    <span className="icon">
                                                        <i className="icon customicon-general"></i>
                                                    </span>
                                                    <span className="text-menu">{item.name}</span>
                                                    <span className="iconArrow"></span>
                                                </a>
                                            </li>)
                                            })
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    
        );
    }
}

function mapStateToProps(state) {
    const { showComponent } = state.toogle;
    return {
        showComponent
    };
}
Sidebar = connect(mapStateToProps)(Sidebar);


export default Sidebar; 