<?php

namespace DAO;

use Model\EstoqueModel;
use \PDO;
use Utils\RequestUtils;

class EstoqueDAO extends DAO
{
    public $rows;

    public function __construct()
    {
        parent::__construct();
    }



    public function insert(EstoqueModel $model)
    {

        $sql = "INSERT INTO estoque (prod_id, estoque_qtde, data_cad, data_at) VALUES (?, ?, ?, ?) ";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->prod_id);
        $stmt->bindValue(2, $model->estoque_qtde);
        $stmt->bindValue(3, $model->data_cad);
        $stmt->bindValue(4, $model->data_at);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }


    public function update(EstoqueModel $model)
    {
        $sql = "UPDATE estoque SET prod_id=?, estoque_qtde=?, data_cad=?, data_at=? WHERE id=?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->prod_id);
        $stmt->bindValue(2, $model->estoque_qtde);
        $stmt->bindValue(3, $model->data_cad);
        $stmt->bindValue(4, $model->data_at);
        $stmt->bindValue(5, $model->id);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }

    public function updateAllFromSet($responseJson)
    {
        $model = new EstoqueModel;
        $utils = new RequestUtils;
        foreach ($responseJson['novos_estoques'] as $novo_estoque) {
            $model->id = $novo_estoque['id'];
            $model->prod_id = $novo_estoque['prod_id'];
            $model->estoque_qtde = $novo_estoque['estoque_qtde'];

            if (!$utils->isNil($novo_estoque['data_cad'])) $model->data_cad = $novo_estoque['data_cad'];
            elseif (!array_key_exists('data_cad', $responseJson)) $model->data_cad = NULL;

            $model->data_at = date("Y-m-d");

            $sql = "UPDATE estoque SET prod_id=?, estoque_qtde=?, data_cad=?, data_at=? WHERE id=?";

            $stmt = $this->conexao->prepare($sql);

            $stmt->bindValue(1, $model->prod_id);
            $stmt->bindValue(2, $model->estoque_qtde);
            $stmt->bindValue(3, $model->data_cad);
            $stmt->bindValue(4, $model->data_at);
            $stmt->bindValue(5, $model->id);
            $stmt->execute();
        }
        if ($stmt->rowCount()) {
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

    public function selectAll()
    {
        $sql = "SELECT * FROM estoque ";

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
        $sql = "SELECT * FROM estoque WHERE id = ? ";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchObject("Model\EstoqueModel");
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

        $sql = "DELETE FROM estoque WHERE id = ? ";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $id);

        $stmt->execute();

        $stmt->rowCount();

        if ($stmt->rowCount() > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Estoque apagado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Erro: Estoque não apagado, tente novamente mais tarde!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }
}
