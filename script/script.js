const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
	menuToggle.addEventListener('click', () => {
		const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', String(!isOpen));
		menuToggle.querySelector('b').textContent = isOpen ? 'Abrir menu' : 'Fechar menu';
		mainNav.classList.toggle('is-open', !isOpen);
	});

	mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.querySelector('b').textContent = 'Abrir menu';
		mainNav.classList.remove('is-open');
	}));
}

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
	element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`);
	revealObserver.observe(element);
});

document.querySelectorAll('main > section').forEach((section, index) => {
	section.classList.add('section-reveal');
	section.style.setProperty('--section-delay', `${Math.min(index * 35, 140)}ms`);
	revealObserver.observe(section);
});

const serviceTrack = document.querySelector('.service-track');
const serviceImageData = [
	['assets/images/portifolio/Unhas1.jpg', 'Unhas em gel realizadas no studio', 'Unhas em gel', 'Alongamento e acabamento em gel para valorizar suas mãos.'],
	['assets/images/portifolio/Unhas2.jpg', 'Unhas em gel realizadas no studio', 'Unhas em gel', 'Estrutura, resistência e acabamento pensados para você.'],
	['assets/images/portifolio/Sobrancelha.jpg', 'Cílios realizados no studio', 'Cílios', 'Alongamento e cuidado para realçar o olhar com delicadeza.'],
	['assets/images/portifolio/Cabelo.jpg', 'Cabelo feito no studio', 'Cabelo feito', 'Cuidados e finalizações para valorizar sua beleza.']
];

if (serviceTrack) {
	const existingSlides = [...serviceTrack.querySelectorAll('.service-slide')];
	existingSlides.forEach((slide, index) => {
		const image = document.createElement('img');
		image.src = serviceImageData[index][0];
		image.alt = serviceImageData[index][1];
		slide.querySelector('.service-visual').replaceChildren(image);
		slide.querySelector('h3').textContent = serviceImageData[index][2];
		slide.querySelector('p').textContent = serviceImageData[index][3];
		slide.setAttribute('aria-label', `${index + 1} de 4`);
	});

	const hairSlide = existingSlides[2].cloneNode(true);
	hairSlide.classList.remove('is-active');
	hairSlide.setAttribute('aria-label', '4 de 4');
	hairSlide.querySelector('.service-number').textContent = '04';
	hairSlide.querySelector('h3').textContent = 'Cabelo';
	hairSlide.querySelector('p').textContent = serviceImageData[3][3];
	const hairImage = hairSlide.querySelector('.service-visual img');
	hairImage.src = serviceImageData[3][0];
	hairImage.alt = serviceImageData[3][1];
	serviceTrack.appendChild(hairSlide);

	const carouselDotsContainer = document.querySelector('.carousel-dots');
	const thirdDot = carouselDotsContainer?.querySelectorAll('.carousel-dot')[2];
	if (carouselDotsContainer && thirdDot) {
		const fourthDot = thirdDot.cloneNode(true);
		fourthDot.classList.remove('is-active');
		fourthDot.setAttribute('aria-selected', 'false');
		fourthDot.setAttribute('aria-label', 'Ver serviço 4');
		carouselDotsContainer.appendChild(fourthDot);
	}
}

const serviceSlides = document.querySelectorAll('.service-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
const previousButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let activeService = 0;

const showService = (index) => {
	activeService = (index + serviceSlides.length) % serviceSlides.length;
	serviceSlides.forEach((slide, slideIndex) => {
		const isActive = slideIndex === activeService;
		slide.classList.toggle('is-active', isActive);
		slide.setAttribute('aria-hidden', String(!isActive));
	});
	carouselDots.forEach((dot, dotIndex) => {
		const isActive = dotIndex === activeService;
		dot.classList.toggle('is-active', isActive);
		dot.setAttribute('aria-selected', String(isActive));
	});
};

if (serviceSlides.length) {
	previousButton.addEventListener('click', () => showService(activeService - 1));
	nextButton.addEventListener('click', () => showService(activeService + 1));
	carouselDots.forEach((dot, dotIndex) => dot.addEventListener('click', () => showService(dotIndex)));
}

const portfolioImageData = [
	['assets/images/portifolio/Port1.jpg', 'Trabalho completo de cabelo, cílios e sobrancelhas realizado no studio', 'Cabelo, cílios e sobrancelhas'],
	['assets/images/portifolio/Port2.jpg', 'Extensão de cílios realizada no studio', 'Extensão de cílios']
];

document.querySelectorAll('.portfolio-card').forEach((card, index) => {
	if (!portfolioImageData[index]) {
		card.remove();
		return;
	}
	const art = card.querySelector('.art');
	const oldImage = art.querySelector('img');
	const imageData = portfolioImageData[index];
	if (!art || !imageData) return;
	if (oldImage) oldImage.remove();
	const image = document.createElement('img');
	image.src = imageData[0];
	image.alt = imageData[1];
	art.prepend(image);
	const label = art.querySelector('span');
	if (label) label.textContent = `0${index + 1} · trabalho realizado`;
	const caption = card.querySelector('figcaption');
	if (caption) caption.firstChild.textContent = `${imageData[2]} `;
});
