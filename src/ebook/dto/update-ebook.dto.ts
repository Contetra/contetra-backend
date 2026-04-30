import { PartialType } from '@nestjs/mapped-types';
import { CreateEbookBiiis } from './create-ebook.dto';

export class UpdateEbookBiiis extends PartialType(CreateEbookBiiis) {}
