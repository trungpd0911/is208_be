import { Module } from '@nestjs/common';
import { HistoryLessonsService } from './history-lessons.service';
import { HistoryLessonsController } from './history-lessons.controller';

@Module({
	controllers: [HistoryLessonsController],
	providers: [HistoryLessonsService],
})
export class HistoryLessonsModule {}
