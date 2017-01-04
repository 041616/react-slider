import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './views/index';

function init(node, opts) {
    ReactDOM.render(<Slider {...opts}/>, node);
}

module.exports = init
