class MyHeader extends HTMLElement {
    connectedCallback() {
       

        this.innerHTML = 
        `
        <header>
            Acá va el header
        </header>

        `
       
    }
}
customElements.define('my-header', MyHeader)

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <footer>
            Acá va el footer
        </footer>
        `
        

    }
}

customElements.define('my-footer', MyFooter)
