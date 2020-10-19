import ReactHtmlParser from "react-html-parser"
import React,{Fragment} from "react"
import {useSelector} from "react-redux"

const ArticleContent =() =>{
    const articleData = useSelector(state => state.articleReducer)

    return(
        <Fragment>
              {/* <Head>
                <meta property="og:url" content={location.href} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={props.article.name} />
                <meta property="og:description" content={props.article.name} />
                <meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
            </Head> */}

        <div className="article-body">
            <div className="article-headingds">
                <h3 className="card-title mb-0">{articleData.article.name}</h3>
            </div>
            <div className="artcle-details-new">
                {ReactHtmlParser(articleData.article.description)}
            </div>
        </div>
    </Fragment>
    )
}

export default ArticleContent;