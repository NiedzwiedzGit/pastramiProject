<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
// console.log(authData);
console.log("[php]");
$data = json_decode(file_get_contents('php://input'), true);
print_r($data);
?>