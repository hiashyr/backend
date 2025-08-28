import { Router } from "express";
import {
  createRule,
  getRule,
  updateRule,
  deleteRule,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
  createPoint,
  getPoint,
  updatePoint,
  deletePoint,
  getAllTheoryRules,
} from "../controllers/rule.controller";

const router = Router();

router.post("/theory-rules", createRule);
router.get("/theory-rules/:id", getRule);
router.put("/theory-rules/:id", updateRule);
router.delete("/theory-rules/:id", deleteRule);

router.post("/theory-rules/:ruleId/theory-topics", createTopic);
router.get("/theory-topics/:id", getTopic);
router.put("/theory-topics/:id", updateTopic);
router.delete("/theory-topics/:id", deleteTopic);

router.post("/theory-topics/:topicId/theory-points", createPoint);
router.get("/theory-points/:id", getPoint);
router.put("/theory-points/:id", updatePoint);
router.delete("/theory-points/:id", deletePoint);

router.get("/theory-rules", getAllTheoryRules);

export default router;
