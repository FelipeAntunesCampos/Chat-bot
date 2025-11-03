// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Função que usamos para criar o delay entre uma ação e outra
const delay = ms => new Promise(res => setTimeout(res, ms)); 

// --- PONTO MAIS IMPORTANTE: ONDE FICA O FUNIL ---
// Todos os "if" de mensagem devem ficar DENTRO desta função
client.on('message', async msg => {
    // Garante que a mensagem é de um contato e não de um grupo, e que não é nula
    if (!msg.from.endsWith('@c.us') || msg.body === null) {
        return; 
    }

    // --- 1. FUNIL INICIAL (Mensagem 'teste') ---
    if (msg.body.match(/(teste)/i)) {
        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); 

        const contact = await msg.getContact(); 
        const name = contact.pushname.split(" ")[0]; 
        
        await client.sendMessage(msg.from,
            `Olá! ${name} Sou o assistente virtual da empresa Atual Correspondente Bancario. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n` + 
            `1 - Financiamento Imobiliário 🏠\n` +
            `2 - Empréstimo Consignado INSS 👵👴\n` +
            `3 - Empréstimo Consignado Servidor Público 🧑‍💼\n` +
            `4 - Cartão de Crédito Consignado 💳\n` +
            `5 - Consórcio Imobiliário Caixa 🏘️\n` +
            `6 - Consórcio de Veículos Caixa 🚗`
        );
        
        await delay(3000); 
        await chat.sendStateTyping(); 
        await delay(5000); 
        
        return;
    }

    // --- 2. RESPOSTA À OPÇÃO '1' (Financiamento Imobiliário) ---
    if (msg.body === '1') {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000); 
        
        // Mensagem da sub-opção Financiamento Imobiliário
        await client.sendMessage(msg.from,
            `🏠 Financiamento Imobiliário Caixa Escolha o tipo de financiamento que você deseja:\n\n` +
            `1.1 - Financiamento de Terreno 🏞️\n` +
            `1.2 - Financiamento para Construção 🏗️\n` +
            `1.3 - Financiamento de Terreno + Construção 🧱\n` +
            `1.4 - Financiamento de Imóvel Pronto – Usado 🏡\n` +
            `1.5 - Financiamento de Imóvel Pronto – Novo 🏠✨\n` +
            `1.6 - Refinanciamento de Imóvel Próprio 🔄`
        );
        
        await delay(3000); 
        await chat.sendStateTyping();
        await delay(5000);
        
        return; 
    }

    // --- 3. RESPOSTA À SUB-OPÇÃO '1.1' (Simulação de Financiamento de Terreno) ---
    if (msg.body === '1') {
        const chat = await msg.getChat();
        
        await delay(3000); 
        await chat.sendStateTyping(); 
        await delay(3000);
        
        await client.sendMessage(msg.from, 
            `📄 Para fazermos sua simulação de financiamento Caixa, precisamos das seguintes informações:\n\n` +
            `🔹 CPF: \n` +
            `🔹 Data de nascimento: \n\n` +
            `🔹 Renda bruta mensal: \n\n` +
            `🔹 Cidade do imóvel: \n\n` +
            `🔹 Valor do imóvel: \n\n` +
            `🔹 Valor desejado de financiamento: \n\n` +
            `🔹 Vai utilizar FGTS? (Sim/Não)`
        );

        await delay(3000); 
        await chat.sendStateTyping(); 
        await delay(3000);
        
        await client.sendMessage(msg.from, 
            `💡 Importante:\n` +
            `• Pelo sistema SAC, o financiamento pode chegar até 80% do valor do imóvel.\n\n` +
            `• Pelo sistema Price, o limite é de até 70%.\n\n` +
            `• Caso utilize o FGTS, é necessário se enquadrar nas regras da Caixa (imóvel residencial, não possuir outro imóvel na cidade, entre outros critérios).\n\n` +
            `📲 Assim que recebermos seus dados, retornaremos com a simulação personalizada!`
        );
        
        return;
    }

    // --- 4. OPÇÕES 2, 3, 4, 5 (QUE ESTAVAM FORA DO LUGAR) ---
    
    // **NOTA IMPORTANTE:** O texto abaixo (Plano Individual, Sorteio) não corresponde
    // ao menu que você enviou (Empréstimo INSS, etc.).
    // Você precisa atualizar o texto destas respostas.

    if (msg.body === '2') {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        // ATENÇÃO: Este texto é sobre "Planos". O seu menu dizia "Empréstimo INSS".
        await client.sendMessage(msg.from, '*Plano Individual:* R$22,50 por mês.\n\n*Plano Família:* R$39,90 por mês, inclui você mais 3 dependentes.\n\n*Plano TOP Individual:* R$42,50 por mês, com benefícios adicionais como\n\n*Plano TOP Família:* R$79,90 por mês, inclui você mais 3 dependentes');

        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
        return; // Adicionado return
    }

    if (msg.body === '3') {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        // ATENÇÃO: Este texto é sobre "Sorteio". O seu menu dizia "Empréstimo Servidor Público".
        await client.sendMessage(msg.from, 'Sorteio de em prêmios todo ano.\n\nAtendimento médico ilimitado 24h por dia.\n\nReceitas de medicamentos');
        
        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
        return; // Adicionado return
    }

    if (msg.body === '4') {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        // ATENÇÃO: Este texto é sobre "Aderir planos". O seu menu dizia "Cartão Consignado".
        await client.sendMessage(msg.from, 'Você pode aderir aos nossos planos diretamente pelo nosso site ou pelo WhatsApp.\n\nApós a adesão, você terá acesso imediato');

        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        await client.sendMessage(msg.from, 'Link para cadastro: https://site.com');
        return; // Adicionado return
    }

    if (msg.body === '5') {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping(); 
        await delay(3000);
        // ATENÇÃO: Este texto parece genérico. O seu menu dizia "Consórcio Imobiliário".
        await client.sendMessage(msg.from, 'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale aqui nesse whatsapp ou visite nosso site: https://site.com ');
        
        // As linhas abaixo estavam sobrando no seu código original e foram movidas para dentro do 'if'
        await delay(3000);
        await client.sendMessage(msg.from, 'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale aqui nesse whatsapp ou visite nosso site: https://site.com ');
        return; // Adicionado return
    }

}); // <-- FIM DO client.on('message', ...)


// --- CORREÇÃO PRINCIPAL: INICIALIZAÇÃO DO CLIENTE ---
// Criamos uma função async para "embrulhar" o await
async function start() {
    console.log("Iniciando o cliente...");
    // Agora o await está dentro de uma função async, o que é permitido
    await client.initialize();
}

// Chamamos a função para iniciar tudo
start();
