import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
} from 'typeorm';


@Entity('trending games')
export class TrendingEntity {

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  platforms: number[];

  @Column('varchar')
  releasedate: string;

  @Column('varchar')
  rating: string;

  @Column('varchar')
  background: string;

  @Column('varchar')
  clip: string;

  @Column('varchar')
  gameId: string

  @Column('varchar')
  screenshots: string[];



}
