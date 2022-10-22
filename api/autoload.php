<?php

spl_autoload_register(function ($nome_da_classe) {

    $nome_da_classe = str_replace("\\", DIRECTORY_SEPARATOR, $nome_da_classe);

    $arquivo = __DIR__ . "/" . $nome_da_classe . ".php";
    if (file_exists($arquivo)) {
        require_once $arquivo;
    } else
        exit('Arquivo não encontrado. Arquivo: ' . $arquivo . "<br />");
});
