<?php

namespace Controller;

use Model\ProdutosModel;
use Utils\RequestUtils;

class ProdutosController extends Controller
{

    public static function listAll()
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new ProdutosModel();
        $model->getAllRows();
        $utils->validaProdutos($model);

        parent::render('Produtos/ListarProdutos');
    }

    public static function listId(int $id)
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new ProdutosModel();

        if (!$utils->isNil($id)) {
            $model = $model->getById($id);
            $utils->validaProdutos($model);
        }

        parent::render('Produtos/ListarProduto', $model);
    }


    public static function save()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['produtos']['nome']) and !$utils->isNil($responseJson['produtos']['preco']) and !$utils->isNil($responseJson['produtos']['id_tipo_produto']) and $utils->isNil($responseJson['produtos']['id'])) {
            $model = new ProdutosModel();
            $model->nome = $responseJson['produtos']['nome'];
            $model->preco = $responseJson['produtos']['preco'];
            $model->id_tipo_produto = $responseJson['produtos']['id_tipo_produto'];
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
        parent::render('Produtos/ListarProdutos');
    }

    public static function update()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['produtos']['nome']) and !$utils->isNil($responseJson['produtos']['preco']) and !$utils->isNil($responseJson['produtos']['id_tipo_produto']) and !$utils->isNil($responseJson['produtos']['id'])) {
            $model = new ProdutosModel();
            $model->id = $responseJson['produtos']['id'];
            $model->nome = $responseJson['produtos']['nome'];
            $model->preco = $responseJson['produtos']['preco'];
            $model->id_tipo_produto = $responseJson['produtos']['id_tipo_produto'];
            $model->data_cad = $responseJson['produtos']['data_cad'];
            $model->data_at = date("Y-m-d");
            $model->update();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Produtos/ListarProduto');
    }

    public static function delete(int $id)
    {
        $utils = new RequestUtils;
        $utils->doIfByRequestDelete();
        $model = new ProdutosModel;


        $model->delete($id);

        parent::render('Produtos/ListarProduto');
    }
}
