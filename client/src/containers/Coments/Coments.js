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
            <BackBtn />
            {/* <Button
                    btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                    clicked={this.props.onAddNewPost} /> */}
            {/* {this.props.addNewPostContainer && !this.props.loading ? <NewPost
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
                /> */}
            {/* <Form action={console.log("work")}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <ButtonBootstrap variant="danger"
                        type="submit"
                    // onClick={this.comentsHandler}
                    >Zostaw Komentarz</ButtonBootstrap>
                </Form> */}
            <Input
                anableHideBtn="false"
                classAdd={!props.isAuthenticated ? "ContactHide" : "Contact"}
                disabled={!props.isAuthenticated ? 'true' : null}
                // onClick={() => console.log('work')}
                elementType='textarea'
                value={message}
                changed={(event) => setMessage(event.target.value)}
            />
            {update ? <ButtonBootstrap variant="danger"
                className={classes.SendMessageBtn}
                onClick={() => (setUpdate(false), setMessage(''))}
                disabled={!props.isAuthenticated ? true : false}
            >Rezygnacja</ButtonBootstrap> : null
            }
            {
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
            }
            {!props.isAuthenticated ?
                // <NavLink to={"/auth"} className={classes.AuthBtn}>
                <ButtonBootstrap variant="light" onClick={() => setAuth(true)}>Register/Sing In</ButtonBootstrap>

                // </NavLink>
                :
                <NavLink to={"/logout"} className={classes.AuthBtn}>
                    <ButtonBootstrap variant="light" >Logout</ButtonBootstrap>
                </NavLink>
            }


            <div className={auth ? classes.AuthBackDrop : null} onClick={() => setAuth(false)}></div>
            {!props.isAuthenticated ? <div className={[classes.Auth, classes[auth ? 'AuthActive' : null]].join(' ')} >
                <Auth />
            </div> : null}
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
            <Suspense fallback={<div>loading</div>}>
                <br />
                <br />
                <div className={classes.Column}>
                    {onLoadComent()}
                </div>
            </Suspense>
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