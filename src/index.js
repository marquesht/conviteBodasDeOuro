document.querySelector('.scroll-down').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.story-section').scrollIntoView({
        behavior: 'smooth'
    });
});

const slider = document.querySelector('.gallery-slider');
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.gallery-dot');
let currentIndex = 0;

let autoSlide = setInterval(nextSlide, 5000);

function goToSlide(index) {
    currentIndex = index;
    const slideWidth = slides[index].offsetWidth;
    slider.scrollTo({
        left: index * (slideWidth + 20),
        behavior: 'smooth'
    });
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
}

document.querySelector('.gallery-arrow.next').addEventListener('click', () => {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, 5000);
});

document.querySelector('.gallery-arrow.prev').addEventListener('click', () => {
    clearInterval(autoSlide);
    prevSlide();
    autoSlide = setInterval(nextSlide, 5000);
});

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', function () {
        clearInterval(autoSlide);
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        goToSlide(slideIndex);
        autoSlide = setInterval(nextSlide, 5000);
    });
});

slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoSlide);
}, { passive: true });

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    autoSlide = setInterval(nextSlide, 5000);
}, { passive: true });

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }
}

const form = document.getElementById('rsvpForm');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(form);
        await submitToGoogleSheets(formData);

        form.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 20px;">
                        <h3 style="color: var(--gold); margin-bottom: 15px;">Confirmação recebida!</h3>
                        <p style="font-size: 1.1rem;">Obrigado por confirmar sua presença. Estamos ansiosos para celebrar com você.</p>
                        <i class="fas fa-check-circle" style="font-size: 48px; color: var(--gold); margin-top: 20px;"></i>
                    </div>
                `;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente mais tarde.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});


const scriptURL = {urlDaSuaPlanilha};

async function submitToGoogleSheets(formData) {
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.text();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const PIX_KEY_FIXA = {chavePix}; //Coloque a chave pix fixa

const PIX_DATA_POR_VALOR = { //Os qrcodes não são gerados automaticamente, necessário gerá-los manualmente e adicionar aqui 
    "150.90": {
        qrCodeUrl: "./img/qrcodes/15090.jpg", //Imagem do QRCode
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406150.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905253Wlh6Eg9jTnyEWLFGl6e0oZQj6304A3A3" //Pix Copia e Cola
    }
};

function generatePixData(value) {
    const pixDataEntry = PIX_DATA_POR_VALOR[value];

    if (pixDataEntry) {
        const pixValue = parseFloat(value).toFixed(2);
        return {
            qrCodeUrl: pixDataEntry.qrCodeUrl,
            pixBrCode: pixDataEntry.pixBrCode,
            pixKey: PIX_KEY_FIXA, 
            pixValue: `R$ ${pixValue.replace('.', ',')}` 
        };
    } else {
        console.error("Pix data not found for value:", value);
        return {
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("00020126...54050.01...6304XXXX")}`, 
            pixBrCode: "00020126...54050.01...6304XXXX", 
            pixKey: PIX_KEY_FIXA,
            pixValue: "R$ 0,00 (Valor não encontrado)"
        };
    }
}

const giftChoiceModal = document.getElementById('giftChoiceModal');
const closeGiftChoiceModalButton = document.getElementById('closeGiftChoiceModal');
const giftChoicePixButton = document.getElementById('giftChoicePixButton');
const giftChoiceMercadoLivreButton = document.getElementById('giftChoiceMercadoLivreButton');

const pixModal = document.getElementById('pixModal');
const closePixModalButton = pixModal.querySelector('.close-button'); 
const qrCodeContainer = document.getElementById('qrCodeContainer');
const pixCopiaEColaCode = document.getElementById('pixCopiaEColaCode');
const copyPixCodeButton = document.getElementById('copyPixCodeButton');
const displayPixKey = document.getElementById('displayPixKey');
const displayPixValue = document.getElementById('displayPixValue');

let currentProductPrice = '';
let currentProductLink = '';

document.querySelectorAll('.choose-gift-button').forEach(button => {
    button.addEventListener('click', function() {
        currentProductPrice = this.getAttribute('data-product-price');
        currentProductLink = this.getAttribute('data-product-link');
        
        giftChoiceMercadoLivreButton.href = currentProductLink;

        giftChoiceModal.style.display = 'flex'; 
    });
});

giftChoicePixButton.addEventListener('click', () => {
    giftChoiceModal.style.display = 'none'; 
    const pixData = generatePixData(currentProductPrice);

    qrCodeContainer.innerHTML = '';
    if (pixData.qrCodeUrl) {
        const qrImg = document.createElement('img');
        qrImg.src = pixData.qrCodeUrl;
        qrImg.alt = 'QR Code Pix';
        qrCodeContainer.appendChild(qrImg);
    } else {
        qrCodeContainer.textContent = "QR Code indisponível.";
    }

    pixCopiaEColaCode.textContent = pixData.pixBrCode;
    displayPixKey.textContent = pixData.pixKey;
    displayPixValue.textContent = pixData.pixValue;

    pixModal.style.display = 'flex'; 
});

closeGiftChoiceModalButton.addEventListener('click', () => {
    giftChoiceModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == giftChoiceModal) {
        giftChoiceModal.style.display = 'none';
    }
});

closePixModalButton.addEventListener('click', () => {
    pixModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == pixModal) {
        pixModal.style.display = 'none';
    }
});

copyPixCodeButton.addEventListener('click', () => {
    const textToCopy = pixCopiaEColaCode.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Código Pix Copia e Cola copiado!');
        })
        .catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Não foi possível copiar o código. Por favor, copie manualmente.');
        });
});
