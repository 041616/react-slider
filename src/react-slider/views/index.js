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
    };
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

  // getContainerWidth() {
  //   const containerClientRect = this.refs.SliderContainer.getDOMNode().getBoundingClientRect();
  //   return containerClientRect.right - containerClientRect.left;
  // }

  createLoader() {
    this.destroyLoader();
    const {imageList} = this.props;
    const {currIndex} = this.state;
    this.img = new Image();
    this.img.onload = ::this.handleLoad;
    this.img.onerror = ::this.handleError;
    this.img.src = imageList[currIndex].src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad() {
    const {currIndex, downloadList, animation} = this.state;
    if (animation === animationState.PLAYING) return;
    this.destroyLoader();
    downloadList[currIndex] = downloadState.LOADED;
    this.setState({downloadList: downloadList});
  }

  handleError() {
    const {currIndex, downloadList, animation} = this.state;
    if (animation === animationState.PLAYING) return;
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
    const params = {
      initial: prevIndex < 0,
      duration: duration,
      func: getTimingFunction(timingFunc),
      anim: getAnimationFunction(anim),
      playing: animation === animationState.PLAYING,
      lastIndex: imageList.length - 1
    }
    for (let i = 0; i < imageList.length; i++) {
      params.key = i;
      params.index = i;
      params.currIndex = currIndex;
      params.prevIndex = prevIndex;
      params.data = imageList[i].data;
      params.maxwidth = imageList[i].width;
      params.maxheight = imageList[i].height;
      if (downloadList[i] === downloadState.LOADING || downloadList[i] === downloadState.FAILED) {
        items.push(<Item src="" loaded={false} {...params}/>);
      } else if (downloadList[i] === downloadState.LOADED) {
        items.push(<Item src={imageList[i].src} loaded={true} {...params}/>);
      }
    };
    return (
      <div ref="SliderContainer">
        <button onClick={::this.onButtonPrevClick}>prev image</button>
        <button onClick={::this.onButtonNextClick}>next image</button>
        <ul className={ls.list} style={{height: 'none'}}>{items}</ul>
      </div>
    );
  }
}

export default Slider;
