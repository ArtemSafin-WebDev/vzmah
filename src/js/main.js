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

    let prevTrigger = null;

    barba.hooks.once(data => {
        console.log('Once global hook', data);

        const navLinks = Array.from(document.querySelectorAll('.page-header__nav a'));

        // console.log('nav links', navLinks);

        const path = data.next.url.path;

        // console.log('Next path', path)

        const activeLink = navLinks.find(link => link.href.endsWith(path));

        // console.log('Active link', activeLink)

        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
            prevTrigger = activeLink;
        }
    });

    barba.hooks.before(data => {
        console.log('Trigger', data.trigger);
        if (prevTrigger) {
            prevTrigger.classList.remove('active');
        }
        data.trigger.classList.add('active');

        prevTrigger = data.trigger;
    });

    barba.init({
        transitions: [
            {
                name: 'home',
                sync: true,
                once() {},
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
