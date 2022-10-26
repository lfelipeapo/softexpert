<?php

namespace Model;

use DAO\EstoqueDAO;
use Utils\RequestUtils;

class EstoqueModel extends Model
{

    public $id, $prod_id, $estoque_qtde, $data_cad, $data_at;

    public function save()
    {
        $dao = new EstoqueDAO();
        $utils = new RequestUtils;

        $dao->insert($this);
        if ($this->rows > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Estoque cadastrado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Estoque não cadastrado, tente novamente!"
            ];
        }

        $utils->encodeResponse($response);
        die;
    }

    public function update()
    {
        $dao = new EstoqueDAO();
        $utils = new RequestUtils;
        $dao->update($this);
        if ($this->rows != 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Estoque atualizado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Não ocorreu nenhuma alteração no registro!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }

    public function updateAll($responseJson)
    {
        $dao = new EstoqueDAO();
        $utils = new RequestUtils;
        $dao->updateAllFromSet($responseJson);
        if ($this->rows != 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Estoque atualizado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Não ocorreu nenhuma alteração no registro!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }


    public function getAllRows()
    {
        $dao = new EstoqueDAO();

        $this->rows = $dao->selectAll();
    }

    public function getById(int $id)
    {
        $dao = new EstoqueDAO();

        $obj = $dao->selectById($id);

        return ($obj) ? $obj : new EstoqueModel();
    }

    public function delete(int $id)
    {
        $dao = new EstoqueDAO();

        $dao->delete($id);
    }
}
