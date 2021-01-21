import React, { Suspense, Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';
import ButtonBootstrap from 'react-bootstrap/Button';

import classes from './Orders.css';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import NewPost from '../NewPost/NewPost';
import Order from '../../components/Order/Order';
import ScrollToOrder from '../../components/ScrollToOrder/ScrollToOrder';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { withRouter, NavLink } from 'react-router-dom';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import imgUrl from '../../assets/images/steamCook.png';
import imgUrlRight from '../../assets/images/steamCookRight.png';
import imgUrlOff from '../../assets/images/steamCookOfEmpty.png';
import imgUrlOn from '../../assets/images/steamCookEmpty.png';
import imgUrlEmptyWrapert from '../../assets/images/steamCookEmptyWrapper.png';

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
class Przepisy extends Component {
    state = {
        id: [],
        folderName: 'orders',
        sumVal: null,
        touched: {
        },
        classHandler: false,
        active: null,
        clickLinkWraper: false
    }
    componentDidMount() {
        this.props.onfetchTextContent('orders');
        let dubThis = this;
        setTimeout(function () {
            window.innerWidth <= 800 ? dubThis.setState({ classHandler: true }) : null;
            // window.innerWidth <= 800 ? alert("got it") : null
        }, 600);
        // window.innerWidth <= 800 ? this.setState({ classHandler: true }) : null;
        // window.innerWidth <= 800 ? alert("got it") : null
    }


    closeHandler = () => {
        this.props.onAddNewPost();
        this.props.updateHandler ? this.props.onUpdatePostData() : null;
    }
    updatePostData = (postData) => {
        this.props.onUpdatePostData(postData);
        this.props.onAddNewPost();
    }
    deletePost = (id, imgName, key) => {
        this.setState({ id: [...this.state.id, key] });
        this.props.onDeletePost(id, imgName, key, this.state.folderName);
    }
    postSelectedHandler = (id, urlArray) => {
        this.props.history.push({ pathname: "info/" + id });
        this.props.onUrlArray(urlArray);
    }
    addHandler = (price, textField) => {
        let countHendler = 1;
        if (this.state.touched[textField]) {
            countHendler = ++this.state.touched[textField].count
        }
        this.setState(prevState => {
            return {
                sumVal: prevState.sumVal + parseInt(price),
                touched: {
                    ...this.state.touched, [textField]: { visibility: true, count: countHendler, price: parseInt(price) }
                }
            }
        })
    }
    removeHandler = (price, textField) => {
        let countHendler = this.state.touched[textField].count - 1;
        let disable;
        this.state.touched[textField].count <= 1 ? disable = true : disable = false
        this.setState(prevState => {
            return {
                sumVal: prevState.sumVal - parseInt(price),
                touched: {
                    ...this.state.touched,
                    [textField]: {
                        visibility: !disable,
                        count: parseInt(countHendler),
                        price: parseInt(price)
                    }
                }
            }
        })

    }
    classHandlerActive = (i) => {
        console.log("classHandler ", i);

        return i;

    }
    onLoadContent = () => {
        let ImgBlock = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={true}
        />;
        let LinkBlock = [];
        // let classHandler;
        if (this.props.textVar !== null) {
            if (this.props.textVar.length !== 0) {
                // LinkBlock = this.props.textVar.map((res, index) => {
                //     return <Link
                //         activeClass="active"
                //         to="test1"
                //         spy={true}
                //         smooth={true}
                //         duration={250}
                //         containerId="containerElement"
                //         style={{ display: "inline-block", margin: "20px" }}
                //     >
                //         Go to test1
                //         </Link>

                // })

                ImgBlock = this.props.textVar.map((res, index) => {
                    let disHandler;
                    let countHandler;
                    let counter = 0;
                    counter++

                    if (this.state.touched[res.textField]) {
                        if (this.state.touched[res.textField].visibility && this.state.touched[res.textField].count >= 0) {
                            disHandler = this.state.touched[res.textField].visibility
                            countHandler = this.state.touched[res.textField].count
                        }
                    }
                    LinkBlock.push(
                        // <div
                        //     className={this.props.active == index ? classes.Active : classes.LinkWraper}  >
                        <ScrollToOrder
                            index={index}
                            textField={res.textField}
                            count={countHandler}
                        />
                        // <Link /*classes.LinkWraper,*/
                        //     activeClass="Active"
                        //     // className={this.classHandlerActive() == index ? classes.Active : null}
                        //     to={`orderBlock${index}`}
                        //     spy={true}
                        //     smooth={true}
                        //     duration={250}
                        //     containerId="containerElement"
                        //     style={{ display: "inline-block", margin: "20px" }}
                        //     // let classHandler;
                        //     onClick={() => this.classHandlerActive(index)}
                        // // onClick={() => this.setState({ active: index })}
                        // >
                        //     {res.textField}
                        // </Link >
                        // </ div >
                    )

                    return <div
                        id="dsfsdf"
                        onMouseEnter={() => this.setState({ classHandler: true })}
                        onMouseLeave={() => window.innerWidth >= 800 ? this.setState({ classHandler: false }) : null}
                    ><Order
                            auth={this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId}
                            name={res.textField}
                            idCount={index}
                            price={res.price}
                            disable={
                                !disHandler
                            }
                            activeClass={this.state.classHandler}
                            count={countHandler}

                            clickedMinus={() => this.removeHandler(res.price, res.textField)
                            }
                            clickedPlus={() => this.addHandler(res.price, res.textField)
                            }
                            clickedUpdate={() => this.updatePostData(res)}
                            clicked={() => this.deletePost(res.id, res.imgName, res.key)}
                        />
                        <div className={classes.BlockPriceTest}>
                            <span >{res.price}pln_500g</span>
                        </div>
                    </div>

                });
            }
        } else { return null };

        console.log('map LinkBlock ', LinkBlock);
        return [LinkBlock, ImgBlock];
    }
    scrollTo = () => {
        scroller.scrollTo('2', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }
    render() {
        let test = this.state.touched;
        let orderObj = Object.keys(this.state.touched).map((name, count) => {

            return <span>Przedmiot: {this.state.touched[name]} pln</span>
        })
        let sumBlock = (
            this.state.sumVal ?
                <div className={[classes.SumBlock, classes[this.state.clickLinkWraper ? 'SumBlockShow' : null]].join(' ')
                }>
                    <div className={classes.SumBlockContentWrasper}>
                        <div><strong>Zamówienie:</strong></div><br />
                        {Object.entries(this.state.touched).map((name, i) => {

                            return name[1].count != 0 ?
                                < div className={classes.SumBlockCellHolder} key={i} >
                                    <div className={[classes.SumBlockCell, classes.SumBlockCellName].join(' ')}>
                                        <p><strong>Przedmiot: </strong></p>
                                        <p className={classes.UnderlineStyle}>{name[0]}</p>
                                    </div>
                                    <div className={classes.SumBlockCell}>
                                        <p><strong>ilosc</strong> </p>
                                        <p>{name[1].count} </p>
                                    </div>
                                    <div className={classes.SumBlockCell}>
                                        <p><strong>waga</strong> </p>
                                        <p>{name[1].count * 0.5} kg</p>
                                    </div>
                                    <div className={classes.SumBlockCell}>
                                        <p><strong>na kwotę</strong> </p>
                                        <p>{name[1].count * name[1].price} pln.</p>
                                    </div>
                                    <br />
                                </div>
                                : null
                        })
                        }
                        {/* <div className={[classes.SumBlockCell, classes.SumBlockCellPay].join(' ')}>
                            <p><strong>Do zapłaty: </strong></p>
                            <p> {this.state.sumVal} pln.</p>
                        </div> */}
                    </div>
                    {/* <div className={classes.SumBlockButton}>
                        <ButtonBootstrap variant="success">Zamów</ButtonBootstrap>
                    </div> */}
                </div >
                : null
        )
        let content = this.onLoadContent();
        console.log("this.state.clickLinkWraper ", this.state.clickLinkWraper);
        console.log("window.innerWidth ", window.innerWidth)
        return (
            <div className={classes.Przepisy}>
                {/* <span className={[classes.OrderHelp, classes.OrderPlus].join(' ')}>+</span>
                <span className={[classes.OrderHelp, classes.OrderMinus].join(' ')}>-</span> */}
                <div className={this.state.clickLinkWraper ? classes.BlurBlock : null}
                    onClick={() => this.setState({ clickLinkWraper: !this.state.clickLinkWraper })}></div>
                <div className={[classes.OrderListwraper,
                classes[this.state.sumVal ? "OrderListwraperShow" : null]].join(' ')}
                    onClick={() => this.setState({ clickLinkWraper: !this.state.clickLinkWraper })}>
                    <div className={[
                        classes.LinkWraper, classes.LinkWraperMenu,
                        classes[this.state.clickLinkWraper ? "ClickLinkWraper" : null]].join(' ')}
                    >
                        <Link /*classes.LinkWraper,*/
                            activeClass="active"
                            // to={`orderBlock${index}`}
                            spy={true}
                            smooth={true}
                            duration={250}
                            // containerId="containerElement"
                            style={{ display: "inline-block", margin: "20px" }}
                            // onClick={() => this.setState({ active: index })}
                            onClick={() => this.setState({ clickLinkWraper: !this.state.clickLinkWraper })}
                        >
                        </Link>
                    </div>
                </div>
                <div className={classes.Logo}></div>
                <div className={[classes.ImgOrderBlock].join(' ')} >
                    <div></div><br />
                    <div className={classes.Scene}>
                        <div className={[classes.Cube, classes[this.state.sumVal ? 'Show_right' : null]].join(' ')}>
                            <div className={[classes.Cube__face, classes['Cube__face--front']].join(' ')}>
                                <img className={[classes[this.state.sumVal ? 'SteamOff' : 'SteamOn']].join(' ')} src={imgUrlOn} alt="" />
                            </div>{/*, classes[this.state.sumVal ? 'Show_front' : null]*/}
                            <div className={[classes.Cube__face, classes['Cube__face--back']].join(' ')}>back</div>{/*, classes[this.state.sumVal ? 'Show_back' : null] */}
                            <div className={[classes.Cube__face, classes['Cube__face--right']].join(' ')}>
                                <img className={[classes[this.state.sumVal ? null : 'SteamOn']].join(' ')} src={imgUrlRight} alt="" />
                            </div>
                            <div className={[classes.Cube__face, classes['Cube__face--left']].join(' ')}>left</div>{/*, classes[this.state.sumVal ? 'Show_left' : null] */}
                            <div className={[classes.Cube__face, classes['Cube__face--top']].join(' ')}> top</div >{/*, classes[this.state.sumVal ? 'Show_top' : null] */}
                            <div className={[classes.Cube__face, classes['Cube__face--bottom']].join(' ')}>bottom</div>{/*, classes[this.state.sumVal ? 'Show_bottom' : null] */}
                        </div >
                    </div >
                    <div className={[classes.SumBlockWraper, classes['Left'], classes[this.state.sumVal ? "GrowLeft" : null]].join(' ')}>
                        <div className={[classes.SumBlockLineTopLeft, classes[this.state.sumVal ? "GrowTopLeft" : null]].join(' ')}></div>
                        <div className={[classes.SumBlockLineLeft].join(' ')}></div>
                        {/* {sumBlock} */}
                    </div>
                    {/* <img className={[classes[this.state.sumVal ? 'SteamOff' : 'SteamOn']].join(' ')} src={imgUrlOf} alt="" /> */}
                </div >
                <div className={classes.OrderBlock}>

                    <BackBtn />

                    {
                        this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId ?
                            <Button
                                btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                                clicked={this.props.onAddNewPost} /> : null
                    }
                    {
                        this.props.addNewPostContainer && !this.props.loading && this.props.isAuthenticated && localStorage.getItem('email') == this.props.adminId ? <NewPost
                            Przepisy={true}
                            field={'textField price'}
                            folderName={this.state.folderName}
                        /> : null
                    }

                    {/* {<GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                            {
                                type: 'CARD',
                                parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    billingAddressRequired: true,
                                    billingAddressParameters: {
                                        format: "FULL",
                                        phoneNumberRequired: true
                                    }
                                },
                                tokenizationSpecification: {
                                    type: "PAYMENT_GATEWAY",
                                    parameters: {
                                        gateway: "stripe",
                                        "stripe:version": "v3",
                                        "stripe:publishableKey": "pk_test_51Hq6DcE938nb3fCN0fUcN4zkmAiSfZyPlEUy0Qh7ZCCNuhKKCg0jZPaSif0JMNJCnpHGRlrBc8Vw1FtUimbJil6K00zQ4BwIE3"
                                    },
                                },
                            },
                        ],
                        merchantInfo: {
                            // merchantId: 'BCR2DN6TWPJ2L4CP',
                            merchantName: 'igor shkliarskbbiy',
                        },
                        transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice: '1.00',
                            currencyCode: 'UAH',
                            countryCode: 'UA'
                        },
                    }}
                    onLoadPaymentData={paymentRequest => {
                        console.log('Success', paymentRequest);
                    }}
                />} */}
                    {
                        this.props.addNewPostContainer ? <Backdrop
                            show={this.props.addNewPostContainer}
                            clicked={this.closeHandler} /> : null
                    }
                    {/* onWheel = {(e) => this.wheel(e)} */}
                    <Element className={classes.ContentDiv}
                        id="containerElement"
                    >

                        {/* <Link activeClass="active" className="test6" to="test2" spy={true} smooth={true} duration={500}>Test 6 (anchor)</Link> */}
                        <Suspense fallback={<div>loading</div>}>
                            {content[1]}
                            {/* <div className={classes.ContentNav}>
                                <ButtonBootstrap variant="outline-danger" onClick={() => this.scrollTo()}>Remove</ButtonBootstrap><br />
                            </div> */}
                        </Suspense>
                    </Element>
                    <div className={classes.ContentDivLink}>
                        {content[0]}
                    </div>
                    {/* <div className={classes.ContentDivTest}></div> */}
                    <div className={[
                        classes.SumBlockWraper,
                        classes['Right'],
                        classes[this.state.sumVal ? "GrowRight" : null]].join(' ')}>
                        <div className={[
                            classes.SumBlockLineTopRight,
                            classes[this.state.sumVal ? "GrowTopRight" : null]].join(' ')}>
                        </div>
                        <div className={[
                            classes.SumBlockLineRight].join(' ')}>
                            <div className={[
                                classes.SumBlockCell,
                                classes.SumBlockCellPay, classes[this.state.sumVal ? "SumBlockCellPayActive" : null]].join(' ')}>
                                <p><strong>SUMA: </strong></p>
                                <p> {this.state.sumVal} pln.</p>
                                <div className={classes.SumBlockButton}>
                                    <ButtonBootstrap variant="dark">Zamów</ButtonBootstrap>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {sumBlock}
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
        isAuthenticated: state.auth.token !== null,
        adminId: state.main.adminId
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: () => dispatch(actions.addNewPostContainer()),
        onDeletePost: (id, imgName, key, folderName) => dispatch(actions.deletePost(id, imgName, key, folderName)),
        onUpdatePostData: (postData) => dispatch(actions.updatePostData(postData)),
        onUrlArray: (urlArray) => dispatch(actions.getUrlArray(urlArray)),
        onfetchTextContent: (postData) => dispatch(actions.fetchTextContent(postData))

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Przepisy));