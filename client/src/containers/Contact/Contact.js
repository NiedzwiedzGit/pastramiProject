import React, { Suspense, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';
import classes from './Contact.css';
import ButtonBootstrap from 'react-bootstrap/Button';

import { css } from "@emotion/core";

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { withRouter, NavLink } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";
import Input from '../../components/UI/Input/Input'
import noImg from '../../assets/images/noimage.png';

import { dbF } from "../../shared/firebase";



const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const Conact = React.memo(props => {
    const [post, setPost] = useState('');
    const [responseToPost, setResponseToPost] = useState('');
    const [auth, setAuth] = useState('');
    const [message, setMessage] = useState('');
    const [arrMessage, setArrMessage] = useState([]);
    const [arrUsers, setArrUsers] = useState([]);
    const [userLoad, setUserLoad] = useState('');

    let userId;
    let count = 0;
    if (localStorage.getItem('email') && count === 0) {
        let email = localStorage.getItem('email').split("@");
        userId = email[0].replace(/\./g, '');
        userLoad === '' ? setUserLoad(userId) : null;
    }

    useEffect(() => {
        // Create an scoped async function in the hook 
        async function anyNameFunction() {
            dbF.ref(`clients`).on("value", snapshot => {
                let users = [];
                let clientObj = snapshot.val();
                for (let key in clientObj) {
                    Object.keys(clientObj[key]).map(r => {
                        // console.log('r ', clientObj[key][r])
                        users.push(clientObj[key][r]);
                    })
                }
                return setArrUsers(users);

            })

            localStorage.getItem('email') ? dbF.ref(`chat/${userLoad}`).on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push({
                        text: snap.val().text,
                        email: snap.val().email,
                        name: snap.val().name,
                        url: snap.val().url,
                        date: snap.val().date
                    });
                });
                setArrMessage(chats.reverse())

            }) : null;
        }
        // Execute the created function directly
        anyNameFunction();
    }, []);

    // let handleSubmit = async e => {
    //     e.preventDefault();
    //     const response = await fetch('/api', {//'/api/mail' to bylo
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ post: post }),
    //     });
    //     const body = await response.text();
    //     setResponseToPost(body);
    // };

    const handlers = useSwipeable({
        onSwipedRight: () => props.history.push({ pathname: "/" })
    });
    let closeHandler = () => {
        props.onAddNewPost();
        props.updateHandler ? props.onUpdatePostData() : null;
    }

    let chatTextHandler = () => {
        let time = new Date();
        let date = {
            seconds: time.getSeconds(),
            minutes: time.getMinutes(),
            hours: time.getHours(),
            day: time.getDay(),
            month: time.getMonth(),
            year: time.getFullYear()
        };
        props.onChatListener(
            message,
            userLoad,
            localStorage.getItem('email'),
            localStorage.getItem('name'),
            localStorage.getItem('url'),
            date
        );
        setMessage('');
    }
    var d = new Date()
    let chatText = () => {
        return (
            arrMessage.map(res => {
                let time;
                if (res.date.day !== d.getDay()) {
                    time = `${res.date.day < 9 ? '0' + res.date.day : res.date.day}/${res.date.month < 9 ? '0' + res.date.month : res.date.month}/${res.date.year} ${res.date.hours}:${res.date.minutes < 9 ? '0' + res.date.minutes : res.date.minutes}`
                }
                else {
                    time = `${res.date.hours}:${res.date.minutes < 9 ? '0' + res.date.minutes : res.date.minutes}`
                }

                let content = (<div className={[classes.MessageHolder, classes[res.email === localStorage.getItem('email') ?
                    null :
                    'MessageHolderGuest']].join(' ')}>
                    <div className={classes.MessageTime}>
                        <div>
                            {time}
                        </div>
                    </div>
                    <div>
                        <img src={!res.url ? noImg : res.url} alt="Girl in a jacket" />
                        <div className={classes.MessageText}>
                            {res.text}
                        </div>
                    </div>

                </div>)
                return content
            }))
    };
    let usersHendler = (id) => {
        let result;
        let revErr = arrMessage.reverse()
        revErr.filter(obj => {
            return result = obj.text
        })
        dbF.ref(`chat/${id}`).on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
                chats.push({
                    text: snap.val().text,
                    email: snap.val().email,
                    name: snap.val().name,
                    url: snap.val().url,
                    date: snap.val().date
                });
            });
            setArrMessage(chats.reverse())
            setUserLoad(id)
        })
    }

    let users = () => {
        let urser = arrUsers.map(res => {
            return (
                <div
                    className={[classes.UsersListBlock, classes[userLoad === res.id ? 'Active' : null]].join(' ')}
                    onClick={() => usersHendler(res.id)}>
                    <img src={!res.url ? noImg : res.url} alt="Girl in a jacket" />
                    <div>
                        <span className={classes.Name}>{res.name}</span>
                        <span className={classes.Email}>{res.email}</span>
                        {/* <span className={classes.Message}>{res.lastMessage}</span> */}
                    </div>
                </div >
            )
        })
        return urser;
    }
    let chat = (
        <div className={classes.ContentEditInputLineWraper}>
            <div className={classes.ContentEditInputLine}>
                {props.isAuthenticated ? <NavLink to={"/logout"} className={classes.LogoutBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                </NavLink> : null}
                <Input
                    anableHideBtn={false}
                    classAdd={!props.isAuthenticated ? "ContactChatHide" : "ContactChat"}
                    disabled={!props.isAuthenticated ? true : null}
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
            <div className={classes.LoginBtnWraper}>
                {!props.isAuthenticated ?
                    <ButtonBootstrap variant="light" onClick={() => setAuth(true)}><p>Register/Sing In</p></ButtonBootstrap>
                    : null
                }
                {
                    props.addNewPostContainer ? <Backdrop
                        show={props.addNewPostContainer}
                        clicked={closeHandler} /> : null
                }
                {
                    !props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn('facebook')} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" alt="Facebook logo" />
                        <p className={classes.BtnText}><b>Sign in with Facebook</b></p></ButtonBootstrap> : null
                }

                {
                    !props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn()} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
                        <p className={classes.BtnText}><b>Sign in with google</b></p></ButtonBootstrap> : null
                }
            </div>
        </div>
    );
    let logo = (
        <div className={classes.Logo}></div>
    )

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
                    <div className={classes.UsersListWraper}>{props.isAuthenticated && localStorage.getItem('email') === props.adminId ? users() : null}</div>
                    <div className={classes.ChatMessage} >
                        {/* <div className={classes.ChatMessageScroll} > */}
                        {props.isAuthenticated ? chatText() : logo}
                        {/* </div> */}
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
        sendMessage: state.main.sendMessage,
        adminId: state.main.adminId
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onChatListener: (message, id, email, name, url, date) => dispatch(actions.fetchChat(message, id, email, name, url, date)),
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onAuthSn: (sNlogin) => dispatch(actions.authSn(sNlogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))


    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conact));