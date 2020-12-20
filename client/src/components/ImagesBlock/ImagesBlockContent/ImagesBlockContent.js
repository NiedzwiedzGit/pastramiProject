import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';

import CircleLoader from "react-spinners/CircleLoader";

import { css } from "@emotion/core";
import Carousel from 'react-bootstrap/Carousel'

// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from 'react-grid-gallery';

import { connect } from 'react-redux';

import classes from './ImagesBlockContent.css';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
  z-index:104;
`;

class ImagesBlockContent extends Component {
    componentDidMount() {
        console.log(this.props.url);
    }
    urlCounter = () => {

        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"white"}
            loading={true}
        />;
        let urlP = [];
        this.props.urlArray !== null ? this.props.urlArray.map((url, index) => {
            urlP.push(
                {

                    src: url,
                    thumbnail: url,
                    thumbnailWidth: 320,
                    thumbnailHeight: 174,
                    //isSelected: false,
                    //                   caption: "After Rain (Jeshu John - designerspics.com)"
                }

            )
        }) : urlP.push(ImgBlock)
        return urlP;
    }
    render() {
        console.log("in ImagesBlockContent", this.props.urlArray);
        console.log("in urlArray.map", this.urlCounter());
        let a = null;
        if (this.props.match.params.id) {
            a = <div >
                <h1>{this.props.match.params.przygotowanie}</h1>
                <ImageGallery
                    enableImageSelection={false}
                    images={this.urlCounter()} />.
            </div>;
        } else {
            a = <div >
                <h1>{this.props.przygotowanie}</h1>
                {/* <p>You selected the Course with ID: {this.props.id}</p> */}
            </div>;
        }

        return (
            <div
                className={classes.ContentDiv}
                onClick={this.props.clicked}>
                {a}

                <ButtonBootstrap variant="outline-light" onClick={() => this.props.history.goBack()}>Back</ButtonBootstrap>

            </div>

        );
    }

};
const mapStateToProps = state => {
    return {
        urlArray: state.main.urlArray,
    };
};
export default withRouter(connect(mapStateToProps)(ImagesBlockContent));