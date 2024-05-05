import { PartialType } from '@nestjs/mapped-types';
import { CreateFareTypeDto } from './create-fare-type.dto';

export class UpdateFareTypeDto extends PartialType(CreateFareTypeDto) {}
