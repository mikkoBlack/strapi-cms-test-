import { PuzzlePiece } from '@strapi/icons';
import type { StrapiApp } from '@strapi/strapi/admin';

const PLUGIN_ID = 'external-api-test';

export default {
  config: {
    locales: [],
  },
  register(app: StrapiApp) {
    app.addMenuLink({
      to: `/plugins/${PLUGIN_ID}`,
      icon: PuzzlePiece,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'External API Test',
      },
      Component: async () => {
        const page = await import('./pages/ExternalApiPage');
        return page;
      },
      permissions: [],
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      name: 'External API Test',
    });
  },
};
