<?php 
	define('DB_HOST', 'localhost');
	define('DB_NAME', 'zinycor');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', '');
	try {
		$db=new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME,DB_USERNAME,DB_PASSWORD);
		$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); // WARNING . the programme wil alert a messgae but will continue execute all script . but EXCEPTION will stop when exception is exist
	} catch (Exception $e) {
		die("Failed to connect to database !!!! ". $e->getMessage());
	}


	$data =json_decode(file_get_contents("php://input"));
	$username=$data->username;
	$email=$data->email;
	$password=$data->password;
	$query=$db->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
	$query->execute(['username'=>$username, 'email'=>$email, 'password'=>$password]);

?>