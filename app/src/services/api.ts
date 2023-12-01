import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.22:8080/graphql/#query=",
});

const graphqlQueryEmpresa = "query getEmpresas{empresas{id,nome}}";
const graphqlQueryProdutos =
  "query getProdutos{produtos{id,nome,preco,descricao}}";
const graphqlQueryCargos = "query getCargos{cargos{id,nome}}";
const graphqlQueryFuncionarios =
  "query getFuncionarios{funcionarios{id,nome,cargo{id,nome},empresa{id,nome}}}";

export async function getEmpresa() {
  const response = await api.post("", { query: graphqlQueryEmpresa });
  return response;
}
export async function getProdutos() {
  const response = await api.post("", { query: graphqlQueryProdutos });
  return response;
}
export async function getCargos() {
  const response = await api.post("", { query: graphqlQueryCargos });
  return response;
}
export async function getFuncionarios() {
  const response = await api.post("", { query: graphqlQueryFuncionarios });
  return response;
}

export async function createEmpresa(nomeEmpresa: string) {
  const graphqlMutationEmpresa = `mutation createEmpresa {
    createEmpresa(input:{nome: "${nomeEmpresa}"}){
      empresa{
        id,
        nome,
      }
    }
  }`;
  try {
    const response = await api.post("", {
      query: graphqlMutationEmpresa,
      variables: {
        nome: nomeEmpresa,
      },
    });

    return response.data;
  } catch (error) {
    // Trate os erros aqui
    console.error(error);
    throw new Error("Erro na mutação createEmpresa");
  }
}

export async function createCargo(nomeCargo: string) {
  const graphqlMutationCargo = `
  mutation createCargo{
    createCargo(input:{nome: "${nomeCargo}"}){
      cargo{
        id,
        nome
      }
    }
  }`;
  try {
    const response = await api.post("", {
      query: graphqlMutationCargo,
      variables: { nome: nomeCargo },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação createCargo");
  }
}

export async function createProduto(
  nomeProduto: string,
  preco: number,
  descricao: string
) {
  const graphqlMutationProdutos = `mutation CreateProduto {
    createProduto(
      input: {nome: "${nomeProduto}", preco: ${preco}, descricao: "${descricao}"}
    ) {
      produto {
        id
        nome
        preco
        descricao
      }
    }
  }`;
  try {
    const response = await api.post("", {
      query: graphqlMutationProdutos,
      variables: { nome: nomeProduto, preco: preco, descricao: descricao },
    });
    return response;
  } catch (err) {
    {
      console.error(err);
      throw new Error("Erro na mutação createProduto");
    }
  }
}

export async function createFuncionario(
  nomeFuncionario: string,
  idCargo: string,
  idEmpresa: string
) {
  const graphqlMutationFuncionario = `
  mutation createFuncionario {
    createFuncionario(input: {nome: "${nomeFuncionario}", cargoId: "${idCargo}", empresaId: "${idEmpresa}"}) {
      funcionario {
        id
        nome
        empresa {
          id
          nome
        }
        cargo {
          id
          nome
        }
      }
    }
  }`;
  try {
    const response = await api.post("", {
      query: graphqlMutationFuncionario,
      variables: {
        nome: nomeFuncionario,
        cargoId: idCargo,
        empresaId: idEmpresa,
      },
    });
    return response;
  } catch (err) {
    {
      console.error(err);
      throw new Error("Erro na mutação createFuncionario");
    }
  }
}

export function DeleteEmpresa(idEmpresa: string) {
  const graphqlMutationEmpresaDelete = `mutation DeleteEmpresa{
    deleteEmpresa(id: "${idEmpresa}"){
      success
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationEmpresaDelete,
      variables: { id: idEmpresa },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação DeleteEmpresa");
  }
}

export function DeleteProdutos(idProduto: string) {
  const graphqlMutationProdutoDelete = `mutation DeleteProduto{
    deleteProduto(id: "${idProduto}"){
      success
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationProdutoDelete,
      variables: { id: idProduto },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação DeleteProduto");
  }
}

export function DeleteCargo(idCargo: string) {
  const graphqlMutationCargoDelete = `mutation DeleteCargo{
    deleteCargo(id: "${idCargo}"){
      success
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationCargoDelete,
      variables: { id: idCargo },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação DeleteCargo");
  }
}

export function DeleteFuncionario(idFuncionario: string) {
  const graphqlMutationFuncionarioDelete = `mutation DeleteFuncionario{
    deleteFuncionario(id: "${idFuncionario}"){
      success
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationFuncionarioDelete,
      variables: { id: idFuncionario },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação DeleteProduto");
  }
}

export function UpdateEmpresa(idEmpresa: string, nomeEmpresa: string) {
  const graphqlMutationEmpresaUpdate = `mutation UpdateEmpresa{
    updateEmpresa(id: "${idEmpresa}", input: {nome: "${nomeEmpresa}"}){
      empresa{
        id
        nome
      }
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationEmpresaUpdate,
      variables: { id: idEmpresa, nome: nomeEmpresa },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação UpdateEmpresa");
  }
}

export function updateProduto(
  idProduto: string,
  nomeProduto: string,
  preco: number,
  descricao: string
) {
  const graphqlMutationProdutoUpdate = `mutation UpdateProduto{
    updateProduto(id: "${idProduto}", input: {nome: "${nomeProduto}", preco: ${preco}, descricao: "${descricao}"}){
      produto{
        id
        nome
        preco
        descricao
      }
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationProdutoUpdate,
      variables: {
        id: idProduto,
        nome: nomeProduto,
        preco: preco,
        descricao: descricao,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação UpdateProduto");
  }
}

export function updateCargo(idCargo: string, nomeCargo: string) {
  const graphqlMutationCargoUpdate = `mutation UpdateCargo{
    updateCargo(id: "${idCargo}", input: {nome: "${nomeCargo}"}){
      cargo{
        id
        nome
      }
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationCargoUpdate,
      variables: { id: idCargo, nome: nomeCargo },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação UpdateCargo");
  }
}

export function updateFuncionario(
  idFuncionario: string,
  nomeFuncionario: string,
  idCargo: string,
  idEmpresa: string
) {
  const graphqlMutationFuncionarioUpdate = `mutation UpdateFuncionario{
    updateFuncionario(id: "${idFuncionario}", input: {nome: "${nomeFuncionario}", cargoId: "${idCargo}", empresaId: "${idEmpresa}"}){
      funcionario{
        id
        nome
        empresa{
          id
          nome
        }
        cargo{
          id
          nome
        }
      }
    }
  }`;
  try {
    const response = api.post("", {
      query: graphqlMutationFuncionarioUpdate,
      variables: {
        id: idFuncionario,
        nome: nomeFuncionario,
        cargoId: idCargo,
        empresaId: idEmpresa,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro na mutação UpdateFuncionario");
  }
}
