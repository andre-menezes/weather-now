const { type } = require('@testing-library/user-event/dist/type');
const fetchMock = require('../mocks/fetch');

describe('Testing header', () => {
	beforeEach(() => cy.visit('/', {
		onBeforeLoad(win) {
			win.fetch = fetchMock;
		}
	}));

	it('Should have a header on page', () => {
		cy.get('[data-cy=weather-header]');
	});
	
	it('Should have a logo on header', () => {
		cy.get('[data-cy=weather-header]').children('img[alt="logo"]');
	});
	
	it('Should have the header fixed on top', () => {
		cy.get('[data-cy=weather-header]').should('have.css', 'position', 'fixed');
	})
});

describe('Testing weather cards', () => {
	beforeEach(() => cy.visit('/', {
		onBeforeLoad(win) {
			win.fetch = fetchMock;
		}
	}));

	it('Should have render 3 weather cards', () => {
		cy.get('.card').should('have.length', 3);
	});

	it('Should have a weather card of Nuuk/GL city', () => {
		cy.get('[data-cy=nuuk-card]').should('have.text', 'Nuuk, GL');
	});
	
	it('Should have a weather card of Urubici/BR city', () => {
		cy.get('[data-cy=urubici-card]').should('have.text', 'Urubici, BR');
	});
	
	it('Should have a weather card of Nairobi/KE city', () => {
		cy.get('[data-cy=nairobi-card]').should('have.text', 'Nairobi, KE');
	});

	it('Should have the humidity represented by "%"', () => {
		cy.get('[data-cy=humidity]').children('p').should('contain.text', 'Humidity');
		cy.get('[data-cy=humidity]').children('span').should('contain.text', '%');
	});

	it('Should have the pressure represented by "hPa"', () => {
		cy.get('[data-cy=pressure]').children('p').should('contain.text', 'Pressure');
		cy.get('[data-cy=pressure]').children('span').should('contain.text', 'hPa');
	});

	it('Should have a text contains a update time', () => {
		cy.get('[data-cy=updated-time]').should('contain.text', 'Updated at');
	});
});

describe('Testing Nuuk/GL weather card', () => {
	beforeEach(() => cy.visit('/', {
		onBeforeLoad(win) {
			win.fetch = fetchMock;
		}
	}));

	it('Should have a color #69A3FF if temperature less than or equal to 5ºC', () => {
		cy.get('[data-cy=low]').invoke('text').then(parseFloat).should('be.lte', 5);
		cy.get('[data-cy=low]').should('not.have.css', 'color', 'rgb(255, 150, 50)');
		cy.get('[data-cy=low]').should('not.have.css', 'color', 'rgb(237, 25, 70)');
		cy.get('[data-cy=low]').should('have.css', 'color', 'rgb(105, 163, 255)');
	});
});

describe('Testing Urubici/BR weather card', () => {
	beforeEach(() => cy.visit('/', {
		onBeforeLoad(win) {
			win.fetch = fetchMock;
		}
	}));

	it('Should have a color #FF9632 if temperature greater than 5ºC and less than or equal to 25ºC',
		() => {
			cy.get('[data-cy=medium]').invoke('text').then(parseFloat).should('be.gt', 5);
			cy.get('[data-cy=medium]').invoke('text').then(parseFloat).should('be.lte', 25);
			cy.get('[data-cy=medium]').should('have.css', 'color', 'rgb(255, 150, 50)');
			cy.get('[data-cy=medium]').should('not.have.css', 'color', 'rgb(237, 25, 70)');
			cy.get('[data-cy=medium]').should('not.have.css', 'color', 'rgb(105, 163, 255)');
		}
	);
});

describe('Testing Nairobi/KE weather card', () => {
	beforeEach(() => cy.visit('/', {
		onBeforeLoad(win) {
			win.fetch = fetchMock;
		}
	}));

	it('Should have a color #ED1946 if temperature greater than 25ºC', () => {
		cy.get('[data-cy=high]').invoke('text').then(parseFloat).should('be.gt', 25);
		cy.get('[data-cy=high]').should('not.have.css', 'color', 'rgb(255, 150, 50)');
		cy.get('[data-cy=high]').should('have.css', 'color', 'rgb(237, 25, 70)');
		cy.get('[data-cy=high]').should('not.have.css', 'color', 'rgb(105, 163, 255)');
	});
});