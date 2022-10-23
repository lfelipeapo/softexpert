<?php

namespace Model;

use DAO\GenericsDAO;

class GenericsModel extends Model
{

    public function getAllRowsEstoquesDosProdutos()
    {
        $dao = new GenericsDAO();

        $this->rows = $dao->selectAllEstoqueDosProdutos();
    }
}
