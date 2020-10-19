import ReactTooltip from 'react-tooltip'
import { validateUrl } from "../../utils/functions"
import React,{ Fragment } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useSelector} from "react-redux"

const BreadCrumbs = (props) => {

  const pathname = useLocation().pathname.split("/")[1]
  const folderData = useSelector(state => state.folderReducer)
  const articlesData = useSelector(state => state.articlesReducer)
  const articleData=useSelector(state => state.articleReducer)


  return (
    <Fragment>

      {(pathname === "categories") ?

        <div className="breadcrumb-customes">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/categories">Knowledge Base</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Categories</li>
            </ol>
          </nav>
        </div>

        : (pathname === "category") ?

          <div className="breadcrumb-customes">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/categories">Knowledge Base</Link></li>

                {(Object.keys(folderData.seoData).length > 0) ?
                  (folderData.seoData.header_data.name.length > 20) ?
                    <>
                      <li className="breadcrumb-item active" aria-current="page" data-tip={folderData.seoData.header_data.name} data-place="bottom">{folderData.seoData.header_data.name.substring(0, 20) + " ..."}</li>
                      <ReactTooltip />
                    </>
                    : <li className="breadcrumb-item active" aria-current="page">{folderData.seoData.header_data.name}</li>

                  : null}


              </ol>
            </nav>
          </div>


          : (pathname === "folder") ?


            <div className="breadcrumb-customes">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">

                  <li className="breadcrumb-item"><Link to="/categories">Knowledge Base</Link></li>


                  {(Object.keys(articlesData.seoData).length > 0) ?

                    (articlesData.seoData.category_info.name.length > 20) ?

                      <li className="breadcrumb-item" data-tip={articlesData.seoData.category_info.name} data-place="bottom">

                        <Link to={`/category/${validateUrl(articlesData.seoData.category_info.name)}-${articlesData.seoData.category_info.id}`}>
                          {articlesData.seoData.category_info.name.substring(0, 20) + " ... "}
                        </Link>
                        <ReactTooltip />
                      </li>
                      : (articlesData.seoData.category_info.name.length <= 20) ?
                        <li className="breadcrumb-item">
                          <Link to={`/category/${validateUrl(articlesData.seoData.category_info.name)}-${articlesData.seoData.category_info.id}`} >
                            {articlesData.seoData.category_info.name}
                          </Link>
                        </li>
                        : null

                    : null}



                  {(Object.keys(articlesData.seoData).length > 0) ?

                    (articlesData.seoData.folder_info.name.length > 20) ?
                      <>
                        <li className="breadcrumb-item" data-tip={articlesData.seoData.folder_info.name} data-place="bottom">
                          {articlesData.seoData.folder_info.name.substring(0, 20) + " ... "}
                          <ReactTooltip />
                        </li>

                      </>
                      : (articlesData.seoData.folder_info.name.length <= 20) ?
                        <li className="breadcrumb-item active">{articlesData.seoData.folder_info.name}</li>

                        : null

                    : null}

                </ol>
              </nav>
            </div>

            : (pathname === "article") ?
              <Fragment>
                <div className="breadcrumb-customes">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/categories">Knowledge Base</Link></li>

                      {(Object.keys(articleData.articleSeo).length > 0) ?
                        (articleData.articleSeo.category_info.name.length > 20) ?
                          <>
                            <li className="breadcrumb-item" data-tip={articleData.articleSeo.category_info.name} data-place="bottom">
                              <Link to={`/category/${validateUrl(articleData.articleSeo.category_info.name)}-${articleData.articleSeo.category_info.id}`} >
                                {articleData.articleSeo.category_info.name.substring(0, 20) + " ... "}
                              </Link><ReactTooltip />
                            </li>

                          </>
                          : (articleData.articleSeo.category_info.name.length <= 20) ?
                            <li className="breadcrumb-item">
                            <Link to={`/category/${validateUrl(articleData.articleSeo.category_info.name)}-${articleData.articleSeo.category_info.id}`} >
                              {articleData.articleSeo.category_info.name}
                            </Link>
                            </li>
                            : null

                        : null}



                      {(Object.keys(articleData.articleSeo).length > 0) ?

                        (articleData.articleSeo.folder_info.name.length > 20) ?
                          <>
                            <li className="breadcrumb-item" data-tip={articleData.articleSeo.folder_info.name} data-place="bottom">


                              <Link to={`/folder/${validateUrl(articleData.articleSeo.folder_info.name)}-${articleData.articleSeo.folder_info.id}`} >
                                {articleData.articleSeo.folder_info.name.substring(0, 20) + " ... "}
                              </Link>
                              <ReactTooltip />
                            </li>

                          </>
                          : (articleData.articleSeo.folder_info.name.length <= 20) ?
                            <li className="breadcrumb-item"><Link to={`/folder/${validateUrl(articleData.articleSeo.folder_info.name)}-${articleData.articleSeo.folder_info.id}`} >{articleData.articleSeo.folder_info.name}</Link></li>

                            : null

                        : null}


                      {(Object.keys(articleData.article).length > 0) ?
                        (articleData.article.name.length > 20) ?
                          <>
                            <li className="breadcrumb-item active" data-tip={articleData.article.name} data-place="bottom">{articleData.article.name.substring(0, 20) + " ... "}
                              <ReactTooltip />
                            </li>

                          </>
                          : (articleData.article.name.length <= 20) ?
                            <li className="breadcrumb-item active" aria-current="page">{articleData.article.name}</li>

                            : null

                        : null}


                    </ol>
                  </nav>
                </div>

              </Fragment>

              : (pathname === "preview") ?

                <div className="breadcrumb-customes">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a>Preview</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Article</li>
                    </ol>
                  </nav>
                </div>



                : null}


    </Fragment>
  )
}

export default BreadCrumbs;