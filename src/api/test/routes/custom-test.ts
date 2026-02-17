export default {
  routes: [
    {
      method: 'GET',
      path: '/test-page',
      handler: 'test.page',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/test/external',
      handler: 'test.external',
      config: {
        auth: false,
      },
    },
  ],
};
