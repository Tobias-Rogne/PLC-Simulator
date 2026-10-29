# PLC-simulator

En webbaserad simulator för att utforska PLC-program skapade i Mitsubishi GX Works2. Ladda in ett GXW-projekt, följ ladderlogiken live och testa hur programmet styr en virtuell anläggning.

**[Öppna simulatorn](https://tobias-rogne.github.io/PLC-Simulator/start.html)**

## Vad kan du göra?

- Läsa in GX Works2-projekt i formatet `.gxw`.
- Visa sekventiell FX-SFC/Grafcet med steg, övergångsvillkor och liveövervakade ladderdelar.
- Följa ladderlogiken under körning och se aktiva kontakter och instruktioner.
- Övervaka ingångar, utgångar, minnen, register, timers och räknare.
- Starta, pausa och stoppa PLC:n eller köra ett scan i taget.
- Växla mellan I/O-lista och en grafisk PLC-vy.
- Välja CPU-profil för FX3S eller FX3U/FX3UC inom simulatorns implementerade körstöd.

## Simuleringsmiljöer

**3-våningshiss** – testa hur ditt program använder knappar, våningsgivare, motorutgångar och våningslampor.

**Tryckknappslåda** – testa logik med tryckknappar, en väljare och indikatorlampor.

**Kulsortering** – mata plast- och metallkulor, följ givare, skivmatare och hisskorg samt prova analoga vred och instrument med justerbar kalibrering.

Samma PLC-program och övervakning används i alla miljöerna. Anläggningen reagerar på sina kopplade in- och utgångar. Övriga adresser kan fortfarande användas och övervakas i PLC:n.

## Kom igång

1. [Öppna simulatorn](https://tobias-rogne.github.io/PLC-Simulator/start.html) i webbläsaren.
2. Välj CPU-profil som passar ditt projekt och ladda in din `.gxw`-fil.
3. Läs importinformationen och välj den simuleringsmiljö du vill använda.
4. Starta med **RUN** och följ programmet i **Ladder/SFC** eller **I/O & minnen**. Använd **Paus** och **Ett scan** för att undersöka körningen steg för steg.

## Lokal körning och offline

GXW-filen läses och PLC-programmet simuleras lokalt på din enhet. Din GXW-fil laddas inte upp.

Första besöket kräver internet. När **Offlinekopia klar** visas kan appen öppnas igen utan internet i samma webbläsarprofil. Rensade webbplatsdata eller privat läge kan påverka om offlinekopian finns kvar.

Offlinekopian sparar själva appen. Efter en omladdning behöver du välja din GXW-fil igen.

När en ny appversion finns visas ett meddelande i simulatorn. Stoppa PLC:n med **STOP** och välj att uppdatera sidan när det passar.

## Körstöd och begränsningar

Simulatorn utvecklas för lärande och experiment med PLC-logik. Stöd finns för en delmängd av GX Works2-projekt och FX-instruktioner.

SFC-stödet omfattar en FX-sekvens med serieövergångar, alternativa valgrenar, native valåterföreningar och villkorade hopp/loopar, tillsammans med cykliska ladderblock som kan aktivera startsteget via programkod. Blocken körs i blocknummerordning och visas live. Saknas startkod förblir sekvensen inaktiv. Samtidiga AND-förgreningar, flera SFC-sekvenser och andra blockstyrattribut är ännu inte implementerade.

Om ett projekt går att läsa men innehåller kod som inte kan simuleras visas orsaken och **RUN** spärras för hela programmet. Instruktioner som saknar körstöd hoppas inte över.

Laddervyn återger programmets logiska förbindelser; placeringen kan skilja sig från originalet i GX Works2. Tider och hårdvarubeteende är simulerade modeller och återger inte alla egenskaper hos en fysisk PLC.

## Licens

Simulatorns egen kod är licensierad under MIT. Tredjepartslicenser och attribution finns i [LICENSES.txt](LICENSES.txt).

Simulatorn har även ett strömbortfallstest med CPU-standardens minnesbackup och manuellt inställbara variabla latchområden för FX3U. GXW:s särskilda latch-/filregisterparametrar importeras inte automatiskt. Första scan efter återkomst kör programmets startkod igen.

SFC-steg stöder även implementerade tillämpade P-instruktioner, exempelvis INCP, MOVP och ALTP. De gör operationen en gång per villkorsflank. Flankkontakter och PLS/PLF inne i SFC är fortsatt avgränsade bort.

ZRST/ZRSTP kan nollställa sammanhängande fysiska Y/M/S/T/C/D-områden. Inklusive timers/räknares värden och räkneflanker; automatallokerade lokala områden och direkt S-skrivning inne i SFC-steg ingår inte.

Kulsorterarens yttersta våningsgivare stoppar inte korgen mekaniskt. Motorn kan köra förbi våningarna och givarna blir då OFF; överkörning markeras även utanför bildskalan. PLC-programmet styr stoppet.

Skollabbets vred är steglösa 0–10 med separata uppmätta råvärdeskurvor. Punkt 6 är uppskattad mellan 5 och 7. Mätaren drivs fortsatt enbart av PLC-programmets D8282. Den tidigare linjära kalibreringen finns som ett uttryckligt avancerat alternativ.

Instrumentet har tydlig 0–10-skala och kan förstoras med klick, Enter eller mellanslag. Förstoringen uppdateras under RUN. Reglagen finns direkt under våningsknapparna.

Du kan också använda båda potentiometerreglagen direkt under den förstorade mätaren. Värdena synkroniseras med huvudvyn och kan justeras under RUN.

SFC-valförgreningar kan ha flera villkorade hopp till andra steg. Varje gren följer sitt eget villkor och visas i diagrammet. Kvarvarande SFC-begränsningar framgår vid import.

ROL/ROLP stöds för 16-bitars rotation i D-register och fulla giltiga K4-grupper. Carryflaggan M8022 kan följas i I/O och vid instruktionen.
