import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Dependente } from 'src/app/models/dependente';
import { Locacao } from 'src/app/models/locacao';
import { ClienteService } from 'src/app/services/cliente.service';
import { ItemService } from 'src/app/services/item.service';
import { LocacaoService } from 'src/app/services/locacao.service';

@Component({
  selector: 'app-locacao-update',
  templateUrl: './locacao-update.component.html',
  styleUrls: ['./locacao-update.component.css']
})
export class LocacaoUpdateComponent implements OnInit {

  moment = moment;
  itemId: number;
  maxDate: Date;
  minDate: Date;

  locacao: Locacao = {
    id: '', //
    cliente: null, //
    dependente: null, //
    item: null, //
    dtLocacao: this.moment().format('DD/MM/YYYY'), //
    dtDevolucaoPrevista: '', //
    dtDevolucaoEfetiva: null, //
    valorCobrado: null, //
    multaCobrada: null, //
    total: null, //
  }

  clienteList: Cliente[] = [];

  cliente = new FormControl(null, Validators.required);
  item = new FormControl(null, Validators.required);
  dtLocacao = new FormControl(moment(), Validators.required);
  dtDevolucaoPrevista = new FormControl(null, Validators.required);
  valorCobrado = new FormControl(null, Validators.required);
  compareWithCliente = (o1: Cliente, o2: Cliente) => o1.id == o2.id;
  compareWithDependente = (o1: Dependente, o2: Dependente) => o1.id == o2.id;

  validarCampos(): boolean {
    return this.cliente.valid && this.item.valid && this.dtLocacao.valid
      && this.dtDevolucaoPrevista.valid
  }

  printValidar(): void{
    console.log(this.cliente.valid);
    console.log(this.item.valid);
    console.log(this.dtLocacao.valid);
    console.log(this.dtDevolucaoPrevista.valid);
  }

  constructor(
    private router: Router,
    private toast: ToastrService,
    private itemService: ItemService,
    private clienteService: ClienteService,
    private locacaoService: LocacaoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.locacao.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.maxDate = new Date();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.findAllCliente();
  }

  findById(): void {
    this.locacaoService.findById(this.locacao.id).subscribe(
      resposta => {
        this.locacao = resposta;
        this.item.setValue(this.locacao.item);
        this.itemId = this.locacao.item.id;
        this.valorCobrado.setValue(this.locacao.valorCobrado);
        this.findByIdCliente();
        console.log(this.locacao);
        const dtLocacaoString = this.locacao.dtLocacao;
        const dtDevolucaoPrevistaString = this.locacao.dtDevolucaoPrevista;

        // Use o moment para criar um objeto moment a partir da string.
        const dtLocacaoMoment = moment(dtLocacaoString, 'DD/MM/YYYY');
        const dtDevolucaoPrevistaMoment = moment(dtDevolucaoPrevistaString, 'DD/MM/YYYY');
        // Defina o valor do controle com o objeto moment.
        this.dtDevolucaoPrevista.setValue(dtDevolucaoPrevistaMoment);
        this.dtLocacao.setValue(dtLocacaoMoment);
      }
    )
  }

  findByIdCliente(): void{
    this.clienteService.findById(this.locacao.cliente.id).subscribe(
      resposta =>{
        this.locacao.cliente = resposta;
      }
    )
  }

  findAllCliente() {
    this.clienteService.findAll(true).subscribe(resposta => {
      // Armazene a resposta em uma variável temporária
      const clientes: any[] = resposta;

      // Ordene a lista com base na variável 'cliente.nome'
      clientes.sort((a, b) => a.nome.localeCompare(b.nome));

      // Atribua a lista ordenada a this.clienteList
      this.clienteList = clientes;
    },
      error => {
        this.toast.error("Erro no Carregamento de Clientes", "ERRO");
      });
  }

  update(): void {
    this.locacaoService.update(this.locacao).subscribe(resposta => {
      this.toast.success('Locação Cadastrado com sucesso', 'Cadastro');
      this.router.navigate(["locacoes"])
    }, ex => {
      console.log(ex);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message);
        })
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  onDateSelected(event: any, dateControlName: string) {
    if (event.value) {
      this.locacao[dateControlName] = this.moment(event.value).format('DD/MM/YYYY');
      console.log("locacao" + this.locacao.dtLocacao);
      console.log("prevista" + this.locacao.dtDevolucaoPrevista);
    } else {
      this.locacao[dateControlName] = this.moment().format('DD/MM/YYYY');
    }
  }

  pesquisarItem() {
    if (this.itemId) {
      this.itemService.findById(this.itemId).subscribe(
        (item) => {
          this.locacao.item = item;
          this.item.setValue(item);
          const prazoDevolucaoDias = item.titulo.classe.prazoDevolucao;
          // Use o moment para criar um objeto moment com a data de hoje.
          const dataHojeMoment = moment();
          // Adicione a quantidade de dias ao objeto moment da data de hoje.
          const dtDevolucaoPrevistaMoment = dataHojeMoment.add(prazoDevolucaoDias, 'days');
          // Defina o valor do controle com o objeto moment.
          this.locacao.dtDevolucaoPrevista = this.moment(dtDevolucaoPrevistaMoment).format('DD/MM/YYYY');
          this.dtDevolucaoPrevista.setValue(dtDevolucaoPrevistaMoment);

          this.locacao.valorCobrado = item.titulo.classe.valor;
        },
        (error) => {
          this.toast.error('Erro ao pesquisar item:', "ERRO");
          // Manipule o erro conforme necessário
        }
      );
    } else {
      this.toast.error('ID do item não fornecido');
      // Trate o caso em que o ID do item não é fornecido
    }
  }

}

moment.locale('pt-BR');
