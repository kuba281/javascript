function pobierzPierwszyPunkt() {
    return document.querySelector('ul li').innerText;
}

const pokazPierwszyPunkt = function() {
    console.log(pobierzPierwszyPunkt());
};

const policzKroki = () => document.querySelectorAll('ol li').length;

(function() {
    console.log("Inicjalizacja...");
    console.log("Elementy OL:", policzKroki());
})();

function generujDane(cecha, opis = "Brak opisu") {
    return {
        cecha,
        opis,
        timestamp: new Date().getTime()
    };
}

function dodajDoTabeli(callback, ...elementy) {
    const tbody = document.querySelector('table tbody');
    elementy.forEach(el => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${el.cecha}</td><td>${el.opis}</td>`;
        tbody.appendChild(tr);
    });
    callback(elementy.length);
}

function stworzMnoznikTekstu(powtorzenia) {
    return function(tekst) {
        return tekst.repeat(powtorzenia);
    };
}

function demonstracjaZasiegow() {
    const definicje = document.querySelectorAll('dt');
    for (let i = 0; i < definicje.length; i++) {
        definicje[i].onclick = () => {
            console.log(`Element index: ${i}`);
        };
    }
}

{
    const blokowa = "ukryta";
    var funkcyjna = "widoczna";
}

function stworzLicznik() {
    let stan = 0;
    return {
        zwieksz: function() {
            stan++;
            return stan;
        }
    };
}

const licznik = stworzLicznik();
demonstracjaZasiegow();