import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryLessonDto } from './create-history-lesson.dto';

export class UpdateHistoryLessonDto extends PartialType(
	CreateHistoryLessonDto,
) {}
