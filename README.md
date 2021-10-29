# divekit-report-mapper

## Nutzung

* Die Befehle `npm install` und `npx tsc` im Wurzelverzeichnis ausführen, um so alle dependencies zu installieren und die JavaScript Dateien zu generieren.

* Achtung: Nach Änderungen an Typescript-Source Dateien im `src`-Ordner nicht vergessen wieder `npx tsc` auszuführen.

* Mit `node build/bin/report-mapper` lässt sich der Mapper lokal ausführen. Surefire-Reports können unter `target/surefire-reports/` abgelegt werden. Die von statischen Sourcecode Analysetools generierten XML-Reports können direkt unter `target/` abgelegt werden.
