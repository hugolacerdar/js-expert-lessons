# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# de volta a pasta modulo-05
cp -r ../../modulo-01/projeto-final-renting-a-car .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\"use strict";\n/g' {file}

# 1s - primeira linha
# ^ - primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito

# muda tudo!
CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\"use strict";\n/g' {file}
