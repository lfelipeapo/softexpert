<?php

namespace DAO;

use Model\ProdutosModel;
use \PDO;
use Utils\RequestUtils;

class ProdutosDAO extends DAO
{
    public $rows;

    public function __construct()
    {
        parent::__construct();
    }



    public function insert(ProdutosModel $model)
    {

        $sql = "INSERT INTO produtos (nome, preco, id_tipo_produto, data_cad, data_at) VALUES (?, ?, ?, ?, ?) ";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->nome);
        $stmt->bindValue(2, $model->preco);
        $stmt->bindValue(3, $model->id_tipo_produto);
        $stmt->bindValue(4, $model->data_cad);
        $stmt->bindValue(5, $model->data_at);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }


    public function update(ProdutosModel $model)
    {
        $sql = "UPDATE produtos SET nome=?, preco=?, id_tipo_produto=?, data_cad=?, data_at=? WHERE id=?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->nome);
        $stmt->bindValue(2, $model->preco);
        $stmt->bindValue(3, $model->id_tipo_produto);
        $stmt->bindValue(4, $model->data_cad);
        $stmt->bindValue(5, $model->data_at);
        $stmt->bindValue(6, $model->id);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }

    public function selectAll()
    {
        $sql = "SELECT * FROM produtos ";

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
        $sql = "SELECT * FROM produtos WHERE id = ? ";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchObject("Model\ProdutosModel");
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

        $sql = "DELETE FROM produtos WHERE id = ? ";
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
