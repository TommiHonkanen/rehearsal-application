import { executeQuery } from "../database/database.js";

const topicAmount = async () => {
  const res = await executeQuery("SELECT COUNT(*) FROM topics;");
  return res.rows[0].count;
};

const questionAmount = async () => {
  const res = await executeQuery("SELECT COUNT(*) FROM questions;");
  return res.rows[0].count;
};

const answerAmount = async () => {
  const res = await executeQuery("SELECT COUNT(*) FROM question_answers;");
  return res.rows[0].count;
};

export { answerAmount, questionAmount, topicAmount };
