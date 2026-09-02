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

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

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
