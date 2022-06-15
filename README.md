# divekit-report-mapper

## Nutzung

* Die Befehle `npm install` und `npx tsc` im Wurzelverzeichnis ausführen, um so alle dependencies zu installieren und
  die JavaScript Dateien zu generieren.

* Achtung: Nach Änderungen an Typescript-Source Dateien im `src`-Ordner nicht vergessen wieder `npx tsc` auszuführen.

* Mit `node build/bin/report-mapper` lässt sich der Mapper lokal ausführen. Es wird die Datei `unified.xml` generiert
  und im `target`-Ordner abgelegt. Surefire-Reports können unter `target/surefire-reports/` abgelegt werden. Die von
  statischen Sourcecode Analysetools generierten XML-Reports können direkt unter `target/` abgelegt werden.

* Für die Entwicklung können `npx tsc` und `node build/bin/report-mapper` mithilfe von `npm run dev` kombiniert werden.

* `npm run dev++` baut zusätzlich die Testseite, welche dann im Ordner `public` aufgerufen werden kann. Voraussetzung
  dabei ist das der `divekit-report-visualizer` im selben Ordner wie der `divekit-report-mapper` liegt.

## Changelog

### 1.0.9-beta.1
- update scripts according to new report-visualizer naming

### 1.0.8

- Parameter Verarbeitung hinzugefügt, welche eine Einschränkung der genutzten Mapper ermöglichen
- Error handling: Liefert ein Mapper kein valides Ergebnis wird ein Fehler in der unified.xml mit angegeben 
