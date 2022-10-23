<?php

namespace Utils;

class RequestUtils extends Utils

{
    public function __construct()
    {
        parent::__construct();
    }

    public function doIfByRequestDelete()
    {
        if (REQUEST_METHOD !== 'DELETE') {
            http_response_code(405);
            $this->encodeResponse(array('erro' => 'true', 'mensagem' => "Método não permitido!"), JSON_UNESCAPED_UNICODE);
            die;
        }
    }


    public function decodeResponseIfPost()
    {
        if (REQUEST_METHOD === 'POST') {
            $response_json = file_get_contents('php://input');
            $response = json_decode($response_json, true);
            if ($response) return $response;
        } else {
            http_response_code(405);
            $this->encodeResponse(array('erro' => 'true', 'mensagem' => "Método não permitido!"), JSON_UNESCAPED_UNICODE);
            die;
        }
    }

    public function encodeResponse($response)
    {
        http_response_code(200);
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }

    public function validateGetHome()
    {
        if (REQUEST_METHOD === 'GET') {
            echo json_encode(array('status' => 'success', 'data' => "Seja bem vindo a API XD"));
            http_response_code(200);
        } else {
            echo json_encode(array('status' => 'error', 'data' => "Método não permitido!"), JSON_UNESCAPED_UNICODE);
            http_response_code(405);
            die;
        }
    }

    public function validateGetRequest()
    {
        if (REQUEST_METHOD !== 'GET') {
            echo json_encode(array('status' => 'error', 'data' => "Método não permitido!"), JSON_UNESCAPED_UNICODE);
            http_response_code(405);
            die;
        }
    }

    public function validaImposto($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $impostos) {
                $data[] = $impostos;
            };
            $response = ['records' => $data];
        } elseif (!$this->isNil($model->id) and !$this->isNil($model->percentual) and !$this->isNil($model->nome)) {
            $response = [
                'erro' => false,
                'imposto' => $model,
                "menssagem" => "Encontrado registro"
            ];
        }
        $this->encodeResponse($response);
    }

    public function validaEstoque($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $estoque) {
                $data[] = $estoque;
            };
            $response = ['records' => $data];
        } elseif (!$this->isNil($model->id) and !$this->isNil($model->prod_id) and !$this->isNil($model->estoque_qtde)) {
            $response = [
                'erro' => false,
                'estoque' => $model,
                "menssagem" => "Encontrado registro"
            ];
        }
        $this->encodeResponse($response);
    }

    public function validaTiposProdutos($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $tipos_produtos) {
                $data[] = $tipos_produtos;
            };
            $response = ['records' => $data];
        } elseif (!$this->isNil($model->id) and !$this->isNil($model->nome) and !$this->isNil($model->id_imposto)) {
            $response = [
                'erro' => false,
                'tipos_produtos' => $model,
                "menssagem" => "Encontrado registro"
            ];
        }
        $this->encodeResponse($response);
    }
    public function validaProdutos($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $produtos) {
                $data[] = $produtos;
            };
            $response = ['records' => $data];
        } elseif (!$this->isNil($model->id) and !$this->isNil($model->nome) and !$this->isNil($model->preco) and !$this->isNil($model->id_tipo_produto)) {
            $response = [
                'erro' => false,
                'produtos' => $model,
                "menssagem" => "Encontrado registro"
            ];
        }
        $this->encodeResponse($response);
    }

    public function validaPedidos($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $pedidos) {
                $data[] = $pedidos;
            };
            $response = ['records' => $data];
        } elseif (!$this->isNil($model->id) and !$this->isNil($model->cli_id) and !$this->isNil($model->ped_valor) and !$this->isNil($model->ped_qtde)) {
            $response = [
                'erro' => false,
                'pedidos' => $model,
                "menssagem" => "Encontrado registro"
            ];
        }
        $this->encodeResponse($response);
    }

    public function validaItensPedidos($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $itens_pedido) {
                $data[] = $itens_pedido;
            };
            $response = ['records' => $data];
        }
        $this->encodeResponse($response);
    }

    public function validaCliente($model)
    {
        if ($model and is_array($model->rows)) {
            $data = [];
            foreach ($model->rows as $clientes) {
                $data[] = $clientes;
            };
            $response = ['records' => $data];
        } elseif (!$this->isNil($model->cli_id) and !$this->isNil($model->cli_nome) and !$this->isNil($model->data_cad)) {
            $response = [
                'erro' => false,
                'cliente' => $model,
                "menssagem" => "Encontrado registro"
            ];
        }
        $this->encodeResponse($response);
    }
}
