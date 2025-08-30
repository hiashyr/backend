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
  @JoinColumn({ name: "topic_id" }) // Добавляем JoinColumn
  topic!: TheoryTopic;

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

  @OneToMany(() => TheoryRule, theoryRule => theoryRule.point)
  rules!: TheoryRule[];
}