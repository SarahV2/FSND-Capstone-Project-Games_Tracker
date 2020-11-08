// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

// import { environment } from '../../environments/environment';
import config from './../config.json';

const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';
const JWTS_ACTIVE_INDEX_KEY = 'JWTS_ACTIVE_INDEX_KEY';

let url = config['auth0'].url;
let audience = config['auth0'].audience;
let clientId = config['auth0'].clientId;
let callbackURL = config['auth0'].callbackURL;
let scope = config['auth0'].scope;

export const build_login_link = (callbackPath = '') => {
  let link = 'https://';
  link += url + '.auth0.com';
  link += '/authorize?';
  link += 'audience=' + audience + '&';
  link += 'response_type=token&';
  link += 'client_id=' + clientId + '&';
  link += 'redirect_uri=' + callbackURL + callbackPath + '&';
  link += 'scope=' + scope;
  return link;
};

// invoked in app.component on load
export const check_token_fragment = () => {
  // parse the fragment
  const fragment = window.location.hash.substr(1).split('&')[0].split('=');
  // check if the fragment includes the access token
  if (fragment[0] === 'access_token') {
    // add the access token to the jwt
    let token = fragment[1];
    // save jwts to localstore
    set_jwt(token);
  }
};

export const set_jwt = (token) => {
  localStorage.setItem(JWTS_LOCAL_KEY, token);
  if (token) {
    decodeJWT(token);
  }
};

export const load_jwts = () => {
  let token = localStorage.getItem(JWTS_LOCAL_KEY) || null;
  if (token) {
    decodeJWT(token);
  }
};

export const activeJWT = () => {
  return this.token;
};

export const decodeJWT = (token) => {
  // const jwtservice = new JwtHelperService();
  let payload = jwt_decode(token);
  console.log(payload);
  return payload;
};

export const logout = () => {
  this.token = '';
  this.payload = null;
  this.set_jwt();
};

// can(permission) {
//   return this.payload && this.payload.permissions && this.payload.permissions.length && this.payload.permissions.indexOf(permission) >= 0;
// }
//}
