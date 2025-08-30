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
  @JoinColumn({ name: "pointid" }) // Добавляем JoinColumn
  point!: TheoryPoint;

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
}
