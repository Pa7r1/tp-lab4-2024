import clienteAutom from "./cliente.js";

const ejecutarCliente = async () => {
  const count = await clienteAutom.contarClientes();
  if (count === 0) {
    await clienteAutom.crearClient();
  } else {
    console.log("Cliente casual creado");
  }
};

export default ejecutarCliente;
