import { Container } from 'semantic-ui-react';
import React, { Fragment } from 'react';
import NavBar from "../../features/navigation/NavBar";
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from "../../features/homePage/HomePage";
import UsersDashboard from "../../features/users/UsersDashboard";
import UserForm from "../../features/users/UserForm";
import SearchDashboard from "../../features/search/SearchDashboard";

;

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <NavBar />
      <Container fluid className='homepage-default--layout' >
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route key={location.key} path={['/usersDashboard', '/usersDashboard/:status']}
            component={UsersDashboard} />
          <Route key={location.key} path={['/search/:searchTerm']}
            component={SearchDashboard} />
          <Route key={location.key} path={['/users/addUser', '/users/manage/:id']}
            component={UserForm} />
        </Switch>
      </Container>

    </Fragment>
  );
}

export default withRouter(App);
