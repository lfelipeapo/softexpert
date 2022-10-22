<?php

namespace Controller;

use Model\ClienteModel;
use Utils\RequestUtils;

class ClienteController extends Controller
{

    public static function listAll()
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new ClienteModel();
        $model->getAllRows();
        $utils->validaCliente($model);

        parent::render('Clientes/ListarClientes');
    }

    public static function listId(int $id)
    {
        $utils = new RequestUtils;
        $utils->validateGetRequest();
        $model = new ClienteModel();

        if (!$utils->isNil($id)) {
            $model = $model->getById($id);
            $utils->validaCliente($model);
        }

        parent::render('Clientes/ListarCliente', $model);
    }


    public static function save()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['cliente']['cli_nome']) and $utils->isNil($responseJson['cliente']['cli_id'])) {
            $model = new ClienteModel();
            $model->cli_nome = $responseJson['cliente']['cli_nome'];
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
        parent::render('Clientes/ListarClientes');
    }

    public static function update()
    {
        $utils = new RequestUtils;
        $responseJson = $utils->decodeResponseIfPost();
        if ($responseJson and !$utils->isNil($responseJson['cliente']['cli_nome']) and !$utils->isNil($responseJson['cliente']['data_cad']) and !$utils->isNil($responseJson['cliente']['cli_id'])) {
            $model = new ClienteModel();
            $model->cli_id = $responseJson['cliente']['cli_id'];
            $model->cli_nome = $responseJson['cliente']['cli_nome'];
            $model->data_cad = $responseJson['cliente']['data_cad'];
            $model->data_at = date("Y-m-d");
            $model->update();
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Procedimento não realizado com sucesso!"
            ];
            $utils->encodeResponse($response);
        }
        parent::render('Clientes/ListarCliente');
    }

    public static function delete(int $id)
    {
        $utils = new RequestUtils;
        $utils->doIfByRequestDelete();
        $model = new ClienteModel;


        $model->delete($id);

        parent::render('Clientes/ListarCliente');
    }
}
