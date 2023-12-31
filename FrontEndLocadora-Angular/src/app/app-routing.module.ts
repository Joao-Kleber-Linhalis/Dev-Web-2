import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './componets/nav/nav.component';
import { HomeComponent } from './componets/home/home.component';
import { AtorListComponent } from './componets/ator/ator-list/ator-list.component';
import { AtorCreateComponent } from './componets/ator/ator-create/ator-create.component';
import { DiretorListComponent } from './componets/diretor/diretor-list/diretor-list.component';
import { DiretorCreateComponent } from './componets/diretor/diretor-create/diretor-create.component';
import { ClasseListComponent } from './componets/classe/classe-list/classe-list.component';
import { ClasseCreateComponent } from './componets/classe/classe-create/classe-create.component';
import { AtorUpdateComponent } from './componets/ator/ator-update/ator-update.component';
import { DiretorUpdateComponent } from './componets/diretor/diretor-update/diretor-update.component';
import { ClasseUpdateComponent } from './componets/classe/classe-update/classe-update.component';
import { AtorStatusComponent } from './componets/ator/ator-status/ator-status.component';
import { DiretorStatusComponent } from './componets/diretor/diretor-status/diretor-status.component';
import { ClasseStatusComponent } from './componets/classe/classe-status/classe-status.component';
import { TituloCreateComponent } from './componets/titulo/titulo-create/titulo-create.component';
import { TituloListComponent } from './componets/titulo/titulo-list/titulo-list.component';
import { TituloStatusComponent } from './componets/titulo/titulo-status/titulo-status.component';
import { TituloUpdateComponent } from './componets/titulo/titulo-update/titulo-update.component';
import { ItemCreateComponent } from './componets/item/item-create/item-create.component';
import { ItemListComponent } from './componets/item/item-list/item-list.component';
import { ItemStatusComponent } from './componets/item/item-status/item-status.component';
import { ItemUpdateComponent } from './componets/item/item-update/item-update.component';
import { ClienteCreateComponent } from './componets/cliente/cliente-create/cliente-create.component';
import { ClienteListComponent } from './componets/cliente/cliente-list/cliente-list.component';
import { ClienteStatusComponent } from './componets/cliente/cliente-status/cliente-status.component';
import { ClienteUpdateComponent } from './componets/cliente/cliente-update/cliente-update.component';
import { DependenteCreateComponent } from './componets/dependente/dependente-create/dependente-create.component';
import { DependenteListComponent } from './componets/dependente/dependente-list/dependente-list.component';
import { DependenteStatusComponent } from './componets/dependente/dependente-status/dependente-status.component';
import { DependenteUpdateComponent } from './componets/dependente/dependente-update/dependente-update.component';
import { LocacaoCreateComponent } from './componets/locacao/locacao-create/locacao-create.component';
import { LocacaoDeleteComponent } from './componets/locacao/locacao-delete/locacao-delete.component';
import { LocacaoListComponent } from './componets/locacao/locacao-list/locacao-list.component';
import { LocacaoUpdateComponent } from './componets/locacao/locacao-update/locacao-update.component';
import { LocacaoDevolucaoComponent } from './componets/locacao/locacao-devolucao/locacao-devolucao.component';
import { LoginComponent } from './componets/login/login.component';
import { GaleriaComponent } from './componets/galeria/galeria.component';

const routes: Routes = [
  {path: 'galeria', component: GaleriaComponent},
  { path: 'login', component: LoginComponent },
  { 
    path: '', component: NavComponent, children: [
      { path: 'home', component: HomeComponent },
      //Ator
      { path: 'atores', component: AtorListComponent },
      { path: 'atores/create', component: AtorCreateComponent },
      { path: 'atores/update/:id', component: AtorUpdateComponent },
      { path: 'atores/status/:id', component: AtorStatusComponent },
      //Diretor
      { path: 'diretores', component: DiretorListComponent },
      { path: 'diretores/create', component: DiretorCreateComponent },
      { path: 'diretores/update/:id', component: DiretorUpdateComponent },
      { path: 'diretores/status/:id', component: DiretorStatusComponent },
      //Classes
      { path: 'classes', component: ClasseListComponent },
      { path: 'classes/create', component: ClasseCreateComponent },
      { path: 'classes/update/:id', component: ClasseUpdateComponent },
      { path: 'classes/status/:id', component: ClasseStatusComponent },
      //Titulos
      { path: 'titulos', component: TituloListComponent },
      { path: 'titulos/create', component: TituloCreateComponent },
      { path: 'titulos/update/:id', component: TituloUpdateComponent },
      { path: 'titulos/status/:id', component: TituloStatusComponent },
      //Itens
      { path: 'itens', component: ItemListComponent },
      { path: 'itens/create', component: ItemCreateComponent },
      { path: 'itens/update/:id', component: ItemUpdateComponent },
      { path: 'itens/status/:id', component: ItemStatusComponent },
      //Clientes
      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/status/:id', component: ClienteStatusComponent },
      //Dependentes
      { path: 'dependentes', component: DependenteListComponent },
      { path: 'dependentes/create', component: DependenteCreateComponent },
      { path: 'dependentes/update/:id', component: DependenteUpdateComponent },
      { path: 'dependentes/status/:id', component: DependenteStatusComponent },
      //Locações
      { path: 'locacoes', component: LocacaoListComponent },
      { path: 'locacoes/create', component: LocacaoCreateComponent },
      { path: 'locacoes/update/:id', component: LocacaoUpdateComponent },
      { path: 'locacoes/delete/:id', component: LocacaoDeleteComponent }, //Unica com delete
      { path: 'locacoes/devolucao/:id', component: LocacaoDevolucaoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
