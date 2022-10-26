<?php

use Controller\ClienteController;
use Controller\EstoqueController;
use Controller\GenericsController;
use Controller\ImpostoController;
use Controller\Pages\Home;
use Controller\PedidosController;
use Controller\ProdutosController;
use Controller\TiposProdutosController;

switch (URL) {
    case '/':
        Home::getAPI();
        break;

    case PATH[1] === 'impostos' and !isset(PATH[2]):
        ImpostoController::listAll();
        break;

    case PATH[1] === 'impostos' and is_numeric(PATH[2]):
        $id = PATH[2];
        ImpostoController::listId($id);
        break;

    case PATH[1] === 'impostos' and PATH[2] === 'save':
        ImpostoController::save();
        break;

    case PATH[1] === 'impostos' and PATH[2] === 'update':
        ImpostoController::update();
        break;

    case PATH[1] === 'impostos' and PATH[2] === 'delete' and is_numeric(PATH[3]):
        $id = PATH[3];
        ImpostoController::delete($id);
        break;

    case PATH[1] === 'clientes' and !isset(PATH[2]):
        ClienteController::listAll();
        break;

    case PATH[1] === 'clientes' and is_numeric(PATH[2]):
        $id = PATH[2];
        ClienteController::listId($id);
        break;

    case PATH[1] === 'clientes' and PATH[2] === 'save':
        ClienteController::save();
        break;

    case PATH[1] === 'clientes' and PATH[2] === 'update':
        ClienteController::update();
        break;

    case PATH[1] === 'clientes' and PATH[2] === 'delete' and is_numeric(PATH[3]):
        $id = PATH[3];
        ClienteController::delete($id);
        break;

    case PATH[1] === 'tipos-produtos' and !isset(PATH[2]):
        TiposProdutosController::listAll();
        break;

    case PATH[1] === 'tipos-produtos' and is_numeric(PATH[2]):
        $id = PATH[2];
        TiposProdutosController::listId($id);
        break;

    case PATH[1] === 'tipos-produtos' and PATH[2] === 'save':
        TiposProdutosController::save();
        break;

    case PATH[1] === 'tipos-produtos' and PATH[2] === 'update':
        TiposProdutosController::update();
        break;

    case PATH[1] === 'tipos-produtos' and PATH[2] === 'delete' and is_numeric(PATH[3]):
        $id = PATH[3];
        TiposProdutosController::delete($id);
        break;

    case PATH[1] === 'produtos' and !isset(PATH[2]):
        ProdutosController::listAll();
        break;

    case PATH[1] === 'produtos' and is_numeric(PATH[2]):
        $id = PATH[2];
        ProdutosController::listId($id);
        break;

    case PATH[1] === 'produtos' and PATH[2] === 'save':
        ProdutosController::save();
        break;

    case PATH[1] === 'produtos' and PATH[2] === 'update':
        ProdutosController::update();
        break;

    case PATH[1] === 'produtos' and PATH[2] === 'delete' and is_numeric(PATH[3]):
        $id = PATH[3];
        ProdutosController::delete($id);
        break;

    case PATH[1] === 'estoque' and !isset(PATH[2]):
        EstoqueController::listAll();
        break;

    case PATH[1] === 'estoque' and isset(PATH[2]) and PATH[2] === 'produtos':
        GenericsController::listAllEsoquesDosProdutos();
        break;

    case PATH[1] === 'estoque' and is_numeric(PATH[2]):
        $id = PATH[2];
        EstoqueController::listId($id);
        break;

    case PATH[1] === 'estoque' and PATH[2] === 'save':
        EstoqueController::save();
        break;

    case PATH[1] === 'estoque' and PATH[2] === 'update':
        EstoqueController::update();
        break;

    case PATH[1] === 'estoque' and PATH[2] === 'update-all':
        EstoqueController::updateAllFromSet();
        break;

    case PATH[1] === 'estoque' and PATH[2] === 'delete' and is_numeric(PATH[3]):
        $id = PATH[3];
        EstoqueController::delete($id);
        break;

    case PATH[1] === 'pedidos' and !isset(PATH[2]):
        PedidosController::listAll();
        break;

    case PATH[1] === 'pedidos' and is_numeric(PATH[2]):
        $id = PATH[2];
        PedidosController::listId($id);
        break;

    case PATH[1] === 'pedidos' and PATH[2] === 'save':
        PedidosController::save();
        break;

    case PATH[1] === 'pedidos' and PATH[2] === 'delete' and is_numeric(PATH[3]):
        $id = PATH[3];
        PedidosController::delete($id);
        break;

    case PATH[1] === 'pedidos' and is_numeric(PATH[2]) and PATH[3] === 'itens' and !isset(PATH[4]):
        $ped_id = PATH[2];
        PedidosController::listItens($id);
        break;

    default:
        echo "Erro 404";
        break;
}
