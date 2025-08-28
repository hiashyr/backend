import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { TheoryTopic } from "./TheoryTopic";

@Entity()
export class TheoryPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TheoryTopic, (topic) => topic.points)
  topic?: TheoryTopic;

  constructor(id?: number, text?: string, createdAt?: Date, updatedAt?: Date, topic?: TheoryTopic) {
    this.id = id ?? 0;
    this.text = text ?? "";
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.topic = topic ?? undefined;
  }
}
