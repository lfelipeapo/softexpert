<?php

namespace Controller;

use Model\ImpostoModel;
use Utils\RequestUtils;

class ImpostoController extends Controller
{

    public static function listAll()
    {
        $utils = new RequestUtils();
        $utils->validateGetRequest();
        $model = new ImpostoModel();
        $model->getAllRows();
        $utils->validaImposto($model);

        parent::render('Impostos/ListarImpostos');
    }

    public static function listId(int $id)
    {
        $utils = new RequestUtils();
        $utils->validateGetRequest();
        $model = new ImpostoModel();

        if (!$utils->isNil($id)) {
            $model = $model->getById($id);
            $utils->validaImposto($model);
        }

        parent::render('Impostos/ListarImposto', $model);
    }


    public static function save()
    {
        $utils = new RequestUtils();
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['imposto']['percentual']) and !$utils->isNil($responseJson['imposto']['nome']) and $utils->isNil($responseJson['imposto']['id'])) {
            $model = new ImpostoModel();
            $model->percentual = $responseJson['imposto']['percentual'];
            $model->nome = $responseJson['imposto']['nome'];
            $model->save();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Impostos/ListarImpostos');
    }

    public static function update()
    {
        $utils = new RequestUtils();
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['imposto']['percentual']) and !$utils->isNil($responseJson['imposto']['nome']) and !$utils->isNil($responseJson['imposto']['id'])) {
            $model = new ImpostoModel();
            $model->id = $responseJson['imposto']['id'];
            $model->percentual = $responseJson['imposto']['percentual'];
            $model->nome = $responseJson['imposto']['nome'];
            $model->update();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Impostos/ListarImposto');
    }

    public static function delete(int $id)
    {
        $utils = new RequestUtils();
        $utils->doIfByRequestDelete();
        $model = new ImpostoModel();
        $model->delete($id);

        parent::render('Impostos/ListarImposto');
    }
}
