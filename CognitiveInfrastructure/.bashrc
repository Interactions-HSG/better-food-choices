export SERVER_HOME='/c/Users/Matthias Mayr/sf_and_tools/GenericSemanticAPI'
export SERVER_HOME_TILD='~/sf_and_tools/GenericSemanticAPI'
# real world knowledgepacks
#export KNOWLEDGEPACKS='qudt,jt-vr-browser'
# development shortcut :)
export KNOWLEDGEPACKS='jt-vr-browser-populated'
echo 'Added SERVER_HOME and KNOWLEDGEPACKS variable'

SemanticServer()
{
	"$SERVER_HOME"/launch-server-windows
}
KillSemanticServer()
{
	kill `ps -ef | grep java | awk '{ print $2 }'`
}
DumpToTTL()
{
	curl --request GET --url http://semantic:8087/knowledgepacks/save
	#"curl --request GET   --url http://"`ipconfig | grep IPv4 | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'`":8087/knowledgepacks/save"
}
echo 'Added "SemanticServer", "KillSemanticServer" and "DumpToTTL" alias. Feel free to use them.' 
