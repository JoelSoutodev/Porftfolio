// ========= MOSTRAR MENU ===========
const navMenu = document.getElementById('nav-menu') // ARMAZENA
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

/* MOSTRA MENU */
if(navToggle){ // VALIDA SE A CONSTANTE EXISTE
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu') // CRIA UMA NOVA CLASSE SHOW-MENU
    })
}

/* ESCONDE MENU */
if(navClose){ // VALIDA SE A CONSTANTE EXISTE
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu') // REMOVE A CLASSE SHOW-MENU
    })
}
// ============= REMOVER AO CLICAR EM UM LINK ==================
const navLink = document.querySelectorAll('.nav__link') // ARMAZENA

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // Quando clicamos em cada nav__link, removemos a classe show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction)) /* forEach PERCORRE TODOS OS ELEMENTOS DENTRO DE UM 
ELEMENTO E QUANDO FOR CLICADO ELE CHAMA A FUNCAO LINKACTION*/



/*======================== ENVIO DO EMAIL ==============================*/
const contactForm = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault() // impede o envio tradicional do formulário

    // serviceID - templateID - #form - publicKey

    emailjs.sendForm('service_kbuw42b','template_ffo7xdf','#contact-form','cTA8w4Dmwmd1NMSgW')
    .then(() => {
        //mensagem de sucesso
        contactMessage.textContent = 'Mensagem enviada com sucesso !!! ✅'

        //mensagem remover depois de cinco segundos
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 5000)

        // limpa inputs
        contactForm.reset()
    }, () => {
        // mensagem de erro
        contactMessage.textContent = 'mensagem não enviada (erro de serviço) ❌'
    })
}

contactForm.addEventListener('submit', sendEmail)


// ====================== link ativado ======================
const secoes = document.querySelectorAll('section[id]') // Pega todas as sections com id

const ativarScroll = () => {
  	const rolagemY = window.scrollY // Guarda quantos pixels a página foi rolada

	secoes.forEach(secaoAtual => { // Percorre todas as sections que têm id
		const alturaSecao = secaoAtual.offsetHeight, // Pega a altura da seção
			  topoSecao = secaoAtual.offsetTop - 58, // Ponto onde a seção começa menos 58px do header
			  idSecao = secaoAtual.getAttribute('id'),  // Pega o id da seção
			  linkMenu = document.querySelector('.nav__menu a[href*=' + idSecao + ']') // Encontra o link do menu correspondente

		if(rolagemY > topoSecao && rolagemY <= topoSecao + alturaSecao){ // Verifica se o scroll está dentro da seção
			linkMenu.classList.add('active-link') // Adiciona a classe se estiver visível
		}else{
			linkMenu.classList.remove('active-link') // Remove a classe se não estiver visível
		}                                                    
	})
}
window.addEventListener('scroll', ativarScroll)


/*===================== MUDANÇA DE TEMA =======================*/
const botaoTema = document.getElementById('theme-button') // ARMAZENA O BOTÃO
const temaEscuroClasse = 'dark-theme' // ARMAZENA O NOME DA CLASSE PARA ATIVAR O MODO ESCURO
const iconeSolClasse = 'ri-sun-line' // ARMAZENA O NOME DA CLASSE PARA TROCAR O ÍCONE

// Verifica o tema salvo anteriormente pelo usuário (se houver)
const temaSelecionado = localStorage.getItem('tema-selecionado')
const iconeSelecionado = localStorage.getItem('icone-selecionado')

// VERIFICA SE CLASSE TEMA ESCURO A CLASSE DARK-THEME ESTÁ PRESENTE NO BODY SE SIM O TEMA ATUALMENTE ESTÁ ESCURO SENÃO ESTÁ CLARO
const obterTemaAtual = () => document.body.classList.contains(temaEscuroClasse) ? 'escuro' : 'claro'
// MESMA COISA DO TEMA SE HOUVER A CLASSE RI-MOON-LINE ESTÁ CLARO COM ÍCONE DA LUA SENÃO ESCURO COM ÍCONE DO SOL
const obterIconeAtual = () => botaoTema.classList.contains(iconeSolClasse) ? 'ri-moon-line' : 'ri-sun-line'

// Se o usuário já tinha escolhido um tema antes, aplica ao carregar a página
if (temaSelecionado) {
  document.body.classList[temaSelecionado === 'escuro' ? 'add' : 'remove'](temaEscuroClasse) 
  botaoTema.classList[iconeSelecionado === 'ri-moon-line' ? 'add' : 'remove'](iconeSolClasse)
}

// Ativar/desativar manualmente o modo escuro ao clicar no botão
botaoTema.addEventListener('click', () => {
  // Alterna entre claro e escuro
  document.body.classList.toggle(temaEscuroClasse)
  botaoTema.classList.toggle(iconeSolClasse)
  
  // Salva a escolha do usuário no navegador
  localStorage.setItem('tema-selecionado', obterTemaAtual())
  localStorage.setItem('icone-selecionado', obterIconeAtual())
})
