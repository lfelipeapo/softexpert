<?php

namespace DAO;

use \PDO;
use Utils\RequestUtils;

class GenericsDAO extends DAO
{
    public $rows;

    public function __construct()
    {
        parent::__construct();
    }


    public function selectAllEstoqueDosProdutos()
    {
        $sql = "SELECT estoque.prod_id AS id, produtos.nome, tipos_produtos.nome AS tipo, impostos.percentual as percentual_imposto_tipo, produtos.preco, estoque.id AS estoque_id, estoque.estoque_qtde FROM estoque INNER JOIN produtos ON estoque.prod_id = produtos.id INNER JOIN tipos_produtos ON produtos.id_tipo_produto = tipos_produtos.id INNER JOIN impostos ON tipos_produtos.id_imposto = impostos.id ";

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
}
