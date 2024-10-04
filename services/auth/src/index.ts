import Bun from "bun";
import moment from "moment";

Bun.serve({
  port: process.env.PORT || 8000,

  static: {
    "/health-check": Response.json({ status: "OK" }),
  },

  fetch(req) {
    console.log(
      "Request @",
      moment().format("YYYY-MM-DD HH:mm:ss"),
      "|: ",
      req.method,
      req.url
    );

    return Response.json({ error: "Not found" }, { status: 404 });
  },
});
