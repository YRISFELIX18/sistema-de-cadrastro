import { Cliente } from './classes.js';
import { validarEntrada, validarEmail } from './utils.js';

const API_BASE = 'https://crudcrud.com/api/d39f47fd489143fb86df95a7cd181ba1';
const form = document.getElementById('cliente-form');
const listaClientes = document.getElementById('lista-clientes');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!validarEntrada(nome) || !validarEmail(email)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const cliente = new Cliente(nome, email);

  try {
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
    form.reset();
    carregarClientes();
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
  }
});

async function carregarClientes() {
  try {
    const resposta = await fetch(API_BASE);
    const clientes = await resposta.json();
    listaClientes.innerHTML = '';
    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.textContent = `${cliente.nome} - ${cliente.email}`;
      const botaoExcluir = document.createElement('button');
      botaoExcluir.textContent = 'Excluir';
      botaoExcluir.addEventListener('click', () => excluirCliente(cliente._id));
      li.appendChild(botaoExcluir);
      listaClientes.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

async function excluirCliente(id) {
  try {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    carregarClientes();
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
  }
}

// Carrega os clientes ao iniciar
carregarClientes();
