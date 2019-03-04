import builder from './api-common';
/**列表 */
export const leftList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-bkTask/list.json'
});
/*下一页 */
export const nextList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-bkTask/nextList.json'
});
export const tableList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-bkTask/table.json'
});
export const firstPage = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-bkTask/firstPage.json'
});
