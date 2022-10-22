<?php
define('VIEWS', __DIR__ . '/View/modules/');
define('REQUEST_METHOD', $_SERVER["REQUEST_METHOD"]);
define('URL', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
define('PATH', explode('/', URL));
$_ENV['db']['host'] = '172.24.96.1:3306';
$_ENV['db']['user'] = 'root';
$_ENV['db']['pass'] = '22Felipe!';
$_ENV['db']['database'] = 'desafiotecnico';
