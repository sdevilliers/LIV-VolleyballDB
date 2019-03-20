Sequelize Auto can be used to generate the Models automatically from the Database.

The command to generate this DB must be run from the src/db folder in the project

The specific command is:
sequelize-auto -o "./Models" -d DatabaseName -h DBServerIP -u DBUserName -x DBPassword -c "./config/config.json" -e mysql
To start mysql:
cd to /usr/local/mysql(symbolic link)/supportfiles and run  sudo ./mysql.server start and or stop
