import { PrimaryGeneratedColumn, CreateDateColumn, Column, Entity } from "typeorm";

@Entity("upcoming_games")
export class UpComingGamesEntity {
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
  score: string;
  
  @Column("varchar")
  clip: string;
}
