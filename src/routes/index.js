import LoginComponent from '../containers/Login';
import SignupComponent from '../containers/Signup';
import SummarizeComponent from '../containers/Summarize';
import DashboardComponent from '../containers/Dashboard';

const routes = [
    {
        pathname : "/",
        component : SummarizeComponent,
        title : "Summarize"
    },
    {
        pathname : "/login",
        component : LoginComponent,
        title: "Login"
    },
    {
        pathname : "/signup",
        component : SignupComponent,
        title : "signup"
    },    
    {
        pathname : "/dashboard",
        component : DashboardComponent,
        title : "Dashboard"
    }
]

export default routes;