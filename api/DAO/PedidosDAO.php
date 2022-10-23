<?php

namespace DAO;

use Model\PedidosModel;
use \PDO;
use Utils\RequestUtils;

class PedidosDAO extends DAO
{

    public function __construct()
    {
        parent::__construct();
    }

    public function insert(PedidosModel $model)
    {
        $utils = new RequestUtils;
        $sql_pedido = "INSERT INTO pedidos (cli_id, ped_valor, ped_qtde, data_ped, data_pg) VALUES (?, ?, ?, ?, ?) ";

        $stmt = $this->conexao->prepare($sql_pedido);

        $stmt->bindValue(1, $model->cli_id);
        $stmt->bindValue(2, $model->ped_valor);
        $stmt->bindValue(3, $model->ped_qtde);
        $stmt->bindValue(4, $model->data_ped);
        $stmt->bindValue(5, $model->data_pg);

        $stmt->execute();

        if ($stmt->rowCount()) {
            $ped_id = $this->conexao->lastInsertId();
            if ($ped_id and !$utils->isNil($ped_id) and $model->itens and is_array($model->itens)) {
                foreach ($model->itens as $itens) {
                    $sql_itens = "INSERT INTO itens_pedido (ped_id, prod_id, item_ped_val_unit, item_ped_qtde, item_val_imposto, item_ped_valor_total) VALUES (?, ?, ?, ?, ?, ?) ";
                    $insert = $this->conexao->prepare($sql_itens);
                    $stmt->bindValue(1, $ped_id);
                    $stmt->bindValue(2, $model->prod_id);
                    $stmt->bindValue(3, $model->item_ped_val_unit);
                    $stmt->bindValue(4, $model->item_ped_qtde);
                    $stmt->bindValue(5, $model->item_val_imposto);
                    $stmt->bindValue(6, $model->item_ped_valor_total);
                }
                $model->rows = $stmt->rowCount();

                return $model->rows;
            } else {
                $response = [
                    "erro" => true,
                    "mensagem" => "Erro: Itens no Carrinho indefinidos, refaça o pedido novamente!"
                ];
                $utils->encodeResponse($response);
                die;
            }
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Erro: Dados do pedido indisponíveis, refaça o pedido novamente!"
            ];
            $utils = new RequestUtils;
            $utils->encodeResponse($response);
            die;
        }

        $model->rows;
    }

    public function selectAll()
    {
        $sql = "SELECT * FROM pedidos ";

        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_CLASS);
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Registros não encontrados"
            ];
            $utils = new RequestUtils;
            $utils->encodeResponse($response);
            die;
        }
    }

    public function selectAllItens(int $id)
    {
        $sql = "SELECT * FROM itens_pedido WHERE ped_id = ?";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_CLASS);
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Registros não encontrados"
            ];
            $utils = new RequestUtils;
            $utils->encodeResponse($response);
            die;
        }
    }


    public function selectById(int $id)
    {
        $sql = "SELECT * FROM pedidos WHERE id = ? ";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchObject("Model\PedidosModel");
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Registros não encontrados"
            ];
            $utils = new RequestUtils;
            $utils->encodeResponse($response);
            die;
        }
    }

    public function delete(int $id)
    {

        $utils = new RequestUtils;

        $sql = "DELETE FROM clientes WHERE id = ? ";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);

        $stmt->execute();

        $stmt->rowCount();

        if ($stmt->rowCount() > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Pedido apagado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Erro: Pedido não apagado, tente novamente mais tarde!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }
}
