import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score.schema';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  async create(@Body() createScoreDto: any): Promise<Score> {
    return this.scoreService.create(createScoreDto);
  }

  @Get()
  async findAll(): Promise<Score[]> {
    return this.scoreService.findAll();
  }
}
