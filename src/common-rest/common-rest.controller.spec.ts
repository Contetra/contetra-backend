import { Test, TestingModule } from '@nestjs/testing';
import { CommonRestController } from './common-rest.controller';
import { CommonRestService } from './common-rest.service';

describe('CommonRestController', () => {
  let controller: CommonRestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonRestController],
      providers: [CommonRestService],
    }).compile();

    controller = module.get<CommonRestController>(CommonRestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
