import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, text, topicId) => {
  await executeQuery(
    "INSERT INTO questions (user_id, question_text, topic_id) VALUES ($1, $2, $3);",
    userId,
    text,
    topicId,
  );
};

const listAllQuestions = async () => {
  const res = await executeQuery("SELECT * FROM questions;");

  return res.rows;
};

const listQuestions = async (topicId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1;",
    topicId,
  );

  return res.rows;
};

const getName = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE id = $1;",
    id,
  );

  return res.rows;
};

const deleteQuestion = async (id) => {
  await executeQuery("DELETE FROM questions WHERE id = $1;", id);
};

const getQuestion = async (id) => {
  const res = await executeQuery("SELECT * FROM questions WHERE id = $1", id);
  return res.rows[0];
};

export {
  addQuestion,
  deleteQuestion,
  getName,
  getQuestion,
  listAllQuestions,
  listQuestions,
};
