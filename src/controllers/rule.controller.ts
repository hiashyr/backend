import { Request, Response } from "express";
import { TheoryRuleService } from "../services/rule.service";

const theoryRuleService = new TheoryRuleService();

export const createRule = async (req: Request, res: Response) => {
  try {
    const rule = await theoryRuleService.createRule(req.body);
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getRule = async (req: Request, res: Response) => {
  try {
    const rule = await theoryRuleService.getRule(parseInt(req.params.id));
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }
    res.status(200).json(rule);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRule = async (req: Request, res: Response) => {
  try {
    const rule = await theoryRuleService.updateRule(parseInt(req.params.id), req.body);
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }
    res.status(200).json(rule);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRule = async (req: Request, res: Response) => {
  try {
    await theoryRuleService.deleteRule(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createTopic = async (req: Request, res: Response) => {
  try {
    const topic = await theoryRuleService.createTopic(parseInt(req.params.ruleId), req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTopic = async (req: Request, res: Response) => {
  try {
    const topic = await theoryRuleService.getTopic(parseInt(req.params.id));
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateTopic = async (req: Request, res: Response) => {
  try {
    const topic = await theoryRuleService.updateTopic(parseInt(req.params.id), req.body);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteTopic = async (req: Request, res: Response) => {
  try {
    await theoryRuleService.deleteTopic(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createPoint = async (req: Request, res: Response) => {
  try {
    const point = await theoryRuleService.createPoint(parseInt(req.params.topicId), req.body);
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPoint = async (req: Request, res: Response) => {
  try {
    const point = await theoryRuleService.getPoint(parseInt(req.params.id));
    if (!point) {
      return res.status(404).json({ message: "Point not found" });
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePoint = async (req: Request, res: Response) => {
  try {
    const point = await theoryRuleService.updatePoint(parseInt(req.params.id), req.body);
    if (!point) {
      return res.status(404).json({ message: "Point not found" });
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePoint = async (req: Request, res: Response) => {
  try {
    await theoryRuleService.deletePoint(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
