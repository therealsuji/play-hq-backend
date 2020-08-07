import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
} from 'typeorm';


@Entity('trending_games')
export class TrendingEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("varchar")
  name: string;

  @Column("date")
  releaseDate: string;

  @Column("varchar")
  gameId: string;

  @Column("varchar")
  background: string;

  @Column("varchar")
  clip: string;
  
  @Column("varchar")
  score: string;
 
  @Column({type:'varchar',default:''})
  characterImage: string;
 
}
