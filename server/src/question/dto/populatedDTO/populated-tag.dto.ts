import { PickType } from '@nestjs/swagger';
import { Tag } from '../../../tag/entities/tag.entity';

export class PopulatedTagDto extends PickType(Tag, ['_id', 'name'] as const) {}
