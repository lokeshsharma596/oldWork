import React from 'react';
import { userService } from '../_services';
import Loader from '../_components/Loader';
import config from 'config';

class MoveComponents extends React.Component {
    constructor() {
        super();
        this.state = {
            checkedfolder:"",
            categories:[],
            submitted:false,
            categoryid: '',
            submitted: false,
            loader:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static getDerivedStateFromProps(nextProps){
      return {
        checkedfolder:nextProps.selecetedcat
      }
    }

    componentDidMount() {
        userService.categorylist()    
        .then(response => {
            if(response.status == 200)
            {   
                this.setState({categories:response.data})
                this.setState({loader:!this.state.loader})
            }
        })
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
       // const { username, password } = this.state;
       const categoryId = this.state.categoryid;
      // const { dispatch } = this.props;
       if (categoryId) {
        //this.setState({ loader:!this.state.loader })
       }
        
    }
    
  render() {
      const categories = this.state.categories;
      const { categoryid, submitted } = this.state;
      let categoryList = categories.length > 0
          && categories.map((item, i) => {
          return (
              <option  key={i} value={item.id}>{item.name}</option>
          )
      }, this);
      return (
      <div className="rightPanelSection">
            {this.state.loader && <Loader/>}
                    <div className="folderCreateRightPanel">
                        <div className="rightPanelHeader categoryRightPanelHeader">
                            <ul>
                                <li className="closing" onClick={this.props.onClose}>
                                    <span className="circlebtn">
                                        <img src={`${config.path}/images/icon/rightpanel/multiply.svg`} alt="" />
                                    </span>
                                </li>
                                <li className="help">
                                    <span className="circlebtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="29" viewBox="0 0 13 29">
                                            <text id="_" data-name="?" transform="translate(0 23)" fill="#bebebe" fontSize="25" fontFamily="Roboto-Medium, Roboto" fontWeight="500"><tspan x="0" y="0">?</tspan></text>
                                          </svg> 
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <form name="form" onSubmit={(this.state.action)?this.handleEditSubmit:this.handleSubmit}>
                        <div className="bodyRightPanel scroll-2">
                            <div className="rightPanelMain ">
                                <div className="moveTo-heading rightPanelHeadingnotLink">
                                    <h4>Move To</h4>
                                    <p>The selected item will be move to :</p>
                                </div>
                                <div className="rightPanelCategroyDescriptionFeilds moveToFeildsheading leftFeildNospaece">
                                    <div className="rightPanelFeilds descriptionFeilds">
                                        <div className="rightFeildsTitle">
                                        </div>
                                        <div className={'rightFeilds' + (submitted && !categoryid ? ' has-error' : '')}>
                                            <select className="custom-select custom-bg" name="categoryid" onChange={this.handleChange}>
                                                    <option value="">Select Category</option>
                                                   {categoryList}
                                                </select>
                                                {submitted && !categoryid &&
                                                <div className="invalid-feedback">Category select is required</div>
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="rightPanelFeilds descriptionFeilds">
                                        <div className="rightFeilds">
                                            <div className="customeSelectMultiple">
                                            	<div className="customeSelectTitle">
                                            		<span>Select Folder</span>
                                            		<img src={`${config.path}/images/ic_unfold_more_24px.svg`} />
                                            	</div>
                                            	<ul className="customeSelectMultipleUL">
                                            		<li>
                                            			<img src={`${config.path}/images/icon/rightpanel/folder.svg`} />
                                            			Best Podcast Hosting Platforms
                                            		</li>
                                            		<li>
                                                         <img src={`${config.path}/images/icon/rightpanel/folder.svg`} />
                                            			Thing You Should Know For An App
                                            		</li>
                                            		<li>
                                                    <img src={`${config.path}/images/icon/rightpanel/folder.svg`} />
                                            			Business for Mobile App
                                            		</li>
                                            		<li>
                                                    <img src={`${config.path}/images/icon/rightpanel/folder.svg`} />
                                            			Video Marketing
                                            		</li>
                                            	</ul>
                                            	<div className="addmoreSelectMultiple">
                                            			<input type="file" name="" />
                                            			<span>+ Add Folder</span>
                                            	</div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="rightPanelFooter categoryRightPanelFooter">
                            <button className="rightPanelBtn">Move Selected</button>
                        </div>
                        </form>
                    </div>
                </div>
    );
  }
}

export default MoveComponents;