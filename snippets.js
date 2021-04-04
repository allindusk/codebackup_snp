const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec;

// let testjs1 = require('./asynctest1.js',(asynctest1) => {
//   console.log(3)
// })
// let testjs2 = require('./asynctest2.js')
// (async () => {
//   let tmp = 111
//   tmp = require('./asynctest1').test('rile')
//   console.log(tmp)
// })()
console.log('jdShareCodes.js'.includes('dShareCode'))
//获取京喜 京东极速版
function getjxurl(){
  for(let onegoods of document.querySelectorAll(".goods-item")){
    if(onegoods.innerText.includes("拼购")){
      let goodsurl = `https://kpl.m.jd.com/product?wareId=${onegoods.id.match(/\d+$/)}`
      // console.log(goodsurl)
      setTimeout(() => { window.open(goodsurl)}, 500);
    }else{
      onegoods.remove()
    }
  }
  document.addEventListener('mousemove',() => {
    console.log(333)
  })
}
//nodejs获取时间
function getnodejs_date(){
  let nowdate = new Date();
  let datetable = [
    {fun:'toDateString',rt:nowdate.toDateString()},
    {fun:'toISOString',rt:nowdate.toISOString()},
    {fun:'toJSON',rt:nowdate.toJSON()},
    {fun:'toLocaleDateString',rt:nowdate.toLocaleDateString()},
    {fun:'toLocaleString',rt:nowdate.toLocaleString()},
    {fun:'toLocaleTimeString',rt:nowdate.toLocaleTimeString()},
    {fun:'toString',rt:nowdate.toString()},
    {fun:'toTimeString',rt:nowdate.toTimeString()},
    {fun:'valueOf',rt:nowdate.valueOf()},
    {fun:'toUTCString',rt:nowdate.toUTCString()},
    {fun:'getDate',rt:nowdate.getDate()},
    {fun:'getDay',rt:nowdate.getDay()},
    {fun:'getFullYear',rt:nowdate.getFullYear()},
    {fun:'getMilliseconds',rt:nowdate.getMilliseconds()},
    {fun:'getMinutes',rt:nowdate.getMinutes()},
    {fun:'getMonth',rt:nowdate.getMonth()+1},
    {fun:'getSeconds',rt:nowdate.getSeconds()},
    {fun:'getTime',rt:nowdate.getTime()},
    {fun:'getTimezoneOffset',rt:nowdate.getTimezoneOffset()},
  ]
  console.table(datetable)
  console.log(nowdate.getHours())
  nowdate.setHours(nowdate.getHours() + 8);
  console.log(nowdate.getHours())
}
//run shell
function run_shell(){
  console.log(__dirname)
  let shell_str = `cd ${__dirname}&&node asynctest1.js&&node asynctest2.js`
  exec(shell_str, (err,stdout,stderr)=>{
      if(err) {
        console.log(stderr);
      } else {
        console.log(stdout);
      }
  });  
}
//fork同步异步执行js
function async_run(modulePath){
  let childrt = cpfork(modulePath,{silent:true});
  let runendstr = ''
  childrt.stdout.setEncoding('utf8');
  childrt.stdout.on('data',data => {
    runendstr+=data
  });
  childrt.stderr.setEncoding('utf8')
  childrt.stderr.on('data',data => {
    runendstr+=data
  })
  childrt.on('close', (code) => {
    runendlog(runendstr,modulePath,code)
  });  
}
function noasync_run(modulePath){
  return new Promise(resolve => {
    let childrt = cpfork(modulePath,{silent:true});
    let runendstr = ''
    childrt.stdout.setEncoding('utf8');
    childrt.stdout.on('data',data => {
      runendstr+=data
    });
    childrt.stderr.setEncoding('utf8')
    childrt.stderr.on('data',data => {
      runendstr+=data
    })
    childrt.on('close', (code) => {
      runendlog(runendstr,modulePath,code)
      resolve()
    });
  })
}
function runendlog(runendstr,modulePath,code){
  console.log(`${runendstr}\n${new Date().toTimeString().substr(0,17)}===子进程:${modulePath}使用代码${code}关闭所有stdio`);
}
//js sleep
function js_sleep(){
  demo();
  async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two second later');
  }
  function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
}
//删除action日志
function del_actionlog(){
  setTimeout(()=>{
    console.log("del_actionlog")
    let aclog = document.querySelector('.dropdown-item.btn-link.menu-item-danger')
    if(aclog){
      aclog.click()
      setTimeout(()=>{
        document.querySelector('.dropdown-item.btn-link.menu-item-danger').click();
        setTimeout(()=>document.querySelector('.btn.btn-block.btn-danger').click(),500);
      },500);
    }
  },1000)
}
//清空require缓存
function require_del(){
  delete require.cache[require.resolve('./test.js')];
  let aaa =require('./test')()
}
//fs读写
function fs_readwrite(){
  const qaa = {
   "sessionId": "93eda548-9459-4683-bfb6-53c5a2463ad7",
   "systemSdkVersion": "29",}
  fs.writeFile(__dirname+'/cookie.json', JSON.stringify(qaa), (error) => {
    if (error) {console.log('写入失败')
    }else {console.log('写入成功')}
  })
  fs.readFile(__dirname+'/cookie.json', (error, data) =>{
    if (error) {
      console.log('读取文件失败')
    } else {
      console.log(JSON.parse(data.toString()))
    }
  })
}
//正则exec
function zhengze_exec(){
  let rege = /name="formhash" value="(.*)"/g
  while ((result = rege.exec(tmp1)) != null)  {
    console.log(result[0])
    console.log(result.index)
  }  
}
//发送telegram通知
function tg_send(text, desp){
	const TG_BOT_TOKEN = '1475123758:AAHhTlKKVbef9KhVp5tQw4hSZggBobiOeUw';
	const TG_USER_ID = '1303145986';
  if (TG_BOT_TOKEN && TG_USER_ID) {
    const options = {
      url: `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      body: `chat_id=${TG_USER_ID}&text=${text}\n\n${desp}&disable_web_page_preview=true`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    request.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log('telegram发送通知消息失败！！\n' + err);
        } else {
          data = JSON.parse(data);
          if (data.ok) {
            console.log('Telegram发送通知消息完成。\n');
          } else if (data.error_code === 400) {
            console.log('请主动给bot发送一条消息并检查接收用户ID是否正确。\n');
          } else if (data.error_code === 401) {
            console.log('Telegram bot token 填写错误。\n');
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}
// 页面自动滚动条 自动
function autoscroll(){
  let scrollselector = 'html',count=0
	let gototop = document.querySelector(scrollselector).scrollTop;
	let scrollauto = setInterval(() => {
    let scrolldoc = document.querySelector(scrollselector)
		let canseeHeight = scrolldoc.clientHeight;//可见页面的高度
		let nowtop = scrolldoc.scrollTop;//当前滚动条距离，可以理解为被隐藏的页面高度
		let docHeight = scrolldoc.scrollHeight;//容器高度
		gototop = gototop + canseeHeight / 2;//滚动位置
		scrolldoc.scrollTo(nowtop, gototop);
    let bottom = parseInt(docHeight-(canseeHeight + nowtop))
		console.log(`当前滚动条位置${nowtop}前往位置${gototop}距离底部还差${bottom}`);
    count++
		if (docHeight == canseeHeight + nowtop) {
			clearInterval(scrollauto);
      console.log('执行次数',count)
		}
	}, 500);
}
//谭亭专栏显示隐藏
function zhihu_zhuanlan(){
	let liechang = document.querySelectorAll('.css-8txec3');
	for (let i = 0; i < liechang.length; i++) {
		if (100 < liechang[i].querySelector('.VoteButton--up').textContent.match(/\d+/)[0]) {
			liechang[i].style.display = '';
		} else {
			liechang[i].style.display = 'none';
		}
	}  
}
