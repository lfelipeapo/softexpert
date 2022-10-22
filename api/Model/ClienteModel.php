<?php

namespace Model;

use DAO\ClienteDAO;
use Utils\RequestUtils;

class ClienteModel extends Model
{

    public $cli_id, $cli_nome, $data_cad, $data_at;

    public function save()
    {
        $dao = new ClienteDAO();
        $utils = new RequestUtils;

        $dao->insert($this);
        if ($this->rows > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Cliente cadastrado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Cliente não cadastrado, tente novamente!"
            ];
        }

        $utils->encodeResponse($response);
        die;
    }

    public function update()
    {
        $dao = new ClienteDAO();
        $utils = new RequestUtils;
        $dao->update($this);
        if ($this->rows != 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Cliente atualizado com sucesso!"
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
        $dao = new ClienteDAO();

        $this->rows = $dao->selectAll();
    }

    public function getById(int $id)
    {
        $dao = new ClienteDAO();

        $obj = $dao->selectById($id);

        return ($obj) ? $obj : new ClienteModel();
    }

    public function delete(int $id)
    {
        $dao = new ClienteDAO();

        $dao->delete($id);
    }
}
