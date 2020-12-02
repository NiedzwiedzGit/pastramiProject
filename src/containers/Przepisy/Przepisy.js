import React, { Suspense, Component, useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import ButtonBootstrap from 'react-bootstrap/Button';

import classes from './Przepisy.css';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import NewPost from '../NewPost/NewPost';
import ImagesBlock from '../../components/ImagesBlock/ImagesBlock';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom';
import { useSwipeable } from "react-swipeable";
import { ParallaxBanner } from 'react-scroll-parallax';
import { Parallax, Background } from 'react-parallax';
import knifeRL from "../../assets/images/knifeRLup.png";


const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;


// class Przepisy extends Component {
const Przepisy = React.memo(props => {
    const [id, setId] = useState([]);
    const [folderName, setFolderName] = useState('przepisy');

    // state = {
    //     id: [],
    //     folderName: 'przepisy'
    // }
    // componentDidMount() {
    //     this.props.Przepisy ? console.log("Przepisy test", this.props.Przepisy) : console.log("Przepisy test nooo", this.props.Przepisy)
    // }
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
        props.onDeletePost(id, imgName, key, folderName);
    }
    let postSelectedHandler = (id, urlArray) => {
        props.history.push({ pathname: "prasa/" + id });
        // console.log("urlArray ", urlArray)
        props.onUrlArray(urlArray);
    }
    let paralaxBlock = (
        <div className={classes.ParalaxBlockPicture} >
            <ParallaxBanner
                className="your-class"
                layers={[
                    {
                        image: props.url,
                        amount: 0.9,
                    }
                ]}
                style={{
                    height: '500px',
                }}
            >
            </ParallaxBanner>
        </div>
    );
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


    // render() {

    return (
        <Parallax bgImage={knifeRL} strength={500} >
            {/* <div style={{ height: 500 }}>
                <div >HTML inside the parallax</div>
            </div> */}

            < div className={classes.Przepisy} {...handlers} >
                {/* <Parallax strength={500} >
            <Background className="custom-bg">
                <div
                    style={{
                        height: 2000,
                        width: 2000,
                        backgroundImage: "url('https://i.imgur.com/8CV5WAB.png')"

                    }}
                />
            </Background> */}
                < NavLink
                    to={"/"}
                // link="/o_nas"
                >
                    <ButtonBootstrap variant="dark"> Back</ButtonBootstrap>
                </NavLink > <Button
                    btnType={!props.addNewPostContainer ? "Add" : "Close"}
                    clicked={props.onAddNewPost} />
                {
                    props.addNewPostContainer && !props.loading ? <NewPost
                        Przepisy={true}
                        field={'skladniki przygotowanie webAddress'}
                        folderName={folderName}
                    /> : null
                }
                {
                    props.addNewPostContainer ? <Backdrop
                        show={props.addNewPostContainer}
                        clicked={closeHandler} /> : null
                }
                <Suspense fallback={<div>loading</div>}>
                    <div className={classes.Column}>

                        {/* <Parallax blur={10} bgImage="https://img.favpng.com/9/25/24/computer-icons-instagram-logo-sticker-png-favpng-LZmXr3KPyVbr8LkxNML458QV3_t.jpg" bgImageAlt="the cat" strength={200}>
                        Content goes here. Parallax height grows with content height.

                    {onLoadContent()}
                    </Parallax> */}

                        {onLoadContent()}

                    </div>
                </Suspense>

            </div >
        </Parallax >
    );
    //}

}
)
const mapStateToProps = state => {
    return {
        addNewPostContainer: state.newpost.addNewPostContainer,
        updateHandler: state.newpost.updateHandler,
        // postContent: state.main.postContent,
        Przepisy: state.main.Przepisy
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