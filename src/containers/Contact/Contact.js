import React, { Suspense, Component, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { SocialMediaIconsReact } from 'social-media-icons-react';
import Button from '../../components/UI/Button/Button';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';
import classes from './Contact.css';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import NewPost from '../NewPost/NewPost';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import firebase from '@firebase/app';





const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
const withCols = css`
 with:90vw;
`;

const Conact = React.memo(props => {
    const [id, setId] = useState([]);
    const [folderName, setFolderName] = useState('przepisy');

    // state = {
    //     id: [],
    //     folderName: 'przepisy'
    // }
    // componentDidMount() {
    //     this.props.Przepisy ? console.log("Przepisy test", this.props.Przepisy) : console.log("Przepisy test nooo", this.props.Przepisy)
    // }
    const [response, setResponse] = useState('');
    const [post, setPost] = useState('');
    const [responseToPost, setResponseToPost] = useState('');

    useEffect(() => {
        console.log("test useState ", post);
        callApi()
            .then(res => setResponse(res.express))
            .catch(err => console.log(err));
    });


    const responseFacebook = (response) => {
        console.log("faceebook ", response);
        // e.preventDefault();
        props.onAuth(response.email, response.id, true);
    }
    const responseGoogle = (response) => {
        console.log(response);
    }

    let callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("test body ", body);

        return body;
    };

    let handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: post }),
        });
        console.log("worck handleSubmit ", response);

        const body = await response.text();
        console.log("test333333333 handleSubmit ", JSON.stringify({ post: post }));

        setResponseToPost(body);
    };


    const handlers = useSwipeable({
        // onSwiped: () => console.log("User Swiped!")
        onSwipedRight: () => props.history.push({ pathname: "/" })

    });
    let closeHandler = () => {
        props.onAddNewPost();
        props.updateHandler ? props.onUpdatePostData() : null;
    }
    let updatePostData = (postData) => {
        console.log("Przepisy update test ", postData)
        props.onUpdatePostData(postData);
        props.onAddNewPost();
    }
    let deletePost = (id, imgName, key) => {
        // this.setState({ id: [...this.state.id, key] });
        setId([...id, key])
        props.onDeletePost(id, imgName, key, this.state.folderName);
    }
    let postSelectedHandler = (id, urlArray) => {
        props.history.push({ pathname: "prasa/" + id });
        // console.log("urlArray ", urlArray)
        props.onUrlArray(urlArray);
    }
    let onLoadContent = () => {
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={true}
        />;
        if (props.Przepisy !== null) {
            if (props.Przepisy.length !== 0) {
                ImgBlock = props.Przepisy.map((res, index) => {
                    console.log('split ', res.url.split(","))
                    return <ImagesBlock
                        auth={true}
                        close={id.includes(res.key) ? 'Close' : null}
                        key={index}
                        url={res.url}
                        num={res.url.split(",").length}
                        page="Przepisy"
                        skladniki={res.skladniki}
                        przygotowanie={res.przygotowanie}
                        webAddress={res.webAddress}
                        id={res.key}
                        clicked={() => deletePost(res.id, res.imgName, res.key)}
                        clickedUpdate={() => updatePostData(res)}
                        clickedOn={() => postSelectedHandler(res.key, res.url.split(","))}
                    />
                });
                console.log(ImgBlock);
            }
        } else { return null };

        return ImgBlock;
    }
    var provider = new firebase.auth.GoogleAuthProvider();

    const googleSignin = () => {
        firebase.auth()

            .signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;

                console.log(token)
                console.log(user)
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(error.code)
                console.log(error.message)
            });
    }
    // render() {
    let form = (< Form onSubmit={handleSubmit}>


        <Form.Group controlId="formBasicEmail">
            <Form.Label>Napisz wiadomosc</Form.Label>
            <Form.Control
                as="textarea" rows={3}
                placeholder={props.isAuthenticated ? "Napisz wiadomość" : "Zaloguj sie aby napisac wiadomość"}
                value={post}
                onChange={e => setPost(e.target.value)}
                disabled={props.isAuthenticated ? false : true}
            />
            <Form.Text className="text-muted">
                For sending mail you should be registred
    </Form.Text>

            <FacebookLogin
                appId="728547514687231"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends,email"
                callback={responseFacebook}
                //cssClass={[classes.LoginBtn]} //its work
                //cssClass="kep-login-facebook kep-login-facebook-[small]"
                size="small"
                icon="fa-facebook"
            // textButton="Facebook"
            //onClick={() => responseFacebook}
            />
            <button onClick={googleSignin}>Google Signin</button>
            {/* <GoogleLogin
                clientId="1075959317019-k2m2tjfnio620nr30tb56qsj5dan4el6.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                buttonText="Login with Google"
            /> */}

            <NavLink
                to={"/auth"}
            // exact={props.exact}
            // activeClassName={classes.active}
            >
                <ButtonBootstrap variant="light"><span>Register</span></ButtonBootstrap>

            </NavLink>
        </Form.Group>

        {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <ButtonBootstrap variant="dark" type="submit" className={classes.Submit}>
            {/* onClick={() => sentMail("test1", "test2")} */}
            Submit
  </ButtonBootstrap>
    </Form >
    );
    props.isAuthenticated ? console.log("logineed") : null
    return (
        <div className={classes.Contact} {...handlers}>

            <BackBtn />
            <Button
                btnType={!props.addNewPostContainer ? "Add" : "Close"}
                clicked={props.onAddNewPost} />
            {props.addNewPostContainer && !props.loading ? <NewPost
                Przepisy={true}
                field={'skladniki przygotowanie webAddress'}
                folderName={folderName}
            /> : null}
            {props.addNewPostContainer ? <Backdrop
                show={props.addNewPostContainer}
                clicked={closeHandler} /> : null}
            <Suspense fallback={<div>loading</div>}>
                {/* {onLoadContent()} */}
                {form}
            </Suspense>
            {/* <p>sdfsdfdsf2{responseToPost}</p> */}
        </div>
    );
    //}

}
)
const mapStateToProps = state => {
    return {
        addNewPostContainer: state.newpost.addNewPostContainer,
        updateHandler: state.newpost.updateHandler,
        // postContent: state.main.postContent,
        Przepisy: state.main.Przepisy,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),

        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))


    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conact));