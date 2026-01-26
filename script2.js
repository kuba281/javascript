
console.log("--- CZĘŚĆ A ---");


const sprawdzParzystosc = (l) => console.log(l % 2 === 0 ? "Parzysta" : "Nieparzysta");
sprawdzParzystosc(10);


function ocen(pkt) {
    if (pkt > 80) return "Bardzo dobry";
    if (pkt > 50) return "Dostateczny";
    return "Niedostateczny";
}
console.log("Ocena:", ocen(75));


let dzien = 3;
switch(dzien) {
    case 1: console.log("Poniedziałek"); break;
    case 3: console.log("Środa"); break;
    default: console.log("Inny dzień");
}


let wiek = 20;
console.log(wiek >= 18 ? "Pełnoletni" : "Niepełnoletni");



console.log("--- CZĘŚĆ B ---");


for (let i = 1; i <= 10; i++) process.stdout ? process.stdout.write(i + " ") : console.log(i);


let l = 10;
while (l >= 0) { console.log("Odliczanie:", l); l--; }


let owoce = ["Jabłko", "Banan"];
for (let owoc of owoce) console.log("Owoc:", owoc);


let auto = { marka: "Toyota", rok: 2022 };
for (let klucz in auto) console.log(klucz, ":", auto[klucz]);


for (let i = 0; i < 5; i++) {
    if (i === 1) continue; 
    if (i === 4) break;    
    console.log("Iteracja:", i);
}



console.log("--- CZĘŚĆ C: TABLICZKA MNOŻENIA ---");
for (let i = 1; i <= 10; i++) {
    let wiersz = "";
    for (let j = 1; j <= 10; j++) {
        wiersz += (i * j).toString().padStart(4, " ");
    }
    console.log(wiersz);
}