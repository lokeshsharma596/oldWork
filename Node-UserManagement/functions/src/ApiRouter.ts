const manageRouter = require("express").Router(); 
const AgentController = require('./controllers/AgentController');
const DepartmentController = require('./controllers/DepartmentController')
const RoleController = require('./controllers/RoleController')
const CommonController = require('./controllers/CommonController')

manageRouter.get('/getAgents',AgentController.getAgents);
manageRouter.post('/createAgent',AgentController.createAgent);
manageRouter.get('/getAgentSidebarData',AgentController.getAgentSidebarData);
manageRouter.get('/getAgent',AgentController.getAgent);
manageRouter.post('/deleteAgents',AgentController.deleteAgents);
manageRouter.put('/updateAgent',AgentController.updateAgent);
manageRouter.get('/searchAgents',AgentController.searchAgents);
manageRouter.get('/getAgentSubstrings',AgentController.getAgentSubstrings);
manageRouter.get('/checkEmailExist',AgentController.checkEmailExist);

manageRouter.get('/getDepartments',DepartmentController.getDepartments);
manageRouter.get('/getDepartment',DepartmentController.getDepartment);
manageRouter.post('/deleteDepartments',DepartmentController.deleteDepartments);
manageRouter.post('/createDepartment',DepartmentController.createDepartment);
manageRouter.put('/updateDepartment',DepartmentController.updateDepartment);


manageRouter.get('/getRoles',RoleController.getRoles);
manageRouter.get('/getRole',RoleController.getRole);
manageRouter.post('/createRole',RoleController.createRole);
manageRouter.post('/deleteRoles',RoleController.deleteRoles);
manageRouter.put('/updateRole',RoleController.updateRole);


manageRouter.get('/checkNameAvailable',CommonController.checkNameAvailable);
manageRouter.get('/getPermissions',CommonController.getPermissions);


module.exports = manageRouter;


//create-post, //upadet-put/patch, //delete-delete, //get-get 