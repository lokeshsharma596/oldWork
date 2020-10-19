import {combineReducers} from 'redux'
import agentsReducer from "../containers/AgentsPage/reducer"
import departmentsReducer from "../containers/DepartmentsPage/reducer"
import rolesReducer from "../containers/RolesPage/reducer"
import homeReducer from "../containers/HomePage/reducer"

export default combineReducers({
    agentsReducer,
    departmentsReducer,
    rolesReducer,
    homeReducer
})

