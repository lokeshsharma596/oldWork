import React from 'react';
import { connect } from 'react-redux';
import Breadcumb from '../_layouts/breadcumb';
import { alertActions } from '../_actions/alert.actions';
import { Helpbutton } from '../_components/Helpbutton';
import { RightPanelhelp } from '../_layouts/RightPanelhelp';
import { CreateCategory } from '../_layouts/CreateCategory';
import { CreateFolder } from '../_layouts/CreateFolder';
import { CreateArticles } from '../_layouts/CreateArticles'
import Loader from '../_components/Loader'
import { userService } from '../_services';
import { commonConstant } from '../_constants';
import ModalComponents from '../_components/ModalComponents';
import InfiniteScroll from 'react-infinite-scroll-component';
import {sortableContainer, sortableElement,sortableHandle} from 'react-sortable-hoc';
import ReactTooltip from "react-tooltip";
import {Dateformate,getname} from '../_helpers/auth-header'
import {FilterCategory} from '../_layouts/FilterCategory'
import { Comment } from '../_layouts/Comment';
import bootstrap from "bootstrap";
import config from 'config';
import arrayMove from 'array-move';
//import arrayMove from 'array-move';
const DragHandle = sortableHandle(() =>   <span className="folder-manage"><svg xmlns="http://www.w3.org/2000/svg" width="14.979" height="19.972" viewBox="0 0 14.979 19.972"><g id="Group_1040" data-name="Group 1040" opacity="0.1"><path id="ic_more_vert_24px" d="M12.5,8.993A2.5,2.5,0,1,0,10,6.5,2.5,2.5,0,0,0,12.5,8.993Zm0,2.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,11.489Zm0,7.489a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,18.979Z" transform="translate(-10 -4)"></path><path id="ic_more_vert_24px-2" data-name="ic_more_vert_24px" d="M12.5,8.993A2.5,2.5,0,1,0,10,6.5,2.5,2.5,0,0,0,12.5,8.993Zm0,2.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,11.489Zm0,7.489a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,18.979Z" transform="translate(-0.014 -4)"></path></g></svg></span>);
class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deschide: false,
            visiblehide: false,
            seohide: false,
            listing: [],
            editFolderdata: [],
            checkmarkseo: [],
            checkmarkcat: [],
            showmodal: false,
            dropdown: false,
            loader: false,
            pagelimit: 10,
            offset: 0,
            total: 0,
            pagecount: 0,
            hasMore: true,
            movefolder: false,
            dropdownComponent: false,
            statemode: "",
            searchingShow: false,
            search: "",
            openshort: false,
            sort: '',
            success:false,
            filter:false,
            selectionStart:0,
            selectionEnd:0,
            userselect:[],
            filterdata:false,
            allUsers: false,
            register: false,
            agents: false,
            getresponse:false,


        };
        this.handlestatus = this.handlestatus.bind(this);
        this._handlesidebar = this._handlesidebar.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        localStorage.removeItem('catId');
        localStorage.removeItem('folderId');
        console.log(this.props.location.pathname)
        // if(this.props.match.params)
        // this.props.match.params.cayegoryName = this.props.match.path.replace("/","_")
        //this,
      //  this.componentDidMount = this.componentDidMount.bind(this);
      console.log(this.props.match.params)
    }
    _handlesidebar(type) {
        const { dispatch } = this.props;
        if (type == 1)
            dispatch({ type: 'CategoryToggle' })
        else if (type == 2)
            dispatch({ type: 'FolderToggle' })
        else
            dispatch({ type: 'ArticleToggle' })
        this.setState({ dropdownComponent: false })

    }
    
    // componentWillMount() {
    //     document.addEventListener('click', this.handleOutsideClick, false);
    // }

    // componentWillUnmount(){
    //     document.removeEventListener('click', this.handleOutsideClick, false);
    // }
    
    onSortEnd = ({oldIndex, newIndex,collection}) => {
        console.log(oldIndex)
        console.log(newIndex)
        console.log(collection)
        console.log(this.state.listing.length)
        console.log(this.state.listing[oldIndex].position);
        console.log(this.state.listing[newIndex].position);
        console.log(this.state.listing);
        let positions=0;
        if(oldIndex == newIndex)
        return false;
        if(oldIndex > newIndex){
          let secondposition = (this.state.listing[newIndex-1].pinStatus ||  (newIndex == 0))?(parseFloat(this.state.listing[newIndex].position)+100):this.state.listing[newIndex-1].position;
          if(this.state.listing[newIndex].pinStatus)
               return false;
               positions = (parseFloat(this.state.listing[newIndex].position) + parseFloat(secondposition))/2;
        }
        if(oldIndex < newIndex){
           let secondposition = ((newIndex == (this.state.listing.length -1)))?(parseFloat(this.state.listing[newIndex].position)-100):this.state.listing[newIndex+1].position;

               positions = (parseFloat(this.state.listing[newIndex].position) + parseFloat(secondposition))/2;
        }
        this.state.listing[oldIndex].position=positions;
        this.setState(({listing}) => ({
            listing: arrayMove(listing, oldIndex, newIndex),
          })); //return false;
    //     let articleId = oldIndex.split('@');
    //    // let position =  newIndex.split('@'); return false;
    //     let total = 0
    //     if(parseFloat(articleId[1]) < parseFloat(position[1])) {
    //     if(parseFloat(position[3]) == 100)
    //     total = parseFloat(position[1])+parseFloat(position[1])+parseFloat(position[3]);
    //     else
    //     total = parseFloat(position[1])+parseFloat(position[3]);
    //     }
    //     else{
    //     total = parseFloat(position[1])+parseFloat(position[2]);
    //     }
        userService.reorderArticle(this.state.listing[oldIndex].id,parseFloat(positions))
        .then(response => response.json())
        .then(data => { 
           console.log(data)
        });
      };

    // componentDidMount() {
    //     this.loadItems()
    //  }
    
    // componentDidMount() {
        
    //     this.loadItems()
    //     console.log("dsdssd");
    //  }
    componentDidMount=()=> {
        this.setState({offset:0})
        this.setState({listing:[]})
        this.setState({hasMore:true})
          this.loadItems()
     }
    
  
 
     loadItems(){
         //this.setState({ loader:!this.state.loader })
         const { dispatch } = this.props;
         const folderId = (this.props.match.params.id)?this.props.match.params.id:this.props.match.params.cayegoryName;
         if(this.state.offset == 0)
          this.setState({loader:true});
         userService.getAllArticle(this.state,folderId)
         .then(response => response.json())
         .then(datas => { 
            // if(this.state.offset == 0)
            //     dispatch(alertActions.apimessage(datas.message));
             //   this.setState({ listing:datas.data })
             //console.log(JSON.stri(datas.data));
             //this.state.listing.push(datas.data)
             this.setState({
                 listing: this.state.listing.concat(datas.data)
             });
            
             if(datas.total == this.state.listing.length)
             this.setState({ hasMore:false })
             this.setState({ total:datas.total })
             this.setState({ pagecount:datas.count })
             this.setState({success:true})
             this.setState({loader:false});
             this.setState({getresponse:true})
             if(this.state.listing.length == 0 && !this.state.search)
              this._handlesidebar();
         //  this.setState({ loader:!this.state.loader })
             this.setState({offset:this.state.offset + 1});
         });
      }

    handlestatus(e) {
        const checkmarkcat = this.state.checkmarkcat
        const checkmarkseo = this.state.checkmarkseo
        let index, indexseo;

        if (event.target.checked) {
            checkmarkcat.push(event.target.value)
            checkmarkseo.push(event.target.id)
        }
        else {
            index = checkmarkcat.indexOf(event.target.value)
            checkmarkcat.splice(index, 1)
            indexseo = checkmarkseo.indexOf(event.target.id)
            checkmarkseo.splice(indexseo, 1)
        }
        this.setState({ checkmarkcat: checkmarkcat })
        this.setState({ checkmarkseo: checkmarkseo })
    }

    editArticle(articleId) {
        const { dispatch } = this.props;
        this.setState({ loader: !this.state.loader })
        /*   if(!this.props.showComponent.isfolderOpen)
          dispatch({ type: 'FolderToggle' }) */
        userService.geteditArticle(articleId)
            .then(response => response.json())
            .then(datas => {
                this.setState({getresponse:false});
                this.setState({ loader: !this.state.loader })
                dispatch({ type: 'ArticleToggle' })
                this.setState({ editFolderdata: datas.data })

            });

    }

    // componentDidMount() {
    //     userService.getAll()
    //     .then(response => response.json())
    //     .then(datas => this.setState({ listing:datas.data }));
    // }
    closemove = () => {
        this.setState({
            movefolder: !this.state.movefolder
        });
    };

    closearticle = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'ArticleToggle' })
    };

    showmovefolder() {
        if (this.state.checkmarkcat.length > 0) {
            this.setState({ movefolder: !this.state.movefolder })
            this.setState({ dropdown: !this.state.dropdown })
        }
        else {
            alert("Please select atleast Article");
            this.setState({ dropdown: !this.state.dropdown })
        }
    }


    selectall(e) {
        const array = this.state.listing;
        const checkmarkcat = this.state.checkmarkcat
        const checkmarkseo = this.state.checkmarkseo
        if (event.target.checked) {
            array.forEach(element => {
                checkmarkcat.push(element.id)
                checkmarkseo.push(element.det[0].id)
            });
            this.setState({ checkmarkcat: checkmarkcat })
            this.setState({ checkmarkseo: checkmarkseo })
        }
        else {
            this.setState({ checkmarkcat: [] })
            this.setState({ checkmarkseo: [] })
        }
    }

    modalstatus = (type=null) => {
        this.setState({ statemode: type });
        this.setState({ showmodal: !this.state.showmodal })
        this.setState({ dropdown: false })
    }

    ngsubmit() {
        this.setState({getresponse:false});
        if (this.state.checkmarkcat.length == 0) {
            this.setState({ showmodal: !this.state.showmodal })
            alert("Please select atleast one folder.");
        } else {
            this.setState({ loader: !this.state.loader })
            userService.deleteArticle(this.state.checkmarkcat, this.state.checkmarkseo)
                .then((response) => {
                    if (response.status == 200) {
                      
                        this.setState({ showmodal: !this.state.showmodal })
                        this.setState({ loader: !this.state.loader })
                        this.componentDidMount();
                    }

                })
        }

    }
    ngpublish() {
        const { dispatch } = this.props;
        if (this.state.checkmarkcat.length == 0) {
            alert("Please select atleast one article.");
        } else {
            this.setState({getresponse:false});
            this.setState({ dropdown: !this.state.dropdown })
            this.setState({ loader: !this.state.loader })
            userService.publishArticle(this.state.checkmarkcat, this.state.checkmarkseo)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response);
                        const { dispatch } = this.props;
                        this.setState({ loader: !this.state.loader })
                        this.setState({ checkmarkcat: [] })
                         this.setState({ checkmarkseo: [] })
                         dispatch(alertActions.apimessage(response.message));
                         setTimeout(() => {
                             dispatch(alertActions.clear());
                         }, 3000)
                         this.componentDidMount();
                    }

                })
        }

    }

    handleDropdown = (type) => {
        if (type == "componentShow")
            this.setState({ dropdownComponent: !this.state.dropdownComponent })
        else
            this.setState({ dropdown: !this.state.dropdown })
    }

    handlePageChange = (page, e) => {
        this.setState({ offset: page - 1 })
        setTimeout(() => {
            this.componentDidMount();
        }, 500)
    };
    
    handleKeyUp = (e) => {
        this.setState({ search: e.target.value });
        this.setState({ offset: 0 })
        setTimeout(() => {
            if(!this.state.search)
            this.componentDidMount();
            }, 100);
    }

    sorting = (type) => {
        this.setState({ sort: type });
        if(type == this.state.sort)
        this.setState({ sort: "" });
        this.setState({ loader: !this.state.loader })
        this.handlesortDropdown();
        this.setState({getresponse:false});
        setTimeout(() => {
            this.setState({ loader: !this.state.loader })
            this.componentDidMount()
        }, 100);
    }
    handlesortDropdown = e => {
        this.setState({ openshort: !this.state.openshort })
    }

    searching = () => {
        this.setState({ searchingShow: !this.state.searchingShow })
    }

    closeSearch = () => {
        this.setState({ searchingShow: false })
    }
    handleOutsideClick(event) {
        if (!this.refs.megaMenu.contains(event.target)) {
            this.setState({
                dropdown: false
            });
        }
        if (!this.refs.addMenu.contains(event.target)) {
            this.setState({
                dropdownComponent: false
            });
        }
        if (!this.refs.sortdrop.contains(event.target)) {
            this.setState({
                openshort: false
            });
        }
    }
    
   
  

    filterManage=()=> {
        this.setState({filter:!this.state.filter});
    }
    setdata=(val)=>{
        this.setState({getresponse:false});
        this.setState({selectionStart:val.selectionStart})
        this.setState({selectionEnd:val.selectionEnd})
        this.setState({userselect:val.userselect})
        this.setState({filter:!this.state.filter});
        this.setState({allUsers:val.allUsers})
        this.setState({register:val.register})
        this.setState({agents:val.agents});
        this.setState({filterdata:!this.setState.filterdata});
        setTimeout(() => {
            this.componentDidMount();
        }, 500)
       
    }
    resetform=()=>{
        this.setState({getresponse:false});
        this.setState({userselect:[]});
        this.setState({allUsers:false});
        this.setState({register:false});
        this.setState({agents:false});
        this.setState({selectionStart:0});
        this.setState({selectionEnd:0});
        this.setState({filter:!this.state.filter});
        setTimeout(() => {
            this.componentDidMount();
        }, 500)
        
    }
    commentshow=(id)=>{
        const { dispatch } = this.props;
        this.setState({loader:!this.state.loader})
        userService.comment(id)
        .then(response => {
            if(response.status == 200)
            {   
                this.setState({loader:!this.state.loader})
                dispatch({ type: 'CommentToggle' })
                this.setState({comment:response.data})
                
                
            }
        })
        //alert(id)
    }
    
    // openComment=()=>{
    //     const { dispatch } = this.props;
    //     dispatch({ type: 'CommentToggle' })
    // }



    render() {
        const { loggingIn } = this.props;
        const {user}   =this.props.authentication;
        const data = this.state.listing;
        const datas = this.state.editFolderdata;
        const checkedstatus = this.state.checkmarkcat;
        const dropDown = this.state.dropdown;
        const dropMenu = dropDown ? 'dropdown-menu show' : 'dropdown-menu';
        const dropMenuComponent = this.state.dropdownComponent ? 'dropdown-menu show' : 'dropdown-menu';
        const loader = <Loader />;
        const addurl= (this.props.match.params.folderName)?('category/'+encodeURIComponent(`${this.props.match.params.folderName}`).replace(/%3F/g, "-")+`-${this.props.match.params.catId}`):'';
        const SortableItem = sortableElement(({value, sortIndex}) => (
            <div className="makeinFolder makefolder-bg custome-table k-flex responsiveDesign phone-Responsive-Design article-row" tabIndex={value.id}>
            <div className="makefolder-col makeinFolder-col-0">
            {!value.pinStatus && this.props.location.pathname != "/article/allpublish" && this.props.location.pathname != "/article/alldrafts" && this.props.location.pathname != "/article/allarticle" && <DragHandle/>}
                    <div className={(checkedstatus.indexOf(value.id) > -1?"folder-checkBox":"folder-checkBox")}>
                            <label className={'containerCheckBox' + (checkedstatus.indexOf(value.id) > -1?" containerafterchecked":"")}>
                                <input type="checkbox" value={value.id} id={value.det[0].id} onChange={this.handlestatus} checked={(checkedstatus.indexOf(value.id) > -1?"checked":"")} data-track="select article"/>
                                <span className="checkmark"></span>
                            </label>
                    </div>
                    <span className="icon-Pagetitle"><svg xmlns="http://www.w3.org/2000/svg" width="19.585" height="23.083" viewBox="0 0 19.585 23.083">
                        <g id="Group_1914" data-name="Group 1914" transform="translate(-627 -538.041)">
                            <path id="Path_1930" data-name="Path 1930" d="M702.706,539h-3.358l-.008,6.158,6.192-.008h.1v-3.225A2.923,2.923,0,0,0,702.706,539Z" transform="translate(-59.045 -0.959)" fill="#c2cbf0"/>
                            <path id="Path_1931" data-name="Path 1931" d="M643.725,553.518l-4.549.006.006-4.524H629.148A2.147,2.147,0,0,0,627,551.149v16.016a2.147,2.147,0,0,0,2.148,2.148h12.5a2.147,2.147,0,0,0,2.148-2.148V553.518Zm-8.033,10.326H630.32v-1.172h5.371Zm5.371-2.344H630.32v-1.172h10.742Zm0-2.539H630.32v-1.172h10.742Z" transform="translate(0 -8.188)" fill="#c2cbf0"/>
                        </g>
                        </svg>
                     </span>
            </div>
                    <div className="makefolder-col makeinFolder-col-1">
                        <div className="folder-name cursor-pointer" onClick={() => this.editArticle(value.id,value.det[0].id)} id={value.id} seoid={value.det[0].id}>
                            <h6 className="card-title" data-tip data-for={value.id}>{value.name}</h6>
                            <ReactTooltip place="right" type="dark" id={value.id} effect="float" delayShow={1000}>
                                <span className="toggle-custome-react">
                                    <ul>
                                        <li><span>Category Name</span>{value.category[0].name}</li>
                                        <li><span>Folder Name</span>{value.folders[0].name}</li>
                                        <li><span>Article Name</span>{value.name}</li>
                                        <li><span>Created On</span>{Dateformate(value.folders[0].createdON)}</li>
                                        <li><span>Last Edited </span>{Dateformate(value.folders[0].updatedOn)}</li>
                                        {/* <li><span>Folder Name</span>Folder Name</li> */}
                                    </ul>
                                </span>
                            </ReactTooltip>
                            <p className="card-body-text">Last Edited by {getname(user[0])}, {Dateformate(value.updatedOn)}</p>
                        </div>
                    </div>
                    <div className="makefolder-col makeinFolder-col-2">
                        <div className="folder-user-image-Name k-flex">
                            <div className="user-image">
                                <img src={(user.length>0)?((user[0].data.imageUrl)?user[0].data.imageUrl:`${config.path}/images/profile.jpg`):`${config.path}/public/images/profile.jpg`} />
                            </div>
                            <div className="user-Name">
                                <h6 className="card-title">{getname(user[0])}</h6>
                                <p className="card-body-text">Created On {Dateformate(value.createdON)}</p>
                            </div>
                            { (value.Ispublish == 0) && <div className="folder-Right-btn">
                                <button className="btn-K lightBtn f-14">Draft</button>
                            </div>}
                        </div>
                    </div>
                    <div className="makefolder-col makeinFolder-col-3">
                        <div className="makefolder-user-Feedback-list k-flex">
                            <div className="makefolder-list-left ps-relative article-list-icon">
                            
                                {(value.Ispublish == 1) && <div className="userFeedBackView makefolder-list-icon">

                                    <ul>
                                    {(value.Ispublish == 1 && value.pinStatus)?<li>
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                                    <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                        <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                        <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                        <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                                    </g>
                                                </svg>
                                            </span>
                                        </li>:""}
                                        {(value.Ispublish == 1) && <li>
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.969" height="12.934" viewBox="0 0 18.969 12.934">
                                                    <path id="ic_visibility_24px" d="M10.485,4.5A10.2,10.2,0,0,0,1,10.967a10.189,10.189,0,0,0,18.969,0A10.2,10.2,0,0,0,10.485,4.5Zm0,10.778A4.311,4.311,0,1,1,14.8,10.967,4.313,4.313,0,0,1,10.485,15.278Zm0-6.9a2.587,2.587,0,1,0,2.587,2.587A2.583,2.583,0,0,0,10.485,8.38Z" transform="translate(-1 -4.5)" fill="#a2abd1" />
                                                </svg>
                                                <span>{(value.viewCount)?value.viewCount:0}</span>
                                            </span>
                                        </li>}
                                        {(value.Ispublish == 1) && <li>
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21.413" height="19.467" viewBox="0 0 21.413 19.467">
                                                    <path id="ic_thumb_down_24px" d="M14.627,3H5.867A1.934,1.934,0,0,0,4.076,4.187L1.136,11.05A1.923,1.923,0,0,0,1,11.76v1.859l.01.01L1,13.707a1.952,1.952,0,0,0,1.947,1.947H9.088L8.164,20.1l-.029.311a1.465,1.465,0,0,0,.428,1.032l1.032,1.022,6.414-6.414a1.935,1.935,0,0,0,.565-1.372V4.947A1.952,1.952,0,0,0,14.627,3ZM18.52,3V14.68h3.893V3Z" transform="translate(22.413 22.467) rotate(180)" fill="#a2abd1" />
                                                </svg>
                                                <span>{(value.upvoteCount)?value.upvoteCount:0}</span>
                                            </span>
                                        </li>}
                                        {(value.Ispublish == 1) && <li>
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21.413" height="19.467" viewBox="0 0 21.413 19.467">
                                                    <path id="ic_thumb_down_24px" d="M13.627,19.467H4.867a1.934,1.934,0,0,1-1.791-1.187L.136,11.417A1.923,1.923,0,0,1,0,10.707V8.848l.01-.01L0,8.76A1.952,1.952,0,0,1,1.947,6.813H8.088L7.164,2.365l-.029-.311a1.465,1.465,0,0,1,.428-1.032L8.595,0l6.414,6.414a1.935,1.935,0,0,1,.565,1.372V17.52A1.952,1.952,0,0,1,13.627,19.467Zm3.893,0V7.787h3.893v11.68Z" transform="translate(21.413 19.467) rotate(180)" fill="#a2abd1" />
                                                </svg>
                                                <span>{(value.downvoteCount)?value.downvoteCount:0}</span>
                                            </span>
                                        </li>}
                                        {(value.Ispublish == 1) && <li onClick={()=>this.commentshow(value.id)}>
                                            <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17.592" height="17.592" viewBox="0 0 17.592 17.592">
                                            <path id="Icon_feather-message-circle" data-name="Icon feather-message-circle" d="M22.092,12.807a8.19,8.19,0,0,1-.88,3.714,8.307,8.307,0,0,1-7.428,4.593,8.19,8.19,0,0,1-3.714-.88L4.5,22.092l1.857-5.571a8.19,8.19,0,0,1-.88-3.714A8.307,8.307,0,0,1,10.071,5.38a8.19,8.19,0,0,1,3.714-.88h.489a8.288,8.288,0,0,1,7.819,7.819Z" transform="translate(-4.5 -4.5)" fill="#a2abd1"/>
                                            </svg>
                                            <span>{(value.commentCount)?value.commentCount:0}</span>
                                            </span>
                                        </li>}
                                    </ul>
                                </div>}
                            </div>
                            <div className="makefolder-list-right">
                                <div className="userUpdates makefolder-list-icon makefolder-edit-view-icon">
                                    <ul>
                                    <li onClick={() => this.editArticle(value.id,value.det[0].id)} id={value.id} seoid={value.det[0].id} data-track="edit article">
                                            <span className="icon edit-record">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17.734" height="17.734" viewBox="0 0 17.734 17.734">
                                                    <path id="ic_edit_24px" d="M3,17.037v3.694H6.694L17.589,9.836,13.895,6.142ZM20.445,6.98a.981.981,0,0,0,0-1.389L18.14,3.286a.981.981,0,0,0-1.389,0l-1.8,1.8,3.694,3.694,1.8-1.8Z" transform="translate(-3 -2.997)" fill="#64b5f6" />
                                                </svg>
                                            </span>
                                        </li>
                                        {(value.Ispublish == 1) && <li>
                                            <a className="icon" href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}article/`+encodeURIComponent(`${value.name.replace(/ /g, "-")}`).replace(/%3F/g, "-")+`-${value.id}`} target="_blank" data-track="preview article">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.941" height="18.941" viewBox="0 0 18.941 18.941">
                                                    <g id="Group_1539" data-name="Group 1539" transform="translate(0.4 0.4)">
                                                        <path id="Path_1524" data-name="Path 1524" d="M162.891,0h-4.71a.472.472,0,1,0,0,.945h3.577l-9.189,9.277a.472.472,0,1,0,.671.665l9.179-9.266V5.182a.472.472,0,1,0,.945,0V.472A.472.472,0,0,0,162.891,0Zm0,0" transform="translate(-145.223)" fill="#a2abd1" stroke="#64b5f6" strokeWidth="0.8" />
                                                        <path id="Path_1525" data-name="Path 1525" d="M15.313,57.641a.472.472,0,0,0-.472.472v5.173A1.419,1.419,0,0,1,13.423,64.7H2.362A1.419,1.419,0,0,1,.945,63.286V52.225a1.419,1.419,0,0,1,1.417-1.417H7.535a.472.472,0,1,0,0-.945H2.362A2.365,2.365,0,0,0,0,52.225V63.286a2.365,2.365,0,0,0,2.362,2.362H13.423a2.365,2.365,0,0,0,2.362-2.362V58.113A.472.472,0,0,0,15.313,57.641Zm0,0" transform="translate(0 -47.508)" fill="#a2abd1" stroke="#64b5f6" strokeWidth="0.8" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
  ));
const SortableContainer = sortableContainer(({children}) => {
    return <div className="row tracks"><div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >{children}</div></div>;
  });
        return (
            <div className={'page-wrapper' + (this.props.showComponent.isOpen ? ' sidebar-collapse' : '')}>
                {this.state.loader && <Loader />}
                {(this.props.showComponent.ishelpOpen || this.props.showComponent.iscategoryOpen || this.props.showComponent.isfolderOpen || this.state.showmodal || this.state.movefolder || this.props.showComponent.isarticleOpen) && <div className="shadow">&nbsp;</div>}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                        <Breadcumb bredcumb={(this.props.match.params)?this.props.match.params:'settings'}/>
                        {this.state.showmodal && <ModalComponents closemodal={()=>this.modalstatus("close")} modalsuccess={this.ngsubmit.bind(this)} statemode={this.state.statemode} />}

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="category-body pt-4">
                                    <div className="category-tiles">
                                        <div className="category-header k-flex">
                                            <div className="categoryHeaderLeft">
                                                <ul>
                                                    <li>
                                                        <span className="main-checkbox-all">
                                                            <label className="containerCheckBox containerafterchecked" data-track="select article                   ">
                                                                <input type="checkbox" onChange={this.selectall.bind(this)}/>
                                                                    <span className="checkmark"></span>
                                                            </label>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <a className="btnWhite btnWhite-hover dropdown icon-with-text" href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}`+addurl} target="_blank">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18.941"
                                                                height="18.941" viewBox="0 0 18.941 18.941">
                                                                <g id="Group_1790" data-name="Group 1790"
                                                                    transform="translate(0.4 0.4)">
                                                                    <path id="Path_1524" data-name="Path 1524"
                                                                        d="M162.891,0h-4.71a.472.472,0,1,0,0,.945h3.577l-9.189,9.277a.472.472,0,1,0,.671.665l9.179-9.266V5.182a.472.472,0,1,0,.945,0V.472A.472.472,0,0,0,162.891,0Zm0,0"
                                                                        transform="translate(-145.223)" fill="#eff3ff"
                                                                        stroke="#a2abd1" strokeWidth="0.8" />
                                                                    <path id="Path_1525" data-name="Path 1525"
                                                                        d="M15.313,57.641a.472.472,0,0,0-.472.472v5.173A1.419,1.419,0,0,1,13.423,64.7H2.362A1.419,1.419,0,0,1,.945,63.286V52.225a1.419,1.419,0,0,1,1.417-1.417H7.535a.472.472,0,1,0,0-.945H2.362A2.365,2.365,0,0,0,0,52.225V63.286a2.365,2.365,0,0,0,2.362,2.362H13.423a2.365,2.365,0,0,0,2.362-2.362V58.113A.472.472,0,0,0,15.313,57.641Zm0,0"
                                                                        transform="translate(0 -47.508)" fill="#eff3ff"
                                                                        stroke="#a2abd1" strokeWidth="0.8" />
                                                                </g>
                                                            </svg>
                                                            <span className="pl-2">View Help Portal</span>
                                                        </a>
                                                    </li>
                                                
                                                            <li>
                                                                <a className="btnWhite btnWhite-hover dropdown icon-with-text" style={{color: "#A2ABD1"}} onClick={() => this.modalstatus("delete")} data-track="delete">
                                                                        <span className="icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18">
                                                                                <path id="ic_delete_24px" d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z" transform="translate(-5 -3)" fill="#a2abd1"/>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="pl-2">
                                                                            Delete
                                                                        </span>
                                                                </a>
                                                            </li>
                                                                {(this.props.location.pathname != "/article/allpublish") && <li>
                                                                    <a className="btnWhite btnWhite-hover dropdown icon-with-text" style={{color: "#A2ABD1"}} onClick={this.ngpublish.bind(this)} data-track="publish">
                                                                        <span className="icon">
                                                                            <i className="icon customicon-launch"></i>
                                                                        </span>&nbsp;
                                                                        <span className="pl-2">
                                                                            Publish
                                                                    </span>
                                                                    </a>
                                                                </li>}
                                                   {/*} <li className="ps-relative" ref="megaMenu">
                                                        <button className="btnWhite dropdown"
                                                        data-toggle="dropdown">Manage</button>
                                                        <div className={'navbarDropdown navbarDropdown-left dropdown-menu-left dropdown-menu top10'}
                                                            aria-labelledby="navbarDropdown1" style={{'transform':'initial', 'right':'auto'}}>
                                                            <ul>
                                                            {(this.state.checkmarkcat.length > 0) && <li className="folderClick">
                                                                    <a className="btnWhite dropdown icon-with-text" onClick={() => this.modalstatus("delete")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-delete"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Delete
                                                                    </span>
                                                                    </a>
                                                                </li>}
                                                                {/* <li>
                                                                    <a className="dropdown-item" onClick={() => this.showmovefolder()}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-move-to"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Move To
                                                                    </span>
                                                                    </a>
                                                                </li> 
                                                               <li>
                                                                    <a className="dropdown-item" onClick={this.ngpublish.bind(this)}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-launch"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Publish
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>*/}
                          
                                                </ul>
                                            </div>
                                            <div className="categoryHeaderRight">
                                                <ul>
                                                <li className="d-xs-none"> {this.state.searchingShow ? <span className="gridTileOption searchFocuse">
                                                        <input type="text" placeholder="Search for Article" onChange={this.handleKeyUp} />
                                                        <span className="searchValues" onClick={this.closeSearch}><svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                                            height="17.49" viewBox="0 0 17.49 17.49">
                                                            <path id="ic_zoom_out_24px"
                                                                d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                                                transform="translate(-3 -3)" fill="#a2abd1" />
                                                        </svg></span>
                                                        <span className="click-Search-cat" onClick={this.componentDidMount}>Search</span>
                                                    </span> : <span className="gridTileOption" onClick={this.searching} data-track="search">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                                                height="17.49" viewBox="0 0 17.49 17.49">
                                                                <path id="ic_zoom_out_24px"
                                                                    d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                                                    transform="translate(-3 -3)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>}


                                                    </li>
                                                    <li ref="sortdrop" className="ps-relative">
                                                    {(this.state.sort)?<span className="tooltipCustome"><span className="light-text-tooltip">Sort
                                                            By : </span><span className="bold-text-tooltip">{(this.state.sort == 'createdON')?'Date Created':(this.state.sort == 'updatedOn')?'Last Edited':(this.state.sort == 'name')?'Alphabetically':(this.state.sort == 'viewCount')?'View Count':(this.state.sort == 'downvoteCount')?'Downvote Count':(this.state.sort == 'upvoteCount')?'Upvote Count':''}
                                                        </span></span>:''}
                                                        <span className={'gridTileOption dropdown '+ (this.state.sort ? 'selected' : '')} data-toggle="dropdown" data-track="sort">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                                                                <path id="ic_sort_24px" d="M3,18H9V16H3ZM3,6V8H21V6Zm0,7H15V11H3Z" transform="translate(-3 -6)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>
                                                        <div className={'navbarDropdown dropdown-menu dropdown-menu-right top10 sortdropdown '}
                                                            aria-labelledby="navbarDropdown1" style={{transform: 'inherit', left: 'auto' }}>
                                                            <ul>
                                                            <li>
                                                                    <a className={'dropdown-item '+  ((this.state.sort=='createdON') ? 'selected' : '')} value="createdON" onClick={() => this.sorting("createdON")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-date-range"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Date Created
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className={'dropdown-item '+  ((this.state.sort=='updatedOn') ? 'selected' : '')} value="updatedOn" onClick={() => this.sorting("updatedOn")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-latest-edited"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Latest Edited
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className={'dropdown-item '+  ((this.state.sort=='name') ? 'selected' : '')} value="name" onClick={() => this.sorting("name")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-alphabetical"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Alphabetical
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                <a className={'dropdown-item '+  ((this.state.sort=='viewCount') ? 'selected' : '')} value="viewCount" onClick={() => this.sorting("viewCount")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-view" />
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            No. Of Views
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                <a className={'dropdown-item '+  ((this.state.sort=='upvoteCount') ? 'selected' : '')} value="upvoteCount" onClick={() => this.sorting("upvoteCount")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-upvotes" />
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Upvotes
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                <a className={'dropdown-item '+  ((this.state.sort=='downvoteCount') ? 'selected' : '')} value="name" onClick={() => this.sorting("downvoteCount")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-downvotes" />
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Downvotes
                                                                         </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li onClick={this.filterManage} >
                                                    <span className={'gridTileOption search ' + ((this.state.selectionStart > 0 && this.state.selectionEnd > 0)?'selected':'')} data-track="filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22.674" height="20.899" viewBox="0 0 22.674 20.899">
                                                                <path id="Path_1489" data-name="Path 1489" d="M22.608,10.077a.687.687,0,0,0-.622-.394H.687a.687.687,0,0,0-.53,1.124l8.188,9.931V29.9a.687.687,0,0,0,.992.616l4.6-2.28a.687.687,0,0,0,.382-.615l.009-6.878,8.188-9.931A.687.687,0,0,0,22.608,10.077Zm-9.5,9.977a.687.687,0,0,0-.157.436l-.009,6.7-3.226,1.6v-8.3a.687.687,0,0,0-.157-.437l-7.418-9H20.529Z" transform="translate(0 -9.683)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>
                                                    </li>
                                                    <li ref="addMenu" className="mobile-add-btn">
                                                        <span className="split-btn">
                                                            <button className="splitBtn split-btn-left dropdown" onClick={() => this._handlesidebar(commonConstant.ARTICLE_TYPE)}>+ New article</button>
                                                            <button className="splitBtn split-btn-right dropdown" data-toggle="dropdown" onClick={() => this.handleDropdown("componentShow")}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.918" height="6.459" viewBox="0 0 12.918 6.459">
                                                                    <g id="down-arrow" transform="translate(0 -53.333)">
                                                                        <g id="Group_1893" data-name="Group 1893" transform="translate(0 53.333)">
                                                                        <g id="Group_1892" data-name="Group 1892">
                                                                            <path id="Path_1737" data-name="Path 1737" d="M0,53.333l6.459,6.459,6.459-6.459Z" transform="translate(0 -53.333)" fill="#fff"/>
                                                                        </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <span className="mobile-pluse">
                                                                    <svg id="plus" xmlns="http://www.w3.org/2000/svg" width="23.771" height="23.771" viewBox="0 0 23.771 23.771">
                                                                        <g id="Group_3239" data-name="Group 3239">
                                                                            <path id="Path_2553" data-name="Path 2553" d="M13.369,10.4V0H10.4V10.4H0v2.966H10.4v10.4h2.966v-10.4h10.4V10.4Z" fill="#fff"/>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                            <div className={`navbarDropdown dropdown-menu-right dropdown-menu top10 `}
                                                                aria-labelledby="navbarDropdown1">
                                                                <ul>
                                                                    <li className="mobile-show">
                                                                        <a className="dropdown-item" onClick={() => this._handlesidebar(commonConstant.ARTICLE_TYPE)}>
                                                                            <span className="icon">
                                                                                <span
                                                                                    className="icon customicon-article"></span>
                                                                            </span>
                                                                            <span className="preview-item-content">
                                                                                Article
                                                                        </span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="folderClick">
                                                                        <a className="dropdown-item" onClick={() => this._handlesidebar(commonConstant.FOLDER_TYPE)}>
                                                                            <span className="icon">
                                                                                <span className="icon customicon-folder"></span>
                                                                            </span>
                                                                            <span className="preview-item-content">
                                                                                Folder
                                                                        </span>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="dropdown-item" onClick={() => this._handlesidebar(commonConstant.CATEGORY_TYPE)}>
                                                                            <span className="icon">
                                                                                <span
                                                                                    className="icon customicon-category"></span>
                                                                            </span>
                                                                            <span className="preview-item-content">
                                                                                Category
                                                                        </span>
                                                                        </a>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="custome-row makeFolder-row">
                                        <InfiniteScroll
                                            dataLength={this.state.listing.length} 
                                            next={this.loadItems.bind(this)}
                                            hasMore={this.state.hasMore}
                                            loader={(this.state.offset > 0)?<h4>Loading...</h4>:''}>
                                            <SortableContainer OffsetValue={0} onSortStart={(_, event) => event.preventDefault()} onSortEnd={this.onSortEnd} lockAxis={"y"} OffsetValue={0} useDragHandle>
                                                {data.map((value, index) => (
                                                <SortableItem key={`item-${value.id}`} index={index} value={value} disabled={(value.pinStatus)?true:false}/>
                                                ))}
                                            </SortableContainer>
                                            { this.state.listing.length == 0 && this.state.getresponse && this.state.success && <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div className="card-body" style={{'minHeight':'300px'}}>
                                                        <div className="no-folder-add">
                                                            {!this.state.search && <div className="inner-no-folder-add">
                                                                <span className="plus-add" onClick={() => this._handlesidebar(commonConstant.ARTICLE_TYPE)} fid={this.props.match.params.id} catId={this.props.match.params.catId}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35.725" height="35.725" viewBox="0 0 35.725 35.725">
                                                                        <path id="plus_1_" data-name="plus (1)" d="M35.725,16.685H19.04V0H16.685V16.685H0V19.04H16.685V35.725H19.04V19.04H35.725Z" fill="#a2abd1"></path>
                                                                    </svg>
                                                                </span>
                                                                <div className="no-folder-content text-center mt-4">
                                                                    <h5 className="card-title mb-1">No Article Currently Added </h5>
                                                                    <p className="text-mutede">Click to add a Article</p>
                                                                </div>
                                                            </div>}
                                                            {this.state.search && <div className="inner-no-folder-add">
                                                                <div className="no-folder-content text-center mt-4">
                                                                    <h5 className="card-title mb-1">No Result found. </h5>  
                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                          
                                        </InfiniteScroll>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {this.props.showComponent.iscategoryOpen && <CreateCategory updaterender={this.componentDidMount} />}
                    {this.props.showComponent.isfolderOpen && <CreateFolder folderdata={datas} updaterender={this.componentDidMount} catId={(data.length>0)?data[0].catId:""}/>}
                    {this.state.movefolder && <MoveComponents selecetedcat={checkedstatus} onClose={this.closemove} />}
                    {this.props.showComponent.isarticleOpen && <CreateArticles onClose={this.closearticle} articledata={datas} updaterender={this.componentDidMount} fid={this.props.match.params.id} catId={this.props.match.params.catId} />}
                    {this.state.filter && <FilterCategory onClose={this.filterManage} getdata={this.setdata}  filterdata={this.state}/>}
                    {/*<Helpbutton /> */}
                    {this.props.showComponent.ishelpOpen && <RightPanelhelp/>}
                    {this.props.showComponent.iscommentOpen && <Comment getdata={this.state.comment}/>}
                 
                </div>
            </div>
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

const connectedArticle = connect(mapStateToProps)(Article);
export { connectedArticle as Article };