#!/usr/bin/env node
/**
 * Refresh evidence/pages-probe.json from the live GitHub Pages URL.
 * Does not flip any "live" marketing by itself. Prints the status.
 */
const url = "https://No-Gas-Labs-Official.github.io/No_Gas_Labs_Publibuildsec/";
const res = await fetch(url, { redirect: "manual" });
const record = {
  url,
  observed_at: new Date().toISOString(),
  http_status: res.status,
  description_claim: "Sovereign Forge & Oracle MVP Live",
  tree_has_src: false,
  note: "Refreshed by scripts/probe-pages.mjs. Do not set description to Live unless http_status is 200 and src/ exists.",
};
process.stdout.write(JSON.stringify(record, null, 2) + "\n");
