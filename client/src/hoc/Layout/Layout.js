import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Main from '../../containers/Main/Main';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

import * as actions from '../../store/actions/index';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;


class Layout extends Component {
    state = {
        showSideDrawer: false,
        waitLoader: false,
    }
    componentDidMount() {
        //  console.log(this.props.routes);
        // this.props.onFetchContent();
        this.props.onFetchPostContent();
        this.props.onFetchPrzepisyContent();
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerToggleHamdler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        // console.log(!this.props.loading, !this.props.loadingContent);
        return (
            <Aux>
                {/* <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHamdler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} /> */}

                {!this.props.loading ? <CircleLoader
                    css={override}
                    size={150}
                    color={"grey"}
                    loading={this.state.waitLoader}
                /> : null}
                {!this.props.loading && !this.props.loadingContent ?
                    <main>{this.props.children}</main>
                    : <CircleLoader
                        css={override}
                        size={150}
                        color={"grey"}
                        loading={true}
                    />}

            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        imageContentPath: state.main.imageContentPath,
        loading: state.main.loading,
        loadingContent: state.main.loadingContent,
        imageContentFullPath: state.main.imageContentFullPath,
        postContent: state.main.postContent
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchPrzepisyContent: () => dispatch(actions.fetchPrzepisyContent()),
        onFetchPostContent: () => dispatch(actions.fetchPostContent())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);