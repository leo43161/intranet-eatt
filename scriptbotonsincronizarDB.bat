@ECHO OFF
REM BFCPEOPTIONSTART
REM Advanced BAT to EXE Converter www.BatToExeConverter.com
REM BFCPEEXE=C:\Users\Informatica\Desktop\actualizardb.exe
REM BFCPEICON=C:\Program Files (x86)\Advanced BAT to EXE Converter v4.59\ab2econv459\icons\icon1.ico
REM BFCPEICONINDEX=-1
REM BFCPEEMBEDDISPLAY=0
REM BFCPEEMBEDDELETE=1
REM BFCPEADMINEXE=1
REM BFCPEINVISEXE=0
REM BFCPEVERINCLUDE=0
REM BFCPEVERVERSION=1.0.0.0
REM BFCPEVERPRODUCT=Product Name
REM BFCPEVERDESC=Product Description
REM BFCPEVERCOMPANY=Your Company
REM BFCPEVERCOPYRIGHT=Copyright Info
REM BFCPEWINDOWCENTER=1
REM BFCPEDISABLEQE=0
REM BFCPEWINDOWHEIGHT=25
REM BFCPEWINDOWWIDTH=80
REM BFCPEWTITLE=Actualizador de DB
REM BFCPEOPTIONEND
@echo off
title migracion de Base de datos
echo migracion de Base de datos
echo ======================================
C:\xampp\mysql\bin\mysqldump.exe -h 10.15.15.151 -u backupop -p159753 --skip-triggers  --no-create-info intraneteatt historialactividad usuario usuario_roles proveedor ordenpago detalleordenpago retencion > C:\dbackup\bdtransaccional_%Date:~11,4%%Date:~8,2%%Date:~5,2%.sql
::C:\xampp\mysql\bin\mysqldump.exe -h 10.15.15.151 -u backupop -p159753 --skip-triggers  --no-create-info intraneteatt historialactividad usuario usuario_roles proveedor ordenpago detalleordenpago retencion > C:\dbackup\bdtransaccional1.sql
C:\xampp\mysql\bin\mysqldump.exe -h 10.15.15.151 -u backupop -p159753 --skip-triggers  --no-create-info intraneteatt historialactividad usuario usuario_roles proveedor ordenpago detalleordenpago retencion > bdtransaccional_now.sql
::C:\xampp\mysql\bin\mysqldump.exe -h 10.15.15.151 -u backupop -p159753 --skip-triggers  --no-create-info intraneteatt > C:\dbackup\Backupfull_%Date:~11,4%%Date:~8,2%%Date:~5,2%.sql
echo Iniciando backup
::C:\xampp\mysql\bin\mysql.exe -u adminintranet -padmin159753+ -h www.tucumanturismo.gob.ar intraneteatt < \\10.15.15.101\Seguridad\secuencias.sql
C:\xampp\mysql\bin\mysql.exe -u adminintranet -padmin159753+ -h www.tucumanturismo.gob.ar intraneteatt < secuencias.sql
::pause
echo levantado backup
::C:\xampp\mysql\bin\mysql -u adminintranet -padmin159753+ -h www.tucumanturismo.gob.ar intraneteatt < \\10.15.15.101\Seguridad\bdtransaccional_now.sql
C:\xampp\mysql\bin\mysql -u adminintranet -padmin159753+ -h www.tucumanturismo.gob.ar intraneteatt < bdtransaccional_now.sql
::pause>nul
echo restaurando permisos
::C:\xampp\mysql\bin\mysql -u adminintranet -padmin159753+ -h www.tucumanturismo.gob.ar intraneteatt < \\10.15.15.101\Seguridad\secuencias2.sql
C:\xampp\mysql\bin\mysql -u adminintranet -padmin159753+ -h www.tucumanturismo.gob.ar intraneteatt < secuencias2.sql
echo sincronizada la Base de Datos
::pause
exit
