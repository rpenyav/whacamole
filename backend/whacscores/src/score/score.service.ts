import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score } from './score.schema';

@Injectable()
export class ScoreService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async create(createScoreDto: any): Promise<Score> {
    const createdScore = new this.scoreModel(createScoreDto);
    return createdScore.save();
  }

  async findAll(): Promise<Score[]> {
    return this.scoreModel.find().sort({ score: -1 }).exec();
  }
}
