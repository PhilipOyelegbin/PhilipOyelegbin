import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

const config = new DocumentBuilder()
  .setTitle('Portfolio API')
  .setDescription(
    `This application provides an interface for my portfolio to showcase my projects, and testimonials. It includes endpoints for projects, testimonials, and admin management.`,
  )
  .setVersion('1.0')
  .addBearerAuth()
  .setContact(
    'Philip Oyelegbin',
    'https://philip.oyelegbin.name.ng',
    'philip@oyelegbin.name.ng',
  )
  .addServer(`${process.env.APP_URL}`, 'Local')
  .addServer('api.philip.oyelegbin.name.ng', 'Production')
  .build();

function setupApiDocs(app: INestApplication<any>) {
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  app.use(
    '/swagger',
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          scriptSrcElem: [
            "'self'",
            "'unsafe-inline'",
            'https://cdn.jsdelivr.net',
          ],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", 'https:'],
          fontSrc: ["'self'", 'data:', 'https:'],
        },
      },
    }),
  );

  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      // defaultModelsExpandDepth: -1,
      persistAuthorization: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
}

export default setupApiDocs;
