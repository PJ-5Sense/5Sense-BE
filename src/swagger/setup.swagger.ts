import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDescription } from './description.swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setVersion('Development')
    .addBearerAuth({ type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' }, 'accessToken')
    .addBearerAuth({ type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' }, 'refreshToken')
    .setTitle('Oh Sense')
    .setDescription(SwaggerDescription)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
