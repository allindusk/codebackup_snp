# 查看文件大小
du -h --max-depth=1
# 复制文件
cp -rf Loon/*.js mysss
# nvm换源
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
# 云函数使用指定node版本运行shell
export PATH=/var/lang/node12/bin:$PATH&&node -v
# 运行脚本并打印日志
node ../jd_scripts/jd_crazy_joy_coin.js &> ../log_script/jd_crazy_joy_coin.log & 
# 循环
sum=0;while true;do node jd_scripts_gitee/jd_cashcopy.js;((sum++));echo "第$sum次";sleep 5m;done
for i in {1..10};do;echo $(expr $i \* 3 + 1);done
# git
git remote set-url origin git@gitee.com:lxk0301/jd_scripts.git
git remote add myrepo https://github.com/allindusk/codebackup_ym.git
git push myrepo master:master
# cron
crontab */1 * * * * date >> ~/log_script/crontabrun.log 2>&1
# ssh
SET REMOTEHOST=ubt@192.168.200.128
scp %USERPROFILE%\.ssh\id_rsa.pub %REMOTEHOST%:~/id_rsa.pub
ssh %REMOTEHOST% "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/id_rsa.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"