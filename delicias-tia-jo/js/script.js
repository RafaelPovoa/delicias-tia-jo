/* ============================================
   DELÍCIAS DA TIA JÔ - Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== Atualiza o ano no rodapé ===== */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ===== Navbar com efeito ao rolar ===== */
    const navbar = document.getElementById('mainNav');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* ===== Botão voltar ao topo ===== */
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ===== Fechar menu ao clicar em link (mobile) ===== */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-brand');
    const navCollapse = document.getElementById('navbarMenu');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navCollapse).hide();
            }
        });
    });

    /* ===== Filtro de produtos ===== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            productItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => item.classList.add('hide'), 300);
                }
            });
        });
    });

    /* ===== Máscara simples para telefone ===== */
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d{0,2}).*/, '($1');
            }
            e.target.value = value;
        });
    }

    /* ===== Validação e envio do formulário via WhatsApp ===== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const produto = document.getElementById('produto').value;
            const data = document.getElementById('data').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            let texto = `*Olá Tia Jô!* Gostaria de fazer um orçamento. \n\n`;
            texto += `*Nome:* ${nome}\n`;
            texto += `*Telefone:* ${telefone}\n`;
            if (email) texto += `*E-mail:* ${email}\n`;
            if (produto) texto += `*Produto de interesse:* ${produto}\n`;
            if (data) {
                const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
                texto += `*Data desejada:* ${dataFormatada}\n`;
            }
            texto += `\n*Mensagem:*\n${mensagem}`;

            const url = `https://wa.me/5527997602442?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');

            this.reset();
            this.classList.remove('was-validated');

            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.innerHTML = '<i class="bi bi-check-circle-fill"></i> Você será redirecionado para o WhatsApp. Obrigado!';
            this.appendChild(successAlert);
            setTimeout(() => successAlert.remove(), 5000);
        });
    }

    /* ===== Animação ao rolar (fade-in dos elementos) ===== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.product-card, .stat-card, .gallery-item, .testimonial-card, .info-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* ===== Define data mínima do campo de data como hoje ===== */
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', hoje);
    }
});
