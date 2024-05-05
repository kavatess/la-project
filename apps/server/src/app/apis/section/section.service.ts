import { Injectable } from '@nestjs/common';
import { DbModelService } from '../../shared/services/db-model.service';
import { Section, SectionDocument } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SectionService extends DbModelService<
  Section,
  CreateSectionDto,
  UpdateSectionDto
> {
  constructor(
    @InjectModel(Section.name)
    protected readonly sectionModel: Model<SectionDocument>
  ) {
    super(sectionModel);
  }
}
