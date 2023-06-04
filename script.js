    function convertToArabic() {
        const romanNumber = document.getElementById('romanInput').value;
        const arabicEquivalent = romanToArabic(romanNumber);
        document.getElementById('arabicResult').innerText = `Arábico equivalente: ${arabicEquivalent}`;
    }
    
    function convertToRomano() {
        const arabicNumber = document.getElementById('arabicInput').value;
        const romanEquivalent = arabicToRomano(arabicNumber);
        document.getElementById('romanResult').innerText = `Romano equivalente: ${romanEquivalent}`;
    }
  
        // Função para converter números romanos para arábicos
        function romanToArabic(romanNumber) {
        const romanNumerals = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000
        };

        let arabicNumber = 0;

        // Percorre cada algarismo romano na string de entrada
        for (let i = 0; i < romanNumber.length; i++) {
            const currentSymbol = romanNumber[i];
            const currentValue = romanNumerals[currentSymbol];

            // Verifica se o próximo algarismo tem um valor maior
            if (i + 1 < romanNumber.length) {
            const nextSymbol = romanNumber[i + 1];
            const nextValue = romanNumerals[nextSymbol];

            // Se o próximo algarismo tiver um valor maior, subtrai o valor atual
            if (nextValue > currentValue) {
                arabicNumber -= currentValue;
            } else {
                arabicNumber += currentValue;
            }
            } else {
            arabicNumber += currentValue;
            }
        }

        return arabicNumber;
        }

        // Função para converter números arábicos para romanos
        function arabicToRomano(arabicNumber) {
        const romanNumerals = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];

        let romanNumber = '';

        // Percorre cada objeto no array de algarismos romanos
        for (let i = 0; i < romanNumerals.length; i++) {
            const { value, symbol } = romanNumerals[i];

            // Verifica quantas vezes o algarismo romano pode ser subtraído do número arábico
            while (arabicNumber >= value) {
            romanNumber += symbol;
            arabicNumber -= value;
            }
        }

        return romanNumber;
        }

        // Testa a função de conversão de números romanos para arábicos
        const romanNumber = 'XL';
        const arabicEquivalent = romanToArabic(romanNumber);
        console.log(`${romanNumber} em arábico é ${arabicEquivalent}`);

        // Testa a função de conversão de números arábicos para romanos
        const arabicNumber = 90;
        const romanEquivalent = arabicToRomano(arabicNumber);
        console.log(`${arabicNumber} em romano é ${romanEquivalent}`);
        //fim de conversão de números romanos para arâbicos e vice versa