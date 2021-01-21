import React, { Suspense, Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';

import classes from './Info.css';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import NewPost from '../NewPost/NewPost';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { withRouter } from 'react-router-dom';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
class Info extends Component {
    state = {
        id: [],
        folderName: 'info'
    }
    componentDidMount() {
        // this.props.textVar ? console.log("textVar test", this.props.textVar) : console.log("textVar test nooo", this.props.textVar);
        this.props.onfetchTextContent('info');
        console.log('this.localStorage.getItem(email) ', localStorage.getItem('email'))
    }

    closeHandler = () => {
        this.props.onAddNewPost();
        this.props.updateHandler ? this.props.onUpdatePostData() : null;
    }
    updatePostData = (postData) => {
        // console.log("Przepisy update test ", postData)
        this.props.onUpdatePostData(postData);
        this.props.onAddNewPost();
    }
    deletePost = (id, imgName, key) => {
        this.setState({ id: [...this.state.id, key] });
        this.props.onDeletePost(id, imgName, key, this.state.folderName);
    }
    postSelectedHandler = (id, urlArray) => {
        this.props.history.push({ pathname: "info/" + id });
        // console.log("urlArray ", urlArray)
        this.props.onUrlArray(urlArray);
    }
    onLoadContent = () => {
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={true}
        />;
        if (this.props.textVar !== null) {
            if (this.props.textVar.length !== 0) {
                ImgBlock = this.props.textVar.map((res, index) => {
                    return <ImagesBlock
                        auth={this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId}
                        close={this.state.id.includes(res.key) ? 'Close' : null}
                        key={index}
                        url={res.url}
                        page="Info"
                        text={res.textField}
                        id={res.key}
                        clicked={() => this.deletePost(res.id, res.imgName, res.key)}
                        clickedUpdate={() => this.updatePostData(res)}
                        clickedOn={() => this.postSelectedHandler(res.key, res.url.split(","))}
                    />
                });
            }
        } else { return null };

        return ImgBlock;
    }
    render() {
        return (
            <div className={classes.Przepisy}>
                {this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId ?
                    <Button
                        btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                        clicked={this.props.onAddNewPost} /> : null}
                <BackBtn />
                {this.props.addNewPostContainer && !this.props.loading && this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId ? <NewPost
                    Przepisy={true}
                    field={'textField'}
                    folderName={this.state.folderName}
                /> : null}
                {this.props.addNewPostContainer ? <Backdrop
                    show={this.props.addNewPostContainer}
                    clicked={this.closeHandler} /> : null}
                <div className={classes.ContentDiv}>
                    <Suspense fallback={<div>loading</div>}>
                        {this.onLoadContent()}
                    </Suspense>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        addNewPostContainer: state.newpost.addNewPostContainer,
        updateHandler: state.newpost.updateHandler,
        // postContent: state.main.postContent,
        textVar: state.main.textVar,
        isAuthenticated: state.auth.token !== null,
        adminId: state.main.adminId
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onfetchTextContent: (postData) => dispatch(actions.fetchTextContent(postData))

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Info));