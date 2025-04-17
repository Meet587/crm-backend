import { PartialType } from '@nestjs/mapped-types';
import { CreateBuilderReqDto } from './create-builder-req.dto';

export class UpdateBuildersReqDto extends PartialType(CreateBuilderReqDto) {}
