<?php

namespace Controller;

use Model\GenericsModel;
use Utils\RequestUtils;

class GenericsController extends Controller
{
    public static function listAllEsoquesDosProdutos()
    {
        $utils = new RequestUtils();
        $utils->validateGetRequest();
        $model = new GenericsModel();
        $model->getAllRowsEstoquesDosProdutos();
        $utils->validaImposto($model);

        parent::render('Impostos/ListarImpostos');
    }
}
