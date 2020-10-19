import React from 'react';
import {connect} from 'react-redux';

import {userService} from '../_services';
import Loader from '../_components/Loader'
import ModalComponents from '../_components/ModalComponents';
import config from 'config';
import { commonConstant } from '../_constants';

class CreateFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deschide: true,
      visiblehide: true,
      seohide: true,
      cathide: true,
      foldername: '',
      categoryid: '',
      description: '',
      userselect: [1],
      seotitle: '',
      metakeyword: '',
      seodesc: '',
      submitted: false,
      allUsers: true,
      register: false,
      agents: false,
      tags: [], //tags manage metakeyword according sec
      action: false, //action false then add category action true then edit category
      folderId: "",
      seoId: "",
      categories: [],
      loader: false,
      position: 0,
      createdON: 0,
      statemode: "",
      showmodal: false,
      actionperformed: false,
      error: "",
      createdON: Date.parse(new Date()),
      titlecount:commonConstant.FoldertitleCount,
      descriptioncount:commonConstant.FolderdescriptionCount,
      metacount:commonConstant.FoldermetaCount,
      metadesc:commonConstant.FoldermetsdescCount,

    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this._handlerightsidebar = this
      ._handlerightsidebar
      .bind(this)
    this.handlestatus = this
      .handlestatus
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleEditSubmit = this
      .handleEditSubmit
      .bind(this);
    this._stausshow = this
      ._stausshow
      .bind(this);
    this.closecomponent = this
      .closecomponent
      .bind(this);
    localStorage.removeItem("folder")

  }

  componentDidMount() {
    if (this.props.catId) 
      this.setState({categoryid: this.props.catId})
    userService
      .categorylist()
      .then(response => {
        if (response.status == 200) {
          this.setState({categories: response.data})
        }
      })
  }
  componentWillReceiveProps(nextProps) {
    const data = nextProps.folderdata[0];
    const visible = JSON.parse(data.visibleStatus);
    this.setState({deschide: false})
    this.setState({visiblehide: false})
    this.setState({seohide: false})
    this.setState({cathide: false})
    this.setState({categoryid: data.catId})
    this.setState({foldername: data.name})
    this.setState({description: data.description})
    this.setState({
      allUsers: (visible.indexOf(1) !== -1)
        ? true
        : false
    })
    this.setState({
      register: (visible.indexOf(2) !== -1)
        ? true
        : false
    })
    this.setState({
      agents: (visible.indexOf(3) !== -1)
        ? true
        : false
    })
    this.setState({seotitle: data.det[0].title})
    this.setState({
      tags: JSON.parse(data.det[0].keyword)
    })
    this.setState({seodesc: data.det[0].description})
    this.setState({action: true})
    this.setState({folderId: data.id})
    this.setState({seoId: data.det[0].id})
    this.setState({position: data.position})
    this.setState({createdON: data.createdON})
    this.setState({ titlecount:(data.name)?commonConstant.FoldertitleCount-data.name.length:commonConstant.FoldertitleCount})
    this.setState({ descriptioncount:(data.description)?commonConstant.FolderdescriptionCount-data.description.split('').length:commonConstant.FolderdescriptionCount})
    this.setState({ metacount:(data.det[0].title)?commonConstant.FoldermetaCount-data.det[0].title.length:commonConstant.FoldermetaCount})
    this.setState({ metadesc:(data.det[0].description)?commonConstant.FoldermetsdescCount-data.det[0].description.split('').length:commonConstant.FoldermetsdescCount})
    localStorage.setItem("folder", JSON.stringify(this.state))
  }
  _stausshow(type) {

    if (type == "desc") 
      this.setState({
        deschide: !this.state.deschide
      });
    if (type == "visible") 
      this.setState({
        visiblehide: !this.state.visiblehide
      });
    if (type == "seo") 
      this.setState({
        seohide: !this.state.seohide
      });
    if (type == "cat") 
      this.setState({
        cathide: !this.state.cathide
      });

    }
  handleDestination(event) {
    this.setState({actionperformed: true})
    const userselect = this.state.userselect
    let index
    if (event.target.checked) {
      userselect.push(+ event.target.value)
    } else {
      index = userselect.indexOf(+ event.target.value)
      userselect.splice(index, 1)
    }

  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({submitted: true});
    // const { username, password } = this.state;
    const {foldername} = this.state;
    const categoryId = this.state.categoryid;
    const {dispatch} = this.props;
    this.setState({error: ""});
    if (foldername.trim() && categoryId) {
      this.setState({
        loader: !this.state.loader
      })
      userService
        .addfolder(this.state)
        .then((response) => {
          if (response.status == 200) {
            // this.closecomponent(); this.setState({ loader:!this.state.loader })
            // dispatch({ type: 'FolderToggle' })
            localStorage.removeItem("folder")
            window.location.href = `${config.path}/folder/` + response
              .url
              .categoryName
              .replace(/ /g, "_") + '/' + this.state.categoryid;
          } else {
            this.setState({
              loader: !this.state.loader
            })
            this.setState({error: response.message});
          }

        })
    }
    if (!categoryId) 
      this._stausshow("cat");

    }
  closecomponent() {
    this
      .props
      .updaterender();
  }

  handleEditSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    // const { username, password } = this.state;
    const {foldername} = this.state;
    const categoryId = this.state.categoryid;
    const {dispatch} = this.props;
    if (foldername.trim() && categoryId) {
      this.setState({
        loader: !this.state.loader
      })
      userService
        .editFolder(this.state)
        .then((response) => {
          if (response.status == 200) {
            localStorage.removeItem("folder")
            this.setState({
              loader: !this.state.loader
            })
            this.closecomponent();

            dispatch({type: 'FolderToggle'})
          }

        })

    }

  }

  closecomponent() {
    this
      .props
      .updaterender();
  }

  _handlerightsidebar() {
    if (this.state.actionperformed) {
      this.setState({
        actionperformed: !this.state.actionperformed
      });
      this.setState({
        showmodal: !this.state.showmodal
      });
      this.setState({statemode: "cancel"});
    } else {
      localStorage.removeItem("folder")
      const {dispatch} = this.props;
      dispatch({type: 'FolderToggle'})
    }

  }

  handleChange(e) {
    this.setState({actionperformed: true})
    const {name, value} = e.target;
    if(e.target.name == 'foldername')
    this.setState({titlecount:e.target.maxLength-e.target.value.length})
    if(e.target.name == 'description'){
    this.setState({descriptioncount:(e.target.value.split(' ').length < 101)?101-e.target.value.split(' ').length:this.state.descriptioncount})
    if(e.target.value.split(' ').length > 100)
    return false;
    }
    if(e.target.name == 'seotitle')
    this.setState({metacount:e.target.maxLength-e.target.value.length})
    if(e.target.name == 'seodesc'){
    this.setState({metadesc:(e.target.value.split(' ').length < 161)?161-e.target.value.split(' ').length:this.state.metadesc})
    if(e.target.value.split(' ').length > 160)
    return false;
    }
    this.setState({[name]: value});
    localStorage.setItem("folder", JSON.stringify(this.state))
  }
  handlestatus(e) {
    this.setState({actionperformed: true})
    const userselect = this.state.userselect
    let index

    userselect.splice(0, userselect.length)
    if (event.target.checked) {
      userselect.push(+ event.target.value)
    }

    if (e.target.value == 1 && userselect.length > 0) {
      this.setState({
        allUsers: !this.state.allUsers
      });
      this.setState({register: false});
      this.setState({agents: false});
    }
    if (e.target.value == 2) {
      this.setState({
        register: !this.state.register
      });
      this.setState({allUsers: false});
      this.setState({agents: false});
    }
    if (e.target.value == 3) {
      this.setState({
        agents: !this.state.agents
      });
      this.setState({allUsers: false});
      this.setState({register: false});
    }
    if (userselect.length == 0) {
      userselect.push(1);
      this.setState({allUsers: true});
    }
  }

  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({tags: newTags});
  }

  inputKeyDown = (e) => {
    this.setState({actionperformed: true})
    const val = e.target.value;
    if ((e.keyCode === 188 || e.keyCode === 13) && val.trim()) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({
        tags: [
          ...this.state.tags,
          val
        ]
      });
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }

  render() {
    const {loggingIn} = this.props;
    const {
      deschide,
      visiblehide,
      seohide,
      cathide,
      categoryid,
      foldername,
      description,
      submitted,
      allUsers,
      register,
      agents,
      tags,
      seodesc,
      seotitle,
      error
    } = this.state;
    const categories = this.state.categories;
    let categoryList = categories.length > 0 && categories.map((item, i) => {
      return (
        <option
          key={i}
          value={item.id}
          selected={(this.state.categoryid == item.id || item.id == this.props.catId)
          ? "selected"
          : ""}>{item.name}</option>
      )
    }, this);
    return (
      <div className="rightPanelSection">
        {this.state.loader && <Loader/>}
        {this.state.showmodal && <ModalComponents
          closemodal={() => this.setState({
          showmodal: !this.state.showmodal,
          actionperformed: true
        })}
          cancelaccept={this._handlerightsidebar}
          statemode={this.state.statemode}/>}
        {this.state.showmodal && <div className="shadow">&nbsp;</div>}
        <div className="folderCreateRightPanel">
          <div className="rightPanelHeader categoryRightPanelHeader">
            <ul>
              <li className="closing" onClick={this._handlerightsidebar}>
                <span className="circlebtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14.294"
                    height="14.294"
                    viewBox="0 0 14.294 14.294">
                    <path
                      id="ic_clear_24px"
                      d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z"
                      transform="translate(-5 -5)"
                      fill="#bebebe"/>
                  </svg>
                </span>
              </li>
              {/* <li className="help">
                <span className="downloadSampleFile">
                  <a href={`${config.frontendurl}preview/folder`} target="_blank" className="btn-rightpanel-white btn-rightpanel width120">Preview</a>
                </span>
              </li> */}
            </ul>
          </div>
            <div className="bodyRightPanel scroll-2">
              <div className="rightPanelMain">
                <div className="rightPanelHeadingLink categroyNameLinkblack">
                  <div className="rightFeilds-no mb-3">
                    <div
                      className={'md-form md-form-custom' + (submitted && (!foldername.trim() || error)
                      ? ' has-error'
                      : '')}>
                        <div className="words-count">{this.state.titlecount} characters</div>
                      <input
                        type="text"
                        id="inputMDEx71"
                        className="form-control"
                        name="foldername"
                        value={foldername}
                        Maxlength={commonConstant.FoldertitleCount}
                        onChange={this.handleChange}/>
                      <label
                        htmlFor="inputMDEx71"
                        className={(foldername)
                        ? 'active'
                        : ''}>Enter Folder Name*</label>
                      {submitted && !foldername.trim() && <div className="invalid-feedback">Folder Name is required</div>
}
                      {submitted && error && <div className="invalid-feedback">{error}.</div>
}
                    </div>
                  </div>
                  {/* <p><a href="#">http://www.your-link-goes-here.com</a></p> */}
                </div>
                <div className="rightPanelCategroyDescriptionFeilds">
                  <div className="rightPanelFeilds descriptionFeilds">
                    {/* <div className="rightFeildsTitle" onClick={() => this._stausshow('desc')}>
                                            <img src={`${config.path}/images/icon/rightpanel/`+(deschide?'right.svg':'bottom.svg')} alt="" />
                                            <span>Folder Description</span>
                                        </div> */}
                    <div
                      className={'rightFeilds-no mb-3' + (deschide
                      ? ' d-block'
                      : '')}>
                      <div className="md-form md-form-custom my-3">
                      <div className="words-count">{this.state.descriptioncount} words</div>
                        <textarea
                          id="form7"
                          name="description"
                          value={description}
                          className="md-textarea form-control"
                          rows="2"
                          onChange={this.handleChange}></textarea>
                        <label
                          htmlFor="form7"
                          className={(description)
                          ? 'active'
                          : ''}>Enter Description</label>
                      </div>
                    </div>
                  </div>
                  <div className="rightPanelFeilds descriptionFeilds">
                    <div className="rightFeildsTitle" onClick={() => this._stausshow('cat')}>
                      <img
                        src={`${config.path}/images/icon/rightpanel/` + (cathide
                        ? 'right.svg'
                        : 'bottom.svg')}
                        alt=""/>
                      <span>Choose Category</span>
                    </div>
                    <div
                      className={'rightFeilds-no mb-3' + (cathide
                      ? ' d-block'
                      : '')}>
                      <div
                        className={'md-form md-form-custom' + (submitted && !categoryid
                        ? ' has-error'
                        : '')}>
                        <select
                          className="customArrow md-select2"
                          name="categoryid"
                          onChange={this.handleChange}>
                          <option value="">Select Category</option>
                          {categoryList}
                        </select>
                        {submitted && !categoryid && <div className="invalid-feedback">Category select is required</div>
}
                      </div>
                    </div>
                  </div>
                  <div className="rightPanelFeilds descriptionFeilds">
                    <div className="rightFeildsTitle" onClick={() => this._stausshow('visible')}>
                      <img
                        src={`${config.path}/images/icon/rightpanel/` + (visiblehide
                        ? 'right.svg'
                        : 'bottom.svg')}
                        alt=""/>
                      <span>Visible To</span>
                    </div>
                    <div
                      className={'rightFeilds-no mb-3' + (visiblehide
                      ? ' d-block'
                      : '')}>
                      <div className="visibleTo">
                        <span
                          name="users"
                          className={allUsers
                          ? 'selected'
                          : ''}><input
                          onChange={this.handlestatus}
                          type="checkbox"
                          name="userselect"
                          value="1"
                          checked={allUsers
        ? 'checked'
        : ''}/>All Users</span>
                        {/* <span
                          name="register"
                          className={register
                          ? 'selected'
                          : ''}><input
                          onChange={this.handlestatus}
                          type="checkbox"
                          name="userselect"
                          value="2"
                          checked={register
        ? 'checked'
        : ''}/>Registered Users</span>
                        <span
                          name="agent"
                          className={agents
                          ? 'selected'
                          : ''}><input
                          onChange={this.handlestatus}
                          type="checkbox"
                          name="userselect"
                          value="3"
                          checked={agents
        ? 'checked'
        : ''}/>Agents</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="rightPanelFeilds descriptionFeilds seo-Optional">
                    <div className="rightFeildsTitle" onClick={() => this._stausshow('seo')}>
                      <img
                        src={`${config.path}/images/icon/rightpanel/` + (seohide
                        ? 'right.svg'
                        : 'bottom.svg')}
                        alt=""
                        style={{
                        opacity: '1',
                        position: 'relative',
                        left: '0px',
                        top: '-2px'
                      }}/>
                      <span style={{paddingLeft: '15px'}}>Advanced Settings</span>
                      {/* <span className="seoTitleDownLine">Enter Meta tags to optimize the article in
                                                search engines.</span> */}
                    </div>
                    <div
                      className={'rightFeilds-no pt-2' + (seohide
                      ? ' d-none'
                      : '')}>
                      <div className="md-form md-form-custom">
                      <div className="words-count">{this.state.metacount} characters</div>
                        <input
                          type="text"
                          id="inputMDEx7"
                          className="form-control"
                          name="seotitle"
                          maxLength={commonConstant.FoldermetaCount}
                          value={seotitle}
                          onChange={this.handleChange}/>
                        <label
                          htmlFor="inputMDEx7"
                          className={(seotitle)
                          ? 'active'
                          : ''}>SEO Title
                        </label>
                      </div>
                    </div>
                    <div
                      className={'rightFeilds-no ' + (seohide
                      ? ' d-none'
                      : '')}>
                      <div className="md-form md-form-custom my-3">
                      <div className="words-count">{this.state.metadesc} words</div>
                        <textarea
                          id="form8"
                          className="md-textarea form-control"
                          rows="2"
                          name="seodesc"
                          value={seodesc}
                          onChange={this.handleChange}></textarea>
                        <label
                          htmlFor="form8"
                          className={(seodesc)
                          ? 'active'
                          : ''}>SEO Description</label>
                      </div>
                    </div>
                    <div
                      className={'rightFeilds-no pt-2' + (seohide
                      ? ' d-none'
                      : '')}>
                      <div className="md-form md-form-custom">
                        <div className="input-tag">
                          <ul className="input-tag__tags">
                            {tags.map((tag, i) => (
                              <li key={tag} className="visibleTo mt-1">
                                <span className="selected">
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => {
                                    this.removeTag(i);
                                  }}>+</button>
                                </span>
                              </li>
                            ))}
                            <li
                              className="input-tag__tags__input"
                              style={{
                              "width": "100%"
                            }}></li>
                            <input
                              type="text"
                              id="inputMDEx8"
                              className="md-textarea form-control"
                              onKeyDown={this.inputKeyDown}
                              ref={c => {
                              this.tagInput = c;
                            }}/>
                            <label
                              htmlFor="inputMDEx8"
                              className={((this.state.tags.length != 0)?'activeselected':'')}>SEO Meta Keywords <span className="seo-meta-p">(Type and press 'Enter' to add)</span></label>
                          </ul>

                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="rightPanelFooter categoryRightPanelFooter">
              <button className="rightPanelBtn" onClick={(this.state.action)
            ? this.handleEditSubmit
            : this.handleSubmit}>{(this.state.action)
                  ? 'Update'
                  : 'Create Folder'}</button>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggingIn} = state.authentication;
  return {loggingIn};
}

const connectedCreateFolder = connect(mapStateToProps)(CreateFolder);
export {connectedCreateFolder as CreateFolder};