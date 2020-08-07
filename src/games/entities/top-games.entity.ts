import { PrimaryGeneratedColumn, CreateDateColumn, Column, Entity } from "typeorm";

@Entity("top_games")
export class TopGamesEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  releaseDate: string;

  @Column("varchar")
  gameId: string;

  @Column("varchar")
  background: string;

  @Column("varchar")
  score: string;
  
  @Column("varchar")
  clip: string;
 
}
