import React, { Suspense, Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import BackBtn from '../../components/UI/Button/BackBtn/BackBtn';
import ButtonBootstrap from 'react-bootstrap/Button';


import ResiveForm from '../ResiveForm/ResiveForm';
import Payment from '../Payment/Payment';
import Bakery from '../../components/UI/Bakery/Bakery';
import classes from './Orders.css';

import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import NewPost from '../NewPost/NewPost';
import Order from '../../components/Order/Order';
import ScrollToOrder from '../../components/ScrollToOrder/ScrollToOrder';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { withRouter } from 'react-router-dom';

import { Link, Element, animateScroll as scroller } from 'react-scroll'

const override = css`
  position:absolut;
  left:0;
  display: block;
  margin: 20% auto;
  border-color: red;
`;
class Orders extends Component {
    state = {
        id: [],
        folderName: 'orders',
        sumVal: null,
        touched: {
        },
        sumElementCount: null,
        classHandler: false,
        active: null,
        clickLinkWraper: false,
        goToResive: false,
        goToPay: false,
        payEnd: false
    }
    componentDidMount() {
        this.props.onfetchTextContent('orders');
        let dubThis = this;
        setTimeout(function () {
            window.innerWidth <= 800 ? dubThis.setState({ classHandler: true }) : null;
        }, 600);

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
                sumVal: prevState.sumVal + parseInt(price, 10),
                sumElementCount: prevState.sumElementCount + 1,
                touched: {
                    ...this.state.touched, [textField]: { visibility: true, count: countHendler, price: parseInt(price, 10) }
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
                sumVal: prevState.sumVal - parseInt(price, 10),
                sumElementCount: prevState.sumElementCount - 1,
                touched: {
                    ...this.state.touched,
                    [textField]: {
                        visibility: !disable,
                        count: parseInt(countHendler, 10),
                        price: parseInt(price, 10)
                    }
                }
            }
        })

    }
    classHandlerActive = (i) => {
        return i;
    }
    onLoadContent = () => {
        let Block = <CircleLoader
            css={override}
            size={150}
            color={"grey"}
            loading={true}
        />;
        let LinkBlock = [];
        if (this.props.textVar !== null) {
            if (this.props.textVar.length !== 0) {
                Block = this.props.textVar.map((res, index) => {
                    let disHandler;
                    let countHandler;

                    if (this.state.touched[res.textField]) {
                        if (this.state.touched[res.textField].visibility && this.state.touched[res.textField].count >= 0) {
                            disHandler = this.state.touched[res.textField].visibility
                            countHandler = this.state.touched[res.textField].count
                        }
                    }
                    LinkBlock.push(
                        <ScrollToOrder
                            key={index}
                            index={index}
                            textField={res.textField}
                            count={countHandler}
                        />
                    )

                    return <div
                        key={index}
                        id="dsfsdf"
                        onMouseEnter={() => this.setState({ classHandler: true })}
                        onMouseLeave={() => window.innerWidth >= 800 ? this.setState({ classHandler: false }) : null}
                    ><Order
                            auth={this.props.isAuthenticated && localStorage.getItem('email') === this.props.adminId}
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
        return [LinkBlock, Block];
    }
    scrollTo = () => {
        scroller.scrollTo('2', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }
    render() {
        let sumBlock = (
            this.state.sumVal ?
                <div className={[classes.SumBlock,
                classes[this.state.clickLinkWraper ? 'SumBlockShow' : null],
                classes[this.state.goToResive ? 'SumBlockHide' : null]].join(' ')
                }>
                    <div className={classes.SumBlockContentWrasper}>
                        <div><strong>Zamówienie:</strong></div><br />
                        {Object.entries(this.state.touched).map((name, i) => {

                            return name[1].count !== 0 ?
                                < div className={!this.state.goToResive ? classes.SumBlockCellHolder : classes.SumBlockCellHolderHide} key={i} >
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

                        {this.state.goToResive ?
                            <div className={classes.SumBlockButton}>
                                <ButtonBootstrap variant="success" onClick={() => this.setState({ goToResive: false })}>Zamów</ButtonBootstrap>
                            </div> :
                            <div className={classes.SumBlockButton}>
                                <ButtonBootstrap variant="success" onClick={() => this.setState({ goToResive: true })}>Dalej</ButtonBootstrap>
                            </div>}
                    </div>
                </div >
                : null
        )
        let reciveBlock = (
            < div className={[classes.ResiveForm,
            classes[this.state.goToResive ? 'ResiveFormActive' : null],
            classes[!this.state.clickLinkWraper || this.state.goToPay ? 'ResiveFormHide' : null]].join(' ')
            } >
                <ResiveForm
                    auth={this.props.isAuthenticated}
                    clickLinkWraper={this.state.clickLinkWraper}
                />
                {
                    this.state.goToResive ?
                        <div className={classes.ResiveFormButtonHolder}> <div className={classes.SumBlockButtonLeft}>
                            <ButtonBootstrap variant="outline-secondary" onClick={() => this.setState({ goToResive: false })}></ButtonBootstrap>
                        </div> <div className={[classes.SumBlockButtonRight
                            , classes[!this.props.formIsValid ? "SumBlockButtonRightUnActive" : null]
                        ].join(' ')}>
                                <ButtonBootstrap variant="outline-secondary"
                                    disabled={!this.props.formIsValid}
                                    onClick={() => this.setState({ goToPay: true })}></ButtonBootstrap>
                            </div>
                        </div> :
                        <div className={classes.SumBlockButton}>
                            {/* <ButtonBootstrap variant="success" onClick={() => this.setState({ goToResive: true })}>Zamów</ButtonBootstrap> */}
                        </div>
                }
            </div >
        );

        let paymentBlock = (
            < div className={[classes.PaymentForm,
            classes[this.state.goToPay ? 'PaymentFormActive' : null],
            classes[!this.state.clickLinkWraper ? 'PaymentFormHide' : null]].join(' ')
            } >
                <Payment
                    auth={this.props.isAuthenticated}
                    clickLinkWraper={this.state.clickLinkWraper}
                    payEnd={this.state.payEnd}
                />
                {
                    this.state.goToPay ?
                        !this.state.payEnd ?
                            <div className={classes.ResiveFormButtonHolder}> <div className={classes.SumBlockButtonLeft}>
                                <ButtonBootstrap variant="outline-secondary" onClick={() => this.setState({ goToPay: false })}></ButtonBootstrap>
                            </div> <div className={[classes.SumBlockButtonRight, classes[this.props.payActive ? "SumBlockButtonRightUnActive" : null]].join(' ')}>
                                    <ButtonBootstrap variant="outline-secondary"
                                        disabled={this.props.payActive}
                                        onClick={() => this.setState({ payEnd: true })}></ButtonBootstrap>
                                </div>
                            </div> : null :
                        <div className={classes.SumBlockButton}>
                        </div>
                }
            </div >
        );

        let content = this.onLoadContent();
        return (
            <div className={classes.Przepisy}>
                {

                    this.props.addNewPostContainer && !this.props.loading && this.props.isAuthenticated && localStorage.getItem('email') === this.props.adminId ?
                        <div className={classes.FormAddWrapper}>
                            <NewPost
                                Przepisy={true}
                                field={'textField price'}
                                folderName={this.state.folderName}
                            />
                        </div> : null
                }
                {
                    this.props.isAuthenticated && localStorage.getItem('email') === this.props.adminId ?
                        <div className={classes.BtnAddWrapper}>
                            <Button
                                btnType={!this.props.addNewPostContainer ? "Add" : "Close"}
                                clicked={this.props.onAddNewPost} />
                        </div> : null
                }
                <div className={this.state.clickLinkWraper ? classes.BlurBlock : null}
                    onClick={() => this.setState({ clickLinkWraper: !this.state.clickLinkWraper })}>
                </div>
                <div className={[classes.OrderListwraper,
                classes[this.state.sumVal ? "OrderListwraperShow" : null]].join(' ')}
                    onClick={() => this.setState({ clickLinkWraper: !this.state.clickLinkWraper })}>
                    <div className={[
                        classes.LinkWraper, classes.LinkWraperMenu,
                        classes[this.state.clickLinkWraper ? "ClickLinkWraper" : null]].join(' ')}
                    >
                        <Link /*classes.LinkWraper,*/
                            to=''
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            duration={250}
                            style={{ display: "inline-block", margin: "20px" }}
                            onClick={() => this.setState({ clickLinkWraper: !this.state.clickLinkWraper })}
                        >

                            {!this.state.clickLinkWraper ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-x" viewBox="0 0 16 16">
                                    <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>}

                        </Link>
                        <span>{this.state.sumElementCount}</span>
                    </div>
                </div>
                <div className={classes.Logo}></div>
                <div className={[classes.ImgOrderBlock].join(' ')} >
                    <div></div><br />
                    <Bakery
                        sumVal={this.state.sumVal}
                    />
                    <div className={[classes.SumBlockWraper, classes['Left'], classes[this.state.sumVal ? "GrowLeft" : null]].join(' ')}>
                        <div className={[classes.SumBlockLineTopLeft, classes[this.state.sumVal ? "GrowTopLeft" : null]].join(' ')}></div>
                        <div className={[classes.SumBlockLineLeft].join(' ')}></div>
                    </div>
                </div >
                <div className={classes.OrderBlock}>
                    <BackBtn />
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
                                {/* <div className={classes.SumBlockButton}>
                                    <ButtonBootstrap variant="dark">Zamów</ButtonBootstrap>
                                </div> */}
                            </div>

                        </div>

                    </div>
                </div>

                {sumBlock}
                {reciveBlock}
                {paymentBlock}

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
        adminId: state.main.adminId,
        formIsValid: state.main.formIsValid,
        payActive: state.main.payActive
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));