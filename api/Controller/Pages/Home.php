<?php

namespace Controller\Pages;

use Controller\Controller;
use Utils\RequestUtils;

class Home extends Controller
{

    public static function getAPI()
    {

        $utils = new RequestUtils();
        $utils->validateGetHome();

        parent::render('Home');
    }
}
