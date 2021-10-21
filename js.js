
        //Dodanie elementu plansza
        var plansza = document.createElement("div");
        plansza.id = "plansza";
        plansza.style.width = (window.innerHeight * 0.8)+5 + 'px';
        plansza.style.height = (window.innerHeight * 0.8)+5 + 'px';
        console.log(plansza)
        document.body.appendChild(plansza);

        //Utworzenie tablicy dwuwymiarowej z zerami  
        var tablica = [];
        var n = 0;
        for (var j = 0; j < 22; j++) {
            tablica[j] = [];
            for (var k = 0; k < 22; k++) {
                //X-ksy na brzegach tablicy:
                if (j == 0 || j == 21 || k == 0 || k == 21) {
                    tablica[j][k] = "x";
                }
                else {
                    n++;
                    tablica[j][k] = n;
                }
            }
        }

        console.table(tablica)
        //Responsywne ustawienie wielkosci komórek
        komorka = ((window.innerHeight* 0.8) / 22).toPrecision([4])
        console.log("komórka: " + komorka)

        //Utworzenie planszy
        let pole;
        for (var l = 0; l < 22; l++) {
            for (var m = 0; m < 22; m++) {
                pole = document.createElement("div");
                var klasa = tablica[l][m];
                if (klasa == "x") {
                    pole.style.backgroundColor = "#174000";
                }
                else if (klasa == 0) {
                    pole.style.backgroundColor = "#009900";
                }
                pole.classList.add("pole")
                pole.style.width = komorka + "px";
                pole.style.height = komorka + "px";
                pole.id = l + "x" + m;
                plansza.appendChild(pole)
            }
        }


        //Losowanie pozycji jablka
        function losowanie(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        var ox = losowanie(1, 20)
        var oy = losowanie(1, 20)
        var los = ox + "x" + oy;

        //zdefiniowanie owocu
        var owoc = document.createElement("div")
        var on = document.getElementById(los)
        on.classList.add("jablko")
        console.log("owoc: " + on.id)

        //Tablica z pozycja weza
        var waz = [];
        waz.push(10 + "x" + 10)
        waz.push(10 + "x" + 9)
        waz.push(10 + "x" + 8)
        console.log(waz)

        for (var i = 0; i < waz.length; i++) {
            var elem = document.getElementById(waz[i])
            elem.style.background = "blue";
        }

        //Pobranie klikanego klawisza
        let gra = false;
        function klawisze(event) {
            klawisz = event.keyCode;
            if (klawisz == 37 || klawisz == 38 || klawisz == 39 || klawisz == 40 || klawisz == 32) {
                klawisz = event.keyCode;
                gra = true;
            }

            else if (klawisz == 32) {
                if (gra == true) {
                    clearInterval(ruch)
                    for (var i = 0; i < waz.length; i++) {
                        var elem = document.getElementById(waz[i])
                        elem.style.background = "#225c00";
                    }
                    for (var i = 0; i < waz.length; i++) {
                        var elem = document.getElementById(waz[i])
                        elem.style.background = "blue";
                    }
                    gra = false;
                }
                else {
                    setInterval(ruch)
                    for (var i = 0; i < waz.length; i++) {
                        var elem = document.getElementById(waz[i])
                        elem.style.background = "#225c00";
                    }
                }
            }
        }

        //Ruch weza
        var x = 10;
        var y = 10;
        var dl = 3;
        var j = 0;
        var kierunki = [1];
        console.log(kierunki)
        var miejsce = 0;
        var ruch = setInterval(
            function () {
                for (var m = 0; m < waz.length; m++) {
                    elem = document.getElementById(waz[m])
                    // var t = m +1
                    // var nast = document.getElementById(waz[t])
                    // console.log("ELEM " + elem)
                    // console.log("NAST "+nast)
                    if (elem == null) {
                        clearInterval(ruch);
                        m = waz.length;
                        alert("PRZEGRAŁEŚ!!! ")
                    }
                    else {
                        elem.style.background = "#225c00";
                    }
                }

                if (gra == true) {
                    function klawisze(event) {
                        if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
                            klawisz = event.keyCode;
                        }
                        // if (miejsce == 0) {
                        //     waz[0].push(klawisz)
                        //     miejsce = 1;
                        // }
                        // else if (miejsce == 1) {
                        //     waz[1].push(klawisz)
                        //     miejsce = 0;
                        // }
                        // console.log(kierunki)
                        // gra = true;

                    }
                    console.log(klawisz)
                    //lewo
                    if (klawisz == 37) {
                        x = x - 1
                        y = y
                    }

                    //góra
                    if (klawisz == 38) {
                        x = x
                        y = y - 1
                    }

                    //prawo
                    if (klawisz == 39) {
                        x = x + 1
                        y = y
                    }

                    //dol
                    if (klawisz == 40) {
                        x = x
                        y = y + 1
                    }

                    j++;
                    if (j >= dl) {
                        j = 0;
                    }
                    waz[j] = (y + "x" + x)
                    // console.log(waz)

                }

                for (var k = 0; k < waz.length; k++) {
                    elem = document.getElementById(waz[k])
                    elem.style.background = "blue";
                }

            }
            , 100)
