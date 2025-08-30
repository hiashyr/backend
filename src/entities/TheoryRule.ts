import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TheoryPoint } from "./TheoryPoint";

@Entity("theory_rule")
export class TheoryRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
    nullable: false
  })
  text!: string;

  @ManyToOne(() => TheoryPoint, theoryPoint => theoryPoint.rules)
  @JoinColumn({ name: "point_id" }) // Добавляем JoinColumn
  point!: TheoryPoint;

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
}