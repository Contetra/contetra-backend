import { PartialType } from '@nestjs/mapped-types';
import { CreateCategories } from './create-common-rest.dto';

export class UpdateCommonRestDto extends PartialType(CreateCategories) {}
