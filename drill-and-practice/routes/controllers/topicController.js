import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};

const addTopic = async ({ request, response, user, render }) => {
  if (!user.admin) {
    response.redirect("/topics");
    return;
  }

  const topicData = await getTopicData(request);

  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    console.log(errors);
    topicData.validationErrors = errors;
    topicData.topics = await topicService.listTopics();
    topicData.admin = user.admin;
    render("topics.eta", topicData);
  } else {
    await topicService.addTopic(user.id, topicData.name);
    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response, user }) => {
  if (!user.admin) {
    response.redirect("/topics");
    return;
  }

  await topicService.deleteTopic(params.id);

  response.redirect("/topics");
};

const listTopics = async ({ render, user }) => {
  render("topics.eta", {
    topics: await topicService.listTopics(),
    admin: user.admin,
  });
};

export { addTopic, deleteTopic, listTopics };
