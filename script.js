document.addEventListener("DOMContentLoaded", () => {
    // Verificação de Segurança
    if (typeof siteConfig === 'undefined') {
        console.error("Erro: dados.js não carregado.");
        return;
    }

    // 1. CARREGAR MÍDIA E DADOS BÁSICOS (IMAGENS DE FUNDO)
    carregarDadosBasicos();

    // 2. GERAR CARROSSEL DE RESULTADOS (COM SEO OTIMIZADO NAS IMAGENS)
    gerarCarrosselResultados();
    
    // 3. GERAR CARROSSEL ESTRUTURA
    gerarCarrosselEstrutura();
});

// --- FUNÇÕES DE CARREGAMENTO ---

function carregarDadosBasicos() {
    // Vídeo
    if(siteConfig.videoInstitucional?.trim()) {
        const vid = document.getElementById('video-institucional');
        if(vid) {
            vid.src = siteConfig.videoInstitucional;
            document.getElementById('video-placeholder').style.display = 'none';
        }
    }

    // Logo
    if (siteConfig.logo?.trim()) {
        const imgLogo = document.getElementById('logo-img');
        if(imgLogo) {
            imgLogo.src = siteConfig.logo;
            imgLogo.classList.remove('hidden');
        }
    } else {
        const txtLogo = document.getElementById('logo-text');
        if(txtLogo) txtLogo.classList.remove('hidden');
    }

    // Banner & Imagens Fundo
    if (siteConfig.bannerPrincipal) {
        const hero = document.getElementById('banner-hero');
        if(hero) hero.style.backgroundImage = `url('${siteConfig.bannerPrincipal}')`;
    }
    if (siteConfig.quemSomos) {
        const imgQuemSomos = document.getElementById('img-quemsomos');
        if(imgQuemSomos) imgQuemSomos.src = siteConfig.quemSomos;
    }

    // Tratamentos (Backgrounds dos Cards)
    for(let i=1; i<=9; i++) {
        const el = document.getElementById(`trat-${i}`);
        if (el && siteConfig[`tratamento${i}`]) {
            el.style.backgroundImage = `url('${siteConfig[`tratamento${i}`]}')`;
        }
    }

    // Links (Instagram e Maps)
    if(siteConfig.instagram) {
        const linkInsta = document.getElementById('link-instagram');
        const txtInsta = document.getElementById('txt-instagram');
        if(linkInsta) linkInsta.href = `https://instagram.com/${siteConfig.instagram.replace('@','')}`;
        if(txtInsta) txtInsta.innerText = siteConfig.instagram;
    }

    // ATUALIZAÇÃO DOS MAPAS AQUI:
    const u1 = document.getElementById('link-unidade1');
    const u2 = document.getElementById('link-unidade2');
    
    // Agora ele pega o link correto que você colocou no dados.js
    if(u1) u1.href = siteConfig.mapaUnidade1 || "https://maps.google.com";
    if(u2) u2.href = siteConfig.mapaUnidade2 || "https://maps.google.com";
}

function gerarCarrosselEstrutura() {
    const container = document.getElementById('carousel-structure');
    if(!container) return;
    
    let htmlContent = '';
    
    // Legendas atualizadas na ordem das fotos
    const labels = [
        "Consultório Lavanda Tatuapé",          // consultoriot1
        "Consultório Macadamia Tatuapé",       // consultoriot2
        "Recepção Tatuapé",                    // recepcaot1
        "Spa Capilar Geranio Tatuapé",         // spat1
        "Spa Capilar Geranio Tatuapé",         // spat2
        "Spa Capilar Jasmim Tatuapé",          // spat3
        "Sala Médica Bergamota Tatuapé",       // sala medica1
        "Sala Médica Palma Rosa Tatuapé",      // sala medica2
        "Lounge Tatuapé",                      // lounget1
        "Lounge Tatuapé",                      // lounget2
        "Recepção Santana",                    // recepcaos1
        "Consultório Lavanda Santana",         // consultorios1
        "Spa Capilar Capim Limão Santana",     // spas1
        "Spa Capilar Capim Limão Santana"      // spas2
    ];
    
    // Loop aumentado para 14
    for(let i=1; i<=14; i++) {
        if (siteConfig[`estrutura${i}`]) {
             htmlContent += `
             <div class="snap-center shrink-0 w-[80vw] md:w-[350px] h-[250px] rounded-sm overflow-hidden relative group">
                <img src="${siteConfig[`estrutura${i}`]}" width="450" height="300" loading="lazy" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Estrutura TricoMaster - ${labels[i-1]}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div class="absolute bottom-4 left-4 text-white font-serif tracking-wide text-sm md:text-base">${labels[i-1] || 'Ambiente TricoMaster'}</div>
            </div>`;
        }
    }
    container.innerHTML = htmlContent;
}

