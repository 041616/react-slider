import React from 'react';
import it from '../../../css/item.css';
import im from '../../../css/image.css';


class Item extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    active: React.PropTypes.bool,
    loaded: React.PropTypes.bool
  };

  render() {
    const {src, active, loaded} = this.props;
    const itemClassName = active ? `${it.item} ${it.item_state_active}` : it.item;
    const imageClassName = loaded ? im.image : `${im.image} ${im.image_filter_blur}`;
    return (
      <li className={itemClassName}>
        <img className={imageClassName} src={src} alt=""/>
      </li>
    );
  }
}

export default Item;
