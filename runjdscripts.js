/**

 */
let fs = require('fs')
let cpfork = require('child_process').fork;

// let cronconfig = process.env.CRON_CONFIG?JSON.parse(process.env.CRON_CONFIG):""
//{"scripts1":{"cron":{"m":"13","h":"02"}},"scripts2":{"cron":{"m":"13","h":"02"}}}

let runconfig = process.env.RUN_CONFIG?JSON.parse(process.env.RUN_CONFIG):""
//{"jd_bean_change":{"run":"true"},"jd_bean_sign":{"run":"true"}}

let scriptobj_noasync = {
//======限时=================
  jd_live_redrain:{//超级直播间红包雨  0,30,31 20-23/1 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_live_redrain.js',
    cron:{m:'00,30,31',h:'20,21,22,23'},
    run:runconfig['jd_live_redrain']?runconfig['jd_live_redrain']['run']:'true'
  },
  jd_carnivalcity:{//京东手机狂欢城活动  0 0-18/6 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_carnivalcity.js',
    cron:{m:'00',h:'00,01,19'},
    run:runconfig['jd_carnivalcity']?runconfig['jd_carnivalcity']['run']:'true'
  },
  jd_fanslove:{//粉丝互动  3 10 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_fanslove.js',
    cron:{m:'00',h:'15,20'},
    run:runconfig['jd_fanslove']?runconfig['jd_fanslove']['run']:'true'
  },
  jd_joy_run:{//宠汪汪邀请助力与赛跑助力  15 10 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_joy_run.js',
    cron:{m:'00',h:'15,17'},
    run:runconfig['jd_joy_run']?runconfig['jd_joy_run']['run']:'true'
  },
  jd_jxd:{//京小兑  30 8,16,20 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_jxd.js',
    cron:{m:'00',h:'15,20,23'},
    run:runconfig['jd_jxd']?runconfig['jd_jxd']['run']:'true'
  },
  jd_lotteryMachine_copy:{//京东抽奖机jd_lotteryMachine  11 1 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_lotteryMachine_copy.js',
    cron:{m:'00',h:'16,22'},
    run:runconfig['jd_lotteryMachine_copy']?runconfig['jd_lotteryMachine_copy']['run']:'true'
  },
  jd_mohe:{//5G超级盲盒  0 0,1-23/3 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_mohe.js',
    cron:{m:'00',h:'00,15,18,21'},
    run:runconfig['jd_mohe']?runconfig['jd_mohe']['run']:'true'
  },
  jd_nzmh:{//女装盲盒  35 1,23 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_nzmh.js',
    cron:{m:'00',h:'17,20'},
    run:runconfig['jd_nzmh']?runconfig['jd_nzmh']['run']:'true'
  },
  jd_shake:{//摇一摇  3 20 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_shake.js',
    cron:{m:'00',h:'16'},
    run:runconfig['jd_shake']?runconfig['jd_shake']['run']:'true'
  },
  jd_speed_sign:{//京东极速版  0 7 * * *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/jd_speed_sign.js',
    cron:{m:'00',h:'15,20'},
    run:runconfig['jd_speed_sign']?runconfig['jd_speed_sign']['run']:'true'
  },
  z_mother_jump:{//母婴-跳一跳  5 8,14,20 25-31 3 *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/z_mother_jump.js',
    cron:{m:'00',h:'00,15,19'},
    run:runconfig['z_mother_jump']?runconfig['z_mother_jump']['run']:'true'
  },
  z_xmf:{//京东小魔方  10 10 25-27 3 *
    url:'https://github.com/allindusk/codebackup_ym/raw/master/z_xmf.js',
    cron:{m:'00',h:'16,21'},
    run:runconfig['z_xmf']?runconfig['z_xmf']['run']:'true'
  },
//======常驻=================
}
let scriptobj_async = {
//======限时=================
//======常驻=================
  jd_lotteryMachine:{//京东抽奖机   17 23 * * * 超时
    url:'https://github.com/yangtingxiao/QuantumultX/raw/master/scripts/jd/jd_lotteryMachine.js',
  },
}
let scriptobj_env = {
  sendNotify:{//jd通知
    url:'https://github.com/allindusk/codebackup_ym/raw/master/sendNotify.js'
  },
}

let scriptobj = Object.assign({},scriptobj_noasync,scriptobj_async,scriptobj_env)

runscript()
// allnoasyncstr()
// console.log(getnoasyncstr())
// console.log(geturlarr())

