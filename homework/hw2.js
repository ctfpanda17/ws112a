import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const school_room = new Map();
school_room.set("320",{
    "教室":"E320",
    "教室名稱":"多媒體教室"
});
school_room.set("319",{
    "教室":"E319",
    "教室名稱":"嵌入式實驗室"
});
const router = new Router();
router
.get("/", (context) => {
    context.response.body = "Hello world!";
})
.get("/nqu", (context) => {
    context.response.body = `
    <html>
        <body>
            <a href="https://www.nqu.edu.tw/">國立金門大學官網</a>
        </body>
    </html>`;
})
.get("/nqu/csie", (context) => {
    context.response.body =`
    <html>
        <body>
            <a href="https://csie.nqu.edu.tw/">國立金門大學資工系官網</a>
        </body>
    </html>`
})
.get("/nqu/csie/school_room/:id", (context) => {
    if (context.params && context.params.id && school_room.has(context.params.id)) {
      context.response.body = school_room.get(context.params.id);
    }
  })
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
