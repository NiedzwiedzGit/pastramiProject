import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
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
        return (
            <Aux>

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