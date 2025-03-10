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

// Listar Materiais
function listarMateriais() {
    const materiaisList = document.getElementById('materiaisList');
    const materiais = JSON.parse(localStorage.getItem('materiais')) || [];

    if (materiais.length === 0) {
        materiaisList.innerHTML = '<p>Nenhum material cadastrado.</p>';
    } else {
        materiaisList.innerHTML = materiais.map((material, index) => `
            <div class="material-card">
                <img src="${material.foto}" alt="${material.nome}">
                <h3>${material.nome}</h3>
                <p>${material.descricao}</p>
                <p class="valor">R$ ${material.valor.toFixed(2)}</p>
                <div class="acoes">
                    <button class="editar-btn" onclick="editarMaterial(${index})">Editar</button>
                    <button class="excluir-btn" onclick="excluirMaterial(${index})">Excluir</button>
                </div>
            </div>
        `).join('');
    }
}

// Editar Material
function editarMaterial(index) {
    const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
    const material = materiais[index];

    // Redireciona para a página de cadastro com os dados do material
    localStorage.setItem('materialEditando', JSON.stringify({ index, ...material }));
    window.location.href = 'cadastro-material.html';
}

// Excluir Material
function excluirMaterial(index) {
    const confirmacao = confirm('Tem certeza que deseja excluir este material?');
    if (confirmacao) {
        const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
        materiais.splice(index, 1); // Remove o material do array
        localStorage.setItem('materiais', JSON.stringify(materiais));
        listarMateriais(); // Atualiza a lista de materiais
        alert('Material excluído com sucesso!');
    }
}

// Carregar lista de materiais ao abrir a página
document.addEventListener('DOMContentLoaded', listarMateriais);

// Carregar dados do material em edição (se existir)
document.addEventListener('DOMContentLoaded', function () {
    const materialEditando = JSON.parse(localStorage.getItem('materialEditando'));
    if (materialEditando) {
        document.getElementById('nome').value = materialEditando.nome;
        document.getElementById('descricao').value = materialEditando.descricao;
        document.getElementById('valor').value = materialEditando.valor;
        if (materialEditando.foto) {
            document.getElementById('fotoPreview').innerHTML = `<img src="${materialEditando.foto}" alt="Foto do Material">`;
        }
    }
});

// Cadastro/Edição de Material
document.getElementById('materialForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const fotoInput = document.getElementById('foto');
    const foto = fotoInput.files[0] ? fotoInput.files[0] : null;

    // Converte a foto para Base64 (se existir)
    let fotoBase64 = null;
    if (foto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fotoBase64 = e.target.result;
            salvarOuEditarMaterial(nome, descricao, valor, fotoBase64);
        };
        reader.readAsDataURL(foto);
    } else {
        salvarOuEditarMaterial(nome, descricao, valor, null);
    }
});

function salvarOuEditarMaterial(nome, descricao, valor, foto) {
    const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
    const materialEditando = JSON.parse(localStorage.getItem('materialEditando'));

    if (materialEditando) {
        // Editar material existente
        materiais[materialEditando.index] = { nome, descricao, valor, foto: foto || materialEditando.foto };
        localStorage.removeItem('materialEditando');
    } else {
        // Cadastrar novo material
        materiais.push({ nome, descricao, valor, foto });
    }

    localStorage.setItem('materiais', JSON.stringify(materiais));
    alert(materialEditando ? 'Material editado com sucesso!' : 'Material cadastrado com sucesso!');
    window.location.href = 'materiais.html';
}

// Dados de estoque (simulação)
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

// Carregar materiais disponíveis
const materiais = JSON.parse(localStorage.getItem('materiais')) || [];

