import React from 'react';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { RightPanelhelp } from '../_layouts/RightPanelhelp';
import { userService } from '../_services';
import Loader from '../_components/Loader'
import { CreateArticles } from '../_layouts/CreateArticles';
import config from 'config';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popup: false,
            selectedFile: "",
            addcat: false,
            addarticle: true,
            addfoldert: false,
            foldername: 'FAQs',
            deschide: true,
            visiblehide: true,
            seohide: true,
            categoryname: 'General',
            description: '',
            userselect: [1],
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
            position: 0,
            createdON: 0,
        }
        this.read = this.read.bind(this);
        this._handlecategorysidebar = this._handlecategorysidebar.bind(this)
        let user = JSON.parse(localStorage.getItem('user'));
        let domainname = (localStorage.getItem('user')) ? user[0].domainname : "";
        if (localStorage.getItem('user') && !domainname)
            history.replace("/setup1");

    }

    _handlecategorysidebar() {
        window.location.href = `${config.path}/article/General/FAQs/` + localStorage.getItem('folderId') + '/' + localStorage.getItem('catId');
    }

    csvOpen = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'CsvToggle' })
    }
    componentDidMount() {

        this.setState({ loader: !this.state.loader })


        let user = JSON.parse(localStorage.getItem('user'));
        if (parseInt(localStorage.getItem('articlecount')) > 0) {
            history.replace(user[0].data.screentype ? user[0].data.screentype : '/categorylisting');
            return false;
        }

        userService.addCategory(this.state)
            .then((response) => {
                if (response.status == 200) {
                    this.state.categoryid = response.data;
                    localStorage.setItem('catId', response.data);
                    userService.addfolder(this.state)
                        .then((responsefolder) => {
                            if (responsefolder.status == 200) {
                                // this.closecomponent();  
                                this.state.folderId = responsefolder.data;
                                this.setState({ loader: !this.state.loader })
                                localStorage.setItem('folderId', responsefolder.data);
                                // dispatch({ type: 'FolderToggle' })
                                //window.location.href='/'+ response.url.categoryName.replace(/ /g, "_") + '/' + this.state.categoryid;
                            }
                            else {
                                this.setState({ loader: !this.state.loader })
                            }

                        })
                    // this.setState({ loader:!this.state.loader }) 
                    // dispatch({ type: 'FolderToggle' })
                    //window.location.href='/'+ response.url.categoryName.replace(/ /g, "_") + '/' + this.state.categoryid;
                }
                else {
                    localStorage.setItem('catId', response.catId);
                    localStorage.setItem('folderId', response.folderId);
                    this.setState({ loader: !this.state.loader })
                }
                // setTimeout(() => {
                //     let dashBg = document.getElementById('cardBody');
                //    dashBg.classList.remove('bg-animatio');
                // }, 3000)

            })
        // if(localStorage.getItem('catId') && localStorage.getItem('folderId'))
        // {
        //     this.setState({ addcat: false })
        //     this.setState({ addarticle: true })
        //     this.setState({ addfoldert: false }) 
        // }
        // else if(localStorage.getItem('catId')){
        //     this.setState({ addcat: false })
        //     this.setState({ addarticle: false })
        //     this.setState({ addfoldert: true })
        // }
    }
    closearticle = () => {
        const { dispatch } = this.props;
        dispatch({ type: 'ArticleToggle' })
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    read(e) {
        const reader = new FileReader();
        const csv1 = e.target.files[0];
        reader.readAsText(csv1);
        // reader.onload = function(e) {
        //   var csv = e.target.result;
        //   console.log(csv[0]);
        // };
        reader.onload = () => {
            this.csvJSON(reader.result);
        };
    }

    csvJSON = (csv) => {

        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(";");
        let user = JSON.parse(localStorage.getItem('user'));


        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentline = lines[i].split(";");
            if (currentline[0]) {
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                    obj['catId'] = localStorage.getItem('catId');
                    obj['folderId'] = localStorage.getItem('folderId');
                    obj['userId'] = user[0].id;
                }
                result.push(obj);
            }
        }
        this.setState({ loader: !this.state.loader })
        userService.addArticlecsv(result)
            .then(response => {
                this.setState({ loader: !this.state.loader })
                window.location.href = `${config.path}/` + 'article' + '/' + 'draft' + '/' + localStorage.getItem('folderId');
            });
        //return result; //JavaScript object
        //console.log(JSON.stringify(result)); //JSON
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        // const { username, password } = this.state;
        const { categoryname } = this.state;
        const { dispatch } = this.props;
        if (categoryname) {
            this.setState({ loader: !this.state.loader })
            userService.addCategorycsv(this.state)
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ loader: !this.state.loader })
                        this.setState({ addcat: false })
                        this.setState({ addarticle: false })
                        this.setState({ addfoldert: true })
                        localStorage.setItem('catId', response.data);
                        // this.closecomponent();  
                        // this.setState({ loader:!this.state.loader }) 
                        // dispatch({ type: 'FolderToggle' })
                        //window.location.href='/'+ response.url.categoryName.replace(/ /g, "_") + '/' + this.state.categoryid;
                    }

                })
        }
    }

    handlefolderSubmit = (e) => {
        e.preventDefault();

        this.setState({ foldersubmitted: true });
        this.setState({ categoryid: localStorage.getItem('catId') });
        // const { username, password } = this.state;
        const { foldername } = this.state;
        const categoryId = this.state.categoryid;
        const { dispatch } = this.props;
        if (foldername && categoryId) {
            this.setState({ loader: !this.state.loader })
            userService.addfolder(this.state)
                .then((response) => {
                    if (response.status == 200) {
                        // this.closecomponent();  
                        // this.setState({ loader:!this.state.loader }) 
                        // dispatch({ type: 'FolderToggle' })
                        this.setState({ loader: !this.state.loader })
                        this.setState({ addcat: false })
                        this.setState({ addarticle: true })
                        this.setState({ addfoldert: false })
                        localStorage.setItem('folderId', response.data);
                        // this.closecomponent();  
                    }

                })
        }

    }



    // onFileChangeHandler = (e) => {
    //     e.preventDefault();
    //     console.log(e.target);
    //     this.setState({
    //         selectedFile: e.target.files[0]
    //     });
    //     const formData = new FormData();
    //     formData.append('file', this.state.selectedFile);
    //     fetch('http://localhost:5000/api/v1/articleadd', {
    //         method: 'post',
    //         body: formData
    //     }).then(res => {
    //         if(res.ok) {
    //             console.log(res.data);
    //             alert("File uploaded successfully.")
    //         }
    //     });
    // };

    //  handleForce = data => {
    //     console.log(data);
    //     const formData = new FormData();
    //     formData.append('file', formData);
    //     fetch('http://localhost:5000/api/v1/articleadd', {
    //         method: 'post',
    //         body: formData
    //     }).then(res => {
    //         if(res.ok) {
    //             console.log(res.data);
    //             alert("File uploaded successfully.")
    //         }
    //     });
    //   };




    // let dashBg = document.getElementById('cardBody');
    // dashBg.classList.add('bg-animatio');



    render() {
        const classStatus = this.props.showComponent.ishelpOpen;
        return (
            /*  <div classNameName="col-md-6 col-md-offset-3">
                 <h3>Users from secure api end point:</h3>
                 
                 <p>
                     <Link to="/login">Logout</Link>
                 </p>
             </div> */

            <div className={'page-wrapper' + (this.props.showComponent.isOpen ? ' sidebar-collapse' : '')}>
                {(this.props.showComponent.ishelpOpen || this.props.showComponent.isarticleOpen || this.props.showComponent.iscsvupload || this.state.popup) && <div className="shadow">&nbsp;</div>}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                        {/* <Breadcumb bredcumb="home"/> */}
                        {this.state.loader && <Loader />}
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                {/* <div className="card-body">
                                <div className="knowledge-category">
                                    <div className="knowledge-card-alltitle">
                                        <h4 className="card-body-title">Create / Link Your Knowledge Centre</h4>
                                        <p className="card-body-text">Provide your customer with help articles and FAQ’s to
                                            provide help and enable learning.</p>
                                    </div>
                                    <div className="knowledge-row ">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                <div className="knowledge-col selectedFirst" onClick={this._onButtonClick}>
                                                    <span className="icon">
                                                        <svg id="Group_1099" data-name="Group 1099"
                                                            xmlns="http://www.w3.org/2000/svg" width="61.495"
                                                            height="64.007" viewBox="0 0 61.495 64.007">
                                                            <g id="_005-knowledge" data-name="005-knowledge"
                                                                transform="translate(0 52.365)">
                                                                <g id="Group_997" data-name="Group 997"
                                                                    transform="translate(0.056)">
                                                                    <g id="Group_996" data-name="Group 996">
                                                                        <path id="Path_1480" data-name="Path 1480"
                                                                            d="M61.8,370.552v-2.117c-13.807,0-28.479,3.338-28.574,9.525H28.992c-.095-6.187-14.767-9.525-28.574-9.525v2.117c15.5,0,26.33,3.891,26.452,7.408H.418v2.117H61.8V377.96H35.348C35.47,374.443,46.3,370.552,61.8,370.552Z"
                                                                            transform="translate(-0.418 -368.435)"
                                                                            fill="#1c223a"></path>
                                                                    </g>
                                                                </g>
                                                                <g id="Group_999" data-name="Group 999"
                                                                    transform="translate(0 5.294)">
                                                                    <g id="Group_998" data-name="Group 998"
                                                                        transform="translate(0 0)">
                                                                        <rect id="Rectangle_732"
                                                                            data-name="Rectangle 732" width="2.117"
                                                                            height="20.14"
                                                                            transform="translate(0 2.114) rotate(-86.985)"
                                                                            fill="#1c223a"></rect>
                                                                    </g>
                                                                </g>
                                                                <g id="Group_1001" data-name="Group 1001"
                                                                    transform="translate(41.272 5.292)">
                                                                    <g id="Group_1000" data-name="Group 1000"
                                                                        transform="translate(0 0)">
                                                                        <rect id="Rectangle_733"
                                                                            data-name="Rectangle 733" width="20.14"
                                                                            height="2.117"
                                                                            transform="translate(0 1.061) rotate(-3.021)"
                                                                            fill="#1c223a"></rect>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                            <g id="Group_1003" data-name="Group 1003"
                                                                transform="translate(5.05)">
                                                                <path id="XMLID_49_"
                                                                    d="M40.281,44.855v1.5a2.379,2.379,0,0,1-2.017,2.355l-.37,1.362a1.7,1.7,0,0,1-1.637,1.257H32.592a1.7,1.7,0,0,1-1.637-1.257L30.6,48.71a2.389,2.389,0,0,1-2.028-2.366v-1.5A1.442,1.442,0,0,1,30.015,43.4h8.819A1.458,1.458,0,0,1,40.281,44.855ZM47.072,24.64a12.582,12.582,0,0,1-3.549,8.777,11.6,11.6,0,0,0-3.105,6.295,2.091,2.091,0,0,1-2.07,1.764H30.5a2.071,2.071,0,0,1-2.06-1.753,11.725,11.725,0,0,0-3.126-6.316A12.644,12.644,0,1,1,47.072,24.64ZM35.855,16.983a1.427,1.427,0,0,0-1.426-1.426A9.134,9.134,0,0,0,25.3,24.683a1.426,1.426,0,1,0,2.852,0,6.281,6.281,0,0,1,6.274-6.274A1.42,1.42,0,0,0,35.855,16.983ZM34.43,7.847a1.427,1.427,0,0,0,1.426-1.426v-5a1.426,1.426,0,1,0-2.852,0v5A1.427,1.427,0,0,0,34.43,7.847ZM17.647,24.63A1.427,1.427,0,0,0,16.221,23.2h-5a1.426,1.426,0,0,0,0,2.852h5A1.42,1.42,0,0,0,17.647,24.63ZM57.633,23.2h-5a1.426,1.426,0,0,0,0,2.852h5a1.426,1.426,0,0,0,0-2.852ZM20.552,36.5l-3.538,3.538a1.423,1.423,0,0,0,2.007,2.017l3.538-3.538A1.423,1.423,0,1,0,20.552,36.5ZM47.3,13.181a1.424,1.424,0,0,0,1-.412l3.538-3.538a1.426,1.426,0,1,0-2.017-2.017L46.29,10.752a1.422,1.422,0,0,0,0,2.017A1.448,1.448,0,0,0,47.3,13.181Zm-26.752-.422a1.423,1.423,0,0,0,2.007-2.017L19.02,7.2A1.426,1.426,0,1,0,17,9.22ZM48.307,36.5a1.426,1.426,0,1,0-2.017,2.017l3.538,3.538a1.423,1.423,0,0,0,2.007-2.017Z"
                                                                    transform="translate(-9.8)" fill="#1c223a"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <p className="text-mutede">Create Knowledge Centre</p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                <div className="knowledge-col">
                                                    <span className="icon">
                                                        <svg id="Group_1098" data-name="Group 1098"
                                                            xmlns="http://www.w3.org/2000/svg" width="63.166"
                                                            height="63.166" viewBox="0 0 63.166 63.166">
                                                            <path id="Path_1533" data-name="Path 1533"
                                                                d="M63.166,42.748A20.465,20.465,0,0,0,48.214,23.073,24.118,24.118,0,1,0,3.345,36.379L.089,48.149,11.86,44.894a24.029,24.029,0,0,0,11.213,3.319A20.424,20.424,0,0,0,53.137,60.328l9.94,2.749-2.749-9.94A20.345,20.345,0,0,0,63.166,42.748ZM12.444,40.892,5.4,42.841l1.949-7.047L6.9,35.1a20.411,20.411,0,1,1,6.237,6.237ZM57.769,57.769,52.54,56.322l-.7.454a16.723,16.723,0,0,1-24.942-8.7A24.165,24.165,0,0,0,48.077,26.9a16.724,16.724,0,0,1,8.7,24.943l-.454.7Zm0,0">
                                                            </path>
                                                            <path id="Path_1534" data-name="Path 1534"
                                                                d="M180.5,271h3.7v3.7h-3.7Zm0,0"
                                                                transform="translate(-158.232 -237.566)"></path>
                                                            <path id="Path_1535" data-name="Path 1535"
                                                                d="M146.6,97.4a3.663,3.663,0,0,1-1.2,2.732l-4.347,3.979v4.516h3.7v-2.886l3.145-2.878A7.4,7.4,0,1,0,135.5,97.4h3.7a3.7,3.7,0,1,1,7.4,0Zm0,0"
                                                                transform="translate(-118.783 -78.897)"></path>
                                                        </svg>
                                                    </span>
                                                    <p className="text-mutede">Link Web Help Centre</p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                <div className="knowledge-col">
                                                    <span className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="35.277"
                                                            height="56.443" viewBox="0 0 35.277 56.443">
                                                            <path id="ic_reply_all_24px"
                                                                d="M39.981,12.055V5L56.443,21.463,39.981,37.925V30.87l9.407-9.407ZM25.87,14.407V5L42.332,21.463,25.87,37.925V28.283C14.111,28.283,5.88,32.046,0,40.277,2.352,28.518,9.407,16.759,25.87,14.407Z"
                                                                transform="translate(40.277) rotate(90)" fill="#1c223a">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                    <p className="text-mutede">Import From Platforms/Cloud</p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                <div className="knowledge-col">
                                                    <span className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="80.449"
                                                            height="63.52" viewBox="0 0 80.449 63.52">
                                                            <g id="Group_1096" data-name="Group 1096"
                                                                transform="translate(0 -53.873)">
                                                                <g id="Group_1091" data-name="Group 1091"
                                                                    transform="translate(0 53.873)">
                                                                    <g id="Group_1090" data-name="Group 1090"
                                                                        transform="translate(0 0)">
                                                                        <path id="Path_1526" data-name="Path 1526"
                                                                            d="M63.789,76.066a22.494,22.494,0,0,0-44.507-4.313h-.216a19.066,19.066,0,1,0,0,38.131H32.381a1.716,1.716,0,1,0,0-3.431H19.066a15.634,15.634,0,1,1,0-31.269c.459,0,.945.025,1.485.075a1.717,1.717,0,0,0,1.861-1.476,19.062,19.062,0,0,1,37.948,2.6c0,.379-.028.769-.058,1.182l-.013.176a1.716,1.716,0,0,0,1.883,1.828,13.687,13.687,0,0,1,1.368-.069,13.478,13.478,0,1,1,0,26.956h-14a1.716,1.716,0,1,0,0,3.431h14a16.909,16.909,0,0,0,.249-33.816Z"
                                                                            transform="translate(0 -53.873)"></path>
                                                                    </g>
                                                                </g>
                                                                <g id="Group_1093" data-name="Group 1093"
                                                                    transform="translate(26.985 61.937)">
                                                                    <g id="Group_1092" data-name="Group 1092"
                                                                        transform="translate(0 0)">
                                                                        <path id="Path_1527" data-name="Path 1527"
                                                                            d="M186.041,105.192a14.472,14.472,0,0,0-14.285,12.471,1.716,1.716,0,0,0,1.468,1.932,1.739,1.739,0,0,0,.234.016,1.716,1.716,0,0,0,1.7-1.484,11.028,11.028,0,0,1,10.885-9.5,1.716,1.716,0,0,0,0-3.431Z"
                                                                            transform="translate(-171.74 -105.192)">
                                                                        </path>
                                                                    </g>
                                                                </g>
                                                                <g id="Group_1095" data-name="Group 1095"
                                                                    transform="translate(32.259 89.401)">
                                                                    <g id="Group_1094" data-name="Group 1094">
                                                                        <path id="Path_1528" data-name="Path 1528"
                                                                            d="M222.132,286.278l-6.241-5.575a2.831,2.831,0,0,0-3.775,0l-6.241,5.575a1.716,1.716,0,1,0,2.286,2.559l4.127-3.687v21.107a1.716,1.716,0,0,0,3.431,0V285.151l4.127,3.687a1.716,1.716,0,1,0,2.286-2.559Z"
                                                                            transform="translate(-205.302 -279.982)">
                                                                        </path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <p className="text-mutede">Upload as .CSV or .XML</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                <div className="card-body-create-knowledge help-center bg-animatio--" id="cardBody">
                                    <div className="step-create-change pt-2 pl-3">
                                        {/* <p>Step {this.state.addarticle?3:((this.state.addfoldert)?2:1)}</p> */}
                                    </div>
                                    <div className={"card-body-create-knowledge-inner border-one" + (this.state.addcat ? '' : ' d-none')}>
                                        <div className="knowledge-card-alltitle">
                                            <div className="bulb-light text-center">
                                                <svg id="Group_1907" data-name="Group 1907" xmlns="http://www.w3.org/2000/svg" width="92.326" height="96.097" viewBox="0 0 92.326 96.097">
                                                    <g id="_005-knowledge" data-name="005-knowledge" transform="translate(0 78.619)">
                                                        <g id="Group_997" data-name="Group 997" transform="translate(0.084)">
                                                            <g id="Group_996" data-name="Group 996">
                                                                <path id="Path_1480" data-name="Path 1480" d="M92.575,371.613v-3.178c-20.729,0-42.758,5.011-42.9,14.3H43.318c-.142-9.289-22.17-14.3-42.9-14.3v3.178c23.277,0,39.531,5.842,39.714,11.122H.418v3.178H92.575v-3.178H52.86C53.043,377.455,69.3,371.613,92.575,371.613Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                                                            </g>
                                                        </g>
                                                        <g id="Group_999" data-name="Group 999" transform="translate(0 7.949)">
                                                            <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                                                <rect id="Rectangle_732" data-name="Rectangle 732" width="3.178" height="30.237" transform="translate(0 3.173) rotate(-86.985)" fill="#1c223a" />
                                                            </g>
                                                        </g>
                                                        <g id="Group_1001" data-name="Group 1001" transform="translate(61.964 7.946)">
                                                            <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                                                <rect id="Rectangle_733" data-name="Rectangle 733" width="30.237" height="3.178" transform="translate(0 1.593) rotate(-3.021)" fill="#1c223a" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1003" data-name="Group 1003" transform="translate(7.582)">
                                                        <path id="XMLID_49_" d="M55.562,67.344V69.6a3.571,3.571,0,0,1-3.029,3.536l-.555,2.046a2.546,2.546,0,0,1-2.458,1.887h-5.5a2.546,2.546,0,0,1-2.458-1.887l-.539-2.046a3.587,3.587,0,0,1-3.044-3.552V67.328a2.166,2.166,0,0,1,2.172-2.172H53.39A2.189,2.189,0,0,1,55.562,67.344Zm10.2-30.35A18.89,18.89,0,0,1,60.43,50.171a17.41,17.41,0,0,0-4.662,9.451,3.139,3.139,0,0,1-3.108,2.648H40.879a3.109,3.109,0,0,1-3.092-2.632,17.6,17.6,0,0,0-4.694-9.482A18.983,18.983,0,1,1,65.758,36.994ZM48.918,25.5a2.142,2.142,0,0,0-2.141-2.141,13.714,13.714,0,0,0-13.7,13.7,2.141,2.141,0,1,0,4.281,0,9.43,9.43,0,0,1,9.419-9.419A2.132,2.132,0,0,0,48.918,25.5ZM46.778,11.782a2.142,2.142,0,0,0,2.141-2.141v-7.5a2.141,2.141,0,1,0-4.281,0v7.5A2.142,2.142,0,0,0,46.778,11.782Zm-25.2,25.2a2.142,2.142,0,0,0-2.141-2.141h-7.5a2.141,2.141,0,0,0,0,4.281h7.5A2.132,2.132,0,0,0,21.582,36.978Zm60.033-2.141h-7.5a2.141,2.141,0,0,0,0,4.281h7.5a2.141,2.141,0,0,0,0-4.281ZM25.942,54.8,20.63,60.113a2.136,2.136,0,0,0,3.013,3.029l5.312-5.312A2.136,2.136,0,1,0,25.942,54.8ZM66.107,19.789a2.138,2.138,0,0,0,1.506-.618l5.312-5.312A2.142,2.142,0,0,0,69.9,10.83l-5.312,5.312a2.134,2.134,0,0,0,0,3.029A2.174,2.174,0,0,0,66.107,19.789Zm-40.165-.634a2.136,2.136,0,0,0,3.013-3.029l-5.312-5.312a2.142,2.142,0,0,0-3.029,3.029ZM67.614,54.8a2.142,2.142,0,0,0-3.029,3.029L69.9,63.142a2.136,2.136,0,0,0,3.013-3.029Z" transform="translate(-9.8)" fill="#1c223a" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <h4 className="card-body-title">Create Your Knowledge Base / Help Centre</h4>
                                            <p className="card-body-text">Start adding articles and provide your customers with self service solutions to all their queries.</p>
                                        </div>
                                        <div className="knowledge-create-row ">
                                            <div className="create-categroy-feilds create-knowledgeFeilds mt-5 mb-5">
                                                {/* <div className="md-form md-outline">
                                                        <input type="text" id="form1" className="form-control" name="categoryname"/>
                                                        <label for="form1">Enter Category Name</label>
                                                    </div> */}
                                                <div className={'md-form md-outline' + (this.state.submitted && !this.state.categoryname ? ' has-error' : '')}>
                                                    <input type="text" id="inputMDEx71" className="form-control" name="categoryname" value={this.state.categoryname} onChange={this.handleChange} />
                                                    <label htmlFor="inputMDEx71" className={(this.state.categoryname) ? 'active' : ''}>Enter Category Name *</label>
                                                    {this.state.submitted && !this.state.categoryname &&
                                                        <div className="invalid-feedback">Category Name is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="create-categroy create-categroy-btn create-knowledgeFeilds">
                                                <input type="submit" id="inputMDEx71" className="form-control" value="Next" onClick={this.handleSubmit} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"card-body-create-knowledge-inner border-two" + (this.state.addfoldert ? '' : ' d-none')}>
                                        <div className="knowledge-card-alltitle">
                                            <div className="bulb-light text-center">
                                                <svg id="Group_1907" data-name="Group 1907" xmlns="http://www.w3.org/2000/svg" width="92.326" height="96.097" viewBox="0 0 92.326 96.097">
                                                    <g id="_005-knowledge" data-name="005-knowledge" transform="translate(0 78.619)">
                                                        <g id="Group_997" data-name="Group 997" transform="translate(0.084)">
                                                            <g id="Group_996" data-name="Group 996">
                                                                <path id="Path_1480" data-name="Path 1480" d="M92.575,371.613v-3.178c-20.729,0-42.758,5.011-42.9,14.3H43.318c-.142-9.289-22.17-14.3-42.9-14.3v3.178c23.277,0,39.531,5.842,39.714,11.122H.418v3.178H92.575v-3.178H52.86C53.043,377.455,69.3,371.613,92.575,371.613Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                                                            </g>
                                                        </g>
                                                        <g id="Group_999" data-name="Group 999" transform="translate(0 7.949)">
                                                            <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                                                <rect id="Rectangle_732" data-name="Rectangle 732" width="3.178" height="30.237" transform="translate(0 3.173) rotate(-86.985)" fill="#1c223a" />
                                                            </g>
                                                        </g>
                                                        <g id="Group_1001" data-name="Group 1001" transform="translate(61.964 7.946)">
                                                            <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                                                <rect id="Rectangle_733" data-name="Rectangle 733" width="30.237" height="3.178" transform="translate(0 1.593) rotate(-3.021)" fill="#1c223a" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1003" data-name="Group 1003" transform="translate(7.582)">
                                                        <path id="XMLID_49_" d="M55.562,67.344V69.6a3.571,3.571,0,0,1-3.029,3.536l-.555,2.046a2.546,2.546,0,0,1-2.458,1.887h-5.5a2.546,2.546,0,0,1-2.458-1.887l-.539-2.046a3.587,3.587,0,0,1-3.044-3.552V67.328a2.166,2.166,0,0,1,2.172-2.172H53.39A2.189,2.189,0,0,1,55.562,67.344Zm10.2-30.35A18.89,18.89,0,0,1,60.43,50.171a17.41,17.41,0,0,0-4.662,9.451,3.139,3.139,0,0,1-3.108,2.648H40.879a3.109,3.109,0,0,1-3.092-2.632,17.6,17.6,0,0,0-4.694-9.482A18.983,18.983,0,1,1,65.758,36.994ZM48.918,25.5a2.142,2.142,0,0,0-2.141-2.141,13.714,13.714,0,0,0-13.7,13.7,2.141,2.141,0,1,0,4.281,0,9.43,9.43,0,0,1,9.419-9.419A2.132,2.132,0,0,0,48.918,25.5ZM46.778,11.782a2.142,2.142,0,0,0,2.141-2.141v-7.5a2.141,2.141,0,1,0-4.281,0v7.5A2.142,2.142,0,0,0,46.778,11.782Zm-25.2,25.2a2.142,2.142,0,0,0-2.141-2.141h-7.5a2.141,2.141,0,0,0,0,4.281h7.5A2.132,2.132,0,0,0,21.582,36.978Zm60.033-2.141h-7.5a2.141,2.141,0,0,0,0,4.281h7.5a2.141,2.141,0,0,0,0-4.281ZM25.942,54.8,20.63,60.113a2.136,2.136,0,0,0,3.013,3.029l5.312-5.312A2.136,2.136,0,1,0,25.942,54.8ZM66.107,19.789a2.138,2.138,0,0,0,1.506-.618l5.312-5.312A2.142,2.142,0,0,0,69.9,10.83l-5.312,5.312a2.134,2.134,0,0,0,0,3.029A2.174,2.174,0,0,0,66.107,19.789Zm-40.165-.634a2.136,2.136,0,0,0,3.013-3.029l-5.312-5.312a2.142,2.142,0,0,0-3.029,3.029ZM67.614,54.8a2.142,2.142,0,0,0-3.029,3.029L69.9,63.142a2.136,2.136,0,0,0,3.013-3.029Z" transform="translate(-9.8)" fill="#1c223a" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <h4 className="card-body-title">Create Your Knowledge Base / Help Centre</h4>
                                            <p className="card-body-text">EI trozo texto estander de Lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </div>
                                        <div className="knowledge-create-row ">
                                            <div className="create-categroy-feilds create-knowledgeFeilds mt-5 mb-5">
                                                {/* <div className="md-form md-outline">
                                                        <input type="text" id="form1" className="form-control" name="foldername"/>
                                                        <label for="form1">Enter Folder Name</label>
                                                    </div> */}
                                                <div className={'md-form md-outline' + (this.state.foldersubmitted && !this.state.foldername ? ' has-error' : '')}>
                                                    <input type="text" id="inputMDEx712" className="form-control" name="foldername" value={this.state.foldername} onChange={this.handleChange} />
                                                    <label htmlFor="inputMDEx712" className={(this.state.foldername) ? 'active' : ''}>Enter Folder Name*</label>
                                                    {this.state.foldersubmitted && !this.state.foldername &&
                                                        <div className="invalid-feedback">Folder Name is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="create-categroy create-categroy-btn create-knowledgeFeilds">
                                                <input type="submit" id="inputMDEx71" className="form-control" value="Next" onClick={this.handlefolderSubmit} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"card-body-create-knowledge-inner border-three" + (this.state.addarticle ? '' : ' d-none')}>
                                        <div className="knowledge-card-alltitle">
                                            {/*  <div className="bulb-light text-center">
                                                <svg id="Group_1907" data-name="Group 1907" xmlns="http://www.w3.org/2000/svg" width="92.326" height="96.097" viewBox="0 0 92.326 96.097">
                                                    <g id="_005-knowledge" data-name="005-knowledge" transform="translate(0 78.619)">
                                                        <g id="Group_997" data-name="Group 997" transform="translate(0.084)">
                                                        <g id="Group_996" data-name="Group 996">
                                                            <path id="Path_1480" data-name="Path 1480" d="M92.575,371.613v-3.178c-20.729,0-42.758,5.011-42.9,14.3H43.318c-.142-9.289-22.17-14.3-42.9-14.3v3.178c23.277,0,39.531,5.842,39.714,11.122H.418v3.178H92.575v-3.178H52.86C53.043,377.455,69.3,371.613,92.575,371.613Z" transform="translate(-0.418 -368.435)" fill="#1c223a"/>
                                                        </g>
                                                        </g>
                                                        <g id="Group_999" data-name="Group 999" transform="translate(0 7.949)">
                                                        <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                                            <rect id="Rectangle_732" data-name="Rectangle 732" width="3.178" height="30.237" transform="translate(0 3.173) rotate(-86.985)" fill="#1c223a"/>
                                                        </g>
                                                        </g>
                                                        <g id="Group_1001" data-name="Group 1001" transform="translate(61.964 7.946)">
                                                        <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                                            <rect id="Rectangle_733" data-name="Rectangle 733" width="30.237" height="3.178" transform="translate(0 1.593) rotate(-3.021)" fill="#1c223a"/>
                                                        </g>
                                                        </g>
                                                    </g>
                                                    <g id="Group_1003" data-name="Group 1003" transform="translate(7.582)">
                                                        <path id="XMLID_49_" d="M55.562,67.344V69.6a3.571,3.571,0,0,1-3.029,3.536l-.555,2.046a2.546,2.546,0,0,1-2.458,1.887h-5.5a2.546,2.546,0,0,1-2.458-1.887l-.539-2.046a3.587,3.587,0,0,1-3.044-3.552V67.328a2.166,2.166,0,0,1,2.172-2.172H53.39A2.189,2.189,0,0,1,55.562,67.344Zm10.2-30.35A18.89,18.89,0,0,1,60.43,50.171a17.41,17.41,0,0,0-4.662,9.451,3.139,3.139,0,0,1-3.108,2.648H40.879a3.109,3.109,0,0,1-3.092-2.632,17.6,17.6,0,0,0-4.694-9.482A18.983,18.983,0,1,1,65.758,36.994ZM48.918,25.5a2.142,2.142,0,0,0-2.141-2.141,13.714,13.714,0,0,0-13.7,13.7,2.141,2.141,0,1,0,4.281,0,9.43,9.43,0,0,1,9.419-9.419A2.132,2.132,0,0,0,48.918,25.5ZM46.778,11.782a2.142,2.142,0,0,0,2.141-2.141v-7.5a2.141,2.141,0,1,0-4.281,0v7.5A2.142,2.142,0,0,0,46.778,11.782Zm-25.2,25.2a2.142,2.142,0,0,0-2.141-2.141h-7.5a2.141,2.141,0,0,0,0,4.281h7.5A2.132,2.132,0,0,0,21.582,36.978Zm60.033-2.141h-7.5a2.141,2.141,0,0,0,0,4.281h7.5a2.141,2.141,0,0,0,0-4.281ZM25.942,54.8,20.63,60.113a2.136,2.136,0,0,0,3.013,3.029l5.312-5.312A2.136,2.136,0,1,0,25.942,54.8ZM66.107,19.789a2.138,2.138,0,0,0,1.506-.618l5.312-5.312A2.142,2.142,0,0,0,69.9,10.83l-5.312,5.312a2.134,2.134,0,0,0,0,3.029A2.174,2.174,0,0,0,66.107,19.789Zm-40.165-.634a2.136,2.136,0,0,0,3.013-3.029l-5.312-5.312a2.142,2.142,0,0,0-3.029,3.029ZM67.614,54.8a2.142,2.142,0,0,0-3.029,3.029L69.9,63.142a2.136,2.136,0,0,0,3.013-3.029Z" transform="translate(-9.8)" fill="#1c223a"/>
                                                    </g>
                                                </svg>
                                            </div> */}
                                            <h6 className="card-body-title">Congratulations! Your Knowledge Base is now Setup! </h6>
                                            <p className="card-body-text">Your customers can now get all the information they need with great ease.</p>
                                            <div className="wiiner-img pt-4 text-center">
                                                <img src={`${config.path}/images/winnerTrophy.svg`} />
                                            </div>

                                        </div>
                                        <div className="knowledge-create-row ">
                                            <div className="create-categroy-feilds create-knowledgeFeilds mt-5 pb-4">
                                                <h6 className="text-center pb-3">Start adding articles  & enable self service for all your customer queries.</h6>
                                                <div className="createArticle-or-importcsv k-flex align-items-center justify-content-center">
                                                    <button className="btnBlue dropdown py-3 px-5" onClick={this._handlecategorysidebar}>Add Article</button>
                                                    {/*  <div className="box-create-article-csv selected" onClick={this._handlecategorysidebar}>
                                                       <div className="box-create-images-text">
                                                                    <img src={`${config.path}/images/text.svg`} />
                                                                    <p className="card-body-text">Create Article</p>
                                                                </div>
                                                            </div>*/}
                                                    {/* <div className="box-create-article-csv ps-relative" onClick={this.csvOpen}>
                                                                <div className="box-create-images-text">
                                                                    <img src={`${config.path}/images/csv.svg`} />
                                                                     <p className="card-body-text">Import via .CSV</p>
                                                                    {/*<input
                                                                        type="file"
                                                                        name="csv"
                                                                        onChange={this.read.bind(this)}
                                                                    /> 
                                                                    
                                                                </div>
                                                            </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.showComponent.ishelpOpen && <RightPanelhelp />}
                {this.props.showComponent.isarticleOpen && <CreateArticles onClose={this.closearticle} />}


            </div>
        );
    }
}

// function mapSatetoToggle(state){
//         const { user } = state;
//         return {
//             user
//         };

// }

function mapStateToProps(state) {
    const showComponent = state.toogle;
    return {
        showComponent
    };

}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };