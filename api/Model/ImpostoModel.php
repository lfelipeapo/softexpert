<?php

namespace Model;

use DAO\ImpostoDAO;
use Utils\RequestUtils;

class ImpostoModel extends Model
{

    public $id, $percentual;

    public function save()
    {
        $dao = new ImpostoDAO();
        $utils = new RequestUtils;

        $dao->insert($this);
        if ($this->rows > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Imposto cadastrado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Imposto não cadastrado, tente novamente!"
            ];
        }

        $utils->encodeResponse($response);
    }

    public function update()
    {
        $dao = new ImpostoDAO();
        $utils = new RequestUtils;
        $dao->update($this);
        if ($this->rows != 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Imposto atualizado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Não ocorreu nenhuma alteração no registro!"
            ];
        }
        $utils->encodeResponse($response);
    }


    public function getAllRows()
    {
        $dao = new ImpostoDAO();

        $this->rows = $dao->selectAll();
    }

    public function getById(int $id)
    {
        $dao = new ImpostoDAO();

        $obj = $dao->selectById($id);

        return ($obj) ? $obj : new ImpostoModel();
    }

    public function delete(int $id)
    {
        $dao = new ImpostoDAO();

        $dao->delete($id);
    }
}
