import React, { Suspense, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Coments.css';
import Coment from '../../components/Coment/Coment';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import ButtonBootstrap from 'react-bootstrap/Button';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';

import Input from '../../components/UI/Input/Input'
import { withRouter, NavLink } from 'react-router-dom';
import * as swipe from "../../hoc/Swipe/Swipe";
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Auth from '../Auth/Auth';

// const Auth = asyncComponent(() => {
//     return import('../Auth/Auth');
// });
const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
const Coments = React.memo(props => {

    const [id, setId] = useState([]);
    const [comentId, setComentId] = useState(null);
    const [key, setKey] = useState(null);
    const [folderName, setFolderName] = useState('coment');
    const [cssClass, setCssClass] = useState(null);
    const [date, setDate] = useState(null);
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [auth, setAuth] = useState(false);
    const [loader, setLoader] = useState(0);


    useEffect(() => {
        setLoader(1);
        loader == 1 ? null : props.onfetchComentContent('coment');
    });


    let closeHandler = () => {
        props.onAddNewPost();
        props.updateHandler ? props.onUpdatePostData() : null;
    }
    let updateComentData = (postData) => {
        // console.log("Przepisy update test ", postData)
        props.onUpdatePostData(postData);
        props.onAddNewPost();
    }
    let comentsHandler = () => {
        let date = `${new Date().getFullYear()}-${new Date().getMonth()}-${(new Date().getDate() < 10 ? '0' : '') + new Date().getDate()}  ${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;
        let postKey = !props.updateHandler ? new Date().getTime() : props.updateData.key;
        let data = {}
        if (update) {
            data = {
                name: localStorage.getItem('name'),
                url: localStorage.getItem('url'),
                email: localStorage.getItem('email'),
                key: key,
                id: comentId,
                textField: message,
                date: date
            }
            props.onUpdateComentContent(data);
        } else {
            data = {
                name: localStorage.getItem('name'),
                url: localStorage.getItem('url'),
                email: localStorage.getItem('email'),
                key: postKey,
                textField: message,
                date: date
            }
            props.onAddComentContent(data);

        }
        // this.props.onAddNewPost();
        // this.setState({ folderName: 'coment', Przepisy: true });
        setFolderName('coment');

    }
    let deleteComent = (id, key) => {
        // this.setState({ id: [...this.state.id, key] });
        props.onDeleteComent(id, key);
    }
    let postSelectedHandler = (id, urlArray) => {
        props.history.push({ pathname: "info/" + id });
        // console.log("urlArray ", urlArray)
        props.onUrlArray(urlArray);
    }

    let onLoadComent = () => {
        let folderName = "coment"

        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={true}//waitLoader
        />;
        if (props.comentVar !== null) {
            if (props.comentVar.length !== 0) {
                let sortedArr = props.comentVar.sort(function (a, b) { return a - b });
                ImgBlock = sortedArr.map((res, index) => {

                    return <Coment
                        auth={props.isAuthenticated && res.email == localStorage.getItem('email') || props.isAuthenticated && localStorage.getItem('email') == props.adminId}
                        close={id.includes(res.key) ? 'Close' : null}
                        key={index}
                        date={res.date}
                        url={res.url}
                        name={res.name}
                        page="coment"
                        text={res.textField}
                        id={res.key}
                        clicked={() => (deleteComent(res.id, res.key), setId([...id, res.key]))
                        }
                        clickedUpdate={() => (
                            setMessage(res.textField),
                            setUpdate(true),
                            setComentId(res.id),
                            setKey(res.key),
                            setDate(res.date),
                            window.scrollTo(0, 0)
                        )
                        }
                        clickedOn={() => postSelectedHandler(res.key, res.url.split(","))
                        }
                    />
                });
            }
        } else { return null };

        return ImgBlock;
    }

    return (
        <div className={classes.Coments}  {...swipe.handlers(props.history, '/')}>

            <div className={classes.Logo}></div>
            <div className={classes.BackBtnBlock}><BackBtn /></div>
            <div className={auth ? classes.AuthBackDrop : null} onClick={() => setAuth(false)}></div>
            {!props.isAuthenticated ? <div className={[classes.Auth, classes[auth ? 'AuthActive' : null]].join(' ')} >
                <Auth />
            </div> : null}
            <Suspense fallback={<div>loading</div>}>

                <div className={classes.Column}>
                    {onLoadComent()}
                </div>
            </Suspense>
            <div className={classes.ContentEditWraper}>
                <div>
                    {props.isAuthenticated ? <NavLink to={"/logout"} className={classes.LogoutBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                    </NavLink> : null}
                    <Input
                        anableHideBtn="false"
                        classAdd={!props.isAuthenticated ? "ContactHide" : "Contact"}
                        disabled={!props.isAuthenticated ? 'true' : null}
                        // onClick={() => console.log('work')}
                        elementType='textarea'

                        value={props.isAuthenticated ? message : 'Zaloguj się'}
                        changed={(event) => setMessage(event.target.value)}
                    />
                    {props.isAuthenticated ?
                        <ButtonBootstrap variant={"light"}
                            className={!props.isAuthenticated ? classes.SendMessageBtnUn : classes.SendArrow}
                            onClick={comentsHandler}
                            disabled={!props.isAuthenticated ? true : false}
                        ></ButtonBootstrap> : null}
                </div>
                <div>
                    {update ? <ButtonBootstrap variant="danger"
                        className={classes.SendMessageBtn,classes.CancleMessageBtn}
                        onClick={() => (setUpdate(false), setMessage(''))}
                    disabled={!props.isAuthenticated ? true : false}
                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    </ButtonBootstrap> : null
                }
                    {/* {
                        update ?
                            <ButtonBootstrap variant="primary"
                                className={classes.SendMessageBtn}
                                onClick={comentsHandler}
                                disabled={!props.isAuthenticated ? true : false}
                            > Podtwirdz</ButtonBootstrap >
                            : <ButtonBootstrap variant={!props.isAuthenticated ? "light" : "light"}
                                className={!props.isAuthenticated ? classes.SendMessageBtnUn : classes.SendMessageBtn}
                                onClick={comentsHandler}
                                disabled={!props.isAuthenticated ? true : false}
                            >{!props.isAuthenticated ? "Zaloguj się" : "Zostaw Komentarz"}</ButtonBootstrap>
                    } */}
                {!props.isAuthenticated ?
                    // <NavLink to={"/auth"} className={classes.AuthBtn}>
                    <ButtonBootstrap variant="light" onClick={() => setAuth(true)}>Register/Sing In</ButtonBootstrap>

                    // </NavLink>
                    : null
                    // <NavLink to={"/logout"} className={classes.AuthBtn}>
                    //     <ButtonBootstrap variant="light" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    //         <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                    //         <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    //     </svg></ButtonBootstrap>
                    // </NavLink>
                }



                {
                    props.addNewPostContainer ? <Backdrop
                        show={props.addNewPostContainer}
                        clicked={closeHandler} /> : null
                }
                {
                    !props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn('facebook')} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" />
                        <p className={classes.BtnText}><b>Sign in with Facebook</b></p></ButtonBootstrap> : null
                }

                {
                    !props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => props.onAuthSn()} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        <p className={classes.BtnText}><b>Sign in with google</b></p></ButtonBootstrap> : null
                }
            </div>
        </div>
        </div >
    );


})
const mapStateToProps = state => {
    return {
        addNewPostContainer: state.newpost.addNewPostContainer,
        updateHandler: state.newpost.updateHandler,
        // postContent: state.main.postContent,
        textVar: state.main.textVar,
        comentVar: state.main.comentVar,
        updateData: state.newpost.updateData,
        isAuthenticated: state.auth.token !== null,
        adminId: state.main.adminId,
        authRedirectPath: state.auth.authRedirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeleteComent: (id, key) => dispatch(actions.deleteComent(id, key)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onfetchTextContent: (postData) => dispatch(actions.fetchTextContent(postData)),
        onfetchComentContent: (postData) => dispatch(actions.fetchComentContent(postData)),
        onAddComentContent: (data) => dispatch(actions.addComentContent(data)),
        onUpdateComentContent: (data) => dispatch(actions.updateComentContent(data)),
        onAuthSn: (sNlogin) => dispatch(actions.authSn(sNlogin))
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coments));