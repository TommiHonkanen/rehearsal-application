import { assert } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
  name: "Get request to /auth/login returns the login page",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.get("/auth/login");
    assert(res.text.includes("<h1>Login form</h1>"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Login page contains a link for registering",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.get("/auth/login");
    assert(
      res.text.includes(
        '<a href="/auth/register">Not yet registered? Register here.</a>',
      ),
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
