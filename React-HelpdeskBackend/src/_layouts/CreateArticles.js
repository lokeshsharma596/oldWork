import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
import { userService } from '../_services';
// import EditorContainer from '../_components/EditorContainer';
import ModalComponents from '../_components/ModalComponents';
import Loader from '../_components/Loader';
import {Dateformate,getname} from '../_helpers/auth-header'
// import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import storage from '../config/config'
import { Editor } from '@tinymce/tinymce-react';
import {stateToHTML} from 'draft-js-export-html';
import { commonConstant } from '../_constants';
// import draftToHtml from 'draftjs-to-html';
// import CKEditor from 'ckeditor4-react';
// CKEditor.editorUrl = `${config.path}/node_modules/ckeditor4/ckeditor.js`;


class CreateArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deschide: true,
      visiblehide: true,
      seohide: true,
      articlename: '',
      description: '',
      userselect: [1],
      permission: [1, 2, 3],
      seotitle: '',
      metakeyword: '',
      seodesc: '',
      submitted: false,
      allUsers: true,
      register: false,
      agents: false,
      tags: [],
      lables: [],      //tags manage metakeyword according sec
      action: false,
      seoId: "",
      loader: false,
      addarticle: false,
      commentstatus: false,
      statemode: 'draft',
      categories: [],
      folders: [],
      showgif: false,
      pinstatus: 0,
      showmodal: false,
      statemode: "",
      catId: '',
      articleId: '',
      ispublish: 1,
      categoryid: "",
      folderId: "",
      position: 0,
      createdON: 0,
      allowcomment: true,
      allowvotes: true,
      allowsharing: true,
      editStatus: false,
      changesdata: false,
      actionperformed:false,
      url:'',
      articletype:'',
      error:'',
      titlecount:commonConstant.ArticletitleCount,
      metacount:commonConstant.ArticlemetaCount,
      metadesc:commonConstant.ArticlemetsdescCount,
      createdON:Date.parse(new Date()),
      showgif:false,
      showpreview:false
    };
    localStorage.removeItem("article")
   
     
  }

  componentDidMount() {

    userService.categorylist()
      .then(response => {
        if (response.status == 200) {
        //  this.setState({ showgif: !this.state.showgif })
          this.setState({ categories: response.data })
          if (this.props.catId) {
            this.setState({ catId: this.props.catId })
            if (this.props.fid)
              this.setState({ folderId: this.props.fid })
            userService.folderlist(this.props.catId)
              .then(response => {
                if (response.status == 200) {
                  this.setState({ folders: response.data })
               //   this.setState({ showgif: !this.state.showgif })
                }
              })
          }
        }
      })
  }
  _stausshow(type) {

    if (type == "desc")
      this.setState({ deschide: !this.state.deschide });
    if (type == "visible")
      this.setState({ visiblehide: !this.state.visiblehide });
    if (type == "seo")
      this.setState({ seohide: !this.state.seohide });
    if (type == "cat")
      this.setState({ cathide: !this.state.cathide });

  }

  componentWillMount() {
    userService.categorylist()
      .then(response => {
        if (response.status == 200) {
          this.setState({ categories: response.data })
        }
      })
  }
  
  // static getDerivedStateFromProps(nextProps){
  //   let data = nextProps.articledata[0];
  //   if(data == undefined)
  //      return false;
  //   const visible = JSON.parse(data.visibleStatus);
  //   const permission = JSON.parse(data.permission.replace(/\\/g, ""));
  //   return {
  //     articlename: data.name,
  //     description: data.description,
  //     pinstatus: data.pinStatus,
  //     seotitle: data.det[0].title,
  //     tags: data.det[0].keyword?(JSON.parse(data.det[0].keyword.replace(/\\/g, ""))):[],
  //     lables: data.det[0].keyword?(JSON.parse(data.det[0].label.replace(/\\/g, ""))):[],
  //     allUsers: (visible.indexOf(1) !== -1) ? true : false,
  //     register: (visible.indexOf(2) !== -1) ? true : false,
  //     agents: (visible.indexOf(3) !== -1) ? true : false,
  //     seodesc: data.det[0].description,
  //     allowcomment: (permission.indexOf(1) !== -1) ? true : false,
  //     allowvotes: (permission.indexOf(2) !== -1) ? true : false,
  //     allowsharing: (permission.indexOf(3) !== -1) ? true : false,
  //     permission: (JSON.parse(data.permission.replace(/\\/g, ""))),
  //     action: true,
  //     articleId: data.id,
  //     seoId: data.det[0].id,
  //     catId: data.folders[0].catId,
  //     folderId: data.folderId,
  //     position: data.position,
  //     createdON: data.createdON,
  //     editStatus: true,
  //     folders : userService.folderlist(data.catId)
  //     .then(response => {
  //       if (response.status == 200) {
  //         return response.data;
  //       }
  //     })
      
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.articledata[0];
    console.log(data.det[0].keyword)
    this.setState({ articlename: data.name })
   
    // )); return false;
      this.setState({
        description: data.description
      })
    this.setState({ pinstatus: data.pinStatus })
    this.setState({ seotitle: data.det[0].title })
    this.setState({ tags: data.det[0].keyword?(JSON.parse(data.det[0].keyword.replace(/\\/g, ""))):[] })
    this.setState({ lables: data.det[0].keyword?(JSON.parse(data.det[0].label.replace(/\\/g, ""))):[] })
    const visible = JSON.parse(data.visibleStatus);
    this.setState({ allUsers: (visible.indexOf(1) !== -1) ? true : false })
    this.setState({ register: (visible.indexOf(2) !== -1) ? true : false })
    this.setState({ agents: (visible.indexOf(3) !== -1) ? true : false })
    this.setState({ seodesc: data.det[0].description })
    const permission = JSON.parse(data.permission.replace(/\\/g, ""));
    this.setState({ allowcomment: (permission.indexOf(1) !== -1) ? true : false })
    this.setState({ allowvotes: (permission.indexOf(2) !== -1) ? true : false })
    this.setState({ allowsharing: (permission.indexOf(3) !== -1) ? true : false })
    this.setState({ permission: (JSON.parse(data.permission.replace(/\\/g, ""))) })
    this.setState({ action: true })
    this.setState({ articleId: data.id })
    this.setState({ seoId: data.det[0].id })
    this.setState({ catId: data.folders[0].catId })
    this.setState({ folderId: data.folderId })
    this.setState({ position: data.position })
    this.setState({ createdON: data.createdON });
    this.setState({ showgif: !this.state.showgif })
    this.setState({ editStatus: !this.state.editStatus })
    this.setState({ titlecount:(data.name)?commonConstant.ArticletitleCount-data.name.split(' ').length:commonConstant.ArticletitleCount})
    this.setState({ metacount:(data.det[0].title)?commonConstant.ArticlemetaCount-data.det[0].title.length:commonConstant.ArticlemetaCount})
    this.setState({ metadesc:(data.det[0].description)?commonConstant.ArticlemetsdescCount-data.det[0].description.split(' ').length:commonConstant.ArticlemetsdescCount})
    userService.folderlist(data.catId)
      .then(response => {
        if (response.status == 200) {
          this.setState({ folders: response.data })
          this.setState({ showgif: false })

        }
      })
      localStorage.setItem("article",JSON.stringify(this.state))
  }

  _componentStatus = (type) => {


    if (type == "_article") {
      this.setState({ addarticle: !this.state.addarticle });
      this.setState({ commentstatus: false });
    } if (type == "_comment") {
      this.setState({ commentstatus: !this.state.commentstatus });
      this.setState({ addarticle: false });
    }
  }

  _handlerightsidebar = () => {
    if(this.state.actionperformed){
    this.setState({ actionperformed: !this.state.actionperformed });
    this.setState({ showmodal: !this.state.showmodal });
    this.setState({ statemode: "cancel" });
    }
    else{
      localStorage.removeItem("article")
      const { dispatch } = this.props;
      dispatch({ type: 'ArticleToggle' })
    }
   
    // if (this.state.showmodal) {
    //   const { dispatch } = this.props;
    //   dispatch({ type: 'ArticleToggle' })
    // }
    
  }

  // onChange = (evt) => {
  //   var description = evt.editor.getData();
  //   alert("sdsdfsgd")
  //   this.setState({
  //     description: description
  //   })
  // }

  handleChange = (e) => {
    this.setState({ catId: e.target.value })
    this.setState({ showgif: !this.state.showgif })
    userService.folderlist(e.target.value)
      .then(response => {
        if (response.status == 200) {
          this.setState({ folders: response.data })
          this.setState({ showgif: false })

        }
      })
  }

  _pinstaus = (e) => {
    this.setState({actionperformed:true})
    if (e.target.checked) {
      this.setState({ pinstatus: 1 });
    } else {
      this.setState({ pinstatus: 0 });
    }

  }
  _handleChange = (e) => {
    this.setState({actionperformed:true})
    const { name, value } = e.target;
    if(e.target.name == 'articlename'){
    this.setState({titlecount:(e.target.value.split(' ').length < 31)?31-e.target.value.split(' ').length:this.state.titlecount})
      if(e.target.value.split(' ').length > 30)
      return false;
    }
    if(e.target.name == 'seotitle')
    this.setState({metacount:e.target.maxLength-e.target.value.length})
    if(e.target.name == 'seodesc'){
    this.setState({metadesc:(e.target.value.split(' ').length < 161)?161-e.target.value.split(' ').length:this.state.metadesc})  
    if(e.target.value.split(' ').length > 160)
    return false;
    }
    this.setState({ [name]: value });
    localStorage.setItem("article",JSON.stringify(this.state))
  }

  handlestatus = (e, type) => {
    this.setState({actionperformed:true})
    const userselect = this.state.userselect
    let index
    userselect.splice(0, userselect.length)
    if (e.target.checked) {
      userselect.push(+e.target.value);
    }

    if (e.target.value == 1 && type != "setpermission" && userselect.length > 0) {
      this.setState({ allUsers: !this.state.allUsers });
      this.setState({ register: false });
      this.setState({ agents: false });
    } if (e.target.value == 2 && type != "setpermission") {
      this.setState({ register: !this.state.register });
      this.setState({ allUsers: false });
      this.setState({ agents: false });
    } if (e.target.value == 3 && type != "setpermission") {
      this.setState({ agents: !this.state.agents });
      this.setState({ allUsers: false });
      this.setState({ register: false });
    }
    if (userselect.length == 0) {
      userselect.push(1);
      this.setState({ allUsers: true });
    }
  }

  handlestatuspermission = (e) => {
    //const userselect = (type == "setpermission") ? this.state.permission : this.state.userselect
    this.setState({actionperformed:true})
    let index
    if (e.target.checked) {
      this.state.permission.push(+e.target.value)
    }
    else {
      index = this.state.permission.indexOf(+e.target.value)
      this.state.permission.splice(index, 1)
    }
    if (e.target.value == 1)
      this.setState({ allowcomment: !this.state.allowcomment });
    if (e.target.value == 2)
      this.setState({ allowvotes: !this.state.allowvotes });
    if (e.target.value == 3)
      this.setState({ allowsharing: !this.state.allowsharing });

  }
  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  }
  inputKeyDown = (e) => {
    this.setState({actionperformed:true})
    const val = e.target.value;
    if ((e.keyCode === 188 || e.keyCode === 13) && val.trim()) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val] });
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }

  removeLablesTag = (i) => {
    const newTags = [...this.state.lables];
    newTags.splice(i, 1);
    this.setState({ lables: newTags });
  }
  inputKeyLabelsDown = (e) => {
    this.setState({actionperformed:true})
    const val = e.target.value;
    if (e.keyCode === 32 && val.trim()) {
      if (this.state.lables.find(lable => lable.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ lables: [...this.state.lables, val] });
      this.tagInputlabel.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.labels.length - 1);
    }
  }

  openmodal = (type) => {
    this.setState({ submitted: true });
    const articlename = this.state.articlename;
    const categoryid = this.state.catId;
    const folderid = this.state.folderId;
    if (articlename && categoryid && folderid) {
      this.setState({ ispublish: 0 });
      this.setState({ statemode: type });
      this.setState({ showmodal: !this.state.showmodal });
    }
    else {
      localStorage.removeItem("article")
      this.setState({ addarticle: true });
    }
  }

  _selectdata = (e) => {
    this.setState({ folderId: e.target.value })
  }
  preview = (e,url)=>{
    e.preventDefault();
    this.setState({showpreview:!this.state.showpreview});
    userService.addtempArticle(this.state)
    .then((response) => {
      if (response.status == 200) {
        this.setState({showpreview:!this.state.showpreview});
        window.open(url+"/"+response.data, '_blank');  
        
      }
      else{
        this.setState({ loader: !this.state.loader })
        this.setState({error:response.message});
        this.setState({ showmodal: false })
        }

    })
    
  }
  
  ngsubmit = (type) => {
    this.setState({ submitted: true });
    const articlename = this.state.articlename;
    if (articlename.trim() && this.state.catId && this.state.folderId) {
      if (this.state.showmodal)
        this.setState({ showmodal: !this.state.showmodal })
      this.setState({ loader: !this.state.loader })
      this.setState({error:""});
      const { dispatch } = this.props;
      userService.addArticle(this.state)
        .then((response) => {
          if (response.status == 200) {
            //this.closecomponent();
            localStorage.removeItem("article")
            this.setState({ loader: !this.state.loader })
            if (!this.state.ispublish) {
              dispatch({ type: 'ArticleToggle' })
              window.dataLayer.push({"articleUpdate":{
                "status":"draft", // draft 
                "category": response.url.categoryName,
                "folder": response.url.folderName,
                "pinned": (this.state.pinstatus)?'yes':'no' //no 
              }});
              let users = JSON.parse(localStorage.getItem('user'));
              users[0].draftarticle = response.draftarticle;
              localStorage.setItem('user',JSON.stringify(users));
              //return false;
            setTimeout(function(){ 
             window.location.href = `${config.path}/article/` + response.url.categoryName.replace(/ /g, "_") + '/' + response.url.folderName.replace(/ /g, "_") + '/' + response.url.id + '/' + response.url.catId;
            }, 3000);
              // history.replace('/' + response.url.categoryName.replace(/ /g, "_") + '/' + response.url.folderName.replace(/ /g, "_") + '/' + response.url.id)
            } else {
              window.dataLayer.push({"articleUpdate":{
                "status":"published", // draft 
                "category": response.url.categoryName,
                "folder": response.url.folderName,
                "pinned": (this.state.pinstatus)?'yes':'no' //no 
              }});
              let users = JSON.parse(localStorage.getItem('user'));
              users[0].publisharticle = response.publisharticle;
              localStorage.setItem('user',JSON.stringify(users));
             
              let url=`${config.path}/article/` + response.url.categoryName.replace(/ /g, "_") + '/' + response.url.folderName.replace(/ /g, "_") + '/' + response.url.id + '/' + response.url.catId
              this.setState({url:url})
              this.setState({ statemode: "publish" });
              setTimeout(function(){ 
                window.location.href = url;
                }, 3000);
              this.setState({ showmodal: !this.state.showmodal })
            }
          }
          else{
            this.setState({ loader: !this.state.loader })
            this.setState({error:response.message});
            this.setState({ showmodal: false })
            }

        })
    }
    else{
      this.setState({addarticle:true});
    }
  }
  handleEditSubmit = (type) => {
      this.setState({ ispublish: 1 })
    this.setState({ submitted: true });
    const articlename = this.state.articlename;
    if (articlename.trim() && this.state.catId && this.state.folderId) {
      if (this.state.showmodal)
        this.setState({ showmodal: !this.state.showmodal })
      this.setState({ loader: !this.state.loader })
      const { dispatch } = this.props;
      userService.editArticle(this.state)
        .then((response) => {
          if (response.status == 200) {
            //this.closecomponent();
            localStorage.removeItem("article")
            this.setState({ loader: !this.state.loader })
           // if (this.state.ispublish) {
              dispatch({ type: 'ArticleToggle' })
              this.closecomponent()
            // } else {
            //   this.setState({ statemode: "publish" });
            //   this.setState({ showmodal: !this.state.showmodal })
            // }


          }

        })
    }
  }

  closecomponent() {
    this.props.updaterender();
  }
  handleEditorChange = (content, editor) => {
    console.log(content);
    this.setState({
      description:content
    });
    localStorage.setItem("article",JSON.stringify(this.state))
  }

  onEditorStateChange= (editorState) => {
    this.setState({
      description:stateToHTML(contentState)
    });
    localStorage.setItem("article",JSON.stringify(this.state))
  };
  getFileBase64 = (file, callback) => {
    var reader = new FileReader();
    alert("dsds");
    reader.readAsDataURL(file);
    // Since FileReader is asynchronous,
    // we need to pass data back.
    reader.onload = () => callback(reader.result);
    // TODO: catch an error
    reader.onerror = error => {};
  };

  uploadCallback = (file) => {
    return new Promise(
      (resolve, reject) => {
    const image = file;
    const metadata = {
        contentType: image.type
      };
      const randomId = Math.random().toString(36).substring(2)+"_logo";
    const uploadTask = storage.ref().child(`logo/${randomId}`).put(image,metadata);
            uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            error => {
                // Error function ...
            },
            () => {
                // complete function ...
                storage
                .ref("logo")
                .child(randomId)
                .getDownloadURL()
                .then(url => {
                  resolve({ data: { link: url}})
                  //</THE_URL>resolve({ data: { url } });
                });
            }
            );
          }
          );
   
};

  render() {
    const { loggingIn } = this.props;
    const {user}   =this.props.authentication;
    const { catId, seohide, folderId, permission, articlename, description, submitted, allUsers, register, agents, tags, lables, seodesc, seotitle, allowcomment, allowvotes, allowsharing,error } = this.state;
    const categories = this.state.categories;
    let content =`${this.state.description}`;
    console.log(content);
    const params = (this.state.url)?this.state.url:"";
    const configtools={
      image: { uploadCallback: this.uploadCallback, previewImage: true,inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', alt: { present: true, mandatory: false }, }
    }
    let categoryList = categories.length > 0
      && categories.map((item, i) => {
        return (
          <option key={i} value={item.id} selected={(this.state.catId == item.id || item.id == this.props.catId) ? "selected" : ""}>{item.name}</option>
        )
      }, this);
    let folderlist = this.state.folders.length > 0
      && this.state.folders.map((item, i) => {
        return (
          <option key={i} value={item.id} selected={(this.state.folderId == item.id || item.id == this.props.fid) ? "selected" : ""}>{item.name}</option>
        )
      }, this);
    return (
      <React.Fragment>
        {this.state.showmodal && <ModalComponents statemode={this.state.statemode} modalsuccess={(this.state.action) ? this.handleEditSubmit : this.ngsubmit} cancelaccept={this._handlerightsidebar} closemodal={() => this.setState({ showmodal: !this.state.showmodal,actionperformed: true,ispublish:1 })} param={params} />}

        <div className={"rightPanelSection rightPanelArticle " + this.state.folderId} >
          {this.state.showmodal && <div className="shadow">&nbsp;</div>}
          {this.state.loader && <Loader />}
          <div className="k-flex articleRightPanelMarge">
            <div className="article-right-col-1">
              <div className="articleRightPanel">
                <div className="rightPanelHeader categoryRightPanelHeader">
                  <ul>
                    <li className="closing" onClick={this._handlerightsidebar}>
                      <span className="circlebtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                          <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                        </svg>
                      </span>
                    </li>
                    {/* <li>
                      <span className="circlebtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15.681" height="15.681" viewBox="0 0 15.681 15.681">
                          <g id="Group_1375" data-name="Group 1375" transform="translate(0.4 0.4)">
                            <path id="Path_1524" data-name="Path 1524" d="M161.01,0h-3.864a.388.388,0,0,0,0,.775h2.934l-7.538,7.61a.388.388,0,1,0,.55.545l7.53-7.6V4.251a.388.388,0,1,0,.775,0V.388A.387.387,0,0,0,161.01,0Zm0,0" transform="translate(-146.517)" fill="#bebebe" stroke="#bebebe" strokeWidth="0.8" />
                            <path id="Path_1525" data-name="Path 1525" d="M12.561,56.243a.387.387,0,0,0-.388.388v4.244a1.164,1.164,0,0,1-1.163,1.163H1.938A1.164,1.164,0,0,1,.775,60.874V51.8a1.164,1.164,0,0,1,1.163-1.163H6.181a.388.388,0,1,0,0-.775H1.938A1.94,1.94,0,0,0,0,51.8v9.073a1.94,1.94,0,0,0,1.938,1.938h9.073a1.94,1.94,0,0,0,1.938-1.938V56.631A.387.387,0,0,0,12.561,56.243Zm0,0" transform="translate(0 -47.931)" fill="#bebebe" stroke="#bebebe" strokeWidth="0.8" />
                          </g>
                        </svg>
                      </span>
                    </li> */}
                    {/* <li>
                      <span className="circlebtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.546" height="21.546" viewBox="0 0 21.546 21.546">
                          <path id="ic_link_24px" d="M3.93,12.078A3.151,3.151,0,0,1,7.078,8.93h4.063V7H7.078a5.078,5.078,0,0,0,0,10.157h4.063v-1.93H7.078A3.151,3.151,0,0,1,3.93,12.078Zm4.164,1.016h8.125V11.063H8.094ZM17.235,7H13.172V8.93h4.063a3.149,3.149,0,0,1,0,6.3H13.172v1.93h4.063A5.078,5.078,0,0,0,17.235,7Z" transform="translate(-6.364 10.828) rotate(-45)" fill="#bebebe" />
                        </svg>
                      </span>
                    </li>*/}
                    {/*<li>
                      <span className="circlebtn">
                        <svg id="save" xmlns="http://www.w3.org/2000/svg" width="17.407" height="17.77" viewBox="0 0 17.407 17.77">
                          <rect id="Rectangle_873" data-name="Rectangle 873" width={2} height={4} transform="translate(9.485 1.385)" fill="#bebebe" />
                          <path id="Path_1611" data-name="Path 1611" d="M14.793,0H.5V17.77H17.907V3.114ZM4.126.725h9.429v5.8H4.126ZM14.643,17.044H3.4V9.429H14.643Z" transform="translate(-0.5)" fill="#bebebe" />
                          <path id="Path_1612" data-name="Path 1612" d="M12.863,30.725H15.4a.363.363,0,1,0,0-.725H12.863a.363.363,0,1,0,0,.725Z" transform="translate(-8.148 -19.121)" fill="#bebebe" />
                          <path id="Path_1613" data-name="Path 1613" d="M12.863,34.725h3.626a.363.363,0,1,0,0-.725H12.863a.363.363,0,1,0,0,.725Z" transform="translate(-8.148 -21.67)" fill="#bebebe" />
                          <path id="Path_1614" data-name="Path 1614" d="M25.863,34.733a.375.375,0,0,0,.257-.105.368.368,0,0,0,0-.515.375.375,0,0,0-.511,0,.361.361,0,0,0-.109.257.359.359,0,0,0,.363.363Z" transform="translate(-16.434 -21.678)" fill="#bebebe" />
                        </svg>
                      </span>
                    </li>
                     <li className="help">
                      <span className="circlebtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width={13} height={29} viewBox="0 0 13 29">
                          <text id="_" data-name="?" transform="translate(0 23)" fill="#bebebe" fontSize={25} fontFamily="Roboto-Medium, Roboto" fontWeight={500}><tspan x={0} y={0}>?</tspan></text>
                        </svg>
                      </span>
                    </li> */}
                    <li className="help ml-1" onClick={() => this.openmodal("draft")}>
                      <span className="downloadSampleFile">
                        <a className="btn-rightpanel-white btn-rightpanel width120">Save as Draft</a>
                      </span>
                    </li>
                    <li className="help">
                      <span className="downloadSampleFile">
                        {/* <a href={`${config.frontendurl}${user[0].domainname.replace(/ /g, "-")}/preview/article`} target="_blank" className="btn-rightpanel-white btn-rightpanel width120">Preview</a> */}
                        <a href="#" onClick={(e)=>this.preview(e,`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}preview`)} className="btn-rightpanel-white btn-rightpanel width120">{this.state.showgpreview && <div className="loader-btn"></div>}Preview</a>
                      </span>
                    </li>

                  </ul>
                </div>
                <div className="bodyRightPanel scroll-2 pr-0">
                  <div className="rightPanelMain">
                    <div className="rightPanelHeadingLink">
                      <div className="rightFeilds-no mb-3">
                        <div className={'md-form md-form-custom' + (submitted && (!articlename.trim() || error) ? ' has-error' : '')}>
                          <div className="words-count">{this.state.titlecount} words</div>
                          <input type="text" id="inputMDEx71" className="form-control" name="articlename" value={articlename} onChange={this._handleChange} />
                          <label htmlFor="inputMDEx71" className={(articlename) ? 'active' : ''}>Enter Article Name <span>*</span> </label>
                          {submitted && !articlename.trim() &&
                            <div className="invalid-feedback">Article Name is required</div>
                          }
                          {submitted && error &&
                            <div className="invalid-feedback">{error}.</div>
                          }
                        </div>
                      </div>
                      {/* <p><a href="#">http://www.your-link-goes-here.com</a></p> */}
                    </div>
                    <div className="rightPanelCategroyDescriptionFeilds">
                      <div className="rightPanelFeilds descriptionFeilds">
                        <div className="rightFeildsTitle pb-0">
                          <img src={`${config.path}/public/images/icon/rightpanel/bottom.svg`} alt="" />
                          <span>Article Description</span>
                        </div>  
                      </div>
                    </div>
                    <div className="rightFeilds-no mb-3">
                          <div className="md-form md-form-custom">
                          {/*<Editor
                              editorState={this.state.editorState}
                              wrapperStyle={{
                                minHeight: 500,
                            }}
                            hasHtmlEditorOption={true}
                            editorStyle={{
                                minHeight: 700,
                                border: "1px solid #F1F1F1",
                                padding: 5,
                                borderRadius: 2,
                                height: "auto",
                            }}
                              onEditorStateChange={this.onEditorStateChange}
                              toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                fontSize: {
                                options: [10,12, 14, 16, 18, 24, 30, 36, 48, 60],
                                },
                                image: { uploadCallback: this.uploadCallback, previewImage: true,inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', alt: { present: true, mandatory: false }, }
                              }}
                              stripPastedStyles={true}
                            />*/}
                            <input name="image" type="file" id="upload" className="hidden" onchange="" accept="image/*" style={{display:"none"}}></input>
                           
                            <Editor
                              apiKey='qhr0m0gv8rkrme6g9ar4pd20kz6mqy88n5dh3522tn00v5k9'
                              value={content}
                              init={{
                                height: 700,
                                menubar: false,
                                branding: false,
                                content_css : `${config.path}/styles.css`,
                                content_style: 'body { font-family: Arial;font-size: 10pt; }',
                                plugins: [
                                  "advlist autolink lists link image charmap print preview hr anchor pagebreak",
      "searchreplace wordcount visualblocks visualchars code fullscreen",
      "insertdatetime media nonbreaking save table contextmenu directionality","insertdatetime media table powerpaste hr code","table","media"
                                ],
                                toolbar1:
                                  'insertfile undo redo | insert | styleselect | bold italic |fontselect|fontsizeselect|alignleft aligncenter alignright alignjustify ',
                                  toolbar2:
                                  'media | bullist numlist outdent indent | link image code | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                                paste_data_images: true,
                                image_dimensions: false,
                                image_advtab: true,
                                file_picker_callback: function(callback, value, meta) {
                                    $('#upload').trigger('click');
                                    $('#upload').on('change', function() {
                                      var file = this.files[0];
                                      var reader = new FileReader();
                                      reader.onload = function(e) {
                                        callback(e.target.result, {
                                          alt: ''
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    });
                                },
                              }}
                              onEditorChange={this.handleEditorChange}
                            />
                            
                          </div>
                        </div>   
                  </div>
                </div>
                {/*(!this.state.addarticle && !this.state.editStatus) && <div className="rightPanelFooter categoryRightPanelFooter">
                  <button className="rightPanelBtn" onClick={() => this._componentStatus("_article")}>Next</button>
                </div>*/}
                {this.state.editStatus && <div className="rightPanelFooter categoryRightPanelFooter" onClick={() => (this.state.action) ? this.handleEditSubmit(this.state.ispublish) : this.ngsubmit(1)}>
                  <button className="rightPanelBtn" >Update & Publish</button>
                </div>}
                {(!this.state.editStatus) && <div className="rightPanelFooter xxxategoryRightPanelFooter" onClick={() => (this.state.action) ? this.handleEditSubmit(1) : this.ngsubmit(1)}>
                  <button className="rightPanelBtn" >Publish</button>
                </div>}
              </div>
            </div>
            <div className={"article-right-col-2" + (this.state.addarticle ? '' : ' d-none')}>
              <div className="articleRightPanelInnerPart">
                <div className="articleSettingRightPanel">
                  <div className="rightPanelHeader categoryRightPanelHeader">
                    <ul>
                      <li className="closingArticle" onClick={() => this._componentStatus("_article")} style={{ opacity: "0" }}>
                        <span className="circlebtn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                            <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                          </svg>
                        </span>
                      </li>
                      {/*<li className="help">
                        <span className="circlebtn">
                          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={29} viewBox="0 0 13 29">
                            <text id="_" data-name="?" transform="translate(0 23)" fill="#bebebe" fontSize={25} fontFamily="Roboto-Medium, Roboto" fontWeight={500}>
                              <tspan x={0} y={0}>?</tspan>
                            </text>
                          </svg>
                        </span>
                      </li> */}
                    </ul>
                  </div>
                  <div className="bodyRightPanel scrollbar articleBodyRightPanel">
                    <div className="rightPanelMain">
                      {/*<div className="profileImage">
                        <span className="image">
                          <img src={(user.length>0)?((user[0].data.imageUrl)?user[0].data.imageUrl:`${config.path}/images/profile.jpg`):`${config.path}/images/profile2.jpg`} alt="profile"  />
                        </span>
                        <div className="profileImageDetails">
                          <h5 className="card-title">{getname(user[0])}</h5>
                          <p className="card-body-text">{Dateformate(user[0].data.updatedOn)}</p>
                        </div>
                      </div>*/}
                      <div className="rightPanelCategroyDescriptionFeilds">
                        <div className="rightFeildsTitle br-btm-grey">
                          Pin This Article
                          <div className="float-right">
                            <span className="advanceSetting">
                              <label className="switch">
                                <input type="checkbox" name="pinstatus" value="1" checked={(this.state.pinstatus ? "checked" : "")} onChange={this._pinstaus} />
                                <span className="sliderCheckBox round" />
                              </label>
                            </span>
                          </div>
                        </div>
                        <div className="rightPanelFeilds descriptionFeilds">
                          <div className="rightFeildsTitle">
                            <img src={`${config.path}/images/icon/rightpanel/bottom.svg`} alt="" />
                            <span>Article To Be Published In <span>*</span></span>
                          </div>
                          <div className={'rightFeilds-no mb-3'}>
                            <div className={'wrapperInfo' + (submitted && !catId ? ' has-error' : '')}
                            >
                              <select className="customArrow md-select2" name="categoryid" onChange={this.handleChange}>
                                <option value="">Choose Category</option>
                                {categoryList}
                              </select>
                              {submitted && !catId &&
                                <div className="invalid-feedback">Category Name is required</div>
                              }
                            </div>
                          </div>
                          <div className={'rightFeilds-no mb-3'}>
                            <div className={'wrapperInfo' + (submitted && !folderId ? ' has-error' : '')}
                            >
                              {this.state.showgif && <span className="pree-loader"><img className="customgif" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}
                              <select className="customArrow md-select2" name="folderid" onChange={this._selectdata}>
                                <option value="">Select Folder</option>
                                {folderlist}
                              </select>
                              {submitted && !folderId &&
                                <div className="invalid-feedback">Folder Name is required</div>
                              }
                            </div>
                          </div>
                        </div>
                        <div className="rightPanelFeilds descriptionFeilds">
                          <div className="rightFeildsTitle">
                            <img src={`${config.path}/images/icon/rightpanel/right.svg`} alt="" />
                            <span>Visible To</span>
                          </div>
                          <div className="rightFeilds-no mb-3">
                            <div className="visibleTo">
                              <span name="users" className={allUsers ? 'selected' : ''}><input onChange={this.handlestatus} type="checkbox" name="userselect" value="1" checked={allUsers ? 'checked' : ''} />All Users</span>
                              {/* <span name="register" className={register ? 'selected' : ''}><input onChange={this.handlestatus} type="checkbox" name="userselect" value="2" checked={register ? 'checked' : ''} />Registered Users</span>
                              <span name="agent" className={agents ? 'selected' : ''}><input onChange={this.handlestatus} type="checkbox" name="userselect" value="3" checked={agents ? 'checked' : ''} />Agents</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="rightPanelFeilds descriptionFeilds seo-Optional">
                          <div className="rightFeildsTitle" onClick={() => this._stausshow('seo')}>
                            <img src={`${config.path}/images/icon/rightpanel/` + (seohide ? 'right.svg' : 'bottom.svg')} alt="" style={{ opacity: '1', position: 'relative', left: '0px', top: '-2px' }} />
                            <span style={{paddingLeft: '15px'}}>Advanced Settings</span>
                            {/* <span className="seoTitleDownLine">Enter Meta tags to optimize the
                  article in search engines.</span> */}
                          </div>
                          <div className={'rightFeilds-no pt-2' + (seohide ? ' d-none' : '')}>
                            {/* <label className="feildsLabelTitle">Enter Title Here </label> */}
                            <div className="md-form md-form-custom">
                              <div className="words-count">{this.state.metacount} characters</div>
                              <input type="text" id="inputMDEx1" maxLength={commonConstant.ArticlemetaCount} className="form-control" name="seotitle" value={seotitle} onChange={this._handleChange} />
                              <label htmlFor="inputMDEx1" className={(seotitle) ? 'active' : ''}>SEO Title </label>
                            </div>
                          </div>
                          <div className={'rightFeilds-no' + (seohide ? ' d-none' : '')}>
                              <div className="md-form md-form-custom my-3">
                                <div className="words-count">{this.state.metadesc} words</div>
                                <textarea id="form8" className="md-textarea form-control"
                                  rows="2" name="seodesc" value={seodesc} onChange={this._handleChange}></textarea>
                                <label htmlFor="form8" className={(seodesc)?'active':''}>SEO Description</label>
                              </div>
                              {/* <input type="text" placeholder="Additional Data"> */}
                          </div>
                          <div className={'rightFeilds-no pt-2' + (seohide ? ' d-none' : '')}>
                            {/* <label className="feildsLabelTitle">Meta Keywords - Seperate Kewords
                                                      With Commas</label> */}
                            <div className="md-form md-form-custom">
                              {/* <input type="text" id="inputMDEx" className="form-control" />
                                  <label htmlFor="inputMDEx">Meta Keywords - Seperate Kewords
                    With Commas</label> */}
                              <div className="input-tag">
                                <ul className="input-tag__tags">
                                  {tags.map((tag, i) => (
                                    <li key={tag} className="visibleTo mt-1">
                                      <span className="selected">
                                        {tag}
                                        <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                                      </span>
                                    </li>
                                  ))}
                                  <li className="input-tag__tags__input" style={{ "width": "100%" }}>


                                  </li>
                                  <input type="text" id="inputMDEx" disabled={(tags.length < 10)?'':'disabled'} className="md-textarea form-control" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} />
                                  <label htmlFor="inputMDEx" className={(tags.length > 0)?'activeselected':''}>SEO Meta Keywords<span className="seo-meta-p">(Type and press 'Enter' to add)</span></label>
                                </ul>

                              </div>
                            </div>
                            {/* <input type="text" placeholder="Additional Data"> */}
                          </div>
                          {/* <div className={'rightFeilds-no' + (seohide ? ' d-none' : '')}>
                            <label className="feildsLabelTitle">Enter Description</label>
                         
                            <textarea placeholder="Description"></textarea>
                          </div> */}
                          <div className={'rightFeilds-no pt-2' + (seohide ? ' d-none' : '')}>
                            <div className="md-form md-form-custom">
                              {/* <input type="text" id="inputMDEx" className="form-control" />
                                  <label htmlFor="inputMDEx">Meta Keywords - Seperate Kewords
                    With Commas</label> */}
                              <div className="input-tag"> 
                                <ul className="input-tag__tags">
                                  {lables.map((lable, i) => (
                                    <li key={lable} className="visibleTo mt-1 mb-1">
                                      <span className="selected">
                                        {lable}
                                        <button type="button" onClick={() => { this.removeLablesTag(i); }}>+</button>
                                      </span>
                                    </li>
                                  ))}
                                  <li className="input-tag__tags__input" style={{ "width": "100%" }}>
                                  </li>
                                  <input type="text" id="inputMDEx9" disabled={(lables.length < 10)?'':'disabled'} className="md-textarea form-control" onKeyDown={this.inputKeyLabelsDown} ref={c => { this.tagInputlabel = c; }} />
                                  <label htmlFor="inputMDEx9" className={(lables.length > 0)?'activeselected':''}>Labels (Type and press 'Space' to add)</label>
                                </ul>

                              </div>
                            </div>
                          </div>
                          <div className={'rightFeildsTitle' + (seohide ? ' d-none' : '')}>
                            <img src={`${config.path}/images/icon/rightpanel/right.svg`} alt="" />
                            <span>Other Conditions </span>
                          </div>
                          <div className={'rightFeilds-no mb-3' + (seohide ? ' d-none' : '')}>
                            <span className="checkBoxDesign">
                              <label className="containerCheckBox">
                                <input onChange={this.handlestatuspermission} type="checkbox" name={permission.indexOf(1)} value="1" checked={allowcomment ? 'checked' : ''} />
                                <span className="checkmark" />
                                <span className="title">Allow Comments</span>
                              </label>
                            </span>
                            <span className="checkBoxDesign">
                              <label className="containerCheckBox">
                                <input type="checkbox" id="chk2" name="permission" checked={allowvotes ? 'checked' : ''} onChange={this.handlestatuspermission} value="2" />
                                <span className="checkmark" />
                                <span className="title">Allow customer satisafaction votes
                    </span>
                              </label>
                            </span>
                            <span className="checkBoxDesign">
                              <label className="containerCheckBox">
                                <input type="checkbox" id="chk3" name="permission" checked={allowsharing ? 'checked' : ''} onChange={this.handlestatuspermission} value="3" />
                                <span className="checkmark" />
                                <span className="title">Allow sharing </span>
                              </label>
                            </span>
                          </div>
                        </div>
                        {/* <div className="rightPanelFeilds descriptionFeilds">
                          <div className="rightFeildsTitle">
                            <img src={`${config.path}/images/icon/rightpanel/right.svg`} alt="" />
                            <span>Lables </span>
                          </div> 
                          
                        </div> */}
                        {/* <div className="rightPanelFeilds descriptionFeilds apply-right-filter">
                          <div className="rightFeildsTitle">
                            <img src={`${config.path}/images/icon/rightpanel/right.svg`} alt="" />
                            <span>Other Conditions </span>
                          </div>
                          <div className="rightFeilds-no mb-3">
                            <span className="checkBoxDesign">
                              <label className="containerCheckBox">
                                <input onChange={this.handlestatuspermission} type="checkbox" name={permission.indexOf(1)} value="1" checked={allowcomment ? 'checked' : ''} />
                                <span className="checkmark" />
                                <span className="title">Allow Comments</span>
                              </label>
                            </span>
                            <span className="checkBoxDesign">
                              <label className="containerCheckBox">
                                <input type="checkbox" id="chk2" name="permission" checked={allowvotes ? 'checked' : ''} onChange={this.handlestatuspermission} value="2" />
                                <span className="checkmark" />
                                <span className="title">Allow customer satisafaction votes
                    </span>
                              </label>
                            </span>
                            <span className="checkBoxDesign">
                              <label className="containerCheckBox">
                                <input type="checkbox" id="chk3" name="permission" checked={allowsharing ? 'checked' : ''} onChange={this.handlestatuspermission} value="3" />
                                <span className="checkmark" />
                                <span className="title">Allow sharing </span>
                              </label>
                            </span>
                          </div>
                        </div> */}
                        <div className="rightPanelFeilds descriptionFeilds d-none">
                          <div className="rightFeildsTitle">
                            <img src={`${config.path}/images/icon/rightpanel/right.svg`} alt="" />
                            <span>Redirection ( 301 )</span>
                            <div className="float-right">
                              <span className="advanceSetting">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="sliderCheckBox round" />
                                </label>
                              </span>
                            </div>
                          </div>
                          <div className="rightFeilds-no mb-3">
                            {/* <label className="feildsLabelTitle">New URL</label> */}
                            <div className="md-form md-form-custom">
                              <input type="text" id="inputMDEx2" className="form-control" />
                              <label htmlFor="inputMDEx2">New URL</label>
                            </div>
                            {/* <input type="text" placeholder="Additional Data"> */}
                          </div>
                          <div className="rightFeilds-no mb-3">
                            {/* <label className="feildsLabelTitle">URL Here</label> */}
                            <div className="md-form md-form-custom">
                              <input type="text" id="inputMDEx3" className="form-control" />
                              <label htmlFor="inputMDEx3">URL Here</label>
                            </div>
                            {/* <input type="text" placeholder="Additional Data"> */}
                          </div>
                          <div className="rightFeilds-no mb-3">
                            {/* <label className="feildsLabelTitle">URL Here</label> */}
                            <div className="md-form md-form-custom">
                              <textarea id="form12" className="md-textarea form-control" rows={1} defaultValue={""} />
                              <label htmlFor="form12">URL Here</label>
                            </div>
                            {/* <textarea placeholder="Description"></textarea> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!this.state.addarticle && <div className="rightPanelFooter categoryRightPanelFooter" onClick={() => (this.state.action) ? this.handleEditSubmit(1) : this.ngsubmit(1)}>
                    <button className="rightPanelBtn" >Publish</button>
                  </div>}
                </div>
              </div>
            </div>

            <div className={"article-right-col-2" + (this.state.commentstatus ? '' : ' d-none')}>
              <div className="articleRightPanelInnerPart">
                <div className="articleSettingRightPanel">
                  <div className="rightPanelHeader categoryRightPanelHeader">
                    <ul>
                      <li className="closingArticle">
                        <span className="circlebtn" onClick={() => this._componentStatus("_comment")}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                            <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                          </svg>
                        </span>
                      </li>
                      <li className="help">
                        <span className="circlebtn">
                          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={29} viewBox="0 0 13 29">
                            <text id="_" data-name="?" transform="translate(0 23)" fill="#bebebe" fontSize={25} fontFamily="Roboto-Medium, Roboto" fontWeight={500}><tspan x={0} y={0}>?</tspan></text>
                          </svg>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bodyRightPanel scroll-2">
                    <div className="rightPanelMain">
                      <div className="applyFilter rightPanelHeadingnotLink">
                        <h4>Add Comments</h4>
                        <p className="note-text"><strong>Note</strong> : All comments are private to
                        the article version. Only agents can see these comments. To make a
                            public comment, please comment using the customer portal view.</p>
                      </div>
                      <div className="rightPanelCategroyDescriptionFeilds">
                        <div className="rightPanelFeilds descriptionFeilds rightPanelMessageChat">
                          <div className="commentHistory">
                            <span>Comment History</span>
                          </div>
                          <div className="rightPanelChatScreen">
                            <ul className="chatView">
                              <li className="recived">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="send">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="send">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" lt /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="send">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="recived">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="recived">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="recived">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>    
                                </div>
                              </li>
                              <li className="send">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                              <li className="recived">
                                <div className="text-message">
                                  <span className="userPic"><img src={`${config.path}/images/profile2.jpg`} alt="" /></span>
                                  <span className="userTimeDate">06 Oct 2019, 11:30
                                        AM</span>
                                  <span className="userText">Dear “ Name Here ”,
                                      Sed ut perspiciatis unde omnis iste natus error
                                      sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam.</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          {/*end chat message*/}
                          <div className="articleTypeChatMessage">
                            <div className="attachedIcon">
                              <span>
                                <img src={`${config.path}/images/icon/rightpanel/plus.svg`} alt="" />
                              </span>
                            </div>
                            <div className="typeMessage">
                              <textarea placeholder="Write..." defaultValue={""} />
                            </div>
                            <div className="snedMessage">
                              <span>
                                <img src={`${config.path}/images/icon/rightpanel/send.svg`} alt="" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightPanelFooter categoryRightPanelFooter">
                    <button className="rightPanelBtn">Publish</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="article-Right_menu">
  
              <div className="rightPanelRightMenu">
   
                <div className="rightPanelMenu">
                  <nav className="sidebar-nav sidebarTop-nav">
                    <ul className="sidebarnav">

                      <li>
                        <a onClick={() => this._componentStatus("_article")} className={(this.state.addarticle) ? 'selected' : ''}>
                          <span>
                            <svg id="_005-settings-gears" data-name="005-settings-gears"
                              xmlns="http://www.w3.org/2000/svg" width="25.143"
                              height="24.888" viewBox="0 0 25.143 24.888">
                              <path id="Path_1390" data-name="Path 1390"
                                d="M1.652,13.821a6.122,6.122,0,0,0,.548,1.3l-.661.833a.684.684,0,0,0,.051.906L2.728,18a.681.681,0,0,0,.906.051l.828-.655a6.016,6.016,0,0,0,1.351.572l.124,1.065a.682.682,0,0,0,.677.6h1.61a.682.682,0,0,0,.677-.6L9.02,18a6.085,6.085,0,0,0,1.448-.585l.8.634A.684.684,0,0,0,12.176,18l1.138-1.138a.681.681,0,0,0,.051-.906l-.623-.79a5.944,5.944,0,0,0,.6-1.424l.96-.111a.682.682,0,0,0,.6-.677v-1.61a.682.682,0,0,0-.6-.677l-.947-.111A5.983,5.983,0,0,0,12.78,9.15l.583-.736a.684.684,0,0,0-.051-.906L12.176,6.372a.681.681,0,0,0-.906-.051l-.715.566a6,6,0,0,0-1.481-.62l-.108-.925a.682.682,0,0,0-.677-.6H6.679a.682.682,0,0,0-.677.6l-.108.925a5.978,5.978,0,0,0-1.519.642L3.634,6.32a.684.684,0,0,0-.906.051L1.59,7.51a.681.681,0,0,0-.051.906l.62.785A5.868,5.868,0,0,0,1.6,10.622l-.993.113a.682.682,0,0,0-.6.677v1.61a.682.682,0,0,0,.6.677ZM7.486,9.465a2.662,2.662,0,1,1-2.662,2.662A2.666,2.666,0,0,1,7.486,9.465Z"
                                transform="translate(-0.001 -4.737)" fill="#e3e3e3" />
                              <path id="Path_1391" data-name="Path 1391"
                                d="M488.434,289.606l-.85-.717a.672.672,0,0,0-.9.024l-.469.44a4.848,4.848,0,0,0-1.252-.4l-.132-.647a.678.678,0,0,0-.718-.539l-1.109.094a.675.675,0,0,0-.618.65l-.022.658a4.868,4.868,0,0,0-1.195.628l-.561-.372a.674.674,0,0,0-.887.127l-.717.855a.672.672,0,0,0,.024.9l.491.523a5.03,5.03,0,0,0-.361,1.2l-.7.143a.678.678,0,0,0-.539.718l.094,1.109a.675.675,0,0,0,.65.618l.758.024a4.954,4.954,0,0,0,.537,1.025l-.423.639a.674.674,0,0,0,.127.887l.85.717a.672.672,0,0,0,.9-.024l.556-.521a4.871,4.871,0,0,0,1.141.372l.154.761a.678.678,0,0,0,.717.539l1.109-.094a.675.675,0,0,0,.618-.65l.024-.744a4.991,4.991,0,0,0,1.141-.577l.612.4a.674.674,0,0,0,.887-.127l.717-.85a.672.672,0,0,0-.024-.9l-.494-.523a4.856,4.856,0,0,0,.388-1.2l.674-.138a.678.678,0,0,0,.539-.717l-.094-1.109a.675.675,0,0,0-.65-.618l-.677-.022a4.9,4.9,0,0,0-.564-1.111l.37-.556A.671.671,0,0,0,488.434,289.606Zm-4.178,6.409a2.179,2.179,0,1,1,1.988-2.355A2.179,2.179,0,0,1,484.256,296.015Z"
                                transform="translate(-465.03 -280.125)"
                                fill="#e3e3e3" />
                              <path id="Path_1392" data-name="Path 1392"
                                d="M182.909,562.664a.674.674,0,0,0-.6.664l-.008.682a.672.672,0,0,0,.588.677l.5.065a3.889,3.889,0,0,0,.356.871l-.324.4a.673.673,0,0,0,.04.9l.477.488a.673.673,0,0,0,.9.062l.4-.31a3.94,3.94,0,0,0,.9.391l.054.518a.674.674,0,0,0,.664.6l.682.008a.672.672,0,0,0,.677-.588l.062-.491a4.051,4.051,0,0,0,.971-.378l.378.3a.672.672,0,0,0,.9-.04l.488-.477a.674.674,0,0,0,.062-.9l-.289-.375a3.912,3.912,0,0,0,.41-.944l.448-.046a.674.674,0,0,0,.6-.663l.008-.683a.672.672,0,0,0-.588-.677l-.437-.057a4.064,4.064,0,0,0-.37-.944l.272-.334a.673.673,0,0,0-.04-.9l-.477-.488a.673.673,0,0,0-.9-.062l-.326.251a3.959,3.959,0,0,0-.982-.426l-.043-.424a.674.674,0,0,0-.664-.6l-.682-.008a.672.672,0,0,0-.677.588l-.054.421a4.077,4.077,0,0,0-1.017.415l-.337-.275a.673.673,0,0,0-.9.04l-.491.48a.673.673,0,0,0-.062.9l.289.372a3.947,3.947,0,0,0-.386.944Zm4.4-.771a1.775,1.775,0,1,1-1.8,1.753A1.776,1.776,0,0,1,187.314,561.892Z"
                                transform="translate(-177.38 -543.791)"
                                fill="#e3e3e3" />
                            </svg>
                          </span>
                        </a>
                      </li>
                      {/* <li className="messageArticle">
                        <a onClick={() => this._componentStatus("_comment")}>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25.143"
                                height="29.062" viewBox="0 0 25.143 29.062">
                                <path id="Path_1591" data-name="Path 1591"
                                    d="M25.143,7.143A6.944,6.944,0,0,0,18.207.207H7.369C3.545.207,0,3.319,0,7.143v6.936c0,3.678,3.314,6.688,6.936,6.914V19.281a.433.433,0,1,1,.867,0v9.988s.845-4.5,2.553-6S13.75,21.015,17,21.015h1.206a6.944,6.944,0,0,0,6.936-6.936Z"
                                    transform="translate(0 -0.207)" fill="#e3e3e3" />
                            </svg>
                          </span>
                        </a>
                      </li> */}
                    </ul>
               
                  </nav>
                  <div className="helps" >
                    <div className="inner-help">
                      <button className="btn-help" onClick={() => this._componentStatus("_article")}>
                        <img src={`${config.path}/images/icon/rightpanel/` + (this.state.addarticle ? 'rightarrows.svg' : 'down.svg')} alt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>


    );
  }
}

function mapStateToProps(state) {
    const showComponent   = state.toogle;
    const authentication   = state.authentication;
    return {
        showComponent,authentication
    };
}

const connectedCreateArticles = connect(mapStateToProps)(CreateArticles);
export { connectedCreateArticles as CreateArticles }; 