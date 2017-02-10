import React from 'react';
import {directions} from '../../utils';
import it from '../../../css/item.css';
import im from '../../../css/image.css';


class Item extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    current: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    loaded: React.PropTypes.bool,
    playing: React.PropTypes.bool,
    duration: React.PropTypes.number,
    func: React.PropTypes.string,
    anim: React.PropTypes.string
  };

  render() {
    const {
      src, data, initial, current, previous, loaded,
      playing, anim, func, duration, maxwidth,
      maxheight
    } = this.props;

    let itemClassName;
    let itemStyle = {};

    if (initial) {
      itemClassName = `${it.item} ${it.item_display_block}`;
    } else if (previous && playing) {
      itemClassName = `${it.item} ${it.item_position_previous}`;
      itemStyle = {
        animationDuration: `${duration}ms`,
        WebkitAnimationDuration: `${duration}ms`,
        animationTimingFunction: func,
        WebkitAnimationTimingFunction: func
      }
    } else if (current) {
      if (playing) {
        itemClassName = `${it.item} ${it.item_position_current}`;
        itemStyle = {
          animationDuration: `${duration}ms`,
          WebkitAnimationDuration: `${duration}ms`,
          animationTimingFunction: func,
          WebkitAnimationTimingFunction: func
        }
      } else {
        itemClassName = `${it.item} ${it.item_display_block}`;
      }
    } else {
      itemClassName = it.item;
    }

    return (
      <li className={itemClassName} style={itemStyle}>
        <span
          className={im.thumbnail}
          style={{
            maxWidth: maxwidth,
            maxHeight: maxheight,
            background: `url(${data}) no-repeat 50% 50%`,
            backgroundSize: 'contain'
          }}
        ></span>
        {loaded ? <img className={im.image} src={src} alt=""/> : null}
      </li>
    );
  }
}

export default Item;
