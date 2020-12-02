import React, { Suspense, Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import classes from './Coments.css';
import Coment from '../../components/Coment/Coment';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import ButtonBootstrap from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import NewPost from '../NewPost/NewPost';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
class Coments extends Component {
    state = {
        id: [],
        folderName: 'coment',
        cssClass: null
    }
    componentDidMount() {
        this.props.textVar ? console.log("textVar test", this.props.textVar) : console.log("textVar test nooo", this.props.textVar);
        this.props.onfetchComentContent('coment')
    }

    closeHandler = () => {
        this.props.onAddNewPost();
        this.props.updateHandler ? this.props.onUpdatePostData() : null;
    }
    updatePostData = (postData) => {
        console.log("Przepisy update test ", postData)
        this.props.onUpdatePostData(postData);
        this.props.onAddNewPost();
    }
    comentsHandler = () => {
        this.props.onAddNewPost();
        this.setState({ folderName: 'coment', Przepisy: true });

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
    onLoadComent = () => {
        let folderName = "coment"

        console.log("[comentVar] ", this.props.comentVar)
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        if (this.props.comentVar !== null) {
            if (this.props.comentVar.length !== 0) {

                ImgBlock = this.props.comentVar.map((res, index) => {
                    console.log('split ', res.url.split(","))
                    console.log('split res', res)

                    return <Coment
                        auth={this.props.isAuthenticated}
                        close={this.state.id.includes(res.key) ? 'Close' : null}
                        key={index}
                        url={res.url}
                        name={res.photographs}
                        page="coment"
                        text={res.textField}
                        id={res.key}
                        clicked={() => this.deletePost(res.id, res.imgName, res.key, folderName)}
                        clickedUpdate={() => this.updatePostData(res)}
                        clickedOn={() => this.postSelectedHandler(res.key, res.url.split(","))}
                    />
                });
                console.log(ImgBlock);
            }
        } else { return null };

        return ImgBlock;
    }
    onLoadComent = () => {
        let folderName = "coment"

        console.log("[comentVar] ", this.props.comentVar)
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        if (this.props.comentVar !== null) {
            if (this.props.comentVar.length !== 0) {

                ImgBlock = this.props.comentVar.map((res, index) => {
                    console.log('split ', res.url.split(","))
                    console.log('split res', res)

                    return <Coment
                        auth={this.props.isAuthenticated}
                        close={this.state.id.includes(res.key) ? 'Close' : null}
                        key={index}
                        date={res.date}
                        url={res.url}
                        name={res.photographs}
                        page="coment"
                        text={res.textField}
                        id={res.key}
                        clicked={() => this.deletePost(res.id, res.imgName, res.key, folderName)}
                        clickedUpdate={() => this.updatePostData(res)}
                        clickedOn={() => this.postSelectedHandler(res.key, res.url.split(","))}
                    />
                });
                console.log(ImgBlock);
            }
        } else { return null };

        return ImgBlock;
    }
    render() {
        return (
            <div className={classes.Coments}>
                {/* <Button
                    btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                    clicked={this.props.onAddNewPost} /> */}
                {this.props.addNewPostContainer && !this.props.loading ? <NewPost
                    classType={'OnPage'}
                    Przepisy={true}
                    field={'textField photographs'}
                    folderName={this.state.folderName}
                /> : null}
                <NewPost
                    classType={'OnPage'}
                    Przepisy={true}
                    field={'textField photographs'}
                    folderName={this.state.folderName}
                />
                <Form action={console.log("work")}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <ButtonBootstrap variant="danger"
                        type="submit"
                    // onClick={this.comentsHandler}
                    >Zostaw Komentarz</ButtonBootstrap>
                </Form>
                {this.props.addNewPostContainer ? <Backdrop
                    show={this.props.addNewPostContainer}
                    clicked={this.closeHandler} /> : null}
                <Suspense fallback={<div>loading</div>}>
                    {/* <ButtonBootstrap variant="danger"
                        onClick={this.comentsHandler}
                    >Zostaw Komentarz</ButtonBootstrap> */}
                    <br />
                    <br />
                    <div className={classes.Column}>
                        {this.onLoadComent()}
                    </div>
                </Suspense>
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
        comentVar: state.main.comentVar,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onfetchTextContent: (postData) => dispatch(actions.fetchTextContent(postData)),
        onfetchComentContent: (postData) => dispatch(actions.fetchComentContent(postData))

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coments));