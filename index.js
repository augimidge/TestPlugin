import exampleRoute from './server/routes/example';
import api from './server/routes';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      
      app: {
        title: 'Augi Testplugin',
        description: 'firstplugin',
        main: 'plugins/augi_testplugin/app'
      },
      
      
      hacks: [
        'plugins/augi_testplugin/hack'
      ]
      
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    
    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
      api(server);
    }
    

  });
};
