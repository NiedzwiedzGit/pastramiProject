import React, { Suspense, Component, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
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
// import { sentMail } from "../../shared/mailslarp";

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
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


    let callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("test body ", body);

        return body;
    };

    let handleSubmit = async e => {
        console.log("worck handleSubmit ", response);
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: post }),
        });
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

    // render() {
    let form = (< Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
    </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Test request</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter text"
                value={post}
                onChange={e => setPost(e.target.value)}
            />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
    </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <ButtonBootstrap variant="dark" type="submit">
            {/* onClick={() => sentMail("test1", "test2")} */}
            Submit
  </ButtonBootstrap>
    </Form >
    );

    return (
        <div className={classes.Przepisy} {...handlers}>

            <NavLink
                to={"/"}
            // link="/o_nas"
            >
                Back
                </NavLink>
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
            <p>sdfsdfdsf2{responseToPost}</p>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conact));