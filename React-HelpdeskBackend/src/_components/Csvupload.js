import React from 'react';
import config from 'config';
import { connect } from 'react-redux';
import { userService } from '../_services';
import Loader from '../_components/Loader';




class Csvupload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup : false,
            selectedFile: "",
            addcat:false,
            addarticle:true,
            addfoldert:false,
            foldername:'',
            deschide: true,
            visiblehide: true,
            seohide: true,
            categoryname: '',
            description: '',
            userselect:[1],
            seotitle: '',
            metakeyword: '',
            seodesc: '',
            submitted: false,
            foldersubmitted: false,
            allUsers: true,
            register: false,
            agents: false,
            tags: [],      //tags manage metakeyword according sec
            action: false, //action false then add category action true then edit category
            catId: "",
            seoId: "",
            loader: false,
            position:0,
            createdON:0,
            csv_name:"",
            content:"",
            categories:[],
            folders:[],
            showgif:false,
            formate:false

        };
        this.read = this.read.bind(this);


    }

    _handlerightsidebar=()=> {
        const { dispatch } = this.props;
        dispatch({ type: 'CsvToggle' })
    }
    componentDidMount(){
      userService.categorylist()
      .then(response => {
        if (response.status == 200) {
          this.setState({ categories: response.data })
          this.setState({catId:response.obj[0].id})
          this.setState({folderId:response.obj[0].folderdet[0].id})
          this.setState({ folders: response.obj[0].folderdet })
        }
      })
      
    }
    
    read(e) {
        const reader = new FileReader();
        const csv1 = e.target.files[0];
        this.setState({csv_name:e.target.files[0].name});
        reader.readAsText(csv1);
        reader.onload = () => {
          this.setState({content:reader.result});
               // this.csvJSON(reader.result);
          };
      }
    
      removeCsv=()=>{
        this.setState({csv_name:""});
        this.setState({content:""});
        this.setState({formate:false})
      }
    
      csvJSON=()=>{
        var lines=this.state.content.split("\n"); 
        var result = [];

        var headers=lines[0].split(",");
        this.setState({submitted:true})
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(headers);
       
         if(headers[0].trim() != 'Article' || headers[1].trim() != 'Article Description'){
         this.setState({formate:true})
         return false;
         }
        for(var i=1;i<lines.length;i++){

            var obj = {};
            var currentline=lines[i].split(",");
            if(currentline[0]){
            for(var j=0;j<headers.length;j++){
                var name = (j == 0)?"name":"desc";
                obj[name] = currentline[j];
                obj['catId'] = this.state.catId;
                obj['folderId'] = this.state.folderId;
                obj['userId'] = user[0].id;
            }
            result.push(obj);
        }  
        }
        if (this.state.catId && this.state.folderId) {
        this.setState({ loader: !this.state.loader })
            userService.addArticlecsv(result)
            .then(response => {
                this.setState({ loader: !this.state.loader })
             window.location.href=`${config.path}`+'/' + 'article' + '/' + 'draft' + '/' + this.state.folderId;
            });
        return result; //JavaScript object
          }
    }
      
    handleChange = (e) => {
      this.setState({ catId: e.target.value })
      this.setState({ showgif: !this.state.showgif })
      userService.folderlist(e.target.value)
        .then(response => {
          if (response.status == 200) {
            this.setState({ folders: response.data })
            this.setState({ showgif: !this.state.showgif })
  
          }
        })
    }
    _selectdata = (e) => {
      this.setState({ folderId: e.target.value })
    }

    render() {
        const { loggingIn } = this.props;
        const categories = this.state.categories;
        let categoryList = this.state.categories.length > 0
      && categories.map((item, i) => {
        return (
          <option key={i} value={item.id} selected={(this.state.catId == item.id) ? "selected" : ""}>{item.name}</option>
        )
      }, this);
    let folderlist = this.state.folders.length > 0
      && this.state.folders.map((item, i) => {
        return (
          <option key={i} value={item.id} selected={(this.state.folderId == item.id) ? "selected" : ""}>{item.name}</option>
        )
      }, this);
       
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
        <li className="help">
          <span className="downloadSampleFile">
            <a className="downloadSampleFileBtn" href={`${config.path}/sample.csv`}>Download Sample File</a>
          </span>
        </li>
      </ul>
    </div>
    <div className="bodyRightPanel scroll-2">
      <div className="rightPanelMain">
        <div className="rightPanelHeadingLink uploadCsvHeading">
          <h4>Import via .CSV</h4>
        </div>
        <div className="recentActibityHeading">
            <h4> <svg xmlns="http://www.w3.org/2000/svg" width="16.023" height="12.992" viewBox="0 0 16.023 12.992">
                <path id="ic_format_list_bulleted_24px" d="M3.8,9.7A1.3,1.3,0,1,0,5.1,11,1.3,1.3,0,0,0,3.8,9.7Zm0-5.2A1.3,1.3,0,1,0,5.1,5.8,1.3,1.3,0,0,0,3.8,4.5Zm0,10.394a1.3,1.3,0,1,0,1.3,1.3A1.3,1.3,0,0,0,3.8,14.894Zm2.6,2.165H18.523V15.327H6.4Zm0-5.2H18.523V10.13H6.4Zm0-6.929V6.665H18.523V4.933Z" transform="translate(-2.5 -4.5)" />
              </svg>
              &nbsp;&nbsp;Please Read Below Provided Steps Carefully.</h4>
          </div>
          <div className="recentActibityHeading rightPanelNotification">
            <div className="notifictionFeilds downloadReadcarefly">
              <div className="notificationHeading downloadReadcareflyDetails">
                <ol style={{paddingLeft: '15px'}}>
                  <li>Download the sample file. </li>
                  <li>Map your data in the fields of the sample file(Do not
                    add/delete/change the columns in the CSV file, you may add
                    additional rows) </li>
                  <li>Save the file as Sample CSV on your system and upload it here.</li>
                </ol>
              </div>
            </div>
          </div>
        <div className="rightPanelCategroyDescriptionFeilds">
          <div className="upload-csv-xml-row">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* {!this.state.csv_name && <div className="upload-csv-xml-col">
                 <div className="upload-csv-xmlbutton">
                                                    <input
                                                        type="file"
                                                        name="csv"
                                                        accept=".csv"
                                                        onChange={this.read.bind(this)}
                                                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={16} viewBox="0 0 24 16">
                      <path id="ic_cloud_upload_24px" d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z" transform="translate(0 -4)" fill="#fff" />
                    </svg>&nbsp;&nbsp;
                    <span>Upload</span>
                  </div>
                  <p className="note-text"><strong>Note</strong> : You can only upload .csv</p>
                </div>} */}
                {this.state.csv_name && <div className="upload-csv-icon mt-4">
                    <div className="upload-csv-file-icon ps-relative mb-4">
                        <span className="remove-circle-csv" onClick={this.removeCsv}>
                          <img src={`${config.path}/images/icon/settings/remove-circle.svg`} />
                        </span>
                        <img src={`${config.path}/images/icon/rightpanel/csv.svg`} />
                        <p className="file_name_csv mt-1">{this.state.csv_name}</p>
                        {this.state.submitted && this.state.formate &&
                                <div className="invalid-feedback">CSV format incorrect.</div>
                        }
                    </div>
                </div>}
                {this.state.csv_name && <div className={'md-form md-form-custom' + (this.state.submitted && !this.state.catId ? ' has-error' : '')} >
                              <select className="form-control md-select2" name="categoryid" onChange={this.handleChange}>
                                <option value="">Choose Category</option>
                                {categoryList}
                              </select>
                              {this.state.submitted && !this.state.catId &&
                                <div className="invalid-feedback">Category Name is required</div>
                              }
                            </div>}
                            {this.state.csv_name && <div className={'md-form md-form-custom' + (this.state.submitted && !this.state.folderId ? ' has-error' : '')}
                            >
                              {this.state.showgif && <span className="pree-loader"><img className="customgif" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}
                              <select className="form-control md-select2" name="folderid" onChange={this._selectdata}>
                                <option value="">Select Folder</option>
                                {folderlist}
                              </select>
                              {this.state.submitted && !this.state.folderId &&
                                <div className="invalid-feedback">Folder Name is required</div>
                              }
                            </div>}
                          
                {/* <p className="note-text"><strong>Note</strong> : You can only upload .csv</p> */}

              </div>
            </div>
          </div>
        </div>
          

      </div>
    </div>
    <div className="rightPanelFooter categoryRightPanelFooter">
    {this.state.csv_name && <div className="upload-csv-xmlbutton">
                    <button className="rightPanelBtn" onClick={this.csvJSON}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={16} viewBox="0 0 24 16">
                        <path id="ic_cloud_upload_24px" d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z" transform="translate(0 -4)" fill="#fff" />
                      </svg>&nbsp;&nbsp;
                      <span>Save</span>
                    </button>
                </div>}

    {!this.state.csv_name && <div className="upload-csv-xml-col">
                 <div className="upload-csv-xmlbutton">
                                                    <input
                                                        type="file"
                                                        name="csv"
                                                        accept=".csv"
                                                        onChange={this.read.bind(this)}
                                                    />
                    
                    <button className="rightPanelBtn"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={16} viewBox="0 0 24 16">
                      <path id="ic_cloud_upload_24px" d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z" transform="translate(0 -4)" fill="#fff" />
                    </svg>&nbsp;&nbsp;Upload</button>
                  </div>
                </div>}

        
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

const connectedCsvupload = connect(mapStateToProps)(Csvupload);
export { connectedCsvupload as Csvupload }; 