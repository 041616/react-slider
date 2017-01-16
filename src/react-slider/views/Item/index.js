import React from 'react';
import it from '../../../css/item.css';
import im from '../../../css/image.css';


class Item extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    current: React.PropTypes.bool,
    next: React.PropTypes.bool,
    loaded: React.PropTypes.bool
  };

  render() {
    const {src, current, next, loaded} = this.props;
    let itemClassName;
    let image;

    if (next) {
      itemClassName = `${it.item} ${it.item_state_active}`;
    } else if (current) {
      itemClassName = `${it.item} ${it.item_state_current}`;
    } else {
      itemClassName = it.item;
    }

    if (loaded) {
      image = <img className={im.image} src={src} alt=""/>;
    } else {
      image = <img
        className={`${im.image} ${im.image_state_preview}`}
        style={{
          background: `url(${src}) no-repeat 50% 50%`,
          backgroundSize: 'contain'
        }}
      />;
    }
    return (
      <li className={itemClassName}>
        {image}
      </li>
    );
  }
}

export default Item;