function allnoasyncstr(){
  for (let index = 0; index < 24; index++) {
    ['00'].forEach(minute => {
      const tmpi = index.toString()
      let scriptstr = '',snum = 0,hour = tmpi.length<2?'0'+tmpi:tmpi
      for (const sname in scriptobj_noasync) {
        let cron = scriptobj_noasync[sname]['cron']
        if(cron.m.includes(minute)&&cron.h.includes(hour)&&scriptobj_noasync[sname]['run']=='true'){
          scriptstr+=sname+'|'
          snum++
        }
      }
      console.log(`${hour}:${minute}共${snum}个`,scriptstr)
    });
  }
}
function getnoasyncstr(){
  let scriptstr = ''
  const date = new Date();
  // date.setHours(date.getHours() + 8)
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  hour = hour.length<2?`0${hour}`:hour
  minute = minute.length<2?`0${minute}`:minute
  for (const sname in scriptobj_noasync) {
    let cron = scriptobj_noasync[sname]['cron']
    if(cron.m.includes(minute)&&cron.h.includes(hour)&&scriptobj_noasync[sname]['run']=='true'){
      scriptstr+=`${sname}.js&&`
    }
  }
  return scriptstr.substr(0,scriptstr.length-2)
}
function geturlarr(){
  let urlarr = []
  for (const key in scriptobj) {
    let url = scriptobj[key]['url']
    if (url) {
      if (!url.includes("codebackup_ym/raw/master")) {
        urlarr.push(scriptobj[key]['url']);
      }
    }
  }
  return urlarr
}
async function runscript(){
  //console.log(event["Message"],__dirname);
  //async_jd?jd1.js&&jd2.js
  // let mesarr = "async_jd?jd_shake.js".split("?")//event["Message"].split("?")
  let scripstr='',runtype = 'async_jd'//mesarr[0]
  // if (runtype=='async_jd') {
  //   scripstr = mesarr[1]
  // }else if(runtype=='noasync_jd'){
    scripstr = getnoasyncstr()
  // }
  let script_folderpath = __dirname+"/../jd_scripts/"
  console.log('\n>>>>>>本次运行汇总',scripstr)
  if(!scripstr){return}
  for (const scriptname of scripstr.split("&&")) {
    const scriptPath = script_folderpath+scriptname
    let date = new Date();
    console.log(`>>>>>>${date.toTimeString().substr(0,17)}===运行${scriptPath}`);
    if (runtype=='async_jd') {
      async_run(scriptPath)
    }else if(runtype=='noasync_jd'){
      await noasync_run(scriptPath)
    }
  }
  dellog()
}
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
  let date = new Date();
  let scriptname = modulePath.match(/\w+(?=\.)/)[0];
  let nowdate=date.getDate(),nowMonth=date.getMonth()+1,nowHours=date.getHours()
  nowdate = nowdate.toString().length==1?"0"+nowdate:nowdate
  nowMonth = nowMonth.toString().length==1?"0"+nowMonth:nowMonth
  nowHours = nowHours.toString().length==1?"0"+nowHours:nowHours
  let nowtime = `${nowMonth}${nowdate}_${nowHours}`
  console.log(`>>>>>>${date.toTimeString().substr(0,17)}===子进程:${scriptname}使用代码${code}关闭所有stdio`);
  fs.writeFile(`${__dirname}/../shelllog/${nowtime}${scriptname}.log`,runendstr, error =>{
    if (error) {console.log(`log写入失败:${error}`)
    }else {console.log(`log写入成功:${scriptname}`)}
  })
}
function dellog(){
  const date = new Date();
  if(date.getHours()!=0)return
  date.setDate(date.getDate() -2)
  let nowdate=date.getDate(),nowMonth=date.getMonth()+1
  nowdate = nowdate.toString().length==1?"0"+nowdate:nowdate
  nowMonth = nowMonth.toString().length==1?"0"+nowMonth:nowMonth
  let logpath=__dirname+"/../shelllog"
  fs.readdir(logpath,function(error,data){
    if(error){
      console.log(error);
    }else{
      // console.log(nowMonth+nowdate)0403
      data.forEach(element => {
        if(element.includes(nowMonth+nowdate)){
          fs.unlink(logpath+"/"+element, (err) => {
            if (err) throw err;
            console.log(element+'文件已被删除');
          });
        }
      });
    }
  })
}