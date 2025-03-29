import { PartialType } from '@nestjs/swagger';
import { AddPropertyReqDto } from 'src/property-managment/dtos/add-property-req.dto';

export class UpdatePropertyReqDto extends PartialType(AddPropertyReqDto) {}
