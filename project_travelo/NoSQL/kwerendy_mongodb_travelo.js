// 1. Wyświetlenie wszystkich dokumentów z kolekcji klienci
db.klienci.find()

// 2. Projekcja tylko pól imię i nazwisko
db.klienci.find({}, { imie: 1, nazwisko: 1, _id: 0 })

// 3. Filtrowanie klientów, którzy wybrali język polski
db.klienci.find({ jezyk: "pl" })

// 4. Klienci z poziomem lojalności 'brazowy'
db.klienci.find({ "program_lojalnosciowy.poziom": "brazowy" })

// 5. Zliczenie rezerwacji według statusu
db.rezerwacje.aggregate([{ $group: { _id: "$status", liczba: { $sum: 1 } } }])

// 6. Sortowanie atrakcji od najdroższych do najtańszych
db.atrakcje.find().sort({ cena: -1 })

// 7. Klienci z więcej niż 100 punktami
db.klienci.find({ "program_lojalnosciowy.punkty": { $gt: 100 } })

// 8. Łączenie danych o atrakcjach z kolekcją partnerzy
db.atrakcje.aggregate([{ $lookup: { from: "partnerzy", localField: "partner_id", foreignField: "_id", as: "partner" } }])

// 9. Adresy e-mail aktywnych klientów
db.klienci.find({ jest_zablokowany: false }, { email: 1, _id: 0 })

// 10. Promocje aktualnie obowiązujące
db.promocje.find({ $and: [ { wazne_od: { $lte: new Date() } }, { wazne_do: { $gte: new Date() } } ] })

// 11. Średnia ocena wszystkich atrakcji
db.atrakcje.aggregate([{ $group: { _id: null, srednia_ocena: { $avg: "$srednia_ocena" } } }])

// 12. Klienci, którzy mają przynajmniej jedną ulubioną atrakcję
db.klienci.find({ "ulubione.0": { $exists: true } })

// 13. Otwarte zgłoszenia klientów
db.zgloszenia_wsparcia.find({ status: "otwarte" })

// 14. Rezerwacje konkretnego klienta
db.rezerwacje.find({ klient_id: ObjectId("684b1c36d5822fb264d43511") })

// 15. Zliczanie rezerwacji typu zakwaterowanie
db.rezerwacje.aggregate([{ $match: { typ: "zakwaterowanie" } }, { $count: "liczba_rezerwacji" }])
