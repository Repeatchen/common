#!/usr/bin/env bash
# cd ~/Desktop/project/new-manager/manager

demoFun(){
    killmyself="pkill -13 -f `basename $0`"
 
    trap "$killmyself" sigint
    
    while true;do
        for i in '-' '\' '|' '/';do
            printf "\r%s" $i
            sleep 0.2
        done
    done &
    
    tmp="`bash -c \"$@\"`"
    $killmyself
    # printf "\r%s\n" c le a"$tmp"
}
echo '当前文件状态'
git status
git add .
git status
echo "输入commit注解"
read msg
if [ -n "$msg" ]; then
    demoFun 'sleep 3'
    git commit -m"${msg}"
    git pull
    echo -e "是否要push [Y/N]?"
    read y
    if [ $y == 'y' ]; then
        git push
    else
        echo "完成add、commit、pull，别忘了push"
    fi
else
    echo "请添加注释再来一遍"
fi