// Função para carregar a lista de estoque
function carregarEstoque() {
    const estoqueList = document.getElementById('estoqueList');
    estoqueList.innerHTML = estoque.map((item, index) => `
        <tr>
            <td>${item.material}</td>
            <td>${item.quantidade}</td>
            <td class="acoes">
                <button class="editar-btn" onclick="abrirModalEditarItem(${index})">Editar</button>
                <button class="excluir-btn" onclick="excluirItemEstoque(${index})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Função para abrir o modal de adicionar item
function abrirModalAdicionarItem() {
    const modal = document.getElementById('modalEstoque');
    const modalTitulo = document.getElementById('modalTitulo');
    const materialSelect = document.getElementById('material');

    modalTitulo.textContent = 'Adicionar Item ao Estoque';
    materialSelect.innerHTML = materiais.map(material => `
        <option value="${material.nome}">${material.nome}</option>
    `).join('');

    document.getElementById('estoqueForm').reset();
    modal.style.display = 'flex';
}

// Função para abrir o modal de adicionar item
function abrirModalAdicionarItem() {
    const modal = document.getElementById('modalEstoque');
    const modalTitulo = document.getElementById('modalTitulo');
    const materialSelect = document.getElementById('material');

    // Definir o título do modal
    modalTitulo.textContent = 'Adicionar Item ao Estoque';

    // Carregar os materiais disponíveis no select
    const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
    materialSelect.innerHTML = materiais.map(material => `
        <option value="${material.nome}">${material.nome}</option>
    `).join('');

    // Limpar o formulário
    document.getElementById('estoqueForm').reset();

    // Exibir o modal
    modal.style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modalEstoque');
    modal.style.display = 'none';
}

// Função para salvar item no estoque (adicionar ou editar)
document.getElementById('estoqueForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const material = document.getElementById('material').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const modal = document.getElementById('modalEstoque');
    const index = modal.dataset.index;

    // Verificar se é uma edição ou adição
    if (index !== undefined) {
        // Editar item existente
        estoque[index] = { material, quantidade };
    } else {
        // Adicionar novo item
        estoque.push({ material, quantidade });
    }

    // Salvar no localStorage
    localStorage.setItem('estoque', JSON.stringify(estoque));

    // Atualizar a lista de estoque
    carregarEstoque();

    // Fechar o modal
    fecharModal();

    // Exibir mensagem de sucesso
    alert('Item salvo com sucesso!');
});

// Função para carregar a lista de estoque
function carregarEstoque() {
    const estoqueList = document.getElementById('estoqueList');
    estoqueList.innerHTML = estoque.map((item, index) => `
        <tr>
            <td>${item.material}</td>
            <td>${item.quantidade}</td>
            <td class="acoes">
                <button class="editar-btn" onclick="abrirModalEditarItem(${index})">Editar</button>
                <button class="excluir-btn" onclick="excluirItemEstoque(${index})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Função para abrir o modal de editar item
function abrirModalEditarItem(index) {
    const modal = document.getElementById('modalEstoque');
    const modalTitulo = document.getElementById('modalTitulo');
    const materialSelect = document.getElementById('material');

    // Definir o título do modal
    modalTitulo.textContent = 'Editar Item do Estoque';

    // Carregar os materiais disponíveis no select
    const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
    materialSelect.innerHTML = materiais.map(material => `
        <option value="${material.nome}">${material.nome}</option>
    `).join('');

    // Preencher o formulário com os dados do item
    const item = estoque[index];
    document.getElementById('material').value = item.material;
    document.getElementById('quantidade').value = item.quantidade;

    // Exibir o modal e salvar o índice do item sendo editado
    modal.style.display = 'flex';
    modal.dataset.index = index;
}

// Função para excluir item do estoque
function excluirItemEstoque(index) {
    const confirmacao = confirm('Tem certeza que deseja excluir este item do estoque?');
    if (confirmacao) {
        estoque.splice(index, 1);
        localStorage.setItem('estoque', JSON.stringify(estoque));
        carregarEstoque();
        alert('Item excluído com sucesso!');
    }
}

// Dados de atendimentos (simulação)
let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];

// Função para carregar sugestões de clientes
function carregarSugestoesClientes() {
    const clienteInput = document.getElementById('cliente');
    const sugestoesClientes = document.getElementById('sugestoesClientes');
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clienteInput.addEventListener('input', function () {
        const termo = this.value.toLowerCase();
        const clientesFiltrados = clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(termo)
        );

        sugestoesClientes.innerHTML = clientesFiltrados.map(cliente => `
            <div onclick="selecionarCliente('${cliente.nome}')">${cliente.nome}</div>
        `).join('');
    });
}

// Função para selecionar um cliente nas sugestões
function selecionarCliente(nome) {
    document.getElementById('cliente').value = nome;
    document.getElementById('sugestoesClientes').innerHTML = '';
}

