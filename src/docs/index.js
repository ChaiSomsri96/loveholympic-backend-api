export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fest Five API Documentation',
      version: '0.1.0',
      description:
        'This is a documentation CRUD API Fest Five application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'festFive',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/packages/admin/route.js'],
};
