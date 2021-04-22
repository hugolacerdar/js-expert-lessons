import http from "http";

import { InjectHttpInterceptor } from "./../src/agent.js";

InjectHttpInterceptor();
function handleRequest(resquest, response) {
  //   response.setHeader("X-Instrumented-By", "HugoLacerda");
  response.end("Hello world\n");
}

const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () =>
  console.log("server running at", server.address().port)
);
