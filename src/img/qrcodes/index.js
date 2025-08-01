// Smooth scrolling for navigation
document.querySelector('.scroll-down').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.story-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Improved Carousel
const slider = document.querySelector('.gallery-slider');
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.gallery-dot');
let currentIndex = 0;

// Auto-advance every 5 seconds
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

// Add arrow click events
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

// Pause auto-slide on hover
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// Handle swipe/touch events
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

// Form submission
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

        // Show success message
        form.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 20px;">
                        <h3 style="color: var(--gold); margin-bottom: 15px;">Confirmação recebida!</h3>
                        <p style="font-size: 1.1rem;">Obrigado por confirmar sua presença. Estamos ansiosos para celebrar com você.</p>
                        <i class="fas fa-check-circle" style="font-size: 48px; color: var(--gold); margin-top: 20px;"></i>
                    </div>
                `;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente mais tarde.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});


// Google Sheets integration
const scriptURL = 'https://script.google.com/macros/s/AKfycbx0n0En-ry9Wf1U4LUOKcmBF5jtgd3N8OHxIGNAO_Nv98C7683Urk2ZR6eFfa_LBIBSnA/exec'; // Replace with your Google Apps Script web app URL

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

const PIX_KEY_FIXA = "eltonpena59@gmail.com"; // Replace with your actual Pix key

const PIX_DATA_POR_VALOR = {
    "50.80": { // Use a string of the price as the key
        qrCodeUrl: "./img/qrcodes/5080.jpg", // Path to your pre-generated QR code image
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540550.805802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525gNJQrQcG57FshTWFLQ3o12msX63043588" // The actual BR Code for R$50,80
    },
    "149.90": {
        qrCodeUrl: "./img/qrcodes/14990.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406149.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525BHzGOAi6znkrVNaHMk4ZPEKCP63046847" // The actual BR Code for R$149,90
    },
    "119.90": {
        qrCodeUrl: "./img/qrcodes/11990.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406119.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525uty4rIfYo3KSnqfCCDygO0Xov6304C068"
    },
    "57.08": {
        qrCodeUrl: "./img/qrcodes/5708.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540557.085802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525CtiafTFVi14OvPBcPhooAb78A630467D4"
    },
    "117.00": {
        qrCodeUrl: "./img/qrcodes/117.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406117.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525P2YzncAqXusMpRky3NAuv88Wy63047B2E"
    },
    "114.90": {
        qrCodeUrl: "./img/qrcodes/11490.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406114.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525BNo5Q4GhvlPTcZkLrWj4hJH2O6304065D"
    },
    "64.69": {
        qrCodeUrl: "./img/qrcodes/6469.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540564.695802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905252i4E4FTOYfeESkshZKxdsiYlo63047CB4"
    },
    "62.13": {
        qrCodeUrl: "./img/qrcodes/6213.jpg",
        pixBrCode: "00020126500014br.gov.bcb.pix0121eltonpena59@gmail.com0203Pix520400005303986540562.135802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525f4mlBIml2haLaQI3prxRjpmoS630490A7"
    },
    "78.99": {
        qrCodeUrl: "./img/qrcodes/7899.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540578.995802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525tShh7JvBMz5eKUUzrh6GfrvJ863045832"
    },
    "55.00": {
        qrCodeUrl: "./img/qrcodes/55.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540555.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525WGiLhviAg9HK4WZ5Kq5v61js96304790C"
    },
    "59.90": {
        qrCodeUrl: "./img/qrcodes/5990.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540559.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525rGHgYSFeqKvZ9wLsNiKxmfUlc6304FB3F"
    },
    "44.90": {
        qrCodeUrl: "./img/qrcodes/4490.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540544.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525KrXd4or77BtQ8K5BSXFt9t7q96304B0F3"
    },
    "43.20": {
        qrCodeUrl: "./img/qrcodes/4320.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540543.205802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905254I04CdeEn5qJH1DhlBOqtyqd563048AB0"
    },
    "45.90": {
        qrCodeUrl: "./img/qrcodes/4590.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540545.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525rPSBjC1ALsFGMwHLBytiGh6EZ63045B69"
    },
    "39.01": {
        qrCodeUrl: "./img/qrcodes/3901.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540539.015802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525KiaSINCli78F5KvNjsiIwGokh63043DD2"
    },
    "139.90": {
        qrCodeUrl: "./img/qrcodes/13990.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406139.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525SCPCczcaTQF2HFE6QJ1P61R8J6304B60C"
    },
    "114.00": {
        qrCodeUrl: "./img/qrcodes/114.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406114.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905251lAkDZYNhHzPL3Qk77EonFjxI6304DCEB"
    },
    "45.00": {
        qrCodeUrl: "./img/qrcodes/45.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540545.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525YVIvULG9fsxMYwMsoMWo8bGGP63045E01"
    },
    "62.78": {
        qrCodeUrl: "./img/qrcodes/6278.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540562.785802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525OxNSVGq3ZDLO4ZqM5BmkF26u463042E2D"
    },
    "140.00": {
        qrCodeUrl: "./img/qrcodes/140.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406140.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525YMekEYiNtkRIDSgEsNXhHNAW56304EAC1"
    },
    "79.00": {
        qrCodeUrl: "./img/qrcodes/79.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540579.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525GTZvMccgbzD23gfUiAC7pleJI63040476"
    },
    "78.90": {
        qrCodeUrl: "./img/qrcodes/7890.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540578.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525QQ4WK22nYldI82H6pRSdG9Eca63046130"
    },
    "73.99": {
        qrCodeUrl: "./img/qrcodes/7399.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540573.995802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525DLmbC5lGGTgfDWjULaveoHmqE630478FA"
    },
    "148.54": {
        qrCodeUrl: "./img/qrcodes/14854.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406148.545802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525hlvYl93pvDU97H0XpKgGCUZwv630454FC"
    },
    "113.10": {
        qrCodeUrl: "./img/qrcodes/11310.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406113.105802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905259RNs2NqXKs5dgYstRVKao1goG6304CB08"
    },
    "117.10": {
        qrCodeUrl: "./img/qrcodes/11710.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406117.105802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525dIn8p6AqzvhP0LBezXSJQ7m4q6304CA3E"
    },
    "67.04": {
        qrCodeUrl: "./img/qrcodes/6704.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540567.045802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525U0DPwLn7QELFC6DR8ROI063Em6304A21C"
    },
    "78.00": {
        qrCodeUrl: "./img/qrcodes/7800.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540578.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525VxD77eUlRwESbsrnZdYU3pSOD63044DBF"
    },
    "64.88": {
        qrCodeUrl: "./img/qrcodes/6488.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro520400005303986540564.885802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525Nb3bjCbDsHocuO948fZ39gC5863042BC6"
    },
    "109.39": {
        qrCodeUrl: "./img/qrcodes/10939.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406109.395802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525hTNfl4MqZQNeM4mCFNxGeJgxO630404CF"
    },
    "149.38": {
        qrCodeUrl: "./img/qrcodes/14938.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406149.385802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905257BLgozhpNV2ysJkaeGoL81YDs63046E5B"
    },
    "149.00": {
        qrCodeUrl: "./img/qrcodes/14900.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406149.005802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525yxlY30400Zvs228R6QN2EGp5X6304B1A6"
    },
    "174.42": {
        qrCodeUrl: "./img/qrcodes/17442.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406174.425802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM62290525VMW1L4lyqhgBnm2HE44v46UKr6304619A"
    },
    "150.90": {
        qrCodeUrl: "./img/qrcodes/15090.jpg",
        pixBrCode: "00020126600014br.gov.bcb.pix0121eltonpena59@gmail.com0213Bodas de Ouro5204000053039865406150.905802BR5925ARTHUR MARQUES ARAUJO PEN6008CONTAGEM622905253Wlh6Eg9jTnyEWLFGl6e0oZQj6304A3A3"
    }
};

function generatePixData(value) {
    const pixDataEntry = PIX_DATA_POR_VALOR[value];

    if (pixDataEntry) {
        const pixValue = parseFloat(value).toFixed(2);
        return {
            qrCodeUrl: pixDataEntry.qrCodeUrl,
            pixBrCode: pixDataEntry.pixBrCode,
            pixKey: PIX_KEY_FIXA, // Use the fixed Pix key
            pixValue: `R$ ${pixValue.replace('.', ',')}` // Brazilian format
        };
    } else {
        console.error("Pix data not found for value:", value);
        // Fallback for general donation if product-specific data isn't found
        return {
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("00020126...54050.01...6304XXXX")}`, // Generic QR
            pixBrCode: "00020126...54050.01...6304XXXX", // Generic BR Code
            pixKey: PIX_KEY_FIXA,
            pixValue: "R$ 0,00 (Valor não encontrado)"
        };
    }
}

