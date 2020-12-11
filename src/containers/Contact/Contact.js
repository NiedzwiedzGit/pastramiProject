import React, { Suspense, Component, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';
import classes from './Contact.css';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

// import NewPost from '../NewPost/NewPost';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { withRouter, NavLink } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";

// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import Logout from '../Auth/Logout/Logout';
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
    const [auth, setAuth] = useState('');

    useEffect(() => {
        // console.log("test useState ", post);
        // console.log("test props.isAuthenticated ", props.isAuthenticated);
        callApi()
            .then(res => setResponse(res.express))
            .catch(err => console.log(err));
        // if (props.isAuthenticated) {
        //     <Redirect to="/" />;
        // }

    });


    const responseFacebook = (response) => {
        // console.log("faceebook ", response);
        // e.preventDefault();
        props.onAuth(response.email, response.id, true);
    }
    const responseGoogle = (response) => {
        //console.log(response);
    }

    let callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("test body ", body);

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
        // console.log("worck handleSubmit ", response);

        const body = await response.text();
        // console.log("test333333333 handleSubmit ", JSON.stringify({ post: post }));

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
        //console.log("Przepisy update test ", postData)
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
                    //console.log('split ', res.url.split(","))
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

            .signInWithPopup(provider).then(result => {
                var token = result.credential.accessToken;
                var user = result.user;
                // props.onAuth(result.user.email, result.additionalUserInfo.profile.id, true,true);

                // console.log(token)
                // console.log(user)
                // console.log("inside ggogle reg ", result);
            }).catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;

                // console.log(error.code)
                // console.log(error.message)
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
                Do wysyłania wiadomości należy być zalogowanym
    </Form.Text>

            {/* <FacebookLogin
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
            /> */}
            {!props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn('facebook')} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" />
                <p className={classes.BtnText}><b>Sign in with Facebook</b></p></ButtonBootstrap> : null}

            {!props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn()} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                <p className={classes.BtnText}><b>Sign in with google</b></p></ButtonBootstrap> : null}

            {/* <GoogleLogin
                clientId="1075959317019-k2m2tjfnio620nr30tb56qsj5dan4el6.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                // cookiePolicy={'single_host_origin'}
                buttonText="Login with Google"
            /> */}
            {/* <GoogleLogout
                clientId="1075959317019-k2m2tjfnio620nr30tb56qsj5dan4el6.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={responseGoogle}
            /> */}

            {!props.isAuthenticated ?
                <NavLink to={"/auth"}>
                    <ButtonBootstrap variant="light" ><span>Register</span></ButtonBootstrap>
                </NavLink>
                :
                <NavLink to={"/logout"}>
                    <ButtonBootstrap variant="light" ><span>Logout</span></ButtonBootstrap>
                </NavLink>
            }
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
    // props.isAuthenticated ? console.log("logineed") : console.log("not logineed")
    return (
        <div className={classes.Contact} {...handlers}>


            {/* <Button
                btnType={!props.addNewPostContainer ? "Add" : "Close"}
                clicked={props.onAddNewPost} />
            {props.addNewPostContainer && !props.loading ? <NewPost
                Przepisy={true}
                field={'skladniki przygotowanie webAddress'}
                folderName={folderName}
            /> : null} */}
            {props.addNewPostContainer ? <Backdrop
                show={props.addNewPostContainer}
                clicked={closeHandler} /> : null}
            <Suspense fallback={<div>loading</div>}>
                {/* {onLoadContent()} */}
                <div className={classes.ContactLeft}>

                    <div className={classes.ContactLeftBlock}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        <span className={classes.ContactLeftBlockTitle}> Address</span><br /><br />
                        <span className={[classes.ContactLeftBlockContent, classes.Grey].join(' ')}>Mada Center 8th floor, 379 Hudson St, New York, NY 10018 US</span>
                    </div>
                    <div className={classes.ContactLeftBlock}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-telephone" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                        <span className={classes.ContactLeftBlockTitle}> Lets Talk</span><br /><br />
                        <span className={[classes.ContactLeftBlockContent, classes.Green].join(' ')}>5465465465</span>
                    </div>
                    <div className={classes.ContactLeftBlock}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                        </svg>
                        <span className={classes.ContactLeftBlockTitle}> General Support</span><br /><br />
                        <span className={[classes.ContactLeftBlockContent, classes.Green].join(' ')}>test@email.com</span>
                    </div>
                </div>
                <div className={classes.ContactRight}>
                    <BackBtn />{form}</div>

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
        onAuthSn: (sNlogin) => dispatch(actions.authSn(sNlogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))


    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conact));