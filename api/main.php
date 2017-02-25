<?php

  require "api.php";

  // set $action varaible
  $action = $_GET['action'];

  // set the api class
  $api = new Api;

  if ($action == "users_list")
  {
    echo $api->getUsers();
  }
  elseif ($action == "create_user")
  {
    echo $api->createUser($_POST);
  }

?>
