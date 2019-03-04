import ApiBuilder from '../ApiBuilder';

const builder = new ApiBuilder({
  baseUrl: 'http://localhost:3000/apis',
  simulation: false
});

/**
 * http://0.0.0.0:8080/
 * @type {string}
 */
builder.BASEURL_01 = window.BASEURL_01 || 'http://0.0.0.0:8080/';
builder.BASEURL_02 = window.BASEURL_01 || 'http://192.168.200.166:8085/';


export default builder;
