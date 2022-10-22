import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

import { Home as Clientes } from "./pages/Clientes/Home";
import { Cadastrar as ClienteCad } from "./pages/Clientes/Cadastrar";
import { Visualizar as ClienteVisualizar } from "./pages/Clientes/Visualizar";
import { Editar as ClienteEditar } from "./pages/Clientes/Editar";
import { Home as Estoque } from "./pages/Estoque/Home";
import { Cadastrar as EstoqueCad } from "./pages/Estoque/Cadastrar";
import { Visualizar as EstoqueVisualizar } from "./pages/Estoques/Visualizar";
import { Editar as EstoqueEditar } from "./pages/Estoques/Editar";
import { Home as Impostos } from "./pages/Impostos/Home";
import { Cadastrar as ImpostoCad } from "./pages/Impostos/Cadastrar";
import { Visualizar as ImpostoVisualizar } from "./pages/Impostos/Visualizar";
import { Editar as ImpostoEditar } from "./pages/Impostos/Editar";
import { Home as TiposProdutos } from "./pages/TiposProdutos/Home";
import { Cadastrar as TiposProdutoCad } from "./pages/TiposProdutos/Cadastrar";
import { Visualizar as TiposProdutoVisualizar } from "./pages/TiposProdutos/Visualizar";
import { Editar as TiposProdutoEditar } from "./pages/TiposProdutos/Editar";
import { Home as Produtos } from "./pages/Produtos/Home";
import { Cadastrar as ProdutoCad } from "./pages/Produtos/Cadastrar";
import { Visualizar as ProdutoVisualizar } from "./pages/Produtos/Visualizar";
import { Editar as ProdutoEditar } from "./pages/Produtos/Editar";
import { BemVindo } from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={BemVindo} />
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/estoque" component={Estoque} />
          <Route exact path="/impostos" component={Impostos} />
          <Route exact path="/tipos-produtos" component={TiposProdutos} />
          <Route exact path="/produtos" component={Produtos} />
          <Route path="/clientes/cadastrar" component={ClienteCad} />
          <Route
            path="/clientes/visualizar/:id"
            component={ClienteVisualizar}
          />
          <Route path="/clientes/editar/:id" component={ClienteEditar} />
          <Route path="/estoque/cadastrar" component={EstoqueCad} />
          <Route
            path="/estoque/visualizar/:id"
            component={EstoqueVisualizar}
          />
          <Route path="/estoque/editar/:id" component={EstoqueEditar} />
          <Route path="/impostos/cadastrar" component={ImpostoCad} />
          <Route
            path="/impostos/visualizar/:id"
            component={ImpostoVisualizar}
          />
          <Route path="/impostos/editar/:id" component={ImpostoEditar} />
          <Route path="/tipos-produtos/cadastrar" component={TiposProdutoCad} />
          <Route
            path="/tipos-produtos/visualizar/:id"
            component={TiposProdutoVisualizar}
          />
          <Route path="/tipos-produtos/editar/:id" component={TiposProdutoEditar} />
          <Route path="/produtos/cadastrar" component={ProdutoCad} />
          <Route
            path="/produtos/visualizar/:id"
            component={ProdutoVisualizar}
          />
          <Route path="/produtos/editar/:id" component={ProdutoEditar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
