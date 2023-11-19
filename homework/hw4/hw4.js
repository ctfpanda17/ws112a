import{Application, Router, send} from "https://deno.land/x/oak/mod.ts";

const peoples = new Map()
    peoples.set('alan',{
        name: "alan",
        tel: "0912345678",
        account: "alan@gmail.com",
        password: "alan12345",
        gender: "boy",
    });
    peoples.set('mary',{
        name: "mary",
        tel: "0911111111",
        account: "mary@gmail.com",
        password: "mary12345",
        gender: "girl",
    });

const router = new Router();
router
    .get('/',(ctx) =>{
        ctx.response.redirect("http://127.0.0.1:8000/public/index.html")
    })

    .get('/people',(ctx) => {
        ctx.response.body = Array.from(peoples.values());
    })

    .post('/people/signup',async(ctx) => {
        const body = ctx.request.body()
        if (body.type === "form") {
          const pairs = await body.value
          console.log('pairs=', pairs)
          const params = {}
          for (const [key, value] of pairs) {
            params[key] = value
          }
          console.log('params=', params)
          let name = params['name']
          let account = params['account']
          let password = params['password']
          console.log(`account=${account} password=${password}`)
          if (peoples.get(account)) {
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>error: ${account} 已經存在！</p><br/><a href="http://127.0.0.1:8000/public/signup.html">註冊介面</a>`
          } 
          else {
            peoples.set(name, {name, account, password})
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>${name}註冊成功</p><a href="http://127.0.0.1:8000/public/login.html">登入介面</a>`
          }
      
        }
      })

    .post('/people/login', async(ctx) =>{
        const body = ctx.request.body()
        if (body.type === "form") {
          const pairs = await body.value
          console.log('pairs=', pairs)
          const params = {}
          for (const [key, value] of pairs) {
            params[key] = value
          }
          console.log('params=', params)
          let name = params['name']
          let password = params['password']
          console.log(`name=${name} password=${password}`)
          if (peoples.get(name) && password == peoples.get(name).password) {
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>登入成功</p>`
          } 
          else {
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>登入失敗</p><a href="http://127.0.0.1:8000/public/login.html">重新登入</a>`
          }
          console.log("key:",peoples.get(name).password)
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

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });