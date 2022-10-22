<?php

namespace Model;

use DAO\TiposProdutosDAO;
use Utils\RequestUtils;

class TiposProdutosModel extends Model
{

    public $id, $nome, $id_imposto, $data_cad, $data_at;

    public function save()
    {
        $dao = new TiposProdutosDAO();
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
        $dao = new TiposProdutosDAO();
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
        $dao = new TiposProdutosDAO();

        $this->rows = $dao->selectAll();
    }

    public function getById(int $id)
    {
        $dao = new TiposProdutosDAO();

        $obj = $dao->selectById($id);

        return ($obj) ? $obj : new TiposProdutosModel();
    }

    public function delete(int $id)
    {
        $dao = new TiposProdutosDAO();

        $dao->delete($id);
    }
}
