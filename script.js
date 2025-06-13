document.addEventListener('DOMContentLoaded', () => {

    // --- DEFINIÇÃO DOS EXEMPLOS ---
    const examples = [
        {
            id: 'countdown',
            title: '1. Contagem Regressiva',
            description: 'Conta de um número inicial até 1.',
            inputs: [
                { type: 'number', id: 'startNum', placeholder: 'Digite o número inicial' }
            ],
            execute: (inputs) => {
                let i = parseInt(inputs.startNum);
                if (isNaN(i) || i <= 0) return 'Erro: Insira um número positivo.';
                let result = `Contagem regressiva a partir de ${i}:\n\n`;
                while (i > 0) {
                    result += `=> ${i}\n`;
                    i--;
                }
                return result + '\nFinalizado!';
            }
        },
        {
            id: 'countup',
            title: '2. Contagem Progressiva',
            description: 'Conta de 1 até um número final.',
            inputs: [
                { type: 'number', id: 'endNum', placeholder: 'Digite o número final' }
            ],
            execute: (inputs) => {
                const end = parseInt(inputs.endNum);
                if (isNaN(end) || end <= 0) return 'Erro: Insira um número positivo.';
                let result = `Contagem progressiva até ${end}:\n\n`;
                let i = 1;
                while (i <= end) {
                    result += `=> ${i}\n`;
                    i++;
                }
                return result + '\nFinalizado!';
            }
        },
        {
            id: 'factorial',
            title: '3. Cálculo de Fatorial',
            description: 'Calcula o fatorial (n!) de um número. Ex: 5! = 5*4*3*2*1',
            inputs: [
                { type: 'number', id: 'factNum', placeholder: 'Digite um número (ex: 5)' }
            ],
            execute: (inputs) => {
                const num = parseInt(inputs.factNum);
                if (isNaN(num) || num < 0) return 'Erro: Insira um número não negativo.';
                if (num === 0) return `O fatorial de 0 é 1.`;
                let result = 1;
                let i = num;
                let steps = '';
                while (i > 0) {
                    result *= i;
                    steps += i + (i > 1 ? ' * ' : '');
                    i--;
                }
                return `Cálculo: ${num}! = ${steps}\n\nResultado: ${result}`;
            }
        },
        {
            id: 'sum',
            title: '4. Soma até N',
            description: 'Soma todos os números de 1 até o número fornecido.',
            inputs: [
                { type: 'number', id: 'sumNum', placeholder: 'Somar até qual número?' }
            ],
            execute: (inputs) => {
                const num = parseInt(inputs.sumNum);
                if (isNaN(num) || num <= 0) return 'Erro: Insira um número positivo.';
                let sum = 0;
                let i = 1;
                while (i <= num) {
                    sum += i;
                    i++;
                }
                return `A soma dos números de 1 até ${num} é: ${sum}`;
            }
        },
        {
            id: 'multiplication_table',
            title: '5. Tabuada',
            description: 'Exibe a tabuada de um número (de 1 a 10).',
            inputs: [
                { type: 'number', id: 'tableNum', placeholder: 'Qual tabuada exibir?' }
            ],
            execute: (inputs) => {
                const num = parseInt(inputs.tableNum);
                if (isNaN(num)) return 'Erro: Insira um número.';
                let result = `Tabuada do ${num}:\n\n`;
                let i = 1;
                while (i <= 10) {
                    result += `${num} x ${i} = ${num * i}\n`;
                    i++;
                }
                return result;
            }
        },
        {
            id: 'guess_number',
            title: '6. Adivinhe o Número',
            description: 'Tente adivinhar o número secreto entre 1 e 10. O laço continua até você acertar!',
            inputs: [
                { type: 'number', id: 'guess', placeholder: 'Digite seu palpite' }
            ],
            execute: (inputs, state) => {
                // 'state' é usado para manter o número secreto entre as tentativas
                state.secretNumber = state.secretNumber || Math.floor(Math.random() * 10) + 1;
                const guess = parseInt(inputs.guess);
                if (isNaN(guess)) return 'Digite um número válido.';

                let result = '';
                let attempts = state.attempts || 0;
                attempts++;

                let i = 0; // Apenas para simular o 'while'
                while (i < 1) {
                    if (guess === state.secretNumber) {
                        result = `Parabéns! Você acertou o número ${state.secretNumber} em ${attempts} tentativas!\nUm novo número foi gerado.`;
                        state.secretNumber = null; // Reseta para o próximo jogo
                        state.attempts = 0;
                    } else if (guess < state.secretNumber) {
                        result = 'O número secreto é MAIOR. Tente de novo!';
                    } else {
                        result = 'O número secreto é MENOR. Tente de novo!';
                    }
                    i++;
                }
                state.attempts = attempts;
                return result;
            }
        },
        {
            id: 'password',
            title: '7. Validação de Senha',
            description: 'O laço continua enquanto a senha estiver incorreta. A senha correta é "abacate".',
            inputs: [
                { type: 'text', id: 'password', placeholder: 'Digite a senha' }
            ],
            execute: (inputs) => {
                const correctPassword = 'abacate';
                let enteredPassword = inputs.password;
                let result = 'Analisando...\n';

                while (enteredPassword !== correctPassword) {
                    return result + 'Senha incorreta. Tente novamente.';
                }

                return result + 'Senha correta! Acesso concedido.';
            }
        },
        {
            id: 'investment',
            title: '8. Simulação de Investimento',
            description: 'Calcula quantos meses levará para um valor inicial atingir uma meta com juros mensais.',
            inputs: [
                { type: 'number', id: 'initial', placeholder: 'Valor Inicial (R$)' },
                { type: 'number', id: 'target', placeholder: 'Meta (R$)' },
                { type: 'number', id: 'interest', placeholder: 'Juros Mensais (%)' }
            ],
            execute: (inputs) => {
                let currentAmount = parseFloat(inputs.initial);
                const target = parseFloat(inputs.target);
                const interestRate = parseFloat(inputs.interest) / 100;
                if (isNaN(currentAmount) || isNaN(target) || isNaN(interestRate) || currentAmount <= 0 || target <= 0 || interestRate <= 0) {
                    return "Erro: Todos os valores devem ser positivos.";
                }
                if (currentAmount >= target) return "O valor inicial já é maior ou igual à meta.";

                let months = 0;
                let result = `Simulação:\n\n`;
                while (currentAmount < target) {
                    currentAmount += currentAmount * interestRate;
                    months++;
                    if (months <= 24 || currentAmount >= target) { // Limita a exibição para não poluir
                        result += `Mês ${months}: R$ ${currentAmount.toFixed(2)}\n`;
                    } else if (months === 25) {
                        result += `(... pulando para o final ...)\n`
                    }
                }
                return result + `\nSerão necessários ${months} meses para atingir a meta de R$ ${target.toFixed(2)}.`;
            }
        },
        {
            id: 'find_multiple',
            title: '9. Encontrar Múltiplo',
            description: 'Encontra o primeiro número, a partir de um ponto inicial, que seja múltiplo de outro.',
            inputs: [
                { type: 'number', id: 'startPoint', placeholder: 'Iniciar busca a partir de:' },
                { type: 'number', id: 'multipleOf', placeholder: 'Múltiplo de:' }
            ],
            execute: (inputs) => {
                let currentNumber = parseInt(inputs.startPoint);
                const multipleOf = parseInt(inputs.multipleOf);
                if (isNaN(currentNumber) || isNaN(multipleOf) || multipleOf === 0) return "Erro: Insira números válidos (o múltiplo não pode ser zero)."

                let result = `Buscando o próximo múltiplo de ${multipleOf} a partir de ${currentNumber}...\n`;

                while (currentNumber % multipleOf !== 0) {
                    currentNumber++;
                }

                return result + `\nEncontrado: ${currentNumber} é o próximo múltiplo de ${multipleOf}.`;
            }
        },
        {
            id: 'remove_letters',
            title: '10. Remover Letra da Frase',
            description: 'Remove todas as ocorrências de uma letra específica de uma frase.',
            inputs: [
                { type: 'text', id: 'phrase', placeholder: 'Digite uma frase' },
                { type: 'text', id: 'letter', placeholder: 'Letra para remover' }
            ],
            execute: (inputs) => {
                let originalPhrase = inputs.phrase;
                const letterToRemove = inputs.letter;
                if (!originalPhrase || !letterToRemove || letterToRemove.length !== 1) return "Erro: Preencha a frase e uma única letra para remover."

                let newPhrase = '';
                let i = 0;
                while (i < originalPhrase.length) {
                    if (originalPhrase[i].toLowerCase() !== letterToRemove.toLowerCase()) {
                        newPhrase += originalPhrase[i];
                    }
                    i++;
                }
                return `Frase Original: "${originalPhrase}"\nFrase Modificada: "${newPhrase}"`;
            }
        }
    ];

    // --- ELEMENTOS DO DOM ---
    const exampleList = document.getElementById('exampleList');
    const exampleTitle = document.getElementById('exampleTitle');
    const exampleDescription = document.getElementById('exampleDescription');
    const inputArea = document.getElementById('inputArea');
    const executarBtn = document.getElementById('executarBtn');
    const output = document.getElementById('output');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');

    let activeExample = null;
    let exampleState = {}; // Para armazenar estados, como o número secreto do jogo

    // --- FUNÇÕES ---

    // Popula a lista de exemplos na sidebar
    function populateExamples() {
        exampleList.innerHTML = '';
        examples.forEach(example => {
            const li = document.createElement('li');
            li.textContent = example.title;
            li.dataset.id = example.id;
            li.addEventListener('click', () => selectExample(example));
            exampleList.appendChild(li);
        });
    }

    // Seleciona um exemplo para exibir
    function selectExample(example) {
        activeExample = example;
        exampleState = {}; // Reseta o estado ao trocar de exemplo

        // Atualiza a aparência da lista
        document.querySelectorAll('.example-list li').forEach(li => {
            li.classList.toggle('active', li.dataset.id === example.id);
        });

        // Atualiza a área de conteúdo
        exampleTitle.textContent = example.title;
        exampleDescription.textContent = example.description;
        output.textContent = 'O resultado aparecerá aqui...';

        // Cria os inputs necessários
        inputArea.innerHTML = '';
        example.inputs.forEach(input => {
            const inputEl = document.createElement('input');
            inputEl.type = input.type;
            inputEl.id = input.id;
            inputEl.placeholder = input.placeholder;
            inputArea.appendChild(inputEl);
        });

        // Fecha a sidebar no mobile ao selecionar
        if (window.innerWidth <= 900) {
            sidebar.classList.remove('open');
        }
    }

    // Executa o código do exemplo ativo
    function executeCode() {
        if (!activeExample) {
            output.textContent = 'Por favor, selecione um exemplo primeiro.';
            return;
        }

        // Coleta os valores dos inputs
        const inputs = {};
        activeExample.inputs.forEach(input => {
            inputs[input.id] = document.getElementById(input.id).value;
        });

        // Executa a função do exemplo e exibe o resultado
        try {
            const result = activeExample.execute(inputs, exampleState);
            output.textContent = result;
        } catch (error) {
            output.textContent = `Ocorreu um erro inesperado: ${error.message}`;
            console.error(error);
        }
    }

    // --- INICIALIZAÇÃO E EVENT LISTENERS ---
    populateExamples();
    executarBtn.addEventListener('click', executeCode);
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

});
