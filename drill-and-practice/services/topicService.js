import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    "INSERT INTO topics (user_id, name) VALUES ($1, $2);",
    userId,
    name,
  );
};

const listTopics = async () => {
  const res = await executeQuery("SELECT * FROM topics ORDER BY name;");

  return res.rows;
};

const getName = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM topics WHERE id = $1;",
    id,
  );

  return res.rows;
};

const deleteTopic = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1;",
    id,
  );

  const questions = res.rows;

  for (const question of questions) {
    await executeQuery(
      "DELETE FROM question_answers WHERE question_id = $1;",
      question.id,
    );
    await executeQuery(
      "DELETE FROM question_answer_options WHERE question_id = $1;",
      question.id,
    );
    await executeQuery(
      "DELETE FROM questions WHERE id = $1;",
      question.id,
    );
  }

  await executeQuery("DELETE FROM topics WHERE id = $1;", id);
};

export { addTopic, deleteTopic, getName, listTopics };
