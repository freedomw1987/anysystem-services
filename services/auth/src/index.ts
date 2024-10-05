import Bun from "bun";
import moment from "moment";

const port = process.env.PORT || 8000;

Bun.serve({
  port,

  static: {
    "/health-check": Response.json({ status: "OK" }),
  },

  fetch: (req) => {
    try {
      const url = new URL(req.url);
      const method = req.method;
      const apiEndpoint = `${method} ${url.pathname}`;
      const params = url.searchParams;

      console.log(apiEndpoint);

      switch (apiEndpoint) {
        case "GET /user":
          return Response.json({ status: "user" });

        case "GET /org":
          return Response.json({ status: "org" });
      }

      return Response.json({ error: "Not found" }, { status: 404 });
    } catch (error) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
});

console.log(
  `${moment().format(
    "YYYY-MM-DD HH:mm:ss"
  )}: Serving on http://localhost:${port}`
);
