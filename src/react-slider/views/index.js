import React from 'react';
import Item from './Item/index';
import ls from '../../css/list.css';

const directions = {
  PREV: 0,
  NEXT: 1
}

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
    let index = activeImage < 0 || activeImage >= imageList.length ? 0 : activeImage;
    for (let i = 0; i < imageList.length; i++) {
      load.push(i === index ? status.LOADING : status.PENDING);
    }
    this.state = {
      load: load,
      currIndex: null,
      nextIndex: index
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {nextIndex, load} = this.state;
    if (load[nextIndex] === status.LOADING) {
      this.createLoader();
    }
  }

  createLoader() {
    this.destroyLoader();
    this.img = new Image();
    this.img.onload = ::this.handleLoad;
    this.img.onerror = ::this.handleError;
    this.img.src = this.props.imageList[this.state.nextIndex].src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad() {
    const {nextIndex, load} = this.state;
    this.destroyLoader();
    load[nextIndex] = status.LOADED;
    this.setState({load: load});
  }

  handleError() {
    const {nextIndex, load} = this.state;
    this.destroyLoader();
    load[nextIndex] = status.FAILED;
    this.setState({load: load});
  }

  onButtonClick(direction) {
    const {nextIndex, load} = this.state;
    let newNextIndex;
    if (direction === directions.NEXT) {
      newNextIndex = nextIndex + 1 < load.length ? nextIndex + 1 : 0;
    } else if (direction === directions.PREV) {
      newNextIndex = nextIndex - 1 < 0 ? load.length - 1 : nextIndex - 1;
    }
    load[newNextIndex] = load[newNextIndex] !== status.LOADED ? status.LOADING : status.LOADED;
    this.setState({
      load: load,
      nextIndex: newNextIndex,
      currIndex: nextIndex
    });
  }

  onButtonNextClick() {
    this.onButtonClick(directions.NEXT);
  }

  onButtonPrevClick() {
    this.onButtonClick(directions.PREV);
  }

  render() {
    const items = [];
    const {imageList} = this.props;
    const {currIndex, nextIndex, load} = this.state;
    for (let i = 0; i < imageList.length; i++) {
      if (load[i] === status.LOADING) {
        items.push(<Item
          key={i}
          src={imageList[i].data}
          current={i === currIndex}
          next={i === nextIndex}
          loaded={false}
        />);
      } else if (load[i] === status.LOADED) {
        items.push(<Item
          key={i}
          src={imageList[i].src}
          current={i === currIndex}
          next={i === nextIndex}
          loaded={true}
        />);
      }
    };
    return (
      <div>
        <button onClick={::this.onButtonPrevClick}>prev image</button>
        <button onClick={::this.onButtonNextClick}>next image</button>
        <ul className={ls.list}>
          {items}
        </ul>
      </div>
    );
  }
}

export default Slider;
