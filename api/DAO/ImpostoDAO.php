<?php

namespace DAO;

use \PDO;
use Model\ImpostoModel;
use Utils\RequestUtils;

class ImpostoDAO extends DAO
{
    public $rows;

    public function __construct()
    {
        parent::__construct();
    }



    public function insert(ImpostoModel $model)
    {

        $sql = "INSERT INTO impostos (percentual, nome) VALUES (?,?)";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->percentual);
        $stmt->bindValue(2, $model->nome);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }


    public function update(ImpostoModel $model)
    {
        $sql = "UPDATE impostos SET percentual=?, nome=? WHERE id=?";

        $stmt = $this->conexao->prepare($sql);

        $stmt->bindValue(1, $model->percentual);
        $stmt->bindValue(2, $model->nome);
        $stmt->bindValue(3, $model->id);

        $stmt->execute();

        $model->rows = $stmt->rowCount();

        return $model->rows;
    }

    public function selectAll()
    {
        $sql = "SELECT * FROM impostos";

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


    public function selectById(int $idImp)
    {
        $sql = "SELECT * FROM impostos WHERE id = ?";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $idImp);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchObject("Model\ImpostoModel");
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

    public function delete(int $idImp)
    {

        $utils = new RequestUtils;
        $model = new ImpostoModel;

        $sql = "DELETE FROM impostos WHERE id = ? ";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(1, $idImp);

        $stmt->execute();

        $stmt->rowCount();

        if ($stmt->rowCount() > 0) {
            $response = [
                "erro" => false,
                "mensagem" => "Imposto apagado com sucesso!"
            ];
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Erro: Imposto não apagado, tente novamente mais tarde!"
            ];
        }
        $utils->encodeResponse($response);
        die;
    }
}
