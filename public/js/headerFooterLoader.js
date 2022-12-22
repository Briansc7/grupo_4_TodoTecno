class MyHeader extends HTMLElement {
    connectedCallback() {
        var client = new XMLHttpRequest();
        var target = this;
        client.open('GET', '/header');
        client.onreadystatechange = function() {
          target.innerHTML = client.responseText;
          
        }
        client.send();       
    }
}
customElements.define('my-header', MyHeader)



class MyFooter extends HTMLElement {
    connectedCallback() {
        var client = new XMLHttpRequest();
        var target = this;
        client.open('GET', '/footer');
        client.onreadystatechange = function() {
          target.innerHTML = client.responseText;
          
        }
        client.send();       
    }
}

customElements.define('my-footer', MyFooter)
