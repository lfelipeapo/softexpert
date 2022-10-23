<?php

namespace Model;

use DAO\PedidosDAO;
use Utils\RequestUtils;

class PedidosModel extends Model
{

    public $rows, $id, $cli_id, $ped_valor, $ped_qtde, $data_ped, $data_pg, $itens, $prod_id, $item_ped_val_unit, $item_ped_qtde, $item_val_imposto, $item_ped_valor_total;

    public function save()
    {
        $dao = new PedidosDAO();
        $utils = new RequestUtils;

        $dao->insert($this);
        if ($this->rows > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Pedido cadastrado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Pedido não cadastrado, tente novamente!"
            ];
        }

        $utils->encodeResponse($response);
        die;
    }

    public function getAllRows()
    {
        $dao = new PedidosDAO();

        $this->rows = $dao->selectAll();
    }

    public function getAllRowsItens(int $id)
    {
        $dao = new PedidosDAO();

        $this->rows = $dao->selectAllItens($id);
    }

    public function getById(int $id)
    {
        $dao = new PedidosDAO();

        $obj = $dao->selectById($id);

        return ($obj) ? $obj : new PedidosModel();
    }

    public function delete(int $id)
    {
        $dao = new PedidosDAO();

        $dao->delete($id);
    }
}
