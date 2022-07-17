import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get(
  "/topics/:id/questions/:qId",
  answerOptionController.listAnswerOptions,
);
router.post(
  "/topics/:id/questions/:qId/options",
  answerOptionController.addAnswerOption,
);
router.post("/topics/:id/delete", topicController.deleteTopic);
router.post(
  "/topics/:id/questions/:qId/options/:oId/delete",
  answerOptionController.deleteAnswerOption,
);
router.post(
  "/topics/:id/questions/:qId/delete",
  questionController.deleteQuestion,
);
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/quiz", quizController.listTopics);
router.get("/quiz/:id", quizController.chooseQuestion);
router.get("/quiz/:id/questions/:qId", quizController.showQuestion);
router.post(
  "/quiz/:id/questions/:qId/options/:oId",
  quizController.handleAnswer,
);
router.get(
  "/quiz/:id/questions/:qId/correct",
  quizController.showResultCorrect,
);
router.get(
  "/quiz/:id/questions/:qId/incorrect",
  quizController.showResultIncorrect,
);
router.get("/api/questions/random", questionApi.getQuestion);
router.post("/api/questions/answer", questionApi.handleAnswer);

export { router };
