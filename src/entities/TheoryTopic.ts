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
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt!: Date;

  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  updatedAt!: Date;

  @OneToMany(() => TheoryPoint, theoryPoint => theoryPoint.topic)
  points!: TheoryPoint[];
}
