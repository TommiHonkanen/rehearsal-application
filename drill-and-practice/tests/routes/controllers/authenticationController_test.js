import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
  name: "Get request to /topics should redirect to login page",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.get("/topics");
    assertEquals(res.text, "Redirecting to /auth/login.");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Get request to /quiz should redirect to login page",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.get("/quiz");
    assertEquals(res.text, "Redirecting to /auth/login.");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
