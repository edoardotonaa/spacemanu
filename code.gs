function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function aggiungiRiparazione(targa, descrizioni, dataRiparazione) {
  var foglio = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Riparazioni");
  if (!foglio) return "⚠️ Foglio 'Riparazioni' non trovato!";
  
  if (!dataRiparazione) {
    dataRiparazione = new Date();
  } else {
    dataRiparazione = new Date(dataRiparazione);
  }

  // Formattiamo la data in "GG/MM/AAAA"
  var giorno = dataRiparazione.getDate();
  var mese = dataRiparazione.getMonth() + 1;
  var anno = dataRiparazione.getFullYear();
  var dataFormattata = `${giorno.toString().padStart(2, '0')}/${mese.toString().padStart(2, '0')}/${anno}`;

  foglio.appendRow([targa, descrizioni, dataFormattata]);

  return "✅ Riparazione aggiunta con successo!";
}



function trovaUltimaRiparazione(targa) {
  var foglio = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Riparazioni");
  if (!foglio) return "⚠️ Foglio 'Riparazioni' non trovato!";

  var dati = foglio.getDataRange().getValues();
  var ultimaRiparazione = "❌ Nessuna riparazione trovata per questa targa.";

  for (var i = dati.length - 1; i > 0; i--) {  // Partiamo dal fondo per trovare l'ultima riparazione
    if (dati[i][0] == targa) {  // Se la targa corrisponde
      var dataRiparazione = dati[i][2];  // La data è in colonna C (indice 2)
      if (dataRiparazione instanceof Date) {  // Assicuriamoci che sia una data valida
        var giorno = dataRiparazione.getDate().toString().padStart(2, "0");
        var mese = (dataRiparazione.getMonth() + 1).toString().padStart(2, "0");
        var anno = dataRiparazione.getFullYear();
        var dataFormattata = giorno + "/" + mese + "/" + anno;
        ultimaRiparazione = "📅 " + dataFormattata + " 🔧 " + dati[i][1];  // Riparazione è in colonna B (indice 1)
      }
      break;  // Fermiamoci alla prima corrispondenza trovata
    }
  }

  return ultimaRiparazione;
}

