import { executeQuery } from "../database/database.js";

const addAnswer = async (userId, questionId, optionId) => {
  await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3);",
    userId,
    questionId,
    optionId,
  );
};

export { addAnswer };
