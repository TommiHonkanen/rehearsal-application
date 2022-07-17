import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
  name: "Get request to API returns OK",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Post request to API with wrong optionId gives an error message",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").send({
      "questionId": 1,
      "optionId": -62,
    }).expect({ "error": "Incorrect optionId" });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
