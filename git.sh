#!/usr/bin/env bash
# 当前功能只实用小版本频发上传，不能用于解决冲突。
# 使用方法
# 1.需要授权当前shell文件，chmod +x 文件名，chmod +x的意思就是给执行权限。
# 2.在根目录下，./文件名 就执行了当前sh文件。
# 当前shell文件在桌面要执行其他目录下的文件git上传修改当前路径。
# cd ~/Desktop/project/new-manager/manager 

# loding小图标
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
    if [ $y == 'y' ] || [ $y == 'Y' ]; then
        git push
    else
        echo "完成add、commit、pull，别忘了push"
    fi
else
    echo "请添加注释再来一遍"
fi


