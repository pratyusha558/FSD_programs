import http from 'http';
import url from 'url';

const u = new URL("https://www.w3schools.com/js/js_if_ternary.asp");
console.log(u.protocol);
console.log(u.hostname);
console.log(u.port);
console.log(u.pathname);
console.log(u.searchParams);
console.log(u.hash);
