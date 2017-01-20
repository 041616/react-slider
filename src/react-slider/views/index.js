import ls from '../../css/list.css';
import React from 'react';
import Item from './Item/index';
import {
  directions,
  downloadState,
  animationState,
  getTimingFunction,
  getAnimationFunction
} from '../utils';


class Slider extends React.Component {

  static propTypes = {
    imageList: React.PropTypes.array.isRequired,
    activeImage: React.PropTypes.number,
    anim: React.PropTypes.string,
    timingFunc: React.PropTypes.string,
    duration: React.PropTypes.number,
    delay: React.PropTypes.number
  };

  static defaultProps = {
    activeImage: 0,
    anim: 'slide',
    timingFunc: 'ease',
    duration: 500,
    delay: 0
  };

  constructor(props) {
    super(props);
    const {imageList, activeImage} = props;
    let downloadList = [];
    let index = activeImage < 0 || activeImage >= imageList.length ? 0 : activeImage;
    for (let i = 0; i < imageList.length; i++) {
      downloadList.push(i === index ? downloadState.LOADING : downloadState.PENDING);
    }
    this.state = {
      downloadList: downloadList,
      animation: animationState.STOPPED,
      currIndex: index,
      prevIndex: -1
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {currIndex, downloadList, animation} = this.state;
    if (downloadList[currIndex] === downloadState.LOADING) {
      this.createLoader();
    };
    if (animation === animationState.PLAYING) {
        setTimeout(::this.stopAnimation, this.props.duration);
    };
  }

  createLoader() {
    this.destroyLoader();
    this.img = new Image();
    this.img.onload = ::this.handleLoad;
    this.img.onerror = ::this.handleError;
    this.img.src = this.props.imageList[this.state.currIndex].src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad() {
    const {currIndex, downloadList} = this.state;
    this.destroyLoader();
    downloadList[currIndex] = downloadState.LOADED;
    this.setState({downloadList: downloadList});
  }

  handleError() {
    const {currIndex, downloadList} = this.state;
    this.destroyLoader();
    downloadList[currIndex] = downloadState.FAILED;
    this.setState({downloadList: downloadList});
  }

  onButtonClick(direction) {
    const {currIndex, downloadList, animation} = this.state;
    if (animation === animationState.PLAYING) return;
    let nextIndex;
    if (direction === directions.NEXT) {
      nextIndex = currIndex + 1 < downloadList.length ? currIndex + 1 : 0;
    } else if (direction === directions.PREV) {
      nextIndex = currIndex - 1 < 0 ? downloadList.length - 1 : currIndex - 1;
    }
    downloadList[nextIndex] = downloadList[nextIndex] !== downloadState.LOADED ? downloadState.LOADING : downloadState.LOADED;
    this.setState({
      downloadList: downloadList,
      currIndex: nextIndex,
      prevIndex: currIndex,
      animation: animationState.PLAYING
    });
  }

  onButtonNextClick() {
    this.onButtonClick(directions.NEXT);
  }

  onButtonPrevClick() {
    this.onButtonClick(directions.PREV);
  }

  stopAnimation() {
    this.setState({animation: animationState.STOPPED});
  }

  render() {
    const items = [];
    const {imageList, duration, timingFunc, anim} = this.props;
    const {currIndex, prevIndex, downloadList, animation} = this.state;
    for (let i = 0; i < imageList.length; i++) {
      if (downloadList[i] === downloadState.LOADING) {
        items.push(<Item
          key={i}
          src={imageList[i].data}
          initial={prevIndex < 0}
          current={i === currIndex}
          previous={i === prevIndex}
          duration={duration}
          func={getTimingFunction(timingFunc)}
          anim={getAnimationFunction(anim)}
          loaded={false}
          playing={animation === animationState.PLAYING}
        />);
      } else if (downloadList[i] === downloadState.LOADED) {
        items.push(<Item
          key={i}
          src={imageList[i].src}
          initial={prevIndex < 0}
          current={i === currIndex}
          previous={i === prevIndex}
          duration={duration}
          func={getTimingFunction(timingFunc)}
          anim={getAnimationFunction(anim)}
          loaded={true}
          playing={animation === animationState.PLAYING}
        />);
      }
    };
    return (
      <div>
        <button
          onClick={::this.onButtonPrevClick}
        >prev image</button>
        <button
          onClick={::this.onButtonNextClick}
        >next image</button>
        <ul className={ls.list}>
          {items}
        </ul>
      </div>
    );
  }
}

export default Slider;
