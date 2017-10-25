/**
 * @file seajsconfig
 * @author daixl
 */
seajs.config({
    base:'./assets/js/app/',
    'map': [
        [ /^(.*\.(?:css|js))(.*)$/i, '$1?20160105' ]
    ]
});
seajs.use("main.js");// JavaScript Document