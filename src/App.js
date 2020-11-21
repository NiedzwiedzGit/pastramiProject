import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';


import classes from './App.css';


// const postGalery = asyncComponent(() => {
//   return import('./components/ImagesBlock/ImagesBlockContent/ImagesBlockContent');

// });
const Przepisy = asyncComponent(() => {
  return import('./containers/Przepisy/Przepisy');
});
const Main = asyncComponent(() => {
  return import('./containers/Main/Main');
});
const Info = asyncComponent(() => {
  return import('./containers/Info/Info');
});
const Coment = asyncComponent(() => {
  return import('./containers/Coments/Coments');
});
const Orders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const Contact = asyncComponent(() => {
  return import('./containers/Contact/Contact');
});

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <AnimatedSwitch
          atEnter={{ opacity: 1 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className={classes.SwitchWrapper}
        >
          <Route path={'/o_nas'} component={Info} />
          <Route path={'/zamowienia'} exact component={Orders} />
          <Route path={'/kontakt'} exact component={Contact} />
          <Route path={'/opinie'} component={Coment} />
          <Route path={'/przepisy'} component={Przepisy} />
          {this.props.isAuthenticated ?
            <Route path={'/przepisy'} component={Przepisy} /> : null}
          {/* <Route path={'/postGalery/:id'} component={postGalery} /> */}
          <Route path="/" component={Main} />
          <Redirect to="/" />
        </AnimatedSwitch>
      </Switch>
    );
    console.log("test App");
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapstateToProps = state => {
  return {
    // isAuthenticated: state.auth.token !== null
  };
};

const dispatchToProps = dispatch => {
  return {
    //  onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapstateToProps, dispatchToProps)(App));
