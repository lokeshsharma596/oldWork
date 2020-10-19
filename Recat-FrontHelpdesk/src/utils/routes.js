import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"

import ArticlePage from "../containers/ArticlePage"
import ArticlesPage from "../containers/ArticlesPage"
import CategoryPage from "../containers/CategoryPage"
import ConfirmPasswordPage from "../containers/ConfirmPasswordPage"
import FolderPage from "../containers/FolderPage"
import ForgotPasswordPage from "../containers/ForgotPasswordPage"
import ForgotPasswordSuccess from "../containers/ForgotPasswordSuccess"
import LoginPage from "../containers/LoginPage"
import PreviewPage from "../containers/PreviewPage"
import SignupPage from "../containers/SignupPage"
import SignupSuccessPage from "../containers/SignupSuccessPage"
import VerifyPasswordPage from "../containers/VerifyPasswordPage"
import IndexPage from "../containers/IndexPage"
import MyAreaPage from "../containers/MyAreaPage"
import ErrorPage from "../containers/404Page"


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/categories" component={CategoryPage} />
        <Route exact path="/category/:id" component={FolderPage} />
        <Route exact path="/folder/:id" component={ArticlesPage} />
        <Route exact path="/article/:id" component={ArticlePage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/forgot-password-success" component={ForgotPasswordSuccess} />
        <Route exact path="/signup-success" component={SignupSuccessPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/confirm-password/:id" component={ConfirmPasswordPage}/>
        <Route exact path="/verify/:id" component={VerifyPasswordPage} />
        <Route exact path="/preview/:id" component={PreviewPage} />  
        <Route exact path="/my-area" component={MyAreaPage} />  
        <Route exact path="/404" component={ErrorPage} />  
      <Redirect to="/404" /> 
      </Switch>
    </Router>
  )
}

