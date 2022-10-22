<?php

namespace Utils;

abstract class Utils
{
    public function __construct()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorizathion, X-Requested-Width");
        header('Content-Type: application/json; charset=UTF-8');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE');
    }


    public function isNil($var)
    {
        return $var == null || $var === null || $var == "" || $var === "" || !$var;
    }
}
