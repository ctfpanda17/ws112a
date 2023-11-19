export function layout(title,content) {
    return `
    <html>
        <head>
        <title>${title}</title>
        <style>
        /* 整體布局使用 Flex */
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        
        /* 登入區塊 */
        .login-box {
            padding: 16px;
            font-size: 14px;
            background-color: var(--bgColor-muted, var(--color-canvas-subtle));
            border: 1px solid var(--borderColor-muted, var(--color-border-muted));
            border-top: 0;
            border-radius: 0 0 6px 6px;
        }
        .shadowbox {
            width: 20em;
            height: 22em;
            border: 1px solid #333;
            padding: 12px 12px 12px 12px;
            background-color:#c4c3c3;
            border-radius: 20px;
        }
        .shadowbox-1 {
            width: 20em;
            height: 14em;
            border: 1px solid #333;
            padding: 12px 12px 12px 12px;
            background-color:#c4c3c3;
            border-radius: 20px;
        }
        /* 標題 */
        h1 {
            text-align: center; 
            font-size: 2em;
        }
        
        /* 表單區域 */
        form {
            display: flex;
            flex-direction: column;
        }
        
        /* 輸入框樣式 */
        .input {
            width: 100%;
            display: flex;
            margin: 10px 0;
            padding: 10px;
            border-radius: 3px;
            border: 1px solid #ddd;
        }
        
        /* 按鈕區域 */
        .button {
            width: 100%;
            padding: 10px;
            background: #02992f;
            color: #fff;
            border: none;
            border-radius: 20px;
        }
        </style>
        </head>
        <body>
        <section id="content">
             ${content}
        </section>
        `
}

export function home() {
    return layout('Home',`
    <h1> 人員管理系統 </h1>
    <ol>
        <li><a href="/signup">註冊</a></li>
        <li><a href="/login">登入</a></li>
    </ol>
    `)
  }

export function loginui() {
    return layout('login', `
    <form action="/login" method="post">   
    <h1> 登入 </h1>
    <div class="shadowbox-1">
        <label>name</label>
        <br />
        <input class="input" type="text" name="username" placeholder="username"/>
        <label>password</label>
        <br />
        <input class="input" type="password" name="password" placeholder="password"/>
        <br />
        <input class="button" type="submit" value="登入">
    </div>
</form> 
    `)
}

export function signupui() {
    return layout('signup', `
    <form action="/signup" method="post">
    <body>
        <h1> 註冊 </h1>
        <div class="shadowbox">
            <label>name</label>
            <br/>
            <input class= "input" type="text" name="username" placeholder="username"/>
            <br/>
            <label>email</label>
            <br/>
            <input class= "input" type="email" name="email" placeholder="email"/>
            <br/>
            <label>password</label>
            <input class= "input" type="password" name="password" placeholder="password"/>
            <br/>
            <input class= "button" type="submit" value="註冊">
        </div>
    </body>
</form>
    `)
}

export function success() {
    return layout('Success', `
    <h1>Success!</h1>
    成功<a href="/">回首頁</a> or <a href="/login">登入頁面</a>
    `)
  }

export function fail() {
    return layout('Fail', `
    <h1>Fail!</h1>
    失敗<a href="/">回首頁</a> or <a href="/login">登入頁面></a>
    `)
  }