#!/bin/bash
. /etc/environment;. ~/.profile # . /etc/profile  无用. /etc/bash.bashrc 无用
nowdate=`date +%m%d_%H`
# cd qx/;echo "====================pull qx====================";git pull
cd ~/jd_scripts/;echo "====================${nowdate}pull jd_scripts====================";git pull
echo "====================${nowdate}push jd_scripts====================";git push myrepo master:master --force
# cp -rf qx/*.js jd_scripts/
# node -v
node ~/shellcode/runjdscripts.js