# use pgsql parser via openfaas!

This makes a openfaas function for https://github.com/pyramation/pg-query-parser

Docker Hub: https://hub.docker.com/r/pyramation/pgsql-parser/

Example usage/test:

```sh
make test
echo "select 1" |  faas-cli invoke pgsql-parser --gateway http://127.0.0.1:31112 --content-type application/sql
{"contentType":"application/json","content":[{"RawStmt":{"stmt":{"SelectStmt":{"targetList":[{"ResTarget":{"val":{"A_Const":{"val":{"Integer":{"ival":1}},"location":7}},"location":7}}],"op":0}}}}]}

make test-ast
echo '[{"RawStmt":{"stmt":{"SelectStmt":{"targetList":[{"ResTarget":{"val":{"A_Const":{"val":{"Integer":{"ival":1}},"location":7}},"location":7}}],"op":0}}}}]' | faas-cli invoke pgsql-parser --gateway http://127.0.0.1:31112 --content-type application/json
{"contentType":"text/plain","content":"SELECT 1;"}
$
```