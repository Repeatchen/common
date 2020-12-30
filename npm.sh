#!/usr/bin/env bash
# 注意：当前功能只实用小版本频发上传，不能用于解决冲突。
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
goUpDown(){
    echo "您是上传还是下载 [up/down]?"
    read msg
    if [ $msg == 'up' ] || [ $msg == 'UP' ]; then
        yrm use ola-pub 
        cd ~/Desktop/ola-filter
        echo "同公司gitlab账号"
        npm login
        npm publish 
    fi
}

echo "是否安装yrm [Y/N]?"
read msg
if [ $msg == 'y' ] || [ $msg == 'Y' ]; then
    npm install yrm -g
    yrm ls
    echo "是否安装npm-public/npm-oleyc [Y/N]?"
    read msg
    if [ $msg == 'y' ] || [ $msg == 'Y' ]; then
        yrm add ola https://nexus.olafuwu.com/repository/npm-public/ 
        yrm add ola-pub https://nexus.olafuwu.com/repository/npm-oleyc/ 
        echo "当前环境"
        yrm ls
        goUpDown
    else
       yrm ls
       goUpDown
    fi
    
else
   echo "当前环境"
   yrm ls
   goUpDown

fi
# if [ -n "$msg" ]; then
#     demoFun 'sleep 3'
#     git commit -m"${msg}"
#     git pull
#     echo -e "是否要push [Y/N]?"
#     read y
    
# else
#     echo "请添加注释再来一遍"
# fi


