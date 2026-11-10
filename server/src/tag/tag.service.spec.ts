import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity';

// TODO: Implement proper mock for tagModel
const tagModel = {};

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: getModelToken(Tag.name), useValue: tagModel },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
