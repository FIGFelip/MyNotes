import sanitizeHtml from "sanitize-html";

export function sanitizeNote(req, res, next) {
  if (req.body.title) {
    req.body.title = sanitizeHtml(req.body.title, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (req.body.body) {
    req.body.body = sanitizeHtml(req.body.body, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  next();
}
