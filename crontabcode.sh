0 * * * * nowdate=`date +\%m\%d`;~/shellcode/runjdscripts.sh >> ~/shelllog/${nowdate}runjdscripts.log 2>&1;
* * * * * nowdate=`date +\%m\%d`;~/shellcode/crontest.sh >> ~/shelllog/${nowdate}crontest.log 2>&1;
30,31 20-23/1 * * * nowdate=`date +\%m\%d`;~/shellcode/runjdscripts.sh >> ~/shelllog/${nowdate}runjdscripts.log 2>&1;







