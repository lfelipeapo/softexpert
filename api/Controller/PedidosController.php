<?php

namespace Controller;

use Model\PedidosModel;
use Utils\RequestUtils;

class PedidosController extends Controller
{

    public static function listAll()
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new PedidosModel();
        $model->getAllRows();
        $utils->validaPedidos($model);

        parent::render('Pedidos/ListarPedidos');
    }

    public static function listItens(int $id)
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new PedidosModel();

        if (!$utils->isNil($id)) {
            $model = $model->getAllRowsItens($id);
            $utils->validaItensPedidos($model);
        }

        parent::render('Pedidos/ListarItensPedidos');
    }

    public static function listId(int $id)
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new PedidosModel();

        if (!$utils->isNil($id)) {
            $model = $model->getById($id);
            $utils->validaPedidos($model);
        }

        parent::render('Pedidos/ListarPedido', $model);
    }


    public static function save()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and is_array($responseJson['pedidos']['itens']) and !$utils->isNil($responseJson['pedidos']['ped_valor']) and !$utils->isNil($responseJson['pedidos']['ped_qtde']) and $utils->isNil($responseJson['produtos']['id'])) {
            $model = new PedidosModel();
            $model->itens = $responseJson['pedidos']['itens'];
            $model->cli_id = $responseJson['pedidos']['cli_id'];
            $model->ped_valor = $responseJson['pedidos']['ped_valor'];
            $model->ped_qtde = $responseJson['pedidos']['ped_qtde'];
            $model->data_ped = date("Y-m-d");
            $model->data_pg =  date("Y-m-d");
            $model->save();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Pedidos/ListarPedidos');
    }


    public static function delete(int $id)
    {
        $utils = new RequestUtils;
        $utils->doIfByRequestDelete();
        $model = new PedidosModel;


        $model->delete($id);

        parent::render('Pedidos/ListarPedidos');
    }
}