// Elements for the gift choice modal
const giftChoiceModal = document.getElementById('giftChoiceModal');
const closeGiftChoiceModalButton = document.getElementById('closeGiftChoiceModal');
const giftChoicePixButton = document.getElementById('giftChoicePixButton');
const giftChoiceMercadoLivreButton = document.getElementById('giftChoiceMercadoLivreButton');

// Elements for the Pix modal (existing)
const pixModal = document.getElementById('pixModal');
const closePixModalButton = pixModal.querySelector('.close-button'); // Renamed for clarity
const qrCodeContainer = document.getElementById('qrCodeContainer');
const pixCopiaEColaCode = document.getElementById('pixCopiaEColaCode');
const copyPixCodeButton = document.getElementById('copyPixCodeButton');
const displayPixKey = document.getElementById('displayPixKey');
const displayPixValue = document.getElementById('displayPixValue');

let currentProductPrice = '';
let currentProductLink = '';

// Event listener for "Escolher Presente" buttons
document.querySelectorAll('.choose-gift-button').forEach(button => {
    button.addEventListener('click', function() {
        currentProductPrice = this.getAttribute('data-product-price');
        currentProductLink = this.getAttribute('data-product-link');
        
        // Update the Mercado Livre button's href in the choice modal
        giftChoiceMercadoLivreButton.href = currentProductLink;

        giftChoiceModal.style.display = 'flex'; // Display the gift choice modal
    });
});

// Event listener for "Fazer Pix" button inside the gift choice modal
giftChoicePixButton.addEventListener('click', () => {
    giftChoiceModal.style.display = 'none'; // Hide the gift choice modal
    const pixData = generatePixData(currentProductPrice);

    // Clear previous QR Code and add the new one
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

    pixModal.style.display = 'flex'; // Display the Pix modal
});

// Event listener for closing the gift choice modal
closeGiftChoiceModalButton.addEventListener('click', () => {
    giftChoiceModal.style.display = 'none';
});

// Close the gift choice modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target == giftChoiceModal) {
        giftChoiceModal.style.display = 'none';
    }
});

// Event listener for closing the Pix modal
closePixModalButton.addEventListener('click', () => {
    pixModal.style.display = 'none';
});

// Close the Pix modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target == pixModal) {
        pixModal.style.display = 'none';
    }
});

// Copiar código Pix Copia e Cola para a área de transferência
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