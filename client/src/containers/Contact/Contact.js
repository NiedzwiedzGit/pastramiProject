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
import Input from '../../components/UI/Input/Input'

// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import Logout from '../Auth/Logout/Logout';
import firebase from '@firebase/app';

import { dbF, db } from "../../shared/firebase";



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
    const [response, setResponse] = useState('');
    const [post, setPost] = useState('');
    const [responseToPost, setResponseToPost] = useState('');
    const [auth, setAuth] = useState('');
    const [message, setMessage] = useState('');
    const [arrMessage, setArrMessage] = useState([]);


    // useEffect(() => {
    //     // props.onChatListener();
    //     // callApi()
    //     //     .then(res => setResponse(res.express))
    //     //     .catch(err => console.log(err));
    //     if (props.sendMessage) {
    //         // chatActualization()
    //     }
    //     // console.log("props.sendMessage ", props.sendMessage)
    // });
    useEffect(() => {
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            // await chatActualization();
            dbF.ref("chat").on("value", snapshot => {
                console.log("snap.val() ", snapshot.val())

                let chats = [];
                snapshot.forEach((snap) => {
                    console.log("snap.val() ", snap.val().text)
                    chats.push(snap.val().text);
                });
                setArrMessage(chats)
            });
        }
        // Execute the created function directly
        anyNameFunction();
    }, []);

    const responseFacebook = (response) => {
        props.onAuth(response.email, response.id, true);
    }
    const responseGoogle = (response) => {
    }

    let callApi = async () => {
        const response = await fetch('/api');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    let handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api', {//'/api/mail' to bylo
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: post }),
        });
        const body = await response.text();
        setResponseToPost(body);
    };

    const handlers = useSwipeable({
        onSwipedRight: () => props.history.push({ pathname: "/" })
    });
    let closeHandler = () => {
        props.onAddNewPost();
        props.updateHandler ? props.onUpdatePostData() : null;
    }
    let updatePostData = (postData) => {
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
            }).catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
    let form = (
        < Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
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
                {!props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn('facebook')} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" />
                    <p className={classes.BtnText}><b>Sign in with Facebook</b></p></ButtonBootstrap> : null}

                {!props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn()} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                    <p className={classes.BtnText}><b>Sign in with google</b></p></ButtonBootstrap> : null}

                {!props.isAuthenticated ?
                    <NavLink to={"/auth"}>
                        <ButtonBootstrap variant="light" ><span>Register/Sing In</span></ButtonBootstrap>
                    </NavLink>
                    :
                    <NavLink to={"/logout"}>
                        <ButtonBootstrap variant="light" ><span>Logout</span></ButtonBootstrap>
                    </NavLink>
                }
            </Form.Group>
            {props.isAuthenticated ? <NavLink to={"/kontakt"}>
                <ButtonBootstrap variant="success" type="submit" >
                    Wysłać
            </ButtonBootstrap>
            </NavLink> : null}
        </Form >
    );
    var db = firebase.firestore();
    // db.collection("users").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    // })
    //     .then((docRef) => {
    //         console.log("Document written with ID: ", docRef);
    //     })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //     });

    // db.collection("cities").doc("LA").set({
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA",
    //     text: "message"
    // })
    //     .then(() => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });

    // let messageBox = [];
    // db.collection("users").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.data().text}`);
    //         messageBox.push(doc.data().text);
    //         messageBox.length == arrMessage.length ? console.log("good") : check((doc.data().text));
    //         console.log('messageBox ', messageBox.length);
    //     });
    // });
    let check = (m) => {
        // setArrMessage([...arrMessage, m]);

    }


    // db.collection("cities").doc("LA")
    //     .onSnapshot((doc) => {            // doc.fE.kt.proto.mapValue.fields.text.stringValue
    //         console.log("Current data: ", doc.data().text);
    //         console.log("Current data: ", doc.fE.kt.proto.mapValue.fields.text.stringValue);
    //     });

    let chatActualization = () => {
        props.onChatListener();
        setArrMessage([...arrMessage, props.messageBox]);
    }
    let chatTextHandler = () => {
        props.onChatListener(message);
        setArrMessage([...arrMessage, message]);
        setMessage('')
        // db.collection("users").add({
        //     text: message
        // }).then(setMessage(''))


    }
    let chatText = () => {
        // props.onChatListener();
        // let messageBox = [];
        // db.collection("users").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.data().text}`);
        //         messageBox.push(doc.data().text);
        //     });
        // });
        return (
            arrMessage.map(res => {
                // props.messageBox.map(res => {
                // console.log("res ", res)
                return <div className={classes.MessageHolder}><div>{res}</div></div>
            }))
    };
    let chat = (
        <div className={classes.ContentEditInputLine}>
            {props.isAuthenticated ? <NavLink to={"/logout"} className={classes.LogoutBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                </svg>
            </NavLink> : null}
            <Input
                anableHideBtn="false"
                classAdd={!props.isAuthenticated ? "ContactChatHide" : "ContactChat"}
                disabled={!props.isAuthenticated ? 'true' : null}
                elementType='textarea'

                value={props.isAuthenticated ? message : 'Zaloguj się'}
                changed={(event) => setMessage(event.target.value)}
            />
            {props.isAuthenticated ?
                <ButtonBootstrap variant={"light"}
                    className={!props.isAuthenticated ? classes.SendMessageBtnUn : classes.SendArrow}
                    onClick={() => chatTextHandler()}
                    disabled={!props.isAuthenticated ? true : false}
                ></ButtonBootstrap> : null}
        </div>
    );
    // setTimeout(() => chatActualization(), 10000)
    return (
        <div className={classes.Contact} {...handlers}>
            <div className={classes.BackBtnBlock}><BackBtn /></div>
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
                    {/* {form} */}
                    <div className={classes.ChatMessage}>
                        {chatText()}
                    </div>
                    {chat}
                </div>
            </Suspense>
        </div >
    );

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
        authRedirectPath: state.auth.authRedirectPath,
        messageBox: state.main.messageBox,
        sendMessage: state.main.sendMessage
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onChatListener: (message) => dispatch(actions.fetchChat(message)),
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onAuthSn: (sNlogin) => dispatch(actions.authSn(sNlogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))


    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conact));