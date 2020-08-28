<?php
header("content-type:text/html;charset='utf-8'");

$username = $_POST["username"];
$password = $_POST["password"];
$repassword = $_POST["repassword"];
$createtime = $_POST["createtime"];
$status = array("code" => 0 , "msg" => "");
//用户名判断
if(!$username){
    $status["code"] = 1;
    $status["msg"] = "！用户名不能为空";
    echo json_encode($status);
    exit;
}
//密码判断
if(!$password){
    $status["code"] = 2;
    $status["msg"] = "！密码不能为空";
    echo json_encode($status);
    exit;
}
//用户名正则验证
if(!preg_match('/^[a-zA-Z][\w]{5,11}$/',$username)){
    $status["code"] = 7;
    $status["msg"] = "!用户名请输入6~12位数字、字母、下划线，且首字母开头";
    echo json_encode($status);
    exit;
}
//密码正则验证
if(!preg_match('/^[0-9]{6,8}$/',$password)){
    $status["code"] = 8;
    $status["msg"] = "！密码请输入6~8位数字";
    echo json_encode($status);
    exit;
}
//两次密码判断
if($password != $repassword){
    $status["code"] = 3;
    $status["msg"] = "！两次密码不一致";
    echo json_encode($status);
    exit;
}
//连接数据库
$link = mysql_connect("127.0.0.1","root","123456");
//判断是否连接
if(!$link){
    $status["code"] = 4;
    $status["msg"] = "!数据库连接失败";
    echo json_encode($status);
    exit;
}
//设置字符集
mysql_set_charset("utf8");
//选择数据库
mysql_select_db("gordon");
//准备sql
//判断用户名是否重复
$sql1 = "SELECT * FROM userlist WHERE username='{$username}'";
//发送sql
$res1 = mysql_query($sql1);
//取出该条数据
$row = mysql_fetch_assoc($res1);
//判断数据库内的用户名是否重复
if($row){
    $status["code"] = 5;
    $status["msg"] = "!该用户名已存在";
    echo json_encode($status);
    exit;
}
//设置密码加密
$pas = md5(md5(md5($password).'zzh').'liu');
//准备sql
$sql2 = "INSERT INTO userlist(username, password, createtime) VALUES('{$username}', '{$pas}', {$createtime})";
//发送sql
$res = mysql_query($sql2);
//判断是否发送成功
if(!$res){
    $status['code'] = 6;
    $status['msg'] = "！注册失败";
    echo json_encode($status);
    exit;
}else{
    $status['msg'] = "!注册成功";
    echo json_encode($status);
}
//关闭数据库
mysql_close($link);
?>