#!/bin/bash
. /etc/environment;. ~/.profile # . /etc/profile  无用. /etc/bash.bashrc 无用
nowdate=`date +%m%d_%H`
# cd qx/;echo "===pull qx";git pull
cd ~/dust/;echo "===${nowdate}pull dusk";git pull
cp -f car/*_*.js ~/jd_scripts/;cp -f i-chenzhe/*_*.js ~/jd_scripts/
cp -f member/*_*.js ~/jd_scripts/;cp -f normal/*_*.js ~/jd_scripts/
cd ~/JD-SHELL/;echo "===${nowdate}pull JD-SHELL";git pull
cp -f jd_live_lottery_social.js ~/jd_scripts/
cd ~/jd_scripts/;echo "===${nowdate}pull jd_scripts";git pull
echo "===${nowdate}push jd_scripts";git push myrepo master:master --force
# cp -rf qx/*.js jd_scripts/
# node -v
node ~/shellcode/runjdscripts.js
echo "***END********************************************************"