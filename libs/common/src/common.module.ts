import { Module } from '@nestjs/common';
import { LoggerService } from '@nest-micro-chat/common/logging/logger.service';
import { MappingModule } from '@nest-micro-chat/common/mapping';

@Module({
  imports: [MappingModule],
  providers: [LoggerService],
  exports: [LoggerService, MappingModule],
})
export class CommonModule {}
