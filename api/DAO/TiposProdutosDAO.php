<?php

namespace DAO;

use Model\TiposProdutosModel;
use \PDO;
use Utils\RequestUtils;

class TiposProdutosDAO extends DAO
{
    public $rows;

    public function __construct()
    {
        parent::__construct();
    }



    public function insert(TiposProdutosModel $model)
    {

        $sql = "INSERT INTO tipos_produtos (nome, id_imposto, data_cad, data_at) VALUES (?, ?, ?, ?) ";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->nome);
        $stmt->bindValue(2, $model->id_imposto);
        $stmt->bindValue(3, $model->data_cad);
        $stmt->bindValue(4, $model->data_at);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }


    public function update(TiposProdutosModel $model)
    {
        $sql = "UPDATE tipos_produtos SET nome=?, id_imposto=?, data_cad=?, data_at=? WHERE id=?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->nome);
        $stmt->bindValue(2, $model->id_imposto);
        $stmt->bindValue(3, $model->data_cad);
        $stmt->bindValue(4, $model->data_at);
        $stmt->bindValue(5, $model->id);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }

    public function selectAll()
    {
        $sql = "SELECT * FROM tipos_produtos ";

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


    public function selectById(int $id)
    {
        $sql = "SELECT * FROM tipos_produtos WHERE id = ? ";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchObject("Model\TiposProdutosModel");
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

        $sql = "DELETE FROM tipos_produtos WHERE id = ? ";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);

        $stmt->execute();

        $stmt->rowCount();

        if ($stmt->rowCount() > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Produto apagado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Erro: Produto não apagado, tente novamente mais tarde!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }
}
