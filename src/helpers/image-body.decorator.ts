import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';

export function ApiFile() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
}
