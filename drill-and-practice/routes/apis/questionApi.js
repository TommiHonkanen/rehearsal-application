import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const getQuestion = async ({ response }) => {
  const questions = await questionService.listAllQuestions();

  if (questions.length === 0) {
    response.body = {};
  } else {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    const answerOptions = await answerOptionService.listAnswerOptions(
      randomQuestion.id,
    );

    const optionArray = [];

    for (let i = 0; i < answerOptions.length; i++) {
      optionArray.push({
        optionId: answerOptions[i].id,
        optionText: answerOptions[i].option_text,
      });
    }

    response.body = {
      questionId: randomQuestion.id,
      questionText: randomQuestion.question_text,
      answerOptions: optionArray,
    };
  }
};

const handleAnswer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const content = await body.value;

  const answerOption = await answerOptionService.getAnswerOption(
    content.optionId,
  );
  try {
    if (answerOption.is_correct) {
      response.body = { correct: true };
    } else {
      response.body = { correct: false };
    }
  } catch (e) {
    response.body = { error: "Incorrect optionId" };
  }
};

export { getQuestion, handleAnswer };
