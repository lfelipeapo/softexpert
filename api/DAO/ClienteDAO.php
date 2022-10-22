<?php

namespace DAO;

use Model\ClienteModel;
use \PDO;
use Utils\RequestUtils;

class ClienteDAO extends DAO
{
    public $rows;

    public function __construct()
    {
        parent::__construct();
    }



    public function insert(ClienteModel $model)
    {

        $sql = "INSERT INTO clientes (cli_nome, data_cad, data_at) VALUES (?, ?, ?) ";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->cli_nome);
        $stmt->bindValue(2, $model->data_cad);
        $stmt->bindValue(3, $model->data_at);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }


    public function update(ClienteModel $model)
    {
        $sql = "UPDATE clientes SET cli_nome=?, data_cad=?, data_at=? WHERE cli_id=?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->cli_nome);
        $stmt->bindValue(2, $model->data_cad);
        $stmt->bindValue(3, $model->data_at);
        $stmt->bindValue(4, $model->cli_id);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }

    public function selectAll()
    {
        $sql = "SELECT * FROM clientes ";

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


    public function selectById(int $cli_id)
    {
        $sql = "SELECT * FROM clientes WHERE cli_id = ? ";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $cli_id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchObject("Model\ClienteModel");
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

    public function delete(int $cli_id)
    {

        $utils = new RequestUtils;

        $sql = "DELETE FROM clientes WHERE cli_id = ? ";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $cli_id);

        $stmt->execute();

        $stmt->rowCount();

        if ($stmt->rowCount() > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Cliente apagado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Erro: Cliente não apagado, tente novamente mais tarde!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }
}
