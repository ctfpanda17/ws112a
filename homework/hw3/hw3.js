import{Application, Router, send} from "https://deno.land/x/oak/mod.ts";

const peoples = new Map()
    peoples.set('alan',{
        name: "alan",
        tel: "0912345678",
    });
    peoples.set('mary',{
        name: "mary",
        tel: "0911111111",
    });

  const router = new Router();
  router
    .get('/',(ctx) => {
        ctx.response.body = "Home";
        }) 
        
    .get('/people',(ctx) => {
        ctx.response.body = Array.from(peoples.values());
    })

    .get('/people/add',(ctx) => {
        let params = ctx.request.url.searchParams
        let name = params.get("name")
        let tel = params.get("tel")
        console.log(`name=${name} tel=${tel}`)

        if(peoples.get(name)){
            ctx.response.body = {'error':`name=${name} already exists!`}
        }
        else{
                peoples.set(name, {name,tel})
                ctx.response.type = 'text/html'
                ctx.response.body = `<p>New (${name}, ${tel}) success </p><p><a href="/people/">List all connections</a></p>`
            }
        })
    .get('/people/find', (ctx) =>{
        let params =ctx.request.url.searchParams
        let name = params.get('name')
        console.log('name=', name)
        if(peoples.has(name)){
            ctx.response.body = peoples.get(name);
        }
        else{
            ctx.response.body =`${name} not find`
        }
    })
    .get("/public/(.*)", async (ctx) => {
        let wpath = ctx.params[0]
        console.log('wpath=', wpath)
        await send(ctx, wpath, {
          root: Deno.cwd()+"/public/",
          index: "index.html",
        })
      })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8001')
await app.listen({ port: 8001 });