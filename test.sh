#!/bin/sh
# cd ~/Desktop/project/new-manager/manager
echo '当前文件状态'
git status
git add -A
git status
echo "输入commit注解"
read msg
if [ -n "$msg" ]; then
    git commit -m"${msg}"
    git pull
    read y
    echo '是否要push [Y/N]?'
    if [ $y == 'y' ]; then
        git push
    else
        echo "完成add、commit、pull，别忘了push"
    fi
else
    echo "请添加注释再来一遍"
fi


