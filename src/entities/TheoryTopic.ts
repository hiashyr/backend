import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TheoryPoint } from "./TheoryPoint";


@Entity("theory_topic")
export class TheoryTopic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
    nullable: false
  })
  text!: string;

  @Column({
    name: "createdat",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdat!: Date;

  @Column({
    name: "updatedat",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  updatedat!: Date;

  @OneToMany(() => TheoryPoint, theoryPoint => theoryPoint.topic)
  points!: TheoryPoint[];
}
