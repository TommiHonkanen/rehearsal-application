import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
  };
};

const addQuestion = async ({ params, request, response, user, render }) => {
  const questionData = await getQuestionData(request);

  const topicId = params.id;

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    questionData.questions = await questionService.listQuestions(topicId);
    questionData.topicId = topicId;
    const res = await topicService.getName(params.id);
    const name = res[0].name;
    questionData.name = name;
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.question_text,
      topicId,
    );
    response.redirect(`/topics/${topicId}`);
  }
};

const listQuestions = async ({ render, params }) => {
  const res = await topicService.getName(params.id);
  const name = res[0].name;
  render("questions.eta", {
    questions: await questionService.listQuestions(params.id),
    topicId: params.id,
    name: name,
  });
};

const deleteQuestion = async ({ params, response }) => {
  const topicId = params.id;
  const questionId = params.qId;

  await questionService.deleteQuestion(questionId);

  response.redirect(`/topics/${topicId}`);
};

export { addQuestion, deleteQuestion, listQuestions };
