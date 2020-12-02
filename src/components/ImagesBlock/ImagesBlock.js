import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './ImagesBlock.css';
import ImagesBlockContent from '../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Parallax, Background } from 'react-parallax';



class ImagesBlock extends Component {
    componentDidMount() {

    }
    //console.log(props);
    // clickHandler = () => {
    //     console.log("clickHandler ImgB ", this.props.urlSplit);

    //     <ImagesBlockContent
    //         urlTest={this.props.urlSplit}
    //     />
    //     return (this.props.clickedOn,)
    // }

    render() {
        let content = null;
        let imageVar = (
            <div className={classes.ImagesBlockPicture} >
                <img
                    src={this.props.url}
                    onClick={this.props.clickedOn}
                    alt="MyBurger" />
                {/* <span className={classes.PictureCounter}>{this.props.num}</span> */}
                <ButtonBootstrap variant="dark">{this.props.num}</ButtonBootstrap>{' '}

            </div>
        );
        switch (this.props.page) {
            case 'Przepisy'://Przepisy
                this.props.webAddress == null ? content = (
                    <div className={[classes.ImagesBlockText, classes.Przepis].join(' ')}>
                        <p> <strong>SKŁADNIKI</strong>:<br />  {this.props.skladniki} </p><br />
                        <p> <strong>PRZYGOTOWANIE</strong>:<br />  {this.props.przygotowanie} </p>
                        <br />
                    </div>) :
                    content = (
                        <div className={[classes.ImagesBlockText, classes.Przepis].join(' ')}>
                            <p> <strong>SKŁADNIKI</strong>:<br />  {this.props.skladniki} </p><br />
                            <p> <strong>PRZYGOTOWANIE</strong>:<br />  {this.props.przygotowanie} </p><br />
                            <p><strong>URL</strong>: <a href={this.props.webAddress}>{this.props.webAddress}</a></p>
                        </div>)

                break;
            case 'Main':
                content = (
                    <div className={classes.ImagesBlockText}>
                        <p> <strong>Architects</strong>: {this.props.przygotowanie} </p>
                        <p><strong>Location</strong>: {this.props.locationCountry}</p>
                        <p><strong>Year</strong>: {this.props.year}</p>
                        <p><strong>Photographs</strong>: {this.props.photographs}</p>
                    </div>)

                break;
            case 'Info':
            case 'Orders':
            case 'Clients':
                imageVar = null;
                this.props.webAddress == null ?
                    content = (
                        <div className={classes.ImagesBlockText}>
                            <p className={classes.TextArea}>{this.props.text}</p>
                        </div>) :
                    content = (
                        <div className={classes.ImagesBlockText}>
                            <p className={classes.TextArea}>{this.props.text}</p>
                            <p><a href={this.props.webAddress}>{this.props.webAddress}</a></p>
                        </div>)

                break;

        }
        let paralaxBlock = (
            <Parallax
                // bgImage={this.props.url}
                // blur={{ min: -1, max: 3 }}
                strength={444}
                renderLayer={(percentage) => (
                    <div
                        style={{
                            // position: "absolute",
                            // background: `rgba(255, 125, 0, ${percentage * 1})`,
                            // left: "50%",
                            // top: "50%",
                            // borderRadius: "50%",
                            // transform: "translate(-50%,-50%)",
                            // width: percentage * 500,
                            // height: percentage * 500
                            opacity: `${percentage * 1.2}`,
                            // transform: `${percentage * 100}px`,
                            // transform: `scale(${percentage * .5})`
                        }}
                    >

                        {/* <div
                                style={{
                                    position: "absolute",
                                    background: `rgba(255, 125, 0, ${percentage * 1})`,
                                    left: "50%",
                                    top: "50%",
                                    borderRadius: "50%",
                                    transform: "translate(-50%,-50%)",
                                    width: percentage * 500,
                                    height: percentage * 500
                                }}
                            /> */}
                        {imageVar} {content}
                    </div >
                )
                }
            >
                {/* <div >
                        <div >{imageVar}{content}</div>
                    </div> */}
            </Parallax >

        );
        return (

            <div className={[classes.ImagesBlock, classes[this.props.close]].join(' ')} >

                <div className={classes.ImagesBlockLine}></div>
                {/* {imageVar} */}
                <br />
                {
                    this.props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={this.props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={this.props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
                {/* {content} */}
                {paralaxBlock}


            </div >
        );
    }

};

export default ImagesBlock;