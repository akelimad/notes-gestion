<?php
class Api
{
  public $db;

  public function __construct()
  {
    try {
        $dbh = new PDO('mysql:host=localhost;dbname=zinycore', 'root', '');
        /*foreach($dbh->query('SELECT * from FOO') as $row) {
            print_r($row);
        }*/
        $this->db = $dbh;
    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
    //return true;
  }


  public function output($outputs = array())
  {
    $outputs = array_merge(array(
      "success" => true,
    ),$outputs);

    return json_encode($outputs);
  }

  public function createUser($inputs = array())
  {
    $reponse = array();
    $reponse['error'] = true;
    $reponse['msgContent'] = 'Please fill in required fields';

    if ( isset($inputs) && isset($inputs['username']) && isset($inputs['password']) && isset($inputs['email'])
          && $inputs['username'] != '' && $inputs['password'] != '' && $inputs['email'] != '' )
    {
      $stmt = $this->db->prepare("INSERT INTO `users` (`username`, `email`, `password`) VALUES (:username, :email, :password)");
      $stmt->bindParam(':username', $inputs['email']);
      $stmt->bindParam(':email', $inputs['email']);
      $stmt->bindParam(':password', md5($inputs['password']));

      if ($stmt->execute())
      {
        $reponse['user'] = $inputs;
        $reponse['msgContent'] = 'You have been successfully registered';
      }
      else {
        $reponse['msgContent'] = 'Something went wrong, please try again';
      }
    }

    return $this->output($reponse);
  }

  public function getUsers()
  {
    $users = array();
    foreach($this->db->query('SELECT id, username, email, password from `users` ') as $row) {
        $users['users'][] = array(
          "id" => $row["id"],
          "username" => $row["username"],
          "email" => $row["email"],
          "password" => $row["password"],
        );
    }

    return $this->output($users);
  }

  public function getPosts()
  {

  }

}

?>