// Função para registrar um novo atendimento
document.getElementById('atendimentoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value;
    const dataAtendimento = document.getElementById('dataAtendimento').value;
    const procedimento = document.getElementById('procedimento').value;
    const valorPago = parseFloat(document.getElementById('valorPago').value);
    const joiaUtilizada = document.getElementById('joiaUtilizada').value;
    const observacoes = document.getElementById('observacoes').value;

    // Criar um objeto de atendimento
    const atendimento = {
        cliente,
        dataAtendimento,
        procedimento,
        valorPago,
        joiaUtilizada,
        observacoes
    };

    // Salvar no localStorage
    atendimentos.push(atendimento);
    localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

    // Limpar o formulário
    document.getElementById('atendimentoForm').reset();

    // Atualizar a lista de atendimentos e estatísticas
    carregarAtendimentos();
    atualizarEstatisticas();

    // Exibir mensagem de sucesso
    alert('Atendimento registrado com sucesso!');
});

// Função para carregar o histórico de atendimentos
function carregarAtendimentos() {
    const listaAtendimentos = document.getElementById('listaAtendimentos');
    listaAtendimentos.innerHTML = atendimentos.map((atendimento, index) => `
        <tr>
            <td>${atendimento.dataAtendimento}</td>
            <td>${atendimento.cliente}</td>
            <td>${atendimento.procedimento}</td>
            <td>R$ ${atendimento.valorPago.toFixed(2)}</td>
            <td>${atendimento.joiaUtilizada}</td>
            <td>${atendimento.observacoes}</td>
            <td>
                <button class="editar-btn" onclick="editarAtendimento(${index})"><i class="fas fa-edit"></i></button>
                <button class="excluir-btn" onclick="excluirAtendimento(${index})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Função para editar um atendimento
function editarAtendimento(index) {
    const atendimento = atendimentos[index];
    document.getElementById('cliente').value = atendimento.cliente;
    document.getElementById('dataAtendimento').value = atendimento.dataAtendimento;
    document.getElementById('procedimento').value = atendimento.procedimento;
    document.getElementById('valorPago').value = atendimento.valorPago;
    document.getElementById('joiaUtilizada').value = atendimento.joiaUtilizada;
    document.getElementById('observacoes').value = atendimento.observacoes;

    // Remover o atendimento da lista
    atendimentos.splice(index, 1);
    localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

    // Atualizar a lista de atendimentos e estatísticas
    carregarAtendimentos();
    atualizarEstatisticas();
}

// Função para excluir um atendimento
function excluirAtendimento(index) {
    const confirmacao = confirm('Tem certeza que deseja excluir este atendimento?');
    if (confirmacao) {
        atendimentos.splice(index, 1);
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        carregarAtendimentos();
        atualizarEstatisticas();
        alert('Atendimento excluído com sucesso!');
    }
}

// Função para filtrar atendimentos
function filtrarAtendimentos() {
    const filtroCliente = document.getElementById('filtroCliente').value.toLowerCase();
    const filtroDataInicio = document.getElementById('filtroDataInicio').value;
    const filtroDataFim = document.getElementById('filtroDataFim').value;

    const atendimentosFiltrados = atendimentos.filter(atendimento => {
        const clienteMatch = atendimento.cliente.toLowerCase().includes(filtroCliente);
        const dataMatch = (!filtroDataInicio || atendimento.dataAtendimento >= filtroDataInicio) &&
                          (!filtroDataFim || atendimento.dataAtendimento <= filtroDataFim);
        return clienteMatch && dataMatch;
    });

    const listaAtendimentos = document.getElementById('listaAtendimentos');
    listaAtendimentos.innerHTML = atendimentosFiltrados.map((atendimento, index) => `
        <tr>
            <td>${atendimento.dataAtendimento}</td>
            <td>${atendimento.cliente}</td>
            <td>${atendimento.procedimento}</td>
            <td>R$ ${atendimento.valorPago.toFixed(2)}</td>
            <td>${atendimento.joiaUtilizada}</td>
            <td>${atendimento.observacoes}</td>
            <td>
                <button class="editar-btn" onclick="editarAtendimento(${index})"><i class="fas fa-edit"></i></button>
                <button class="excluir-btn" onclick="excluirAtendimento(${index})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

// Função para exportar atendimentos para CSV
function exportarAtendimentos() {
    let csvContent = "data:text/csv;charset=utf-8,Data,Cliente,Procedimento,Valor Pago,Jóia Utilizada,Observações\n";
    atendimentos.forEach(atendimento => {
        csvContent += `${atendimento.dataAtendimento},${atendimento.cliente},${atendimento.procedimento},${atendimento.valorPago},${atendimento.joiaUtilizada},${atendimento.observacoes}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'atendimentos.csv');
    document.body.appendChild(link);
    link.click();
}

// Função para atualizar estatísticas
function atualizarEstatisticas() {
    const totalAtendimentos = atendimentos.length;
    const valorTotalRecebido = atendimentos.reduce((total, atendimento) => total + atendimento.valorPago, 0);

    document.getElementById('totalAtendimentos').textContent = totalAtendimentos;
    document.getElementById('valorTotalRecebido').textContent = valorTotalRecebido.toFixed(2);
}

// Carregar dados ao abrir a página
document.addEventListener('DOMContentLoaded', function () {
    carregarSugestoesClientes();
    carregarAtendimentos();
    atualizarEstatisticas();
});

// Dados de exemplo (substitua pelos dados reais do sistema)
const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
const atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];

// Atualizar cards de informações
function atualizarCards() {
    // Total de clientes
    document.getElementById('totalClientes').textContent = clientes.length;

    // Total de materiais
    document.getElementById('totalMateriais').textContent = materiais.length;

    // Valor total dos atendimentos no mês
    const hoje = new Date();
    const atendimentosMes = atendimentos.filter(atendimento => {
        const dataAtendimento = new Date(atendimento.dataAtendimento);
        return dataAtendimento.getMonth() === hoje.getMonth() && dataAtendimento.getFullYear() === hoje.getFullYear();
    });
    const valorTotal = atendimentosMes.reduce((total, atendimento) => total + atendimento.valorPago, 0);
    document.getElementById('valorAtendimentos').textContent = `R$ ${valorTotal.toFixed(2)}`;

    // Próximos aniversários
    const aniversarios = clientes.map(cliente => {
        const dataNascimento = new Date(cliente.dataNascimento);
        return {
            nome: cliente.nome,
            dia: dataNascimento.getDate(),
            mes: dataNascimento.getMonth() + 1
        };
    }).filter(cliente => cliente.mes === hoje.getMonth() + 1 && cliente.dia >= hoje.getDate())
      .sort((a, b) => a.dia - b.dia);

    const listaAniversarios = document.getElementById('proximosAniversarios');
    listaAniversarios.innerHTML = aniversarios.map(cliente => `
        <li>${cliente.nome} - ${cliente.dia}/${cliente.mes}</li>
    `).join('');
}

// Gráfico de atendimentos por mês
function criarGraficoAtendimentos() {
    const ctx = document.getElementById('graficoAtendimentos').getContext('2d');
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const dados = meses.map((mes, index) => {
        return atendimentos.filter(atendimento => {
            const data = new Date(atendimento.dataAtendimento);
            return data.getMonth() === index;
        }).length;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: 'Atendimentos',
                data: dados,
                backgroundColor: '#f39c12',
                borderColor: '#e67e22',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Gráfico de materiais mais utilizados
function criarGraficoMateriais() {
    const ctx = document.getElementById('graficoMateriais').getContext('2d');
    const materiaisUtilizados = {};

    atendimentos.forEach(atendimento => {
        if (materiaisUtilizados[atendimento.joiaUtilizada]) {
            materiaisUtilizados[atendimento.joiaUtilizada]++;
        } else {
            materiaisUtilizados[atendimento.joiaUtilizada] = 1;
        }
    });

    const labels = Object.keys(materiaisUtilizados);
    const dados = Object.values(materiaisUtilizados);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Materiais Utilizados',
                data: dados,
                backgroundColor: [
                    '#f39c12', '#e67e22', '#d35400', '#e74c3c', '#c0392b', '#9b59b6', '#8e44ad'
                ]
            }]
        }
    });
}

// Carregar dados ao abrir a página
document.addEventListener('DOMContentLoaded', function () {
    atualizarCards();
    criarGraficoAtendimentos();
    criarGraficoMateriais();
});