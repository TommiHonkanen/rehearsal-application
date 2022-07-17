import { assert } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../../../app.js";

Deno.test({
  name: "Password with less than 4 characters gives an error message",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.post("/auth/register").send(
      "email=ggg@gmail.com",
    ).send("password=123");
    assert(
      res.text.includes(
        '<li style="color: red;">password cannot be lower than 4 characters</li>',
      ),
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Invalid email gives an error message",
  async fn() {
    const testClient = await superoak(app);
    const res = await testClient.post("/auth/register").send(
      "email=gg@gg",
    ).send("password=12345");
    assert(
      res.text.includes(
        '<li style="color: red;">email is not a valid email address</li>',
      ),
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
