console.log('START');
var linkElement = this.document.createElement('link');
linkElement.setAttribute('rel', 'stylesheet');
linkElement.setAttribute('type', 'text/css');
linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent('.debug-grid {display: none;pointer-events: none;position: fixed;top: 0;width: 100%;height: 100vh;z-index: 10000;opacity: 0.5;}.debug-grid .container {height: 100vh;}.debug-grid .container .row {height: 100%;}.debug-grid .container .row .debug-col {height: 100%;border-left: 1px solid black;}.debug-grid .container .row .debug-col:last-child {border-right: 1px solid black;}.debug-grid .container .row .debug-col .debug-col-inner {height: 100%; background-color: #d52810;}.debug-show {display: block !important;}'));
document.head.appendChild(linkElement);


/*
key     | task
----------------
d       | toggle debug-grid and debug-settings
g       | toggle grid
a       | toggle advanced button
esc     | hide debug-settings
*/

const breakpoints = {
    phone: 576,
    smallTablet: 768,
    tablet: 992,
    desktop: 1440
};

class Grid {
    constructor() {
        this.columns = this.calcColumns();
        this.hash = btoa(new Date().getMilliseconds().toString());
        this.container = document.createElement('div');

        addEventListener('keyup', this.toggle);
        addEventListener('resize', this.resize);
    }

    calcColumns = () => {
        const width = window.innerWidth;

        if (width > breakpoints.smallTablet) return 12;
        else return 6;
    };

    mount = () => {
        this.container.classList.add('debug-grid');
        this.container.setAttribute('debug-hash', this.hash);

        this.container.innerHTML = `
			<div class="container">
				<div class="row">
				</div>
			</div>
		`;

        document.querySelector('body').after(this.container);

        this.render();
    };

    resize = () => {
        if (this.columns !== this.calcColumns()) {
            this.columns = this.calcColumns();
            this.render();
        }
    };

    // KeyCode for 'G'
    toggle = ev => {
        if (ev.keyCode === 71) {
            try {
                document.querySelector(`[debug-hash="${this.hash}"]`).classList.toggle(`debug-show`);
            } catch {}
        }
    };

    render = () => {
        let HTML = '';

        for (let i = 0; i < this.columns; i++) {
            HTML += `
				<div class="debug-col col-${12 / this.columns} cell-${12 / this.columns}">
					<div class="debug-col-inner"></div>
				</div>
			`;
        }

        try {
            document.querySelector(`.debug-grid[debug-hash='${this.hash}'] .row`).innerHTML = HTML;
        } catch {}
    };
}
console.log(linkElement);
new Grid().mount();

console.log('END');
