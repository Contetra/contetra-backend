import { Test, TestingModule } from '@nestjs/testing';
import { CommonRestService } from './common-rest.service';

describe('CommonRestService', () => {
  let service: CommonRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonRestService],
    }).compile();

    service = module.get<CommonRestService>(CommonRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
