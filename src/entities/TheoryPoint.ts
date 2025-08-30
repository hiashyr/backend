import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { TheoryTopic } from "./TheoryTopic";
import { TheoryRule } from "./TheoryRule";

@Entity("theory_point")
export class TheoryPoint {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
    nullable: false
  })
  text!: string;

  @ManyToOne(() => TheoryTopic, theoryTopic => theoryTopic.points)
  @JoinColumn({ name: "topicid" }) // Добавляем JoinColumn
  topic!: TheoryTopic;

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

  @OneToMany(() => TheoryRule, theoryRule => theoryRule.point)
  rules!: TheoryRule[];
}