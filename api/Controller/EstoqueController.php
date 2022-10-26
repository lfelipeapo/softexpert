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

    public static function updateAllFromSet()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['novos_estoques']) and is_array($responseJson['novos_estoques']) and sizeof($responseJson['novos_estoques']) !== 0) {
            $model = new EstoqueModel();
            $model->updateAll($responseJson);
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Estoque/ListarEstoquePorId');
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
            if (!$utils->isNil($responseJson['estoque']['data_cad'])) $model->data_cad = $responseJson['estoque']['data_cad'];
            elseif (
                !array_key_exists('data_cad', $responseJson)
            ) $model->data_cad = NULL;
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
