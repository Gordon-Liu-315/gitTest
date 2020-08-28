<?php
    header('content-type:text/html;charset="utf-8"');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $arr = array("code" => 0, "msg" => "");
    //判断用户名是否输入
    if(!$username){
        $arr['code'] = 1;
        $arr['msg'] = "！请输入用户名";
        echo json_encode($arr);
        exit;
    }
    //判断密码是否输入
    if(!$password){
        $arr['code'] = 2;
        $arr['msg'] = "！请输入密码";
        echo json_encode($arr);
        exit;
    }
    //链接数据库
    $link = mysql_connect("127.0.0.1", "root", "123456");
    //判断数据库是否连接
    if(!$link){
        $arr['code'] = 3;
        $arr['msg'] = "！数据忙";
        echo json_encode($arr);
        exit;
    }
    //设置字符集
    mysql_set_charset("utf8");
    //选择数据库
    mysql_select_db("gordon");
    //给密码加密
    $str = md5(md5(md5($password).'zzh').'liu');
    //准备sql
    $sql = "SELECT * FROM userlist WHERE username='{$username}' AND password='{$str}'";
    //发送sql
    $res = mysql_query($sql);
    //提取一条数据
    $row = mysql_fetch_assoc($res);
    //判断是否成功
    if($row){
        $arr['msg'] = "登录成功 , 2秒后跳转......";
        echo json_encode($arr);
    }else{
        $arr['code'] = 4;
        $arr['msg'] = "！账号或密码输入错误";
        echo json_encode($arr);
        exit;
    }
    mysql_close($link);
?>