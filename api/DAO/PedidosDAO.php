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

        if ($stmt->execute()) {
            $ped_id = $this->conexao->lastInsertId();
            if ($ped_id and !$utils->isNil($ped_id) and $model->itens and is_array($model->itens)) {
                foreach ($model->itens as $itens) {

                    $model->prod_id = $itens["prod_id"];
                    $model->val_unit = $itens["val_unit"];
                    $model->item_ped_qtde = $itens["item_ped_qtde"];
                    $model->item_val_imposto = $itens["item_val_imposto"];
                    $model->valor_total = $itens["valor_total"];

                    $sql_itens = "INSERT INTO itens_pedido (ped_id, prod_id, val_unit, item_ped_qtde, item_val_imposto, valor_total) VALUES (:ped_id, :prod_id, :val_unit, :item_ped_qtde, :item_val_imposto, :valor_total)";

                    $insert = $this->conexao->prepare($sql_itens);

                    $insert->bindParam(':ped_id', $ped_id);
                    $insert->bindParam(':prod_id', $model->prod_id);
                    $insert->bindParam(':val_unit', $model->val_unit);
                    $insert->bindParam(':item_ped_qtde', $model->item_ped_qtde);
                    $insert->bindParam(':item_val_imposto', $model->item_val_imposto);
                    $insert->bindParam(':valor_total', $model->valor_total);

                    $insert = $this->conexao->prepare($sql_itens);

                    $insert->execute();
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
