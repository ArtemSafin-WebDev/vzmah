import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';

import barba from '@barba/core';
import barbaCss from '@barba/css';
import fancybox from './fancybox';
import menu from './menu';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';

barba.use(barbaCss);

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    fancybox();
    menu();

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

        if (typeof window.closeMenu === 'function') {
            window.closeMenu();
        }

        disableBodyScroll(document.querySelector('.page-header'), {
            reserveScrollBarGap: true
        });

        gsap.to(window, {
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
               
            },
            scrollTo: {
                y: 0,
                autoKill: false
            }
        });
    });

    barba.hooks.after(() => {
        clearAllBodyScrollLocks();
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
