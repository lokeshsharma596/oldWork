import React from 'react';
import { connect } from 'react-redux';;
import config from 'config';
class Breadcumb extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(userActions.getAll());
    // }
    constructor(props) {
        super(props);
        this._handlesidebar = this._handlesidebar.bind(this)
    }
    
    _handlesidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'TOGGLE' })
    }
    
    render() {
        const { user } = this.props;
        const bredcumb = ((this.props.bredcumb.cayegoryName == 'allpublish')?"All Published Articles":((this.props.bredcumb.cayegoryName == 'alldrafts')?"All Drafts Articles":((this.props.bredcumb.cayegoryName == 'allarticle')?"All Articles":this.props.bredcumb.cayegoryName)));
        //const breadcumb=(this.props.bredcumb == 'home')?'':(this.props.bredcumb.cayegoryName)?<li className="breadcrumb-item active"><a href="#">{this.props.bredcumb.cayegoryName.replace('_',' ')+(this.props.bredcumb.folderName?'/'+this.props.bredcumb.folderName.replace('_',' '):'')}</a></li>:'';
        return (
                <div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="customeBreadcrumb pb-2">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">  
                                    <li className="breadcrumb-item"><a href="#">Knowledge Home</a></li>
                                    {(this.props.bredcumb.cayegoryName && !this.props.bredcumb.folderName)?<li className="breadcrumb-item active"><a href="#">{bredcumb.replace(/_/g,' ')}</a></li>:(this.props.bredcumb.cayegoryName && this.props.bredcumb.folderName)?<li className="breadcrumb-item"><a href={`${config.path}`+`/folder/`+this.props.bredcumb.cayegoryName.replace(/ /g, "_")+'/'+this.props.bredcumb.catId}>{bredcumb.replace(/_/g,' ')}</a></li>:''}
                                    {(this.props.bredcumb.folderName)?<li className="breadcrumb-item active"><a href="#">{this.props.bredcumb.folderName.replace(/_/g,' ')}</a></li>:''}
                                    {(this.props.bredcumb == 'Help Portal Settings' || this.props.bredcumb == 'Basic Settings')?<li className="breadcrumb-item active"><a href="#">{this.props.bredcumb}</a></li>:''}
                                    
                                       {/*  <li className="breadcrumb-item active" aria-current="page">Solutions Home</li> */}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="page-heading body-heading k-flex">
                                <span className="icon customicon-solution-home mr-2 fnt-24 menu-toggle" onClick={this._handlesidebar}></span>
                                <span className="body-heading-span">{(this.props.bredcumb && this.props.bredcumb != 'home' && this.props.bredcumb != 'Help Portal Settings' && this.props.bredcumb != 'Basic Settings' && this.props.bredcumb != 'solutions'?(!this.props.bredcumb.folderName)?(bredcumb).replace(/_/g,' '):(bredcumb).replace(/_/g,' '):(this.props.bredcumb != 'home' &&  this.props.bredcumb != 'Help Portal Settings' && this.props.bredcumb != 'Basic Settings')?'Knowledge Home':this.props.bredcumb)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                    
        );
    }
}
function mapStateToProps(state) {
    
    const { showComponent } = state.toogle;
    return {
        showComponent
    };
}
  Breadcumb = connect(mapStateToProps)(Breadcumb);
export default Breadcumb;