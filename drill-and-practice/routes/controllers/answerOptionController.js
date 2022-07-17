import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
    is_correct: params.get("is_correct"),
  };
};

const addAnswerOption = async ({ params, request, response, render }) => {
  const optionData = await getOptionData(request);

  const topicId = params.id;
  const questionId = params.qId;

  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  let isCorrect = false;

  if (optionData.is_correct) {
    isCorrect = true;
  }

  if (!passes) {
    console.log(errors);
    optionData.validationErrors = errors;
    optionData.question = await answerOptionService.listAnswerOptions(
      questionId,
    );
    optionData.topicId = topicId;
    optionData.questionId = questionId;
    const res = await questionService.getName(questionId);
    const name = res[0].question_text;
    optionData.name = name;
    render("answerOptions.eta", optionData);
  } else {
    await answerOptionService.addAnswerOption(
      questionId,
      optionData.option_text,
      isCorrect,
    );
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
  }
};

const listAnswerOptions = async ({ render, params }) => {
  const res = await questionService.getName(params.qId);
  const name = res[0].question_text;
  render("answerOptions.eta", {
    question: await answerOptionService.listAnswerOptions(params.qId),
    topicId: params.id,
    questionId: params.qId,
    name: name,
  });
};

const deleteAnswerOption = async ({ params, response }) => {
  const topicId = params.id;
  const questionId = params.qId;
  const optionId = params.oId;

  await answerOptionService.deleteAnswerOption(optionId);

  response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

export { addAnswerOption, deleteAnswerOption, listAnswerOptions };
