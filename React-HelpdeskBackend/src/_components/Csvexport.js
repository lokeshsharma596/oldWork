import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../_services';
import Loader from '../_components/Loader';
import { alertActions } from '../_actions/alert.actions';

class Csvexport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader:false,
            articletype:1
        };
    }
    _handlerightsidebar=()=> {
        const { dispatch } = this.props;
        dispatch({ type: 'ExportToggle' })
    }
    handleChange=(e)=> {
        const { name, value } = e.target;
        this.setState({ [name]: parseInt(value) });
        
    }
    _submit=(e)=>{
        const { dispatch } = this.props;
        this.setState({ loader: !this.state.loader })
        userService.exportcsv(this.state)
        .then(response => {
          if (response.status == 200) {
            this.setState({ loader: !this.state.loader })
              dispatch(alertActions.apimessage(response.message)); 
              setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000) 
              dispatch({ type: 'ExportToggle' })
          }
          else{
            this.setState({ loader: !this.state.loader })
              dispatch(alertActions.error(response.message)); 
              setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000) 
          }
        })
    }
    
    render() {
        const { loggingIn } = this.props;
       
        return (
            <div className="rightPanelSection uploadCSVRightPanel">
            {this.state.loader && <Loader />}
  <div className="categoryRightPanel">
    <div className="rightPanelHeader categoryRightPanelHeader">
      <ul>
        <li className="closing" onClick={this._handlerightsidebar}>
          <span className="circlebtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
              <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
            </svg>
          </span>
        </li>
      </ul>
    </div>
    <div className="bodyRightPanel scroll-2">
      <div className="rightPanelMain">
        <div className="rightPanelHeadingLink uploadCsvHeading">
          <h4>Export .CSV file</h4>
        </div>
        
        

        <div className="rightPanelCategroyDescriptionFeilds">
          <div className="upload-csv-xml-row">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
               <div className={'md-form md-form-custom'} >
                              <select className="form-control md-select2" name="articletype" onChange={this.handleChange}>
                                <option value="1" selected={(this.state.articletype == 1)?'selected':''}>All Articles</option>
                                <option value="2" selected={(this.state.articletype == 2)?'selected':''}>All Drafts Articles</option>
                                <option value="3" selected={(this.state.articletype == 3)?'selected':''}>All Published Articles</option>
                              </select>
                            </div>
                        {/* <div className="upload-csv-xmlbutton_save">
                            <button className="btnBlue mb-2" onClick={this._submit}>
                            &nbsp;&nbsp;
                              <span>Export</span>
                            </button>
                        </div> */}
                {/* <p className="note-text"><strong>Note</strong> : You can only upload .csv</p> */}

              </div>  
            </div>
          </div>
        </div>
        <div className="recentActibityHeading rightPanelNotification">
          <div className="recentActibityHeading"><h4> <svg xmlns="http://www.w3.org/2000/svg" width="16.023" height="12.992" viewBox="0 0 16.023 12.992"><path id="ic_format_list_bulleted_24px" d="M3.8,9.7A1.3,1.3,0,1,0,5.1,11,1.3,1.3,0,0,0,3.8,9.7Zm0-5.2A1.3,1.3,0,1,0,5.1,5.8,1.3,1.3,0,0,0,3.8,4.5Zm0,10.394a1.3,1.3,0,1,0,1.3,1.3A1.3,1.3,0,0,0,3.8,14.894Zm2.6,2.165H18.523V15.327H6.4Zm0-5.2H18.523V10.13H6.4Zm0-6.929V6.665H18.523V4.933Z" transform="translate(-2.5 -4.5)" /></svg>&nbsp;&nbsp;Please Read Below Provided Steps Carefully.</h4></div>
          <div className="notifictionFeilds downloadReadcarefly"><div className="notificationHeading downloadReadcareflyDetails mt-3">
              <ol style={{paddingLeft: 15}}>
                <li>Select the data you want to export - All articles, all draft articles or all published articles from the dropdown menu.</li>
                <li>Click on the button to export</li>
                <p className="card-body-text my-3">The exported data is mailed at the account owner's email address in a .CSV format. </p>
                <p className="card-body-text-feilds"><strong>Note:</strong> For any queries, please contact us <a href="mailto:support@appypiedesk.com" className="color-blueTheme">support@appypiedesk.com</a></p>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="rightPanelFooter categoryRightPanelFooter">
        <button className="rightPanelBtn" onClick={this._submit}>Export</button>
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

const connectedCsvexport = connect(mapStateToProps)(Csvexport);
export { connectedCsvexport as Csvexport }; 