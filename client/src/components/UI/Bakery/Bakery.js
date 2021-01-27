import React from 'react';
import classes from './Bakery.css';

import imgUrlRight from '../../../assets/images/steamCookRight.png';
import imgUrlOn from '../../../assets/images/steamCookEmpty.png';
const bakery = React.memo(props => {
    let scene = (<div className={classes.Scene}>
        <div className={[classes.Cube, classes[props.sumVal ? 'Show_right' : null]].join(' ')}>
            <div className={[classes.Cube__face, classes['Cube__face--front']].join(' ')}>
                <img className={[classes[props.sumVal ? 'SteamOff' : 'SteamOn']].join(' ')} src={imgUrlOn} alt="" />
            </div>{/*, classes[this.state.sumVal ? 'Show_front' : null]*/}
            <div className={[classes.Cube__face, classes['Cube__face--back']].join(' ')}>back</div>{/*, classes[this.state.sumVal ? 'Show_back' : null] */}
            <div className={[classes.Cube__face, classes['Cube__face--right']].join(' ')}>
                <img className={[classes[props.sumVal ? null : 'SteamOn']].join(' ')} src={imgUrlRight} alt="" />
            </div>
            <div className={[classes.Cube__face, classes['Cube__face--left']].join(' ')}>left</div>{/*, classes[this.state.sumVal ? 'Show_left' : null] */}
            <div className={[classes.Cube__face, classes['Cube__face--top']].join(' ')}> top</div >{/*, classes[this.state.sumVal ? 'Show_top' : null] */}
            <div className={[classes.Cube__face, classes['Cube__face--bottom']].join(' ')}>bottom</div>{/*, classes[this.state.sumVal ? 'Show_bottom' : null] */}
        </div >
    </div >
    )
    return scene;
});

export default bakery;