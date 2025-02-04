const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User API',
        version: '1.0.0',
        description: 'API for managing user',
      },
      servers: [
        {
          url: 'http://localhost:3002/api',
          description: 'Development server',
        },
      ],
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {             
              username: {
                type: 'string',
                example: 'rizwan0612'
              },
              password: {
                type: 'string',
                example: 'test'
              },
              email: {
                type: 'string',
                example: 'rizwan_syn@hotmail.com'
              },
              created_at: {
                type: 'string',
                format: 'date-time',
                example: '2023-07-20T12:34:56Z'
              }
            }
          }
        }
      }
    },
    apis: ['./src/**/*.ts'], // Path to your API routes/controllers
  };
  
  export default options;