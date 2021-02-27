import React, { Suspense, useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';

import classes from './Przepisy.css';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import NewPost from '../NewPost/NewPost';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import * as swipe from "../../hoc/Swipe/Swipe";
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';



const postGalery = asyncComponent(() => {
    return import('../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent');

});

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const Przepisy = React.memo(props => {
    const [id, setId] = useState([]);
    const [folderName] = useState('przepisy');
    // const handlers = useSwipeable({
    //     onSwipedRight: () => props.history.push({ pathname: "/" })

    // });
    let closeHandler = () => {
        props.onAddNewPost();
        props.updateHandler ? props.onUpdatePostData() : null;
    }
    let updatePostData = (postData) => {
        props.onUpdatePostData(postData);
        props.onAddNewPost();
    }
    let deletePost = (id, imgName, key) => {
        setId([...id, key])
        props.onDeletePost(id, imgName, key, folderName);
    }
    let postSelectedHandler = (id, urlArray) => {
        props.history.push({ pathname: `${props.history.location.pathname}/${id}` });
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
                    return <ImagesBlock
                        auth={props.isAuthenticated && localStorage.getItem('email') === props.adminId}
                        close={id.includes(res.key) ? 'Close' : null}
                        key={index}
                        url={res.url}
                        num={res.url.split(",").length}
                        clickable={true}
                        page="Przepisy"
                        showImg={true}
                        skladniki={res.skladniki}
                        przygotowanie={res.przygotowanie}
                        webAddress={res.webAddress}
                        id={res.key}
                        clicked={() => deletePost(res.id, res.imgName, res.key)}
                        clickedUpdate={() => updatePostData(res)}
                        clickedOn={() => postSelectedHandler(res.key, res.url.split(","))}
                    />
                });
            }
        } else { return null };

        return ImgBlock;
    }

    return (
        <Parallax
            strength={500} >
            <div className={classes.Logo}></div>


            < div className={classes.Przepisy} {...swipe.handlers(props.history, '/')} >
                <div className={classes.BackBtnBlock}><BackBtn /></div>
                {props.isAuthenticated && localStorage.getItem('email') === props.adminId ?
                    < Button
                        btnType={!props.addNewPostContainer ? "Add" : "Close"}
                        clicked={props.onAddNewPost} /> : null
                }
                {
                    props.addNewPostContainer && !props.loading && props.isAuthenticated && localStorage.getItem('email') === props.adminId ?
                        <div className={classes.FormAddWrapper}><NewPost
                            Przepisy={true}
                            field={'skladniki przygotowanie webAddress'}
                            folderName={folderName}
                        />
                        </div>
                        : null
                }
                {
                    props.addNewPostContainer ? <Backdrop
                        show={props.addNewPostContainer}
                        clicked={closeHandler} /> : null
                }
                <Suspense fallback={<div>loading</div>}>
                    <div className={classes.Column}>
                        {onLoadContent()}
                    </div>
                </Suspense>
                <Switch>
                    <Route path={`/przepisy/:id`} component={postGalery} />
                </Switch>
            </div >
        </Parallax >
    );
}
)
const mapStateToProps = state => {
    return {
        addNewPostContainer: state.newpost.addNewPostContainer,
        updateHandler: state.newpost.updateHandler,
        // postContent: state.main.postContent,
        Przepisy: state.main.Przepisy,
        isAuthenticated: state.auth.token !== null,
        adminId: state.main.adminId
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray))

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Przepisy));