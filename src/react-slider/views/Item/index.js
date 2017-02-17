import React from 'react';
import {directions} from '../../utils';
import it from '../../../css/item.css';
import im from '../../../css/image.css';


class Item extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    index: React.PropTypes.number,
    currIndex: React.PropTypes.number,
    prevIndex: React.PropTypes.number,
    loaded: React.PropTypes.bool,
    playing: React.PropTypes.bool,
    duration: React.PropTypes.number,
    lastIndex: React.PropTypes.number,
    func: React.PropTypes.string,
    anim: React.PropTypes.string
  };

  render() {
    const {
      src, data, initial, index, currIndex, prevIndex, loaded,
      playing, anim, func, duration, maxwidth, maxheight, lastIndex
    } = this.props;

    let itemClassName;
    let itemStyle = {};

    if (initial) {
      itemClassName = `${it.item} ${it.item_display_block}`;
    } else if (index === prevIndex && playing) {
      if (currIndex === 0 && prevIndex === lastIndex) {
        itemClassName = `${it.item} ${it.item_position_previous_to_left}`;
      } else if (currIndex === lastIndex && prevIndex === 0) {
        itemClassName = `${it.item} ${it.item_position_previous_to_right}`;
      } else if (currIndex - prevIndex > 0) {
        itemClassName = `${it.item} ${it.item_position_previous_to_left}`;
      } else {
        itemClassName = `${it.item} ${it.item_position_previous_to_right}`;
      }
      itemStyle = {
        animationDuration: `${duration}ms`,
        WebkitAnimationDuration: `${duration}ms`,
        animationTimingFunction: func,
        WebkitAnimationTimingFunction: func
      }
    } else if (index === currIndex) {
      if (playing) {
        if (currIndex === 0 && prevIndex === lastIndex) {
          itemClassName = `${it.item} ${it.item_position_current_to_left}`;
        } else if (currIndex === lastIndex && prevIndex === 0) {
          itemClassName = `${it.item} ${it.item_position_current_to_right}`;
        } else if (currIndex - prevIndex > 0) {
          itemClassName = `${it.item} ${it.item_position_current_to_left}`;
        } else {
          itemClassName = `${it.item} ${it.item_position_current_to_right}`;
        }
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
          className={`${im.image} ${im.blur}`}
          style={{
            maxWidth: maxwidth,
            maxHeight: maxheight,
            backgroundImage: `url(${data})`
          }}
        ></span>
        {loaded ? <span
          className={im.image}
          style={{
            maxWidth: maxwidth,
            maxHeight: maxheight,
            backgroundImage: `url(${src})`
          }}
        ></span> : null}
      </li>
    );
  }
}

export default Item;
