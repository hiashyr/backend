import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TheoryTopic } from "./TheoryTopic";

@Entity()
export class TheoryRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TheoryTopic, (topic) => topic.rule)
  topics: TheoryTopic[];

  constructor(id?: number, text?: string, createdAt?: Date, updatedAt?: Date, topics?: TheoryTopic[]) {
    this.id = id ?? 0;
    this.text = text ?? "";
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.topics = topics ?? [];
  }
}
