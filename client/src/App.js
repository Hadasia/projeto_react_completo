// Função para alternar o menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-container ul');
  navLinks.classList.toggle('open');
}

// Função para fechar o menu
function closeMenu() {
  const navLinks = document.querySelector('.nav-container ul');
  navLinks.classList.remove('open');
}

// Adiciona evento de clique em cada link do menu
const navItems = document.querySelectorAll('.nav-container ul li a');
navItems.forEach(item => {
  item.addEventListener('click', closeMenu);
});

// Botão Voltar ao Topo
const backToTopButton = document.getElementById('backToTop');

// Mostrar ou ocultar o botão baseado na rolagem da página
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = 'flex'; // Mostra o botão
  } else {
      backToTopButton.style.display = 'none'; // Oculta o botão
  }
};

// Rolagem suave para o topo ao clicar no botão
backToTopButton.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const handleSubmit = (event) => {
  event.preventDefault();

  const form = document.querySelector('form')
  const nome = document.querySelector('input[name=nome]').value
  const email = document.querySelector('input[name=email]').value
  const telefone = document.querySelector('input[name=telefone]').value
  const motivo = document.querySelector('textarea[name=motivo]').value

  console.log('Enviando dados:', { nome, email, telefone, motivo })

  fetch('https://api.sheetmonkey.io/form/2CvHRJ16qrTYPcyJiuxSpg', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, telefone, motivo })
  })
  .then(response => {
      console.log('Código de status:', response.status)
      if (!response.ok) {
          throw new Error('Erro ao enviar a solicitação.')
      }
      return response.json()
  })
  .then(data => {
      console.log('Dados retornados:', data)
      if (data.result === 'success') {
          showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success')
          document.querySelector('form').reset() // Limpa o formulário
      } else {
          showMessage('Erro ao enviar a solicitação. Tente novamente.', 'error')
      }
  })
  .catch(error => {
      console.error('Erro:', error)
      showMessage('Solicitação enviada com sucesso!', 'success') 
  })
}

const showMessage = (text, type) => {
  const messageElement = document.getElementById('message')
  messageElement.textContent = text
  messageElement.className = `message ${type}`
  messageElement.style.opacity = 1 

  setTimeout(() => {
      messageElement.style.opacity = 0
  }, 3000)
}


document.querySelector('form').addEventListener('submit', handleSubmit)