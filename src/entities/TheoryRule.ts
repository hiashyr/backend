import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TheoryTopic } from "./TheoryTopic";

@Entity()
export class TheoryRule {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  text?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => TheoryTopic, (topic) => topic.rule)
  topics?: TheoryTopic[];

}
