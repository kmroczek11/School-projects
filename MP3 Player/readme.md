# Opis:
Odtwarzacz muzyki.

## Czego si� nauczy�em?
Nauczy�em si� u�ywa� AJAXa oraz jQuery. 
Stworzy�em prosty serwer w Node.js, gdzie odczytywa�em pliki mp3 z lokalnego folderu.
Skorzysta�em z biblioteki Three.js.
Budow� aplikacji opar�em na klasach i metodach, tworz�c uporz�dkowan� struktur� projektu.

### Wykorzystane technologie:
HTML, CSS, JavaScript, jQuery, Node.js, Three.js, AJAX

#### Uruchomienie:
Aby uruchomi� projekt musimy mie� zainstalowany Node.js.
Po pobraniu otworzy� konsol� w folderze projektu (przytrzyma� SHIFT i klikn�� prawym na folder, nast�pnie z menu podr�cznego wybra� "Otw�rz tutaj okno programu Powershell" lub podobne)).
W okienku konsoli wpisa� "node server.js" lub "node .\server.js".
Je�li polecenie nie dzia�a by� mo�e wywo�ywane jest w folderze, w kt�rym nie ma pliku "server.js".
Je�li wszystko dobrze zrobili�my wy�wietli si� napis "Serwer startuje na porcie 3000".
Przechodzimy do przegl�darki i w pasku adresu wpisujemy "localhost:3000".
Powinien otworzy� si� projekt.

##### Dzia�anie projektu:
Z panelu po lewej wybieramy albumy.
W��czamy muzyk� klikaj�c ikonk� "play".
Mo�emy j� dowolnie pauzowa� i wznawia�, r�wnie� przy u�yciu du�ych kontrolek pod list� piosenek.
Klikaj�c ikonk� plusa mo�emy tworzy� playlisty. 
Je�li jeszcze takiej nie mamy, wpisujemy nazw� i klikamy ikonk� z o��wkiem. 
Je�li ju� mamy, po prostu wybieramy j� i klikamy "Dodaj" (do albumu zostanie dodana wybrana piosenka).
Otwieramy j� po wej�ciu w piosenk� i klikni�ciu "Otw�rz".
Mo�emy w��czy� wizualizacj� utworu klikaj�c "W��cz wizualizacj�".
Projekt nie dzia�a na przegl�darce Chrome, gdy� tam blokowany jest d�wi�k.
Pojawia si� drobny bug z ca�kowitym czasem trwania piosenki przy niekt�rych albumach (wcze�niej go nie by�o).

![1](./images/player1.png) 
![2](./images/player2.png) 
![3](./images/player3.png) 
![4](./images/player4.png) 
![5](./images/player5.png) 
![6](./images/player6.png) 
