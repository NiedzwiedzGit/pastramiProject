import React, { Component } from 'react';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './ImagesBlock.css';
import { Parallax } from 'react-parallax';



class ImagesBlock extends Component {
    render() {
        let content = null;
        let imageVar = (
            <div className={classes.ImagesBlockPicture} >
                <img
                    src={this.props.url}
                    onClick={this.props.clickable ? this.props.clickedOn : null}
                    alt="MyBurger" />
                {/* <span className={classes.PictureCounter}>{this.props.num}</span> */}
                {this.props.clickable ? <ButtonBootstrap variant="dark">{this.props.num}</ButtonBootstrap> : null}

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
            case 'Orders':
                content = (

                    <div className={classes.OrderBlockText}>
                        <p className={classes.TextArea}>{this.props.text}</p>
                        <p className={classes.PriceArea}>{this.props.price}</p>
                        <ButtonBootstrap style={{ display: `${this.props.hide}` }}
                            variant={this.props.hide !== false ? "outline-danger" : "outline-primary"}
                            onClick={this.props.clicked}>
                            {this.props.hide !== false ? "-" : "+"}
                        </ButtonBootstrap>
                    </div>
                )
                break;
            case 'Info':
            case 'Clients':
                // imageVar = null;
                const y = this.props.moveY;
                const styles = {
                    // transform: `translateX(${y}px)`,
                    // trasition: `1s`
                };
                this.props.webAddress == null ?
                    content = (
                        <div className={classes.ImagesBlockText} style={styles}>
                            <p className={classes.TextArea}>{this.props.text}</p>
                        </div >) :
                    content = (
                        <div className={classes.ImagesBlockText}>
                            <p className={classes.TextArea}>{this.props.text}</p>
                            <p><a href={this.props.webAddress}>{this.props.webAddress}</a></p>
                        </div>)

                break;
            default: break;

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
                            // borderRadius: `${percentage * 1.9}%`,
                            // transform: `translateX(${percentage * 1000}px)`,
                            // width: percentage * 700,
                            // height: percentage * 700,
                            opacity: `${percentage * 1.9}`
                            // transform: `${percentage * 100}px`,
                            // transform: `scale(${percentage * .5})`
                        }}
                    >
                        {this.props.showImg ? imageVar : null} {content}
                    </div >
                )
                }
            >
            </Parallax >

        );
        return (

            <div className={[classes.ImagesBlock, classes[this.props.close, this.props.clickable ? "HoverNon" : null]].join(' ')} >

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