import {
  answerAmount,
  questionAmount,
  topicAmount,
} from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  render("main.eta", {
    topicAmount: await topicAmount(),
    questionAmount: await questionAmount(),
    answerAmount: await answerAmount(),
  });
};

export { showMain };
