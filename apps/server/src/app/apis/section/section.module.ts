import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionAdminController } from './section.admin-controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';
import { Block, BlockSchema } from './entities/block.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Section.name,
        schema: SectionSchema,
      },
      {
        name: Block.name,
        schema: BlockSchema,
      },
    ]),
  ],
  controllers: [SectionAdminController],
  providers: [SectionService],
})
export class SectionModule {}
