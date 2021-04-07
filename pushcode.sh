#!/bin/bash
. /etc/environment;. ~/.profile

JD_COOKIE="666&333"
ckarray=(${JD_COOKIE//&/ }) 

for (( i=0;i<${#ckarray[@]};i++)) 
do
cp -f test$i.txt test.txt
cat test$i.txt
done