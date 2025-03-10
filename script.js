// Simulação de dados dinâmicos
const clientCount = document.getElementById('clientCount');
const stockCount = document.getElementById('stockCount');
const attendanceCount = document.getElementById('attendanceCount');
const activitiesList = document.getElementById('activitiesList');

// Atualizar contadores
clientCount.textContent = 25; // Exemplo: 25 clientes cadastrados
stockCount.textContent = 150; // Exemplo: 150 produtos em estoque
attendanceCount.textContent = 12; // Exemplo: 12 atendimentos este mês

// Atualizar atividades recentes
const activities = [
    "Cliente Maria Silva comprou 3 colares.",
    "Novo material cadastrado: Anel de Prata.",
    "Estoque atualizado: Colares Dourados.",
    "Cliente João Oliveira comprou 2 pulseiras."
];

activitiesList.innerHTML = activities.map(activity => `<li>${activity}</li>`).join('');

// Logout
document.querySelector('.logout-btn').addEventListener('click', () => {
    alert('Você saiu do sistema.');
    window.location.href = 'index.html';
});

// Validação de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de credenciais válidas
    if (username === 'admin' && password === '1234') {
        alert('Login bem-sucedido! Redirecionando...');
        window.location.href = 'home.html'; // Redireciona para a página home.html
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
});

// Cadastro de Cliente
document.getElementById('clienteForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const instagram = document.getElementById('instagram').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Cria um objeto cliente
    const cliente = {
        nome,
        dataNascimento,
        instagram,
        whatsapp
    };

    // Salva no localStorage (simulação de banco de dados)
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Cliente cadastrado com sucesso!');
    document.getElementById('clienteForm').reset(); // Limpa o formulário
});

// Exemplo de lista de clientes - em um cenário real, esses dados podem vir de uma API ou banco de dados
const clientes = [
    { nome: 'Maria Silva', email: 'maria@example.com' },
    { nome: 'João Pereira', email: 'joao@example.com' },
    { nome: 'Ana Costa', email: 'ana@example.com' },
    { nome: 'Carlos Oliveira', email: 'carlos@example.com' }
];

// Função para exibir os clientes na lista
function exibirClientes(lista) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = ''; // Limpar a lista antes de preencher novamente
    lista.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - ${cliente.email}`;
        listaClientes.appendChild(li);
    });
}

// Função de pesquisa que filtra os clientes
function filtrarClientes() {
    const pesquisa = document.getElementById('searchClient').value.toLowerCase(); // Texto digitado no campo de pesquisa
    const clientesFiltrados = clientes.filter(cliente => {
        return cliente.nome.toLowerCase().includes(pesquisa);
    });
    exibirClientes(clientesFiltrados);
}

// Inicializar a página exibindo todos os clientes
window.onload = function() {
    exibirClientes(clientes);
};


function filtrarClientes() {
    let input = document.getElementById("searchClient").value.toLowerCase();
    let listaClientes = document.getElementById("listaClientes");
    let clientes = listaClientes.getElementsByTagName("li");

    for (let i = 0; i < clientes.length; i++) {
        let nomeCliente = clientes[i].textContent || clientes[i].innerText;
        if (nomeCliente.toLowerCase().includes(input)) {
            clientes[i].style.display = "";
        } else {
            clientes[i].style.display = "none";
        }
    }
}


// Listar Clientes
function listarClientes() {
    const listaClientes = document.getElementById('listaClientes');
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    if (clientes.length === 0) {
        listaClientes.innerHTML = '<li>Nenhum cliente cadastrado.</li>';
    } else {
        listaClientes.innerHTML = clientes.map(cliente => `
            <li>
                <strong>${cliente.nome}</strong><br>
                WhatsApp: ${cliente.whatsapp}<br>
                Instagram: ${cliente.instagram || 'Não informado'}
                <button onclick="editarCliente('${cliente.nome}')">Editar</button>
                <button onclick="excluirCliente('${cliente.nome}')">Excluir</button>
            </li>
        `).join('');
    }

    // Atualizar estatísticas
    document.getElementById('totalClientes').textContent = clientes.length;
}

// Filtrar Clientes
document.getElementById('searchInput').addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.whatsapp.includes(termo) ||
        (cliente.instagram && cliente.instagram.toLowerCase().includes(termo))
    );

    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = clientesFiltrados.map(cliente => `
        <li>
            <strong>${cliente.nome}</strong><br>
            WhatsApp: ${cliente.whatsapp}<br>
            Instagram: ${cliente.instagram || 'Não informado'}
        </li>
    `).join('');
});

// Exportar Clientes para CSV
function exportarClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    if (clientes.length === 0) {
        alert('Nenhum cliente cadastrado para exportar.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Nome,WhatsApp,Instagram\n";
    clientes.forEach(cliente => {
        csvContent += `${cliente.nome},${cliente.whatsapp},${cliente.instagram || ''}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'clientes.csv');
    document.body.appendChild(link);
    link.click();
}

// Carregar lista de clientes ao abrir a página
document.addEventListener('DOMContentLoaded', listarClientes);



// Pré-visualizar a foto
function previewFoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('fotoPreview');
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Foto do Cliente">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

// Cadastro de Cliente
document.getElementById('clienteForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const instagram = document.getElementById('instagram').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const endereco = document.getElementById('endereco').value;
    const observacoes = document.getElementById('observacoes').value;
    const fotoInput = document.getElementById('foto');
    const foto = fotoInput.files[0] ? fotoInput.files[0] : null;

    // Converte a foto para Base64 (se existir)
    let fotoBase64 = null;
    if (foto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fotoBase64 = e.target.result;

            // Cria um objeto cliente
            const cliente = {
                nome,
                dataNascimento,
                instagram,
                whatsapp,
                endereco,
                observacoes,
                foto: fotoBase64
            };

            // Salva no localStorage (simulação de banco de dados)
            salvarCliente(cliente);
        };
        reader.readAsDataURL(foto);
    } else {
        // Cria um objeto cliente sem foto
        const cliente = {
            nome,
            dataNascimento,
            instagram,
            whatsapp,
            endereco,
            observacoes,
            foto: null
        };

        // Salva no localStorage (simulação de banco de dados)
        salvarCliente(cliente);
    }
});

function salvarCliente(cliente) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Cliente cadastrado com sucesso!');
    document.getElementById('clienteForm').reset(); // Limpa o formulário
    document.getElementById('fotoPreview').innerHTML = ''; // Limpa a pré-visualização da foto
}

// Listar Materiais
function listarMateriais() {
    const materiaisList = document.getElementById('materiaisList');
    const materiais = JSON.parse(localStorage.getItem('materiais')) || [];

    if (materiais.length === 0) {
        materiaisList.innerHTML = '<p>Nenhum material cadastrado.</p>';
    } else {
        materiaisList.innerHTML = materiais.map(material => `
            <div class="material-card">
                <img src="${material.foto}" alt="${material.nome}">
                <h3>${material.nome}</h3>
                <p>${material.descricao}</p>
                <p class="valor">R$ ${material.valor.toFixed(2)}</p>
            </div>
        `).join('');
    }
}

// Carregar lista de materiais ao abrir a página
document.addEventListener('DOMContentLoaded', listarMateriais);