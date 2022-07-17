import { executeQuery } from "../database/database.js";

const addAnswerOption = async (questionId, optionText, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3);",
    questionId,
    optionText,
    isCorrect,
  );
};

const listAnswerOptions = async (questionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1;",
    questionId,
  );

  return res.rows;
};

const deleteAnswerOption = async (optionId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id = $1;",
    optionId,
  );
  await executeQuery(
    "DELETE FROM question_answer_options WHERE id = $1;",
    optionId,
  );
};

const getAnswerOption = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE id = $1;",
    id,
  );
  return res.rows[0];
};

const getCorrect = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = TRUE;",
    id,
  );

  if (res.rows.length === 0) {
    return undefined;
  } else {
    return res.rows[0];
  }
};

export {
  addAnswerOption,
  deleteAnswerOption,
  getAnswerOption,
  getCorrect,
  listAnswerOptions,
};
