
import jwt_decode from 'jwt-decode';

import config from './config.json';

const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';

export class auth {
  url = config['auth0'].url;
  audience = config['auth0'].audience;
  clientId = config['auth0'].clientId;
  callbackURL = config['auth0'].callbackURL;


  build_login_link(callbackPath = '') {
    let link = 'https://';
    link += this.url + '.auth0.com';
    link += '/authorize?';
    link += 'audience=' + this.audience + '&';
    link += 'response_type=token&';
    link += 'client_id=' + this.clientId + '&';
    link += 'redirect_uri=' + this.callbackURL + callbackPath;
    return link;
  }

  // invoked in app on load
  check_token_fragment() {
    // parse the fragment
    const fragment = window.location.hash.substr(1).split('&')[0].split('=');
    // check if the fragment includes the access token
    if (fragment[0] === 'access_token') {
      // add the access token to the jwt
      this.token = fragment[1];
      // save jwts to localstore
      this.set_jwt();
    }
  }

  set_jwt() {
    localStorage.setItem(JWTS_LOCAL_KEY, this.token);
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  load_jwts=()=> {
    this.token = localStorage.getItem(JWTS_LOCAL_KEY) || null;
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  activeJWT() {
    return this.token;
  }

  decodeJWT(token) {
    this.payload = jwt_decode.decode(token);
    return this.payload;
  }

  logout() {
    this.token = '';
    this.payload = null;
    this.set_jwt();
  }

    can(permission) {
      return this.payload && this.payload.permissions && this.payload.permissions.length && this.payload.permissions.indexOf(permission) >= 0;
    }
}
