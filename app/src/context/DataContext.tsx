import { createContext, useState } from "react";

interface Empresa {
  id: string;
  nome: string;
}

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
}

interface Cargo {
  id: string;
  nome: string;
}

interface Funcionario {
  id: string;
  nome: string;
  cargo: Cargo;
  empresa?: Empresa;
}

interface Dados {
  empresas?: Empresa[];
  produtos?: Produto[];
  funcionarios?: Funcionario[];
}

interface childrenProps {
  children: React.ReactNode;

}

export const EditEmpresaContext = createContext({});


export const EditEmpresaProvider = ({ children }: childrenProps) => {
  const [dados, setDados] = useState<Dados|null >(null);


  function setEmpresa  (novosDados: Dados){
    setDados(novosDados)
  };
  return(
    <>
      <EditEmpresaContext.Provider value={{dados, setEmpresa}}>
        {children}
      </EditEmpresaContext.Provider>
    </>
  )
}