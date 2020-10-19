import React from 'react';
import { connect } from 'react-redux';
import Breadcumb from '../_layouts/breadcumb';
import { userService } from '../_services';
import { CreateCategory } from '../_layouts/CreateCategory';
import { CreateFolder } from '../_layouts/CreateFolder';
import { CreateArticles } from '../_layouts/CreateArticles'
import ModalComponents from '../_components/ModalComponents';
import Loader from '../_components/Loader'
import { commonConstant } from '../_constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import MoveComponents from '../_components/MoveComponents';
import { sortableContainer, sortableElement,sortableHandle } from 'react-sortable-hoc';
import { RightPanelhelp } from '../_layouts/RightPanelhelp';
import {FilterCategory} from '../_layouts/FilterCategory'
import {Dateformate,getname} from '../_helpers/auth-header'
import ReactTooltip from "react-tooltip";
import config from 'config';
import bootstrap from "bootstrap";
import arrayMove from 'array-move';
const DragHandle = sortableHandle(() =><span className="folder-manage"><svg xmlns="http://www.w3.org/2000/svg" width="14.979" height="19.972" viewBox="0 0 14.979 19.972"><g id="Group_1040" data-name="Group 1040" opacity="0.1"><path id="ic_more_vert_24px" d="M12.5,8.993A2.5,2.5,0,1,0,10,6.5,2.5,2.5,0,0,0,12.5,8.993Zm0,2.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,11.489Zm0,7.489a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,18.979Z" transform="translate(-10 -4)"></path><path id="ic_more_vert_24px-2" data-name="ic_more_vert_24px" d="M12.5,8.993A2.5,2.5,0,1,0,10,6.5,2.5,2.5,0,0,0,12.5,8.993Zm0,2.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,11.489Zm0,7.489a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,18.979Z" transform="translate(-0.014 -4)"></path></g></svg></span>);
class FolderList extends React.Component {
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
            pagelimit: 9,
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
            filter:false,
            selectionStart:0,
            selectionEnd:0,
            userselect:[],
            filterdata:false,
            allUsers: false,
            register: false,
            agents: false,

        };
        this.handlestatus = this.handlestatus.bind(this);
        this._handlesidebar = this._handlesidebar.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    _handlesidebar(type) {
        const { dispatch } = this.props;
        if (type == 1)
            dispatch({ type: 'CategoryToggle' })
        else if (type == 2)
            dispatch({ type: 'FolderToggle' })
        else
            dispatch({ type: 'ArticleToggle' })
        this.setState({ dropdownComponent: !this.state.dropdownComponent })

    }

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
          let secondposition = ((newIndex == 0))?(parseFloat(this.state.listing[newIndex].position)+100):this.state.listing[newIndex-1].position;
        
               positions = (parseFloat(this.state.listing[newIndex].position) + parseFloat(secondposition))/2;
        }
        if(oldIndex < newIndex){
           let secondposition = ((newIndex == (this.state.listing.length -1)))?(parseFloat(this.state.listing[newIndex].position)-100):this.state.listing[newIndex+1].position;
               positions = (parseFloat(this.state.listing[newIndex].position) + parseFloat(secondposition))/2;
        }
        this.state.listing[oldIndex].position=positions;
        this.setState(({listing}) => ({
            listing: arrayMove(listing, oldIndex, newIndex),
          }));
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
        userService.reorderFolder(this.state.listing[oldIndex].id,parseFloat(positions))
        .then(response => response.json())
        .then(data => { 
           console.log(data)
        });
      };

    componentDidMount() {
        this.setState({ offset: 0 })
        this.setState({ listing: [] })
        this.setState({ hasMore: true })
        this.loadItems()
    }

    loadItems() {
        const { dispatch } = this.props;
        if(this.state.offset == 0)
          this.setState({loader:true});
        //this.setState({ loader:!this.state.loader })
        const catId = this.props.match.params.id;
        userService.getAll(this.state, catId)
            .then(response => response.json())
            .then(datas => {
                // if(this.state.offset == 0)
                // dispatch(alertActions.apimessage(datas.message));
                //   this.setState({ listing:datas.data })
                
                //this.state.listing.push(datas.data)
                this.setState({
                    listing: this.state.listing.concat(datas.data)
                });
                
                if (datas.total == this.state.listing.length)
                    this.setState({ hasMore: false })
                this.setState({ total: datas.total })
                this.setState({ pagecount: datas.count })
                this.setState({ loader:false })
                this.setState({ offset: this.state.offset + 1 });
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

    editfolder(folderId) {
        const { dispatch } = this.props;
        this.setState({ loader: !this.state.loader })
        /*   if(!this.props.showComponent.isfolderOpen)
          dispatch({ type: 'FolderToggle' }) */
        userService.geteditfolder(folderId)
            .then(response => response.json())
            .then(datas => {
                this.setState({ loader: !this.state.loader })
                dispatch({ type: 'FolderToggle' })
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
            alert("Please select atleast one folder");
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

    modalstatus = (type) => {
        this.setState({ statemode: type });
        this.setState({ showmodal: !this.state.showmodal })
        this.setState({ dropdown: false })
    }

    ngsubmit() {
        if (this.state.checkmarkcat.length == 0) {
            this.setState({ showmodal: !this.state.showmodal })
            alert("Please select atleast one folder.");
        } else {
            this.setState({ loader: !this.state.loader })
            userService.deletefolder(this.state.checkmarkcat, this.state.checkmarkseo)
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ showmodal: !this.state.showmodal })
                        this.setState({ dropdown: !this.state.dropdown })
                        this.setState({ loader: !this.state.loader })
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
        var items = [];
        const SortableItem = sortableElement(({ value }) => (
            <div className="makeinFolder makefolder-bg custome-table k-flex all-articles-row folder-row" tabIndex={value.id}>
                <div className="makefolder-col makeinFolder-col-0">
                <DragHandle/>
                    <div className={(checkedstatus.indexOf(value.id) > -1 ? "folder-checkBox" : "folder-checkBox")}>
                        <label className={'containerCheckBox' + (checkedstatus.indexOf(value.id) > -1 ? " containerafterchecked" : "")}>
                            <input type="checkbox" value={value.id} id={value.det[0].id} onChange={this.handlestatus} checked={(checkedstatus.indexOf(value.id) > -1 ? "checked" : "")} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <span className="icon-Pagetitle"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="15.75" viewBox="0 0 21 15.75">
                        <path id="Icon_awesome-folder" data-name="Icon awesome-folder" d="M19.031,7.125H11.156L8.531,4.5H1.969A1.969,1.969,0,0,0,0,6.469V18.281A1.969,1.969,0,0,0,1.969,20.25H19.031A1.969,1.969,0,0,0,21,18.281V9.094A1.969,1.969,0,0,0,19.031,7.125Z" transform="translate(0 -4.5)" fill="#a2abd1"/>
                        </svg>
                    </span>
                </div>
                <div className="makefolder-col makeinFolder-col-1">
                    <div className="folder-name cursor-pointer">
                        <h6 className="card-title" data-tip data-for={value.id}><a className="card-title" href={`${config.path}/article/${(this.props.match.params.cayegoryName)}/${(value.name).replace(/ /g, "_")}/${value.id}/${value.catId}`}>{value.name} ({value.cnt})</a>

                        </h6>
                        <ReactTooltip place="right" type="dark" id={value.id} effect="float">
                                <span className="toggle-custome-react">
                                    <ul>
                                        <li><span>Category Name</span>{value.category[0].name}</li>
                                        <li><span>Created On</span>{Dateformate(value.category[0].createdON)}</li>
                                        <li><span>Last Edited </span>{Dateformate(value.category[0].updatedOn)}</li>
                                        {/* <li><span>Folder Name</span>Folder Name</li> */}
                                    </ul>
                                </span>
                            </ReactTooltip>
                        <p className="card-body-text">Last Edited by {getname(user[0])}, {Dateformate(value.updatedOn)}
                            </p>
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
                    </div>
                </div>
                <div className="makefolder-col makeinFolder-col-3">
                    <div className="makefolder-user-Feedback-list k-flex">
                        <div className="makefolder-list-right">
                            <div className="userUpdates makefolder-list-icon">
                                <ul>
                                    <li onClick={() => this.editfolder(value.id, value.det[0].id)} id={value.id} seoid={value.det[0].id}>
                                        <span className="icon edit-record">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="17.734" height="17.734"
                                                viewBox="0 0 17.734 17.734">
                                                <path id="ic_edit_24px"
                                                    d="M3,17.037v3.694H6.694L17.589,9.836,13.895,6.142ZM20.445,6.98a.981.981,0,0,0,0-1.389L18.14,3.286a.981.981,0,0,0-1.389,0l-1.8,1.8,3.694,3.694,1.8-1.8Z"
                                                    transform="translate(-3 -2.997)"
                                                    fill="#64b5f6" />
                                            </svg>

                                        </span>
                                    </li>
                                    <li>
                                        <a className="icon" href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}folder/${(value.name).replace(/ /g, "_")}-${value.id}`} target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="18.941" height="18.941"
                                                viewBox="0 0 18.941 18.941">
                                                <g id="Group_1539"
                                                    data-name="Group 1539"
                                                    transform="translate(0.4 0.4)">
                                                    <path id="Path_1524"
                                                        data-name="Path 1524"
                                                        d="M162.891,0h-4.71a.472.472,0,1,0,0,.945h3.577l-9.189,9.277a.472.472,0,1,0,.671.665l9.179-9.266V5.182a.472.472,0,1,0,.945,0V.472A.472.472,0,0,0,162.891,0Zm0,0"
                                                        transform="translate(-145.223)"
                                                        fill="#a2abd1"
                                                        stroke="#64b5f6"
                                                        strokeWidth="0.8" />
                                                    <path id="Path_1525"
                                                        data-name="Path 1525"
                                                        d="M15.313,57.641a.472.472,0,0,0-.472.472v5.173A1.419,1.419,0,0,1,13.423,64.7H2.362A1.419,1.419,0,0,1,.945,63.286V52.225a1.419,1.419,0,0,1,1.417-1.417H7.535a.472.472,0,1,0,0-.945H2.362A2.365,2.365,0,0,0,0,52.225V63.286a2.365,2.365,0,0,0,2.362,2.362H13.423a2.365,2.365,0,0,0,2.362-2.362V58.113A.472.472,0,0,0,15.313,57.641Zm0,0"
                                                        transform="translate(0 -47.508)"
                                                        fill="#a2abd1"
                                                        stroke="#64b5f6"
                                                        strokeWidth="0.8" />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
        const SortableContainer = sortableContainer(({ children }) => {
            return <div className="row tracks"><div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >{children}</div></div>;
        });

        return (

            <div className={'page-wrapper' + (this.props.showComponent.isOpen ? ' sidebar-collapse' : '')}>
                {this.state.loader && <Loader />}
                {(this.props.showComponent.ishelpOpen || this.props.showComponent.iscategoryOpen || this.props.showComponent.isfolderOpen || this.state.showmodal || this.state.movefolder || this.props.showComponent.isarticleOpen) && <div className="shadow">&nbsp;</div>}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                        <Breadcumb bredcumb={this.props.match.params} />
                        {this.state.showmodal && <ModalComponents closemodal={this.modalstatus.bind(this)} modalsuccess={this.ngsubmit.bind(this)} statemode={this.state.statemode} />}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="category-body pt-4">
                                    <div className="category-tiles">
                                        <div className="category-header k-flex">
                                            <div className="categoryHeaderLeft">
                                                <ul>
                                                    <li>
                                                        <span className="main-checkbox-all">
                                                            <label className="containerCheckBox containerafterchecked">
                                                                <input type="checkbox" onChange={this.selectall.bind(this)} />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </span>
                                                    </li>
                                                    
                                                    <li>
                                                        <a className="btnWhite btnWhite-hover dropdown icon-with-text"  href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}category/${this.props.match.params.cayegoryName}-${this.props.match.params.id}`} target="_blank">
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
                                                   <a className="btnWhite btnWhite-hover dropdown icon-with-text"  style={{color: "#A2ABD1"}} onClick={() => this.modalstatus("delete")}>
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
                                                    {/*<li ref="megaMenu" className="ps-relative">
                                                        <button className="btnWhite dropdown"
                                                            data-toggle="dropdown" >Manage</button>
                                                        <div className={'navbarDropdown navbarDropdown-left dropdown-menu-left dropdown-menu top10'}
                                                            aria-labelledby="navbarDropdown1" >
                                                            <ul>
                                                           
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
                                                                    <a className="dropdown-item" href="#">
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
                                                    <li  className="d-xs-none"> {this.state.searchingShow ? <span className="gridTileOption searchFocuse">
                                                        <input type="text" placeholder="Search for folder" onChange={this.handleKeyUp} />
                                                        <span className="searchValues" onClick={this.closeSearch}><svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                                            height="17.49" viewBox="0 0 17.49 17.49">
                                                            <path id="ic_zoom_out_24px"
                                                                d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                                                transform="translate(-3 -3)" fill="#a2abd1" />
                                                        </svg></span>
                                                        <span className="click-Search-cat" onClick={this.componentDidMount}>Search</span>
                                                    </span> : <span className="gridTileOption" onClick={this.searching}>
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
                                                            By : </span><span className="bold-text-tooltip">{(this.state.sort == 'createdON')?'DateCreated':(this.state.sort == 'updatedOn')?'LastEdited':(this.state.sort == 'name')?'Alphabetically':''}
                                                        </span></span>:''}
                                                        <span className={'gridTileOption dropdown '+ (this.state.sort ? 'selected' : '')} data-toggle="dropdown">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12"
                                                                viewBox="0 0 18 12">
                                                                <path id="ic_sort_24px"
                                                                    d="M3,18H9V16H3ZM3,6V8H21V6Zm0,7H15V11H3Z"
                                                                    transform="translate(-3 -6)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>
                                                        <div className={'navbarDropdown dropdown-menu dropdown-menu-right top10 sortdropdown ' + (this.state.openshort ? 'show' : '')}
                                                            aria-labelledby="navbarDropdown1" style={{transform: 'inherit', left: 'auto' }} >
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
                                                                <a className={'dropdown-item '+  ((this.state.sort=='createdON') ? 'name' : '')} value="name" onClick={() => this.sorting("name")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-alphabetical"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Alphabetical
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li onClick={this.filterManage} >
                                                    <span className={'gridTileOption ' + ((this.state.selectionStart > 0 && this.state.selectionEnd > 0)?'selected':'')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22.674"
                                                                height="20.899" viewBox="0 0 22.674 20.899">
                                                                <path id="Path_1489" data-name="Path 1489"
                                                                    d="M22.608,10.077a.687.687,0,0,0-.622-.394H.687a.687.687,0,0,0-.53,1.124l8.188,9.931V29.9a.687.687,0,0,0,.992.616l4.6-2.28a.687.687,0,0,0,.382-.615l.009-6.878,8.188-9.931A.687.687,0,0,0,22.608,10.077Zm-9.5,9.977a.687.687,0,0,0-.157.436l-.009,6.7-3.226,1.6v-8.3a.687.687,0,0,0-.157-.437l-7.418-9H20.529Z"
                                                                    transform="translate(0 -9.683)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>
                                                    </li>
                                                    <li ref="addMenu" className="mobile-add-btn">
                                                        <span className="split-btn">
                                                            <button className="splitBtn split-btn-left" onClick={() => this._handlesidebar(commonConstant.ARTICLE_TYPE)}> + New article</button>
                                                            <button className="splitBtn split-btn-right dropdown" data-toggle="dropdown">
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
                                                                    <svg id="plus" xmlns="http://www.w3.org/2000/svg" width="23.771" height="23.771" viewBox="0 0 44.944 44.944">
                                                                        <g id="Group_3239" data-name="Group 3239">
                                                                            <path id="Path_2553" data-name="Path 2553" d="M25.276,19.668V0H19.668V19.668H0v5.608H19.668V44.944h5.608V25.276H44.944V19.668Z" fill="#fff"/>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                            <div className={`navbarDropdown dropdown-menu-right dropdown-menu top10`}
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

                                                <SortableContainer onSortEnd={this.onSortEnd} lockAxis={"y"} useDragHandle>
                                                    {data.map((value, index) => (
                                                        <SortableItem key={`item-${value.id}`} index={index} value={value} />
                                                    ))}
                                                </SortableContainer>
                                            </InfiniteScroll>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.showComponent.iscategoryOpen && <CreateCategory updaterender={this.componentDidMount} />}
                {this.props.showComponent.isfolderOpen && <CreateFolder folderdata={datas} updaterender={this.componentDidMount} catId={this.props.match.params.id}/>}
                {this.state.movefolder && <MoveComponents selecetedcat={checkedstatus} onClose={this.closemove} />}
                {this.props.showComponent.isarticleOpen && <CreateArticles  onClose={this.closearticle} catId={this.props.match.params.id}/>}
                {this.state.filter && <FilterCategory onClose={this.filterManage} getdata={this.setdata}  filterdata={this.state}/>}
                {/* <Helpbutton /> */}
                {this.props.showComponent.ishelpOpen && <RightPanelhelp/>}
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

const connectedFolderList = connect(mapStateToProps)(FolderList);
export { connectedFolderList as FolderList };