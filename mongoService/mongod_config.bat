@echo off
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

if '%errorlevel%' NEQ '0' (
    echo Solicitando permisos administrativos ...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = WScript.CreateObject("Shell.Application") > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"

SET mongoConfig=mongod.cfg
SET mongoDirectory=C:\mongo_arod_db\
SET mongoDataPath=c:\mongo_arod_db\data\db
SET mongoLogPath=c:\mongo_arod_db\data\log

if not exist %mongoDataPath% ( mkdir  %mongoDataPath% )
if not exist %mongoLogPath% ( mkdir %mongoLogPath% )

xcopy mongod.cfg %mongoDirectory%

SC QUERY MongoDB > NUL
IF ERRORLEVEL 1060 GOTO MISSING
ECHO EXISTS
GOTO startMongo

:MISSING
    sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe\" --service --config=\"%mongoDirectory%\mongod.cfg"" DisplayName= "MongoDB" start= "auto"
    pause
    if '%ERRORLEVEL%'  EQU 0 ( goto startMongo )

:startMongo    
    net start MongoDB
    pause    


	