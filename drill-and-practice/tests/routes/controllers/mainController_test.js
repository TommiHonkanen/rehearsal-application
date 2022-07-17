import { assert } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
  name: "Get request to / returns the main page",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.get("/");
    assert(res.text.includes("<h1>Rehearsal application</h1>"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Main page contains navigation elements",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.get("/");
    assert(
      res.text.includes(
        '<a class="nav-link active" href="/topics">Topics</a>',
      ) &&
        res.text.includes(
          '<a class="nav-link active" href="/quiz">Quizzes</a>',
        ),
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
