import React, { Component } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Button from '../../UI/Button/Button';

export class NavigationItems extends Component {
    render() {
        let headerItem = this.props.hdr.map((imt, index) => (
            < NavigationItem
                key={index}
                link={imt.title.toLowerCase()} > {imt.title}</NavigationItem >
        ));
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>NEWSY</NavigationItem>
                {headerItem}
                {this.props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
                {!this.props.isAuthenticated
                    ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                    : <NavigationItem link="/logout">Logout</NavigationItem>}
                {/* <button onClick={this.props.onAddHeaderItem}>+</button> */}
                <Button
                    btnType="Danger"
                    onClick={this.props.onAddHeaderItem}>+</Button>
            </ul >
        );
    }

};

const mapStateToProps = state => {
    return {
        hdr: state.header.headerTitles
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddHeaderItem: () => dispatch(actions.addHeaderItem())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);