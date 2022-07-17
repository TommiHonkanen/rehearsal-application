import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import * as answerService from "../../services/answerService.js";

const listTopics = async ({ render }) => {
  render("quiz.eta", {
    topics: await topicService.listTopics(),
  });
};

const chooseQuestion = async ({ params, response }) => {
  const questions = await questionService.listQuestions(params.id);

  if (questions.length === 0) {
    response.redirect(`/quiz/${params.id}/questions/-99`);
    return;
  }

  const randomQuestion =
    questions[Math.floor(Math.random() * questions.length)];

  response.redirect(`/quiz/${params.id}/questions/${randomQuestion.id}`);
};

const showQuestion = async ({ params, render }) => {
  if (params.qId === "-99") {
    render("quizQuestion.eta", {
      error: "No questions for this topic yet.",
    });
    return;
  }

  const question = await questionService.getQuestion(params.qId);
  const options = await answerOptionService.listAnswerOptions(
    params.qId,
  );

  render("quizQuestion.eta", {
    options: options,
    name: question.question_text,
    questionId: params.qId,
    topicId: params.id,
  });
};

const handleAnswer = async ({ params, response, user }) => {
  const option = await answerOptionService.getAnswerOption(params.oId);

  await answerService.addAnswer(user.id, params.qId, params.oId);

  if (option.is_correct) {
    response.redirect(`/quiz/${params.id}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.id}/questions/${params.qId}/incorrect`);
  }
};

const showResultCorrect = ({ params, render }) => {
  render("quizCorrect.eta", { topicId: params.id });
};

const showResultIncorrect = async ({ params, render }) => {
  const correctAnswer = await answerOptionService.getCorrect(params.qId);

  render("quizIncorrect.eta", {
    topicId: params.id,
    name: correctAnswer.option_text,
  });
};

export {
  chooseQuestion,
  handleAnswer,
  listTopics,
  showQuestion,
  showResultCorrect,
  showResultIncorrect,
};
