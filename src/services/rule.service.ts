import { AppDataSource } from "../config/data-source";
import { TheoryRule } from "../entities/TheoryRule";
import { TheoryTopic } from "../entities/TheoryTopic";
import { TheoryPoint } from "../entities/TheoryPoint";

export class TheoryRuleService {
  private ruleRepository = AppDataSource.getRepository(TheoryRule);
  private topicRepository = AppDataSource.getRepository(TheoryTopic);
  private pointRepository = AppDataSource.getRepository(TheoryPoint);

  async createRule(data: Partial<TheoryRule>): Promise<TheoryRule> {
    const rule = this.ruleRepository.create(data);
    return await this.ruleRepository.save(rule);
  }

  async getRule(id: number): Promise<TheoryRule | null> {
    return await this.ruleRepository.findOne({
      where: { id },
      relations: ["topics", "topics.points"],
    });
  }

  async updateRule(id: number, data: Partial<TheoryRule>): Promise<TheoryRule | null> {
    await this.ruleRepository.update(id, data);
    return await this.getRule(id);
  }

  async deleteRule(id: number): Promise<void> {
    await this.ruleRepository.delete(id);
  }

  async createTopic(ruleId: number, data: Partial<TheoryTopic>): Promise<TheoryTopic> {
    const rule = await this.ruleRepository.findOne({ where: { id: ruleId } });
    if (!rule) {
      throw new Error("Rule not found");
    }
    const topic = this.topicRepository.create({ ...data, rule });
    return await this.topicRepository.save(topic);
  }

  async getTopic(id: number): Promise<TheoryTopic | null> {
    return await this.topicRepository.findOne({
      where: { id },
      relations: ["points"],
    });
  }

  async updateTopic(id: number, data: Partial<TheoryTopic>): Promise<TheoryTopic | null> {
    await this.topicRepository.update(id, data);
    return await this.getTopic(id);
  }

  async deleteTopic(id: number): Promise<void> {
    await this.topicRepository.delete(id);
  }

  async createPoint(topicId: number, data: Partial<TheoryPoint>): Promise<TheoryPoint> {
    const topic = await this.topicRepository.findOne({ where: { id: topicId } });
    if (!topic) {
      throw new Error("Topic not found");
    }
    const point = this.pointRepository.create({ ...data, topic });
    return await this.pointRepository.save(point);
  }

  async getPoint(id: number): Promise<TheoryPoint | null> {
    return await this.pointRepository.findOne({ where: { id } });
  }

  async updatePoint(id: number, data: Partial<TheoryPoint>): Promise<TheoryPoint | null> {
    await this.pointRepository.update(id, data);
    return await this.getPoint(id);
  }

  async deletePoint(id: number): Promise<void> {
    await this.pointRepository.delete(id);
  }
}
