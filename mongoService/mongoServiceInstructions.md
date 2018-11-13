## To start a mongo 

`sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.2\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"`

## To stop mongo service 
In windows shell
>1. net stop MongoDB

>2. sc.exe delete MongoDB
