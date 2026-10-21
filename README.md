# PLC-simulator 6.1

Öppna sidans GitHub Pages-adress och välj din GXW-fil. Filen läses och simuleras lokalt i webbläsaren. Ingen PLC-kod laddas upp. Endast själva appen sparas som offlinekopia.

När **Offlinekopia klar** visas kan sidan öppnas igen utan internet i samma webbläsarprofil. Privat läge, rensade webbplatsdata eller webbläsarens lagringsrensning kan ta bort kopian; öppna sidan online igen för att spara den på nytt.

Uppdateringar visas på sidan. En uppdatering laddar om appen efter att PLC:n stoppats; välj sedan din GXW-fil igen. Pågående körning laddas aldrig om automatiskt.

## Publicera på GitHub Pages

Detta paket är det publika webbmaterialet. Lägg filerna direkt i roten av ett nytt repository, exempelvis `plc-simulator`. Aktivera **Settings → Pages → Deploy from a branch → main → / (root)**. Behåll `.nojekyll`. Använd adressen GitHub visar, med avslutande snedstreck.

Det fullständiga projektets ZIP, Git-historik och användarens GXW-/PDF-testfiler hör inte hemma i detta publika webbmaterial.

Körstödet gäller implementerad FX-ladder, inte alla GX Works2-instruktioner. Appen visar eventuella körhinder vid import. Egen kod MIT; tredjepartslicenser och attribution finns i LICENSES.txt och HTML-källan.
