import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gateLiveClaim } from "./claim-gate.mjs";

const probe = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "../evidence/pages-probe.json"), "utf8"),
);

test("the recorded pages probe is a 404", () => {
  assert.equal(probe.http_status, 404);
  assert.equal(probe.tree_has_src, false);
});

test("calling that 404 live is rejected", () => {
  const result = gateLiveClaim({ claimed: "live", httpStatus: probe.http_status });
  assert.equal(result.ok, false);
  assert.equal(result.code, "LIVE_WITHOUT_200");
});

test("an honest not-live label passes", () => {
  assert.equal(gateLiveClaim({ claimed: "not-live", httpStatus: 404 }).ok, true);
});

test("live is allowed only on 200", () => {
  assert.equal(gateLiveClaim({ claimed: "live", httpStatus: 200 }).ok, true);
});
