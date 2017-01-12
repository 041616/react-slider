import React from 'react';
import Item from './Item/index';
import ls from '../../css/list.css';

const status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

class Slider extends React.Component {

  static propTypes = {
    imageList: React.PropTypes.array.isRequired,
    activeImage: React.PropTypes.number
  };

  static defaultProps = {
    activeImage: 0
  }

  constructor(props) {
    super(props);
    const {imageList, activeImage} = props;
    let load = [];
    let activeIndex = activeImage < 0 || activeImage >= imageList.length ? 0 : activeImage;
    for (let i = 0; i < imageList.length; i++) {
      load.push(i === activeIndex ? status.LOADING : status.PENDING);
    }
    this.state = {
      load: load,
      activeIndex: activeIndex
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {activeIndex, load} = this.state;
    if (load[activeIndex] === status.LOADING) {
      this.createLoader();
    }
  }

  createLoader() {
    this.destroyLoader();
    this.img = new Image();
    this.img.onload = ::this.handleLoad;
    this.img.onerror = ::this.handleError;
    this.img.src = this.props.imageList[this.state.activeIndex].src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad() {
    const {activeIndex, load} = this.state;
    this.destroyLoader();
    load[activeIndex] = status.LOADED;
    this.setState({load: load});
  }

  handleError() {
    const {activeIndex, load} = this.state;
    this.destroyLoader();
    load[activeIndex] = status.FAILED;
    this.setState({load: load});
  }

  onButtonClick() {
    const {activeIndex, load} = this.state;
    const nextActiveIndex = activeIndex + 1 < load.length ? activeIndex + 1 : 0;
    load[nextActiveIndex] = load[nextActiveIndex] !== status.LOADED ? status.LOADING : status.LOADED;
    this.setState({
      load: load,
      activeIndex: nextActiveIndex
    });
  }

  render() {
    const items = [];
    const {imageList} = this.props;
    const {activeIndex, load} = this.state;
    for (let i = 0; i < imageList.length; i++) {
      if (load[i] === status.LOADING) {
        items.push(<Item
          key={i}
          src={imageList[i].data}
          active={i === activeIndex}
          loaded={false}
        />);
      } else if (load[i] === status.LOADED) {
        items.push(<Item
          key={i}
          src={imageList[i].src}
          active={i === activeIndex}
          loaded={true}
        />);
      }
    };
    return (
      <div>
        <button onClick={::this.onButtonClick}>next image</button>
        <ul className={ls.list}>
          {items}
        </ul>
      </div>
    );
  }
}

export default Slider;
