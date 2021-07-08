import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'MICRO_CHAT_MAPPER', pluginInitializer: classes }],
      singular: true,
    }),
  ],
})
export class MappingModule {}
