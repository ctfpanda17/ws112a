var R = {}
var socket = new WebSocket("ws://"+window.location.hostname+":8080")

socket.onopen = function (event) {
  console.log('socket:onopen()...')
}

function send(o) {
  if (socket.readyState==1) {
    socket.send(JSON.stringify(o))
  } else {
    setTimeout(function() {
      send(o)
    }, 1000)
  }
}

window.onhashchange = async function () {
  var tokens = window.location.hash.split('/')
  console.log('tokens=', tokens)
  switch (tokens[0]) {
    case '#show':
      send({type:'show', post:{id: parseInt(tokens[1])}})
      break
    case '#new':
      R.new()
      break
    default:
      send({type:'list'})
      break
  }
}

socket.onmessage = function(event){
  var msg = JSON.parse(event.data);
  console.log('onmessage: msg=', msg);
  switch (msg.type) {
    case 'show': 
      R.show(msg.post)
      break
    case 'list':
      R.list(msg.posts)
      break
  }
}

window.onload = function () {
  console.log('onload')
  window.location.href = "#list"
  window.onhashchange()
}

R.layout = function (content) {
  document.querySelector('#msger').innerHTML = content
  
}

R.list = function (posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <p id="posts" class="msg-info-name">${post.name}</p>
    <p text-align: right>${post.body}</p>
    `)
  }
  let msger = `
      <header class="msger-header">
          <div class="msger-header-title">
              <i class="fas fa-comment-alt"></i> 公開匿名聊天室
              <a href="http://127.0.0.1:8000/#new">請輸入名字</a
          </div>
          <div class="msger-header-options">
              <span><i class="fas fa-cog"></i></span>
          </div>
      </header>
      <!--聊天 block-->
      <div class="msger-chat" >
        <p id="posts">${list.join('\n')}</p>
      </div>
      <!--聊天 block-->
      <form class="msger-inputarea">
          <input type="text" class="msger-input" id="msg" placeholder="說些什麼吧～">
          <input id="savePost" type="button" onclick="R.savePost()" value="發送訊息" class="msger-send-btn">
      </form>
  `
  return R.layout(msger)
}

R.new = function () {
  return R.layout(`
  <h1>使用者名稱</h1>
  <p>名稱</p>
  <form>
    <p><input id="name" type="text" placeholder="name" name="name"></p>
    <p><input id="savePost" type="button" onclick="R.savename()" value="create"></p>
  </form>
  `)
}

R.show = function (post) {
  return R.layout(post.name, `
    <p>${post.body}</p>
  `)
}

R.savename = function () {
  let name = document.querySelector('#name').value
  send({type:'create', post:{name: name}})
  window.location.hash = '#list';
}

R.savePost = function () {
  let body = document.querySelector('#msg').value
  send({type:'create', post:{body: body}})
  window.location.reload();
  //let i = 0
  //i++;
  //window.location.hash = (i + '#list')
  
}
