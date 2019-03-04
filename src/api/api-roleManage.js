import builder from './api-common';
/**列表 */
export const tableList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-roleManage/table.json'
});
