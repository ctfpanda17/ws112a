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
        ctx.response.redirect("http://127.0.0.1:8001/public/index.html");
        }) 
        
    .get('/people',(ctx) => {
        ctx.response.body = Array.from(peoples.values());
    })

    .post('/people/add',async(ctx) => {
        const body = ctx.request.body()
        if (body.type === "form") {
          const pairs = await body.value
          console.log('pairs=', pairs)
          const params = {}
          for (const [key, value] of pairs) {
            params[key] = value
          }
          console.log('params=', params)
        let name = params["name"]
        let tel = params["tel"]
        console.log(`name=${name} tel=${tel}`)

        if(peoples.get(name)){
            ctx.response.type = 'text/html'
            ctx.response.body = {'error':`name=${name} already exists!`}
        }
        else{
                peoples.set(name, {name,tel})
                ctx.response.type = 'text/html'
                ctx.response.body = `<p>New (${name}, ${tel}) success </p><p><a href="/">回到標題</a></p>`
            }
        }
    })
    .post('/people/find', async(ctx) =>{
        const body = ctx.request.body()
        if (body.type === "form") {
          const pairs = await body.value
          console.log('pairs=', pairs)
          const params = {}
          for (const [key, value] of pairs) {
            params[key] = value
          }
          console.log('params=', params)
        let name = params["name"]
        let tel = params['tel']
        console.log('name=', name)
        if(peoples.get(name)){
            let tel = peoples.get(name).tel
            ctx.response.type = 'text/html'
            ctx.response.body = `${tel}`
        }
        else{
            ctx.response.type = 'text/html'
            ctx.response.body =`<p>${name} not find</p>`
        }
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