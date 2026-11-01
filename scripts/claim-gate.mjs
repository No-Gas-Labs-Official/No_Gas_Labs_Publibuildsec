/**
 * A public page is "live" only when a probe recorded HTTP 200.
 * Description text and a package.json are not a deploy.
 */

export function gateLiveClaim({ claimed, httpStatus }) {
  const live = String(claimed).toLowerCase() === "live";
  if (live && httpStatus !== 200) {
    return { ok: false, code: "LIVE_WITHOUT_200", httpStatus };
  }
  return { ok: true, code: "OK", httpStatus };
}
