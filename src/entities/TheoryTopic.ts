import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { TheoryRule } from "./TheoryRule";
import { TheoryPoint } from "././TheoryPoint";

@Entity()
export class TheoryTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TheoryRule, (rule) => rule.topics)
  rule?: TheoryRule;

  @OneToMany(() => TheoryPoint, (point) => point.topic)
  points: TheoryPoint[];

  constructor(points: TheoryPoint[], id?: number, text?: string, createdAt?: Date, updatedAt?: Date, rule?: TheoryRule) {
    this.id = id ?? 0;
    this.text = text ?? "";
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.rule = rule ?? undefined;
    this.points = points;
  }
}
