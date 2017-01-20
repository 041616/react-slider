export const directions = {
  PREV: 0,
  NEXT: 1
};

export const downloadState = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

export const animationState ={
  STOPPED: 'stopped',
  PLAYING: 'playing'
};

const timingFunctionList = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'step-start',
  'step-end'
];

const animationFunctionList = [
  'slide',
  'fade'
];

export const getTimingFunction = (name) => {
  const index = timingFunctionList.indexOf(name.toLowerCase());
  return timingFunctionList[index < 0 ? 0 : index];
};

export const getAnimationFunction = (name) => {
  const index = animationFunctionList.indexOf(name.toLowerCase());
  return animationFunctionList[index < 0 ? 0 : index];
};
