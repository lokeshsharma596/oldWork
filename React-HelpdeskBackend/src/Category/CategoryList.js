import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import Loader from '../_components/Loader';
import ModalComponents from '../_components/ModalComponents';
import { commonConstant } from '../_constants';
import Breadcumb from '../_layouts/breadcumb';
import { CreateCategory } from '../_layouts/CreateCategory';
import { CreateFolder } from '../_layouts/CreateFolder';
import { CreateArticles } from '../_layouts/CreateArticles';
import { userService } from '../_services';
import { sortableContainer, sortableElement,sortableHandle } from 'react-sortable-hoc';
import {FilterCategory} from '../_layouts/FilterCategory'
import { RightPanelhelp } from '../_layouts/RightPanelhelp';
import {Dateformate,getname} from '../_helpers/auth-header'
import config from 'config';
import arrayMove from 'array-move';
const DragHandle = sortableHandle(() =><span className="cursor-move">
<svg xmlns="http://www.w3.org/2000/svg"
    width="14.979" height="19.972"
    viewBox="0 0 14.979 19.972">
    <g id="Group_1040" data-name="Group 1040"
        opacity="0.1">
        <path id="ic_more_vert_24px"
            d="M12.5,8.993A2.5,2.5,0,1,0,10,6.5,2.5,2.5,0,0,0,12.5,8.993Zm0,2.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,11.489Zm0,7.489a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,18.979Z"
            transform="translate(-10 -4)" />
        <path id="ic_more_vert_24px-2"
            data-name="ic_more_vert_24px"
            d="M12.5,8.993A2.5,2.5,0,1,0,10,6.5,2.5,2.5,0,0,0,12.5,8.993Zm0,2.5a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,11.489Zm0,7.489a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12.5,18.979Z"
            transform="translate(-0.014 -4)" />
    </g>
</svg>
</span>);

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deschide: false,
            visiblehide: false,
            seohide: false,
            allUsers: false,
            register: false,
            agents: false,
            listing: [],
            editCategorydata: [],
            checkmarkseo: [],
            checkmarkcat: [],
            showmodal: false,
            dropdown: false,
            loader: false,
            pagelimit: 12,
            offset: 0,
            total: 0,
            pagecount: 0,
            submitted: false,
            hasMore: true,
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
            catId:""
            
        };
        this.handlestatus = this.handlestatus.bind(this);
        this._handlesidebar = this._handlesidebar.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        
    }
    _handlesidebar(type,catId) {
        const { dispatch } = this.props;
        if(catId)
        this.setState({catId:catId});
        if (type == 1)
            dispatch({ type: 'CategoryToggle' })
        else if (type == 2)
            dispatch({ type: 'FolderToggle' })
        else{
            dispatch({ type: 'ArticleToggle' })
        }
        this.setState({ dropdown: false })

    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        console.log(oldIndex)
        console.log(newIndex)
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
        userService.reorderCategory(categoryId[0], parseFloat(total / 2))
            .then(response => response.json())
            .then(datas => {
                console.log(data);
            });
    }
    handleKeyUp = (e) => {
        this.setState({ search: e.target.value });
        this.setState({ offset: 0 })
        setTimeout(() => {
            if (!this.state.search)
                this.componentDidMount();
        }, 100);
    }

    sorting = (type) => {
        this.setState({ sort: type });
        if (type == this.state.sort)
            this.setState({ sort: "" });
        this.setState({ loader: !this.state.loader })
        this.handlesortDropdown();
        setTimeout(() => {
            this.setState({ loader: !this.state.loader })
            this.componentDidMount()
        }, 100);
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

    editcategory(cat_id) {
        const { dispatch } = this.props;
        this.setState({ loader: !this.state.loader })
        /*  if(!this.props.showComponent.iscategoryOpen)
         dispatch({ type: 'CategoryToggle' }) */
        userService.geteditcategory(cat_id)
            .then(response => response.json())
            .then(datas => {
                this.setState({ loader: !this.state.loader })
                dispatch({ type: 'CategoryToggle' })
                this.setState({ editCategorydata: datas.data })

            });

    }
    componentDidMount() {
        this.setState({ offset: 0 })
        this.setState({ listing: [] })
        this.setState({ hasMore: true })
        setTimeout(() => {
                this.loadItems()
        },3000);
        //ReactDOM.findDOMNode(this).addEventListener('mousedown', this.handleOutsideClick);
      //  document.body.addEventListener('click', this.handleOutsideClick);
    }
    // componentDidUpdate(){
        
    // }

    loadItems() {
        const { dispatch } = this.props;
        //this.setState({ loader:!this.state.loader })
        if(this.state.offset == 0)
        this.setState({loader:true});
        userService.getAll(this.state)
            .then(response => response.json())
            .then(datas => {
                // if(this.state.offset == 0){
                //     dispatch(alertActions.apimessage(datas.message));
                //     setTimeout(() => {
                //         dispatch(alertActions.clear());
                //       }, 3000)
                    
                // }
                
                //   this.setState({ listing:datas.data })
                //);
                //this.state.listing.push(datas.data)
                this.setState({
                    listing: this.state.listing.concat(datas.data)
                });
                //  if (this.state.listing.length == 0 && !this.state.search && !this.state.filterdata)
                //     history.replace('/dashboard');
                if (datas.total == this.state.listing.length)
                    this.setState({ hasMore: false })
                this.setState({ total: datas.total })
                this.setState({ pagecount: datas.count })
                this.setState({loader:false});
                this.setState({ offset: this.state.offset + 1 });
            });
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
    }

    ngsubmit() {
        if (this.state.checkmarkcat.length == 0) {
            this.setState({ showmodal: !this.state.showmodal })
            alert("Please select atleast one category.");
        } else {
            this.setState({ loader: !this.state.loader })
            userService.deletecategory(this.state.checkmarkcat, this.state.checkmarkseo)
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ showmodal: !this.state.showmodal })
                        this.setState({ loader: !this.state.loader })
                        this.componentDidMount();
                    }

                })
        }

    }

    handleDropdown = e => {
        this.setState({ dropdown: !this.state.dropdown })
    }
    handlePageChange = (page, e) => {
        this.setState({ offset: page - 1 })
        setTimeout(() => {
            this.componentDidMount();
        }, 500)
    };

    handlesortDropdown = e => {
        this.setState({ openshort: !this.state.openshort })
    }

    closearticle = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'ArticleToggle' })
    };


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
        if (!this.refs.sortdrop.contains(event.target)) {
            this.setState({
                openshort: false
            });
        }
    }
    
   
    // shouldComponentUpdate(nextProps, nextState) {
    //     // fix for your update
    //     if (this.state.total == nextProps.total) {
    //        return true;
    //     }
    //   }

    // componentWillMount() {
    //     document.addEventListener('click', this.handleOutsideClick, true);
    // }

    componentWillUnmount() {
        this._isMounted = false;
         document.removeEventListener('mousedown', this.handleOutsideClick, false);
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
        const data = this.state.listing;
        const {user}   =this.props.authentication;
        const datas = this.state.editCategorydata;
        const checkedstatus = this.state.checkmarkcat;
        const dropDown = this.state.dropdown;
        const dropMenu = dropDown ? 'dropdown-menu show' : 'dropdown-menu';
        const loader = <Loader />;
        var items = [];
        const SortableItem = sortableElement(({ value }) => (<div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" tabIndex={value.id} >
            <div className="category-col mb30 p20">
                <div className="categoryColHeader k-flex">
                    <div className="categoryHeaderLeft">
                        <ul>
                            <li>
                                <DragHandle/>
                            </li>
                            <li>
                                <div className="categorycheckboxTiles">
                                    <span className="checkBoxDesign">
                                        <label className={'containerCheckBox' + (checkedstatus.indexOf(value.id) > -1 ? " containerafterchecked" : "")} htmlFor={value.det[0].id}>
                                            <input type="checkbox" value={value.id} id={value.det[0].id} onClick={(e) => this.handlestatus(e)} defaultChecked={(checkedstatus.indexOf(value.id) > -1 ? "checked" : "")} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="categoryHeaderRight">
                        <ul>
                            <li onClick={() => this.editcategory(value.id, value.det[0].id)} id={value.id} seoid={value.det[0].id}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="13.002" height="13.002"
                                        viewBox="0 0 13.002 13.002">
                                        <path id="ic_edit_24px"
                                            d="M3,13.291V16H5.708L13.7,8.012,10.988,5.3ZM15.791,5.917a.719.719,0,0,0,0-1.018L14.1,3.209a.719.719,0,0,0-1.018,0L11.761,4.53l2.708,2.708,1.322-1.322Z"
                                            transform="translate(-3 -2.997)"
                                            fill="#a2abd1" />
                                    </svg>
                                </span>
                            </li>
                            <li>
                                <a href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}category/${value.name.replace(/ /g, "-")}-${value.id.replace(/ /g, "-")}`} target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="18.941" height="18.941"
                                        viewBox="0 0 18.941 18.941">
                                        <g id="Group_1790" data-name="Group 1790"
                                            transform="translate(0.4 0.4)">
                                            <path id="Path_1524"
                                                data-name="Path 1524"
                                                d="M162.891,0h-4.71a.472.472,0,1,0,0,.945h3.577l-9.189,9.277a.472.472,0,1,0,.671.665l9.179-9.266V5.182a.472.472,0,1,0,.945,0V.472A.472.472,0,0,0,162.891,0Zm0,0"
                                                transform="translate(-145.223)"
                                                fill="#eff3ff" stroke="#a2abd1"
                                                strokeWidth="0.8" />
                                            <path id="Path_1525"
                                                data-name="Path 1525"
                                                d="M15.313,57.641a.472.472,0,0,0-.472.472v5.173A1.419,1.419,0,0,1,13.423,64.7H2.362A1.419,1.419,0,0,1,.945,63.286V52.225a1.419,1.419,0,0,1,1.417-1.417H7.535a.472.472,0,1,0,0-.945H2.362A2.365,2.365,0,0,0,0,52.225V63.286a2.365,2.365,0,0,0,2.362,2.362H13.423a2.365,2.365,0,0,0,2.362-2.362V58.113A.472.472,0,0,0,15.313,57.641Zm0,0"
                                                transform="translate(0 -47.508)"
                                                fill="#eff3ff" stroke="#a2abd1"
                                                strokeWidth="0.8" />
                                        </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="categoryHeading">
                    <h5 className="card-title">
                        <a className={'card-title' + (value.folderdet.length == 0 ? ' disabled-link' : '')} href={`${config.path}/folder/${(value.name).replace(/ /g, "_")}/${value.id}`}>{value.name}</a>
                    </h5>
                </div>
                <div className="categoryFolderListing">
                    <ul>
                        {value.folderdet.slice(0, 5).map((fname, j) => {
                            return <li key={j} id={j}>
                                <a className="listingNameFolder" href={`${config.path}/article/${(value.name).replace(/ /g, "_")}/${(fname.name).replace(/ /g, "_")}/${fname.id}/${value.id}`}>{fname.name}</a>
                                <a className="listingNumber">{fname.cnt}</a>
                               
                            </li>
                        })}
                    </ul>
                    {(value.folderdet.length == 0) && <div className="no-folder-add" onClick={() => this._handlesidebar(commonConstant.FOLDER_TYPE,value.id)}>
                        <div className="inner-no-folder-add">
                            <span className="plus-add">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35.725" height="35.725" viewBox="0 0 35.725 35.725">
                                    <path id="plus_1_" data-name="plus (1)" d="M35.725,16.685H19.04V0H16.685V16.685H0V19.04H16.685V35.725H19.04V19.04H35.725Z" fill="#a2abd1" />
                                </svg>
                            </span>
                            <div className="no-folder-content text-center mt-4">
                                <h5 className="card-title mb-1">No Folder Currently Added</h5>
                                <p className="text-mutede">Click to add a folder</p>
                            </div>
                        </div>
                    </div>}
                </div>
                {(value.folderdet.length > 5) ? <div className="categoryViewAll"><a href={`${config.path}/folder/${(value.name).replace(/ /g, "_")}/${value.id}`}>View all</a></div> : ""}
                <div className="category-by">
                {getname(user[0])}, {Dateformate(value.updatedOn)}
                    </div>
            </div>
        </div>));
        const SortableContainer = sortableContainer(({ children }) => {
            return <div className="row tracks">{children}</div>;
        });

        return (

            <div className={'page-wrapper' + (this.props.showComponent.isOpen ? ' sidebar-collapse' : '')} >
                {this.state.loader && <Loader />}

                {(this.props.showComponent.ishelpOpen || this.state.filter || this.props.showComponent.iscategoryOpen || this.state.showmodal || this.props.showComponent.isarticleOpen || this.props.showComponent.isfolderOpen) && <div className="shadow">&nbsp;</div>}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                        <Breadcumb bredcumb="solutions" />
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
                                                        <a className="btnWhite btnWhite-hover dropdown icon-with-text"  href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}`} target="_blank">
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
                                                </ul>
                                            </div>
                                            <div className="categoryHeaderRight">
                                                <ul>
                                                    <li className="d-xs-none"> {this.state.searchingShow ? <span className="gridTileOption searchFocuse">
                                                                <input type="text" placeholder="Search for category" onChange={this.handleKeyUp} />
                                                                <span className="searchValues" onClick={this.closeSearch}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                                                        height="17.49" viewBox="0 0 17.49 17.49">
                                                                        <path id="ic_zoom_out_24px"
                                                                            d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                                                            transform="translate(-3 -3)" fill="#a2abd1" />
                                                                    </svg>
                                                                </span>
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
                                                    <li className="ps-relative" ref="sortdrop">
                                                    {(this.state.sort)?<span className="tooltipCustome"><span className="light-text-tooltip">Sort
                                                            By : </span><span className="bold-text-tooltip">{(this.state.sort == 'createdON')?'DateCreated':(this.state.sort == 'updatedOn')?'LastEdited':(this.state.sort == 'name')?'Alphabetically':''}
                                                        </span></span>:''}
                                                        <span className={'gridTileOption dropdown ' + (this.state.sort ? 'selected' : '')} data-toggle="dropdown">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12"
                                                                viewBox="0 0 18 12">
                                                                <path id="ic_sort_24px"
                                                                    d="M3,18H9V16H3ZM3,6V8H21V6Zm0,7H15V11H3Z"
                                                                    transform="translate(-3 -6)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>
                                                        <div className={'navbarDropdown dropdown-menu dropdown-menu-right sortdropdown top10'}
                                                            aria-labelledby="navbarDropdown1" style={{ transform: 'inherit', left: 'auto' }}>
                                                            <ul>
                                                                <li>
                                                                    <a className={'dropdown-item ' + ((this.state.sort == 'createdON') ? 'selected' : '')} value="createdON" onClick={() => this.sorting("createdON")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-date-range"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Date Created
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className={'dropdown-item ' + ((this.state.sort == 'updatedOn') ? 'selected' : '')} value="updatedOn" onClick={() => this.sorting("updatedOn")}>
                                                                        <span className="icon">
                                                                            <i className="icon customicon-latest-edited"></i>
                                                                        </span>
                                                                        <span className="preview-item-content">
                                                                            Latest Edited
                                                                    </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className={'dropdown-item ' + ((this.state.sort == 'name') ? 'selected' : '')} value="name" onClick={() => this.sorting("name")}>
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
                                                        <span className={'gridTileOption filter ' + ((this.state.selectionStart > 0 && this.state.selectionEnd > 0)?'selected':'')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22.674"
                                                                height="20.899" viewBox="0 0 22.674 20.899">
                                                                <path id="Path_1489" data-name="Path 1489" d="M22.608,10.077a.687.687,0,0,0-.622-.394H.687a.687.687,0,0,0-.53,1.124l8.188,9.931V29.9a.687.687,0,0,0,.992.616l4.6-2.28a.687.687,0,0,0,.382-.615l.009-6.878,8.188-9.931A.687.687,0,0,0,22.608,10.077Zm-9.5,9.977a.687.687,0,0,0-.157.436l-.009,6.7-3.226,1.6v-8.3a.687.687,0,0,0-.157-.437l-7.418-9H20.529Z"
                                                                    transform="translate(0 -9.683)" fill="#a2abd1" />
                                                            </svg>
                                                        </span>
                                                    </li>
                                                    <li ref="megaMenu" className="mobile-add-btn">
                                                        <span className="split-btn">
                                                            <button className="splitBtn split-btn-left" onClick={() => this._handlesidebar(commonConstant.ARTICLE_TYPE)} >
                                                            + New article</button>
                                                            <button className="splitBtn split-btn-right" data-toggle="dropdown">
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
                                                            <div className={`navbarDropdown dropdown-menu dropdown-menu-right top10`}
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

                                                                    <li>
                                                                        <a className="dropdown-item" onClick={() => this._handlesidebar(commonConstant.FOLDER_TYPE)} >
                                                                            <span className="icon">
                                                                                <span className="icon customicon-folder"></span>
                                                                            </span>
                                                                            <span className="preview-item-content">
                                                                                Folder
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
                                        <div className="category-row">
                                            <InfiniteScroll
                                                dataLength={this.state.listing.length}
                                                next={this.loadItems.bind(this)}
                                                hasMore={this.state.hasMore}
                                                loader={(this.state.offset > 0)?<h4>Loading...</h4>:''}>
                                                <SortableContainer onSortEnd={this.onSortEnd} axis="xy" useDragHandle>
                                                    {data.map((value, index) => (
                                                        <SortableItem key={`${value.id}`} index={index} value={value} />
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
                {this.props.showComponent.iscategoryOpen && <CreateCategory categorydata={datas} updaterender={this.componentDidMount} />}
                {this.props.showComponent.isfolderOpen && <CreateFolder updaterender={this.componentDidMount} catId={this.state.catId}/>}
                {this.props.showComponent.isarticleOpen && <CreateArticles onClose={this.closearticle} catId={this.state.catId} />}
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

const connectedCategoryList = connect(mapStateToProps)(CategoryList);
export { connectedCategoryList as CategoryList };
