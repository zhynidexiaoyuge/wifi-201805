import builder from './api-common';
/**列表 */
export const tableList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-organizationManage/table.json'
});
// 左侧导航
export const elescopicNav = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/api-organizationManage/elescopicNav.json'
});
