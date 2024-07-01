const prompt = require("prompt-sync")();

let opcao;
let consultas = [];
let consulta = {};

let indiceAtualizar;
let atributoAtualizar;

function menu() {
  console.log("O que deseja?");
  console.log("1. Inserir consulta");
  console.log("2. Listar consultas");
  console.log("3. Desmarcar consulta");
  console.log("4. Atualizar consulta");
}

function incluirConsulta() {
  let nome = prompt("Qual o nome do paciente? ");
  consulta.paciente = nome;
  let medico = prompt("Qual o nome do médico? ");
  consulta.medico = medico;
  let data = prompt("Para qual dia quer marcar a consulta? ");
  consulta.data = data;
  let horario = prompt("Para qual horário? ");
  consulta.horario = horario;

  consultas.push(consulta);
  consulta = {}; // Reinicia o objeto consulta para uma nova inserção
  console.log("Consulta agendada com sucesso");
}

function desmarcarConsulta() {
  console.log("Qual consulta deseja desmarcar? Digite o índice:");
  let indiceRemocao = prompt("> ");
  consultas[indiceRemocao].removido = true;
  console.log("Consulta removida com sucesso");
}

function atualizarConsulta() {
  if (!indiceAtualizar) {
    console.log("Qual consulta deseja atualizar? Digite o índice:");
    indiceAtualizar = prompt("> ");
    console.log("Qual atributo você deseja mudar? Digite o nome:");
    let atributos = Object.keys(consultas[indiceAtualizar]);
    atributos.forEach(function (atributo) {
      console.log(atributo);
    });
  } else if (!atributoAtualizar) {
    atributoAtualizar = prompt("> ");
    console.log("Qual é o novo valor?");
  } else {
    consultas[indiceAtualizar][atributoAtualizar] = prompt("> ");
    console.log("Dado atualizado com sucesso");
    indiceAtualizar = undefined;
    atributoAtualizar = undefined;
    opcao = undefined;
  }
}

menu();

process.stdin.on("data", function (data) {
  let entrada = data.toString().trim();

  if (!opcao) {
    opcao = entrada;

    switch (opcao) {
      case "1":
        incluirConsulta();
        opcao = undefined;
        menu();
        break;
      case "2":
        consultas.forEach(function (obj, indice) {
          console.log(indice, obj);
        });
        opcao = undefined;
        menu();
        break;
      case "3":
        desmarcarConsulta();
        opcao = undefined;
        menu();
        break;
      case "4":
        atualizarConsulta();
        if (!indiceAtualizar) {
          opcao = undefined;
          menu();
        }
        break;
      default:
        console.log("Opção inválida");
        opcao = undefined;
        menu();
        break;
    }
  }
});
   
        
