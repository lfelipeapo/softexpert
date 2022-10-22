<?php

namespace Controller;

use Model\TiposProdutosModel;
use Utils\RequestUtils;

class TiposProdutosController extends Controller
{

    public static function listAll()
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new TiposProdutosModel();
        $model->getAllRows();
        $utils->validaTiposProdutos($model);

        parent::render('TiposProdutos/ListarTiposProdutos');
    }

    public static function listId(int $id)
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new TiposProdutosModel();

        if (!$utils->isNil($id)) {
            $model = $model->getById($id);
            $utils->validaTiposProdutos($model);
        }

        parent::render('TiposProdutos/ListarTiposProduto', $model);
    }


    public static function save()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['tipos_produtos']['nome']) and !$utils->isNil($responseJson['tipos_produtos']['id_imposto']) and $utils->isNil($responseJson['tipos_produtos']['id'])) {
            $model = new TiposProdutosModel();
            $model->nome = $responseJson['tipos_produtos']['nome'];
            $model->id_imposto = $responseJson['tipos_produtos']['id_imposto'];
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
        parent::render('TiposProdutos/ListarTiposProdutos');
    }

    public static function update()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['tipos_produtos']['nome']) and !$utils->isNil($responseJson['tipos_produtos']['id_imposto']) and !$utils->isNil($responseJson['tipos_produtos']['id'])) {
            $model = new TiposProdutosModel();
            $model->id = $responseJson['tipos_produtos']['id'];
            $model->nome = $responseJson['tipos_produtos']['nome'];
            $model->id_imposto = $responseJson['tipos_produtos']['id_imposto'];
            $model->data_cad = $responseJson['tipos_produtos']['data_cad'];
            $model->data_at = date("Y-m-d");
            $model->update();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('TiposProdutos/ListarTiposProduto');
    }

    public static function delete(int $id)
    {
        $utils = new RequestUtils;
        $utils->doIfByRequestDelete();
        $model = new TiposProdutosModel;


        $model->delete($id);

        parent::render('TiposProdutos/ListarTiposProduto');
    }
}
