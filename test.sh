#!/bin/bash
# cd ~/Desktop/project/new-manager/manager

echo '当前文件状态'
git status
git add -A
git status
echo "输入commit注解"
read msg
GREEN='\e[1;32m' 
if [ -n "$msg" ]; then
    echo '请稍等...'
    git commit -m"${msg}"
    git pull
    clear
    echo -e "Default \e[31mRed"
    echo -e "${GREEN}是否要push [Y/N]?"
    read y
    if [ $y == 'y' ]; then
        git push
    else
        echo "完成add、commit、pull，别忘了push"
    fi
else
    echo "请添加注释再来一遍"
fi


