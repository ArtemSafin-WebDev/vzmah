import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import masks from './masks';

import anchorLinks from './anchorLinks';
import mediaPlayer from './mediaPlayer';

import accordions from './accordions';
import modals from './modals';

import barba from '@barba/core';
import barbaCss from '@barba/css';
import fancybox from './fancybox';

barba.use(barbaCss);

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    fancybox();
    // validation();
    // customSelects();
    // masks();
    // anchorLinks();
    // accordions();
    // mediaPlayer();
    // modals();
   

    barba.init({
        transitions: [
            {
                name: 'fade',
                leave() {},
                enter() {}
            }
        ]
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
