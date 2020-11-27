import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './ImagesBlock.css';
import ImagesBlockContent from '../../components/ImagesBlock/ImagesBlockContent/ImagesBlockContent';
import { ParallaxBanner } from 'react-scroll-parallax';


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
        let paralaxBlock = (
            <div className={classes.ParalaxBlockPicture} >
                <ParallaxBanner
                    className="your-class"
                    layers={[
                        {
                            image: this.props.url,
                            amount: 0.9,
                        }
                    ]}
                    style={{
                        height: '500px',
                    }}
                >
                </ParallaxBanner>
                {/* <Parallax className="custom-class" y={[-200, 50]} x={[-500, 80]} tagOuter="figure">
                    <img
                        src={this.props.url}
                        onClick={this.props.clickedOn}
                        alt="" />
                </Parallax> */}
            </div>
        );
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
            case 'Histories':
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
        return (

            <div className={[classes.ImagesBlock, classes[this.props.close]].join(' ')} >

                <div className={classes.ImagesBlockLine}></div>
                {imageVar}
                <br />
                {
                    this.props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={this.props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={this.props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
                {content}


            </div >
        );
    }

};

export default ImagesBlock;