// === AQUI ESTÁ A OTIMIZAÇÃO DE SEO (ALT TEXT) ===
function gerarCarrosselResultados() {
    const container = document.getElementById('carousel-results');
    if(!container) return;

    let htmlContent = '';

    for (let i = 1; i <= 14; i++) {
        if(siteConfig[`caso${i}_antes`] && siteConfig[`caso${i}_depois`]) {
            htmlContent += `
            <div class="snap-center shrink-0 w-[90vw] md:w-[600px] bg-stone-50 rounded-sm border border-stone-100 p-4">
                <div class="flex flex-col md:flex-row gap-2 h-auto md:h-[300px]">
                    <div class="w-full md:w-1/2 h-[250px] md:h-full relative group overflow-hidden cursor-zoom-in" onclick="abrirModalImagem(this.querySelector('img').src)">
                        <img src="${siteConfig[`caso${i}_antes`]}" loading="lazy" class="w-full h-full object-cover rounded-sm transition duration-500 group-hover:scale-105" 
                             alt="Antes do Tratamento Capilar na TricoMaster - Paciente ${i}"> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100"><i class="ph-fill ph-magnifying-glass-plus text-white text-3xl drop-shadow-md"></i></div>
                        <div class="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">ANTES</div>
                    </div>
                    <div class="w-full md:w-1/2 h-[250px] md:h-full relative group overflow-hidden cursor-zoom-in" onclick="abrirModalImagem(this.querySelector('img').src)">
                        <img src="${siteConfig[`caso${i}_depois`]}" loading="lazy" class="w-full h-full object-cover rounded-sm transition duration-500 group-hover:scale-105" 
                             alt="Resultado Transplante Capilar FUE TricoMaster - Paciente ${i}"> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100"><i class="ph-fill ph-magnifying-glass-plus text-white text-3xl drop-shadow-md"></i></div>
                        <div class="absolute bottom-2 left-2 bg-tricoGold text-tricoDark font-bold text-xs px-2 py-1 rounded">DEPOIS</div>
                    </div>
                </div>
                <div class="mt-4">
                    <h4 class="font-serif font-bold text-tricoDark">Caso #${i}</h4>
                    <p class="text-sm text-stone-500">Resultado do Paciente.</p>
                </div>
            </div>`;
        }
    }
    container.innerHTML = htmlContent;
}

// --- INTERAÇÕES (MODAIS E MENUS) ---

function abrirModalTratamento(id) {
    let element;
    if (typeof id === 'number') {
        const bgDiv = document.getElementById(`trat-${id}`);
        element = bgDiv.parentElement; 
    } else {
        element = id; 
    }

    const title = element.getAttribute('data-title');
    const descText = element.getAttribute('data-description');
    
    const bgId = element.querySelector('[id^="trat-"]').id; 
    const numId = bgId.split('-')[1];
    const imgSrc = siteConfig[`tratamento${numId}`];

    const modal = document.getElementById('modalTratamento');
    const img = document.getElementById('modal-img');
    const tituloEl = document.getElementById('modal-titulo');
    const descEl = document.getElementById('modal-desc');

    img.src = imgSrc;
    img.alt = `Tratamento de ${title} na TricoMaster`;
    tituloEl.innerText = title;
    
    // AQUI ESTÁ A MUDANÇA IMPORTANTE (de innerText para innerHTML):
    descEl.innerHTML = descText;

    modal.classList.remove('hidden');
}

