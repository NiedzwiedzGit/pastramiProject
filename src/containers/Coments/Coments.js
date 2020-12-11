import React, { Suspense, Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Coments.css';
import Coment from '../../components/Coment/Coment';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import ButtonBootstrap from 'react-bootstrap/Button';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Input from '../../components/UI/Input/Input'
import { withRouter } from 'react-router-dom';

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
        comentId: null,
        key: null,
        folderName: 'coment',
        cssClass: null,
        date: null,
        message: '',
        update: false
    }
    componentDidMount() {
        // this.props.textVar ? console.log("textVar test", this.props.textVar) : console.log("textVar test nooo", this.props.textVar);
        this.props.onfetchComentContent('coment');
    }

    closeHandler = () => {
        this.props.onAddNewPost();
        this.props.updateHandler ? this.props.onUpdatePostData() : null;
    }
    updateComentData = (postData) => {
        // console.log("Przepisy update test ", postData)
        this.props.onUpdatePostData(postData);
        this.props.onAddNewPost();
    }
    comentsHandler = () => {
        let date = `${new Date().getFullYear()}-${new Date().getMonth()}-${(new Date().getDate() < 10 ? '0' : '') + new Date().getDate()}  ${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;
        let postKey = !this.props.updateHandler ? new Date().getTime() : this.props.updateData.key;
        let data = {}
        if (this.state.update) {
            data = {
                name: localStorage.getItem('name'),
                url: localStorage.getItem('url'),
                email: localStorage.getItem('email'),
                key: this.state.key,
                id: this.state.comentId,
                textField: this.state.message,
                date: this.state.date
            }
            this.props.onUpdateComentContent(data);
        } else {
            data = {
                name: localStorage.getItem('name'),
                url: localStorage.getItem('url'),
                email: localStorage.getItem('email'),
                key: postKey,
                textField: this.state.message,
                date: date
            }
            this.props.onAddComentContent(data);

        }
        // this.props.onAddNewPost();
        this.setState({ folderName: 'coment', Przepisy: true });

    }
    deleteComent = (id, key) => {
        // this.setState({ id: [...this.state.id, key] });
        this.props.onDeleteComent(id, key);
    }
    postSelectedHandler = (id, urlArray) => {
        this.props.history.push({ pathname: "info/" + id });
        // console.log("urlArray ", urlArray)
        this.props.onUrlArray(urlArray);
    }
    onLoadComent = () => {
        let folderName = "coment"

        // console.log("[comentVar] ", this.props.comentVar)
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        // if (this.props.comentVar !== null) {
        //     if (this.props.comentVar.length !== 0) {

        //         ImgBlock = this.props.comentVar.map((res, index) => {
        //             console.log('split ', res.url.split(","))
        //             console.log('split res', res.name)

        //             return <Coment
        //                 auth={this.props.isAuthenticated}
        //                 close={this.state.id.includes(res.key) ? 'Close' : null}
        //                 key={index}
        //                 url={res.url}
        //                 name={res.name}
        //                 page="coment"
        //                 text={res.textField}
        //                 id={res.key}
        //                 clicked={() => this.deletePost(res.id, res.imgName, res.key, folderName)}
        //                 clickedUpdate={() => this.updatePostData(res)}
        //                 clickedOn={() => this.postSelectedHandler(res.key, res.url.split(","))}
        //             />
        //         });
        //         console.log(ImgBlock);
        //     }
        // } else { return null };

        return ImgBlock;
    }
    onLoadComent = () => {
        let folderName = "coment"

        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={this.state.waitLoader}
        />;
        if (this.props.comentVar !== null) {
            if (this.props.comentVar.length !== 0) {
                let sortedArr = this.props.comentVar.sort(function (a, b) { return a - b });
                ImgBlock = sortedArr.map((res, index) => {

                    return <Coment
                        auth={this.props.isAuthenticated && res.email == localStorage.getItem('email') || this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId}
                        close={this.state.id.includes(res.key) ? 'Close' : null}
                        key={index}
                        date={res.date}
                        url={res.url}
                        name={res.name}
                        page="coment"
                        text={res.textField}
                        id={res.key}
                        clicked={() => (this.deleteComent(res.id, res.key), this.setState({ id: [...this.state.id, res.key] }))
                        }
                        clickedUpdate={() => (this.setState({ message: res.textField, update: true, comentId: res.id, key: res.key, date: res.date }), window.scrollTo(0, 0))
                        }
                        clickedOn={() => this.postSelectedHandler(res.key, res.url.split(","))
                        }
                    />
                });
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
                    classAdd={!this.props.isAuthenticated ? "ContactHide" : "Contact"}
                    disabled={!this.props.isAuthenticated ? 'true' : null}
                    // onClick={() => console.log('work')}
                    elementType='textarea'
                    value={this.state.message}
                    changed={(event) => this.setState({ message: event.target.value })}
                />
                {this.state.update ? <ButtonBootstrap variant="danger"
                    className={classes.SendMessageBtn}
                    onClick={() => this.setState({ update: false, message: '' })}
                    disabled={!this.props.isAuthenticated ? true : false}
                >Rezygnacja</ButtonBootstrap> : null}
                {this.state.update ?
                    <ButtonBootstrap variant="primary"
                        className={classes.SendMessageBtn}
                        onClick={this.comentsHandler}
                        disabled={!this.props.isAuthenticated ? true : false}
                    >Podtwirdz</ButtonBootstrap>
                    : <ButtonBootstrap variant={!this.props.isAuthenticated ? "danger" : "success"}
                        className={classes.SendMessageBtn}
                        onClick={this.comentsHandler}
                        disabled={!this.props.isAuthenticated ? true : false}
                    >{!this.props.isAuthenticated ? "Zaloguj się" : "Zostaw Komentarz"}</ButtonBootstrap>
                }

                {
                    this.props.addNewPostContainer ? <Backdrop
                        show={this.props.addNewPostContainer}
                        clicked={this.closeHandler} /> : null
                }
                {!this.props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => this.props.onAuthSn('facebook')} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" />
                    <p className={classes.BtnText}><b>Sign in with Facebook</b></p></ButtonBootstrap> : null}

                {!this.props.isAuthenticated ? <ButtonBootstrap variant="light" className={classes.GoogleBtn} onClick={() => this.props.onAuthSn()} ><img className={classes.GoogleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                    <p className={classes.BtnText}><b>Sign in with google</b></p></ButtonBootstrap> : null}
                <Suspense fallback={<div>loading</div>}>
                    <br />
                    <br />
                    <div className={classes.Column}>
                        {this.onLoadComent()}
                    </div>
                </Suspense>
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