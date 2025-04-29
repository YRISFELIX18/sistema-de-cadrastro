const API_BASE = 'https://crudcrud.com/api/092f40c492294487b10c5e7a725feb03';
const form = document.getElementById('cliente-form');
const listaClientes = document.getElementById('lista-clientes');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email) return;

  try {
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
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
