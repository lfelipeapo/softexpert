<?php

namespace Controller;

use Model\EstoqueModel;
use Utils\RequestUtils;

class EstoqueController extends Controller
{

    public static function listAll()
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new EstoqueModel();
        $model->getAllRows();
        $utils->validaEstoque($model);

        parent::render('Estoque/ListarEstoques');
    }

    public static function listId(int $id)
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new EstoqueModel();

        if (!$utils->isNil($id)) {
            $model = $model->getById($id);
            $utils->validaEstoque($model);
        }

        parent::render('Estoque/ListarEstoquePorId', $model);
    }


    public static function save()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['estoque']['prod_id']) and !$utils->isNil($responseJson['estoque']['estoque_qtde']) and $utils->isNil($responseJson['estoque']['id'])) {
            $model = new EstoqueModel();
            $model->prod_id = $responseJson['estoque']['prod_id'];
            $model->estoque_qtde = $responseJson['estoque']['estoque_qtde'];
            $model->data_cad = date("Y-m-d");
            $model->data_at = NULL;
            $model->save();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Estoque/ListarEstoques');
    }

    public static function update()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['estoque']['prod_id']) and !$utils->isNil($responseJson['estoque']['estoque_qtde']) and !$utils->isNil($responseJson['estoque']['id'])) {
            $model = new EstoqueModel();
            $model->id = $responseJson['estoque']['id'];
            $model->prod_id = $responseJson['estoque']['prod_id'];
            $model->estoque_qtde = $responseJson['estoque']['estoque_qtde'];
            $model->data_cad = $responseJson['estoque']['data_cad'];
            $model->data_at = date("Y-m-d");
            $model->update();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Estoque/ListarEstoquePorId');
    }

    public static function delete(int $id)
    {
        $utils = new RequestUtils;
        $utils->doIfByRequestDelete();
        $model = new EstoqueModel;


        $model->delete($id);

        parent::render('Estoque/ListarEstoques');
    }
}
