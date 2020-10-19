import React from 'react';
import { BrowserRouter as Router, 
         Route, 
         Switch,  
         Redirect } from "react-router-dom"

import HomePage from "../containers/HomePage"
import ErrorPage from "../containers/NotFoundPage"
import RolesPage from "../containers/RolesPage"
import DepartmentsPage from "../containers/DepartmentsPage"
import AgentsPage from "../containers/AgentsPage"
import Loader from "./../components/Loader"

export default function Routes() {
  return (
    //basename={'/usermanagement'}
    (!localStorage.getItem("userId"))?<Loader/>:
    <Router basename={'/usermanagement'}>
      <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/agents" component={AgentsPage}/>
      <Route exact path="/roles" component={RolesPage}/>
      <Route  path="/departments" component={DepartmentsPage}/>
      <Route exact path="/404" component={ErrorPage}/>
      <Redirect to="/404" />
      </Switch> 
    </Router>
  )
}

