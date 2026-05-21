export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Koliko traje izrada zapisnika o proceni štete?',
    answer:
      'Standardno do 24h od trenutka pregleda vozila. Za hitne slučajeve, kada je potrebno brzo dostavljanje zapisnika osiguranju ili lizing kući, moguća je izrada istog dana po dogovoru.',
  },
  {
    question: 'Dolazite li na adresu klijenta?',
    answer:
      'Da. Ako vozilo nije u voznom stanju ili je klijent fizički sprečen, izlazimo na lokaciju u Nišu i okolini u radijusu od oko 50 km (Prokuplje, Aleksinac, Pirot, Knjaževac, Zaječar). Klijent može doći i u kancelariju na Vazduhoplovaca 24, Aerodrom Konstantin Veliki.',
  },
  {
    question: 'Koliko košta procena štete?',
    answer:
      'Fiksna cena izrade zapisnika je 10.000 RSD. Prva konsultacija je besplatna. Cena obuhvata izlazak na teren u okviru pokrivenog područja, pregled vozila, izradu zapisnika u Audatex sistemu i dostavljanje izveštaja.',
  },
  {
    question: 'Koja dokumenta su mi potrebna za procenu?',
    answer:
      'Saobraćajna dozvola, lična karta, polisa osiguranja krivca (ako je nezgoda), policijski zapisnik ili Evropski izveštaj o saobraćajnoj nezgodi.',
  },
  {
    question: 'Koji softver koristite za procenu?',
    answer:
      'Audatex - međunarodno priznat sistem za procenu štete na vozilima koji koriste osiguravajuća društva širom Evrope. Procena je standardizovana, transparentna i prihvatljiva za sve osiguravače.',
  },
  {
    question: 'Da li radite i naplatu štete od osiguranja?',
    answer:
      'Ne. Damage Expert se bavi isključivo procenom štete i izradom zapisnika. Naplatu vrši klijent ili njegov advokat na osnovu našeg zapisnika.',
  },
  {
    question: 'Za koje tipove vozila radite procenu?',
    answer:
      'Putnička vozila, kombiji, laka dostavna vozila, teretna vozila, kamioni, motocikli, prikolice i autobusi. Trenutno je primarni fokus na putničkim vozilima.',
  },
  {
    question: 'Za koje osiguravajuće kuće trenutno radite?',
    answer:
      'Trenutno sarađujemo sa Globos osiguranjem. U toku je proširivanje saradnje sa drugim osiguravajućim kućama u Srbiji.',
  },
  {
    question: 'Koje je Vaše obrazovanje i iskustvo?',
    answer:
      'Marko Janković je diplomirao na Saobraćajnom fakultetu i ima preko 5 godina iskustva u rent a car industriji (Sixt rent a car) na rukovodećim pozicijama gde se bavio obradom šteta na flotama vozila.',
  },
  {
    question: 'Kako se obračunava totalna a kako delimična šteta?',
    answer:
      'Ekonomski totalna šteta nastaje kada troškovi popravke prelaze tržišnu vrednost vozila umanjenu za vrednost ostatka. Delimična šteta se obračunava preko stvarnih troškova popravke (rezervni delovi + rad). Procena se radi u skladu sa AMSS katalogom vrednosti i Audatex kalkulacijama.',
  },
];
