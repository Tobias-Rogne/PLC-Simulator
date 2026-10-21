# PLC-simulator

En webbaserad simulator för att utforska PLC-program skapade i Mitsubishi GX Works2. Ladda in ett GXW-projekt, följ ladderlogiken live och testa hur programmet styr en virtuell anläggning.

**[Öppna simulatorn](https://tobias-rogne.github.io/PLC-Simulator/)**

## Vad kan du göra?

- Läsa in GX Works2-projekt i formatet `.gxw`.
- Följa ladderlogiken under körning och se aktiva kontakter och instruktioner.
- Övervaka ingångar, utgångar, minnen, register, timers och räknare.
- Starta, pausa och stoppa PLC:n eller köra ett scan i taget.
- Växla mellan I/O-lista och en grafisk PLC-vy.
- Välja CPU-profil för FX3S eller FX3U/FX3UC inom simulatorns implementerade körstöd.

## Simuleringsmiljöer

**3-våningshiss** – testa hur ditt program använder knappar, våningsgivare, motorutgångar och våningslampor.

**Tryckknappslåda** – testa logik med tryckknappar, en väljare och indikatorlampor.

Samma PLC-program och övervakning används i båda miljöerna. Anläggningen reagerar på sina kopplade in- och utgångar. Övriga adresser kan fortfarande användas och övervakas i PLC:n.

## Kom igång

1. [Öppna simulatorn](https://tobias-rogne.github.io/PLC-Simulator/) i webbläsaren.
2. Välj CPU-profil som passar ditt projekt och ladda in din `.gxw`-fil.
3. Läs importinformationen och välj den simuleringsmiljö du vill använda.
4. Starta med **RUN** och följ programmet i **Ladder** eller **I/O & minnen**. Använd **Paus** och **Ett scan** för att undersöka körningen steg för steg.

## Lokal körning och offline

GXW-filen läses och PLC-programmet simuleras lokalt på din enhet. Din GXW-fil laddas inte upp.

Första besöket kräver internet. När **Offlinekopia klar** visas kan appen öppnas igen utan internet i samma webbläsarprofil. Rensade webbplatsdata eller privat läge kan påverka om offlinekopian finns kvar.

Offlinekopian sparar själva appen. Efter en omladdning behöver du välja din GXW-fil igen.

När en ny appversion finns visas ett meddelande i simulatorn. Stoppa PLC:n med **STOP** och välj att uppdatera sidan när det passar.

## Körstöd och begränsningar

Simulatorn utvecklas för lärande och experiment med PLC-logik. Stöd finns för en delmängd av GX Works2-projekt och FX-instruktioner.

Om ett projekt går att läsa men innehåller kod som inte kan simuleras visas orsaken och **RUN** spärras för hela programmet. Instruktioner som saknar körstöd hoppas inte över.

Laddervyn återger programmets logiska förbindelser; placeringen kan skilja sig från originalet i GX Works2. Tider och hårdvarubeteende är simulerade modeller och återger inte alla egenskaper hos en fysisk PLC.

## Licens

Simulatorns egen kod är licensierad under MIT. Tredjepartslicenser och attribution finns i [LICENSES.txt](LICENSES.txt).
