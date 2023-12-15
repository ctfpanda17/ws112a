var R = {}

window.onhashchange = async function () {
  var r
  var tokens = window.location.hash.split('/')
  console.log('tokens=', tokens)
  switch (tokens[0]) {
    case '#show':
      r = await window.fetch('/post/' + tokens[1])
      let post = await r.json()
      R.show(post)
      break
    case '#new':
      R.new()
      break
    default:
      r = await window.fetch('/list')
      let posts = await r.json()
      R.list(posts)
      break
  }
}

window.onload = function () {
  window.onhashchange()
}

R.layout = function (title, content) {
  document.querySelector('title').innerText = title
  document.querySelector('#content').innerHTML = content
}

R.list = function (posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
    <h2>${ post.title }</h2>
        <p><a id="show${post.id}" href="#show/${post.id}">查看電話號碼</a></p>
    </li>
    `)
  }
  let content = `
  <h1>聯絡人</h1>
    <p>你有 <strong>${posts.length}</strong> 個聯絡人!</p>
    <p><a id="createPost" href="#new">新增聯絡人</a></p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
  `
  return R.layout('Posts', content)
}

R.new = function () {
  return R.layout('New Post', `
  <h1>通訊錄</h1>
    <p>新增聯絡人</p>
    <form>
      <p><input id="name" type="text" placeholder="name" name="name"></p>
      <p><input id="tel" type="text" placeholder="tel" name="tel"></p>
      <p><input id="savePost" type="button" onclick="R.savePost()" value="Create"></p>
    </form>
  `)
}

R.show = function (post) {
  return R.layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `)
}

R.savePost = async function () {
  let name = document.querySelector('#name').value
  let tel = document.querySelector('#tel').value
  let r = await window.fetch('/post', {
    body: JSON.stringify({title: name, body: tel}),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  window.location.hash = '#list'
  return r
}
