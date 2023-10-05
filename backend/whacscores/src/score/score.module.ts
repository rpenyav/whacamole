import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
