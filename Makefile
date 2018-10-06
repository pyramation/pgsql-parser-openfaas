
def:
	faas up -f pgsql-parser.yml --gateway 127.0.0.1:31112

test:
	echo "select 1" |  faas-cli invoke pgsql-parser --gateway http://127.0.0.1:31112 --content-type application/sql

test-ast:
	echo '[{"RawStmt":{"stmt":{"SelectStmt":{"targetList":[{"ResTarget":{"val":{"A_Const":{"val":{"Integer":{"ival":1}},"location":7}},"location":7}}],"op":0}}}}]' | faas-cli invoke pgsql-parser --gateway http://127.0.0.1:31112 --content-type application/json
