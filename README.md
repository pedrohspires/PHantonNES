# PhantonNES
## Um emulador NES desenvolvido em React

# Sobre mim
Olá, eu sou o Pedro Henrique, o louco que resolveu entrar nesta empreitada de um emulador NES feito em JavaScript, usando a biblioteca React com TypeScript.
Sou estudante de Ciências da Computação e sempre me interessei por lógica, estruturas de dados e eletrônica em geral. Ainda em desenvolvimento, mas espero
finalizar logo logo.

# Sobre a emulação
Emular o sistema no Nintendo Entratainement System (NES) é uma tarefa relativamente desafiadora, mas que é comumente usado no mundo das Ciências da Computação como uma
forma de colocar em prática conhecimentos teóricos de toda a faculdade. Conhecimentos como lógica, portas lógicas (em certo nível), pilhas, fila, entre outras estruturas.
É importante também para saber-mos melhor como nossos póprios computadores funcionam, um conhecimento não obrigatório, mas essencial para o bom programador que tem
curiosidade em saber como tudo funciona.
<br/><br/>

# Legislação
Apesar da comercialização de jogos não autorizadas serem proibidas, o ato de emular o jogo não é, por si só, um ato de infração da Lei. Contudo, é importante
lembrar que, na maioria dos países, é proibida a comercialização de produtos "piratas", portanto a emulação pode se tornar um cime quando é feita em conjunto com
mídias não oficiais.
<br/><br/>

# Componentes emulados
* CPU (ainda não concluído) - uma modificação do microprocessasdor 6502 é usado no NES, e a emulção do mesmo é feita da seguinte forma:
   * Instruções: o 6502 possui uma capacidade de 255 instruções, incluindo soma, subtração, carga, etc. São feitas funções que simulam o comportamento.
   * Registradores: são locais em memória de rápido e fácil acesso no processador. Existem 3 principais usados como apoio nas instruções, sendo eles os registradores: A, X e Y. É usado variáveis comuns.
   * Memória: o NES possui uma memória de 8 bits, mas consegue endereçar 16 bits. Ou seja, 65.535 posições de memória que armazenam 1 byte cada. É usado um Array para simular a RAM
   * Pilha: um espaço na memória, geralmente usada para guardar endereços de memória ao fazer uma ramificação (Branch) no código. Ao todo são 255 bytes reservados para ela.
   * Stack Pointer: serve para apontar o topo da pilha. Um registrador de 1 byte.
   * Flags: o 6502 utiliza flags para indicar o status atual do processador. É representado com 1 byte, ou seja, 8 flags diferentes -1 flag que não é utilizada.
   * Program Counter: serve para indicar o local na memória da próxima instrução. É um registrador de 2 bytes.
   * Clock: uma forma de controlar a execução do programa.

PPU (ainda não implementada) - um microprocessador usado para a gerar gráficos
APU (ainda não implementada) - interface de som

Alguns termos foram deixados em Inglês, pois fazem mais sentido.
<br/><br/>

# Tipos de memória
* PRG ROM: armazena os códigos do jogo, como lógica, comportamento dos personagens, música, etc. Não podem ser alterados
* PRG RAM: tipo de memória de acesso aleatório que pode ser carregada dinamicamente
<br/><br/>

# Cabeçalho da ROM iNES
* 16 bytes que indicam várias propriedade da ROM
* bytes 0-3: indicador de ROM NES. String "NES" seguida de um byte com valor 1A
* byte 4: indica o tamanho da PRG ROM
* Byte 5: Indica o tamanho da CHR ROM
* byte 6: Flags que indicam mapeamento, layout do mirroring, presença de RAM com bateria e presença de uma ROM de treino.
* byte 7: flags com informações adicionais sobre a ROM, incluindo o sistema do console e bits altos do mapeador.
* byte 8: indica o tamanho da PRG RAM
* byte 9: flags de modo de TV (PAL ou NTSC)
* byte 10: informações adicionais de TV, controladoras de mapeamento e bancos.
* bytes 11-15: reservado para uso "futuro"