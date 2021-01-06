import './App.css';
import './components/Icons/icons'
// import DisplayMessage from './pages/Login/DisplayMessage';
import GlobalStyle from './GlobalStyleSheet/globalStyleSheet';
import LoginPage from './pages/Login';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<div>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route path="/" exact>
						<LoginPage />
					</Route>
					<Route path="/login">
						<LoginPage />
					</Route>
					<PrivateRoute path="/dashboard">
						<DashboardPage />
					</PrivateRoute>
					<PrivateRoute path="/randompage">
						<h3>Hi there!</h3>
					</PrivateRoute>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
