import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './views/index';

function init(node, opts) {
    if (opts.imageList) {
        ReactDOM.render(<Slider {...opts}/>, node);
    } else {
        node.remove();
    }
}

module.exports = init
