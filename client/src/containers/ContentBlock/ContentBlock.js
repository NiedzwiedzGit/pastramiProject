import React, { Component } from 'react';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

import classes from './ContentBlock.css';
import backgroundImg0 from "../../assets/images/pastrami1.jpg";
import backgroundImg1 from "../../assets/images/pastrami2.jpg";
import backgroundImg2 from "../../assets/images/pastrami3.jpg";
import backgroundImg3 from "../../assets/images/pastrami7.jpg";
import backgroundImg4 from "../../assets/images/pastrami5.jpg";
// import knifeRL from "../../assets/images/knifeRL.png";
// import knifeLR from "../../assets/images/knifeLR.png";

// const backgroundImg1 = asyncComponent(() => {
//     return import('../../assets/images/pastrami1.jpg');
// });
// const backgroundImg2 = asyncComponent(() => {
//     return import('../../assets/images/pastrami2.jpg');
// });
// const backgroundImg3 = asyncComponent(() => {
//     return import('../../assets/images/pastrami3.jpg');
// });
// const backgroundImg4 = asyncComponent(() => {
//     return import('../../assets/images/pastrami4.jpg');
// });
// const backgroundImg5 = asyncComponent(() => {
//     return import('../../assets/images/pastrami5.jpg');
// });

class ContentBlock extends Component {
    state = {
        active: "ContentBlock",
        urlImg: null,
        content: {
            url0: backgroundImg0,
            url1: backgroundImg1,
            url2: backgroundImg2,
            url3: backgroundImg3,
            url4: backgroundImg4
        }
    }
    render() {
        let contentBlock = null;
        switch (this.props.num) {
            case 0:
                contentBlock = (
                    <NavigationItem
                        className={classes.Link}
                        style={{ backgroundImage: `url(${backgroundImg0})` }}
                        link="/o_nas"><p>O NAS</p></NavigationItem>
                )
                break;
            case 1:
                contentBlock = (
                    <NavigationItem className={classes.Link} style={{ backgroundImage: `url(${backgroundImg1})` }} link="/zamowienia"><p>ZAMÓWIENIA</p></NavigationItem>
                )
                break;
            case 2:
                contentBlock = (
                    <NavigationItem className={classes.Link} style={{ backgroundImage: `url(${backgroundImg2})` }} link="/kontakt"><p>KONTAKT</p></NavigationItem>
                )
                break;
            case 3:
                contentBlock = (
                    <NavigationItem className={classes.Link} style={{ backgroundImage: `url(${backgroundImg3})` }} link="/opinie"><p>OPINIE</p></NavigationItem>
                )
                break;
            case 4:
                contentBlock = (
                    <NavigationItem className={classes.Link} style={{ backgroundImage: `url(${backgroundImg4})` }} link="/przepisy"><p>PRZEPISY</p></NavigationItem>
                )
                break;
            default: break;
        }

        {/* <video autoPlay="autoplay" loop="loop" muted className={classes.Video} key={backgroundVideo}>
                    <source src={backgroundVideo} type="video/mp4" />
                </video> */}

        Array.from(this.state.content).map(res => {
            console.log("content ", res)
        });
        return (
            <div className={[classes.ContentBlock, classes[this.state.active], classes[this.props.class]].join(' ')}//classes.ContentBlock,
            // onMouseEnter={() => this.setState({ active: "Active" })}
            // onMouseLeave={() => this.setState({ active: "ContentBlock" })}
            >
                {contentBlock}
            </div >

        )
    }

};

export default ContentBlock;