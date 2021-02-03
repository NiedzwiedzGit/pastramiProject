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
var lastScrollTop = 0;
class Info extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    state = {
        id: [],
        folderName: 'info',
        scrollWindowY: 0
    }
    componentDidMount() {
        // this.props.textVar ? console.log("textVar test", this.props.textVar) : console.log("textVar test nooo", this.props.textVar);
        this.props.onfetchTextContent('info');
        window.addEventListener('scroll', this.handleScroll);
        console.log('this.localStorage.getItem(email) ', localStorage.getItem('email'))
    }

    handleScroll = (event) => {
        // console.log('the scroll things', window.innerHeight++)
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
            // downscroll code
            // console.log('downscroll code', st);
            this.setState({ scrollWindowY: st })

        } else {
            // upscroll code
            // console.log('upscroll code', st)
            this.setState({ scrollWindowY: st })
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

        // console.log('upscroll code111', st)
    };

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
                        showImg={true}
                        clickable={false}
                        moveY={this.state.scrollWindowY}
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
        // this.handleScroll();
        console.log('window.pageYOffset ', window.pageYOffset);
        return (
            <div className={classes.Przepisy}>
                <div className={classes.Logo}></div>
                {this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId ?
                    <Button
                        btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                        clicked={this.props.onAddNewPost} /> : null}
                <div className={classes.BackBtnBlock}><BackBtn /></div>
                {this.props.addNewPostContainer && !this.props.loading && this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId ? <NewPost
                    Przepisy={true}
                    field={'textField'}
                    folderName={this.state.folderName}
                /> : null}
                {this.props.addNewPostContainer ? <Backdrop
                    show={this.props.addNewPostContainer}
                    clicked={this.closeHandler} /> : null}
                <div className={classes.ContentDiv} onscroll={(e) => console.lof('e ', e)}>
                    {/* this.setState({ scrollWindowY: window.pageYOffset }) */}
                    <Suspense fallback={<div>loading</div>}>
                        {this.onLoadContent()}
                    </Suspense>
                </div>
            </div >

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