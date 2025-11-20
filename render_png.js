const puppeteer = require('puppeteer');
const path = require('path');

async function renderPage() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Define a viewport para simular um dispositivo móvel (Mobile-First)
    await page.setViewport({
        width: 414, // Largura de um iPhone 8 Plus/X em modo retrato
        height: 736,
        deviceScaleFactor: 2,
        isMobile: true
    });

    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Espera um pouco para garantir que todos os estilos foram aplicados
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Captura a tela inteira (fullPage: true) para incluir todo o conteúdo da landing page
    await page.screenshot({
        path: 'landing_page_black_friday.png',
        fullPage: true
    });

    await browser.close();
    console.log('landing_page_black_friday.png gerada com sucesso.');
}

renderPage().catch(err => {
    console.error('Erro ao renderizar a página:', err);
    process.exit(1);
});
