import builder from './api-common';
/**test */
export const tableList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-collisionAnalysis/table.json'
});
/***任务列表 */
export const taskList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-collisionAnalysis/list.json'
});