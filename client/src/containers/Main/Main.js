import React, { Suspense, Component } from 'react';
import classes from './Main.css';
import { connect } from 'react-redux';
import ContentBlock from '../../containers/ContentBlock/ContentBlock';
// import Coment from '../../components/Coment/Coment';

import Backdrop from '../../components/UI/Backdrop/Backdrop';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import * as actions from '../../store/actions/index';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import asyncAuth from '../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const postGalery = asyncComponent(() => {
    return import('../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent');

});
class Main extends Component {
    state = {
        url: [],
        text: false,
        test: null,
        id: [],
        folderName: 'newposts',
        active: null
    }
    componentDidMount() {
        this.props.onfetchTextContent('clean');
    }
    deletePost = (id, imgName, key) => {
        this.setState({ id: [...this.state.id, key] });

        this.props.onDeletePost(id, imgName, key, this.state.folderName);
    }
    updatePostData = (postData) => {
        this.props.onUpdatePostData(postData);
        this.props.onAddNewPost();
    }
    // postSelectedHandler = (id, urlArray) => {
    //     // this.props.history.push({ pathname: id });
    //     // console.log("urlArray ", urlArray)
    //     this.props.onUrlArray(urlArray);
    // }
    onLoadContent = () => {
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        let testArray = [0, 1, 2, 3, 5];
        ImgBlock = testArray.map((res, index) => {
            return <div className={[classes[this.state.active]].join(' ')}
                onMouseEnter={() => this.setState({ active: "Active" })}
                onMouseLeave={() => this.setState({ active: "ContentBlock" })}>
                <ContentBlock key={index} num={index} class={index % 2 ? "ContentBlockPaire" : null} />
            </div>
        });

        return ImgBlock;
    }
    closeHandler = () => {
        this.props.onAddNewPost();
        this.props.updateHandler ? this.props.onUpdatePostData() : null;
    }
    render() {
        return (

            <div className={classes.Main} >
                {this.props.addNewPostContainer ? <Backdrop
                    show={this.props.addNewPostContainer}
                    clicked={this.closeHandler} /> : null}
                <Suspense fallback={<div>loading</div>}>
                    {this.onLoadContent()}
                </Suspense>
            </div >
        );
    };
};


const mapStateToProps = state => {
    return {
        postContent: state.main.postContent,
        loadingNewPost: state.newpost.loading,
        addNewPostContainer: state.newpost.addNewPostContainer,
        loadingContent: state.main.loading,
        updateHandler: state.newpost.updateHandler

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchContent: () => dispatch(actions.fetchMainContent()),
        // onFetchPostContent: () => dispatch(actions.fetchPostContent()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        // onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onfetchTextContent: (postData) => dispatch(actions.fetchTextContent(postData))

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));