function abrirModalProtocolo(element) {
    const modal = document.getElementById('modalTratamento');
    const img = document.getElementById('modal-img');
    const titulo = document.getElementById('modal-titulo');
    const desc = document.getElementById('modal-desc');

    const title = element.getAttribute('data-title');
    const descText = element.getAttribute('data-desc');
    const id = element.getAttribute('data-id'); 
    
    const imgSrc = siteConfig[`protocolo${id}_img`] || siteConfig.bannerPrincipal; 
    
    img.src = imgSrc;
    img.alt = `Protocolo ${title} TricoMaster`;
    titulo.innerText = title;
    desc.innerText = descText;

    modal.classList.remove('hidden');
}

function fecharModalTratamento() {
    document.getElementById('modalTratamento').classList.add('hidden');
}

function abrirModalImagem(src) {
    const modal = document.getElementById('modalImagem');
    const img = document.getElementById('img-zoom');
    img.src = src;
    modal.classList.remove('hidden');
}

function fecharModalImagem() {
    document.getElementById('modalImagem').classList.add('hidden');
}

function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    container.scrollBy({ left: direction * 320, behavior: 'smooth' });
}

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('translate-x-full');
    menu.classList.toggle('translate-x-0');
}

window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-tricoDark/80', 'backdrop-blur-lg', 'shadow-lg', 'py-3');
        nav.classList.remove('py-6', 'border-b', 'border-white/10');
    } else {
        nav.classList.remove('bg-tricoDark/80', 'backdrop-blur-lg', 'shadow-lg', 'py-3');
        nav.classList.add('py-6', 'border-b', 'border-white/10');
    }
});

function irWhatsApp(e) {
    e.preventDefault();
    const num = (typeof siteConfig !== 'undefined' && siteConfig.whatsapp) ? siteConfig.whatsapp : "5511999999999";
    window.open(`https://wa.me/${num}`, '_blank');
}

function enviarParaWhatsApp(e) {
    e.preventDefault();
    
    // Captura os dados básicos
    const nome = document.getElementById('nome').value;
    const telefoneRaw = document.getElementById('telefone').value;
    
    // Captura as opções marcadas (checkboxes)
    const checkboxes = document.querySelectorAll('input[name="queixa"]:checked');
    let queixasSelecionadas = [];
    checkboxes.forEach((checkbox) => {
        queixasSelecionadas.push(checkbox.value);
    });

    // Se nenhuma for marcada, define um texto padrão
    const queixaTexto = queixasSelecionadas.length > 0 ? queixasSelecionadas.join(', ') : "Não informada";

    const num = (typeof siteConfig !== 'undefined' && siteConfig.whatsapp) ? siteConfig.whatsapp : "5511999999999";
    
    const telefoneLimpo = telefoneRaw.replace(/\D/g, ''); 
    if (telefoneLimpo.length < 10) {
        alert("Por favor, digite um telefone válido com DDD.");
        return;
    }

    try {
        if (typeof gtag !== 'undefined') gtag('event', 'conversion', {'send_to': 'AW-996333294'});
        if (typeof fbq !== 'undefined') fbq('track', 'Contact');
    } catch (err) { console.log(err); }

    // Monta a mensagem formatada
    const texto = `*Olá, vim pelo LP TricoMaster!*%0A%0A*Nome:* ${nome}%0A*Telefone:* ${telefoneRaw}%0A*Queixa Principal:* ${queixaTexto}%0A%0AGostaria de maiores informações.`;
    
    setTimeout(() => {
        window.open(`https://wa.me/${num}?text=${texto}`, '_blank');
    }, 300);
}

const inputTelefone = document.getElementById('telefone');
if(inputTelefone) {
    inputTelefone.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}
// --- LÓGICA DO CARROSSEL DO HEADER (2 SLIDES) ---
let currentSlide = 0;
const totalSlides = 2; // Ajustado para 2 fotos

function updateSlider() {
    const container = document.getElementById('slider-container');
    const dots = document.querySelectorAll('#hero-slider .rounded-full');
    
    if (container && dots.length > 0) {
        // Desloca o container lateralmente
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualiza a opacidade das bolinhas indicadoras
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-white/50');
                dot.classList.remove('bg-white/20');
            } else {
                dot.classList.add('bg-white/20');
                dot.classList.remove('bg-white/50');
            }
        });
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function autoPlaySlider() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

// Troca de slide a cada 8 segundos
setInterval(autoPlaySlider, 5000);