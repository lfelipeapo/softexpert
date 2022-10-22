<?php

namespace Model;

use DAO\ProdutosDAO;
use Utils\RequestUtils;

class ProdutosModel extends Model
{

    public $id, $nome, $id_imposto, $data_cad, $data_at;

    public function save()
    {
        $dao = new ProdutosDAO();
        $utils = new RequestUtils;

        $dao->insert($this);
        if ($this->rows > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Tipo cadastrado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Tipo não cadastrado, tente novamente!"
            ];
        }

        $utils->encodeResponse($response);
        die;
    }

    public function update()
    {
        $dao = new ProdutosDAO();
        $utils = new RequestUtils;
        $dao->update($this);
        if ($this->rows != 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Tipo atualizado com sucesso!"
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
        $dao = new ProdutosDAO();

        $this->rows = $dao->selectAll();
    }

    public function getById(int $id)
    {
        $dao = new ProdutosDAO();

        $obj = $dao->selectById($id);

        return ($obj) ? $obj : new ProdutosModel();
    }

    public function delete(int $id)
    {
        $dao = new ProdutosDAO();

        $dao->delete($id);
    }
}
