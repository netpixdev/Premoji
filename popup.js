const categoryButtons = document.getElementById('category-buttons');
const emojiContainer = document.getElementById('emoji-container');

// Kategori butonlarını oluştur
Object.keys(emojiData).forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.className = 'category-button';
    button.addEventListener('click', () => showCategory(category));
    categoryButtons.appendChild(button);
});

// Rastgele 20 emoji göster
function showRandomEmojis() {
    const allEmojis = Object.values(emojiData).flat();
    const randomEmojis = [];
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * allEmojis.length);
        randomEmojis.push(allEmojis[randomIndex]);
    }
    displayEmojis(randomEmojis, 'Rastgele');
}

// Kategori emojilerini göster
function showCategory(category) {
    displayEmojis(emojiData[category], category);
}

// Emojileri ekrana yerleştir
function displayEmojis(emojis, category) {
    emojiContainer.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'emoji-table';
    table.setAttribute('data-category', category);
    
    const fontSize = getCategoryFontSize(category);
    const emojisPerRow = category === 'El ve Vücut Hareketleri' ? 4 : 5;
    
    for (let i = 0; i < emojis.length; i += emojisPerRow) {
        const row = table.insertRow();
        for (let j = 0; j < emojisPerRow; j++) {
            if (i + j < emojis.length) {
                const cell = row.insertCell();
                const emoji = emojis[i + j];
                cell.textContent = emoji;
                cell.className = 'emoji';
                cell.style.fontSize = fontSize;
                cell.addEventListener('click', () => copyEmoji(emoji));
            }
        }
    }
    
    emojiContainer.appendChild(table);
}

// Kategori için font boyutunu belirle
function getCategoryFontSize(category) {
    switch(category) {
        case 'El ve Vücut Hareketleri':
            return '20px';
        case 'Yüz İfadeleri':
            return '24px';
        case 'Hayvanlar ve Doğa':
            return '22px';
        case 'Yiyecek ve İçecekler':
            return '22px';
        case 'Aktiviteler ve Sporlar':
            return '20px';
        case 'Nesneler':
            return '22px';
        default:
            return '22px';
    }
}

// Emojiyi panoya kopyala
function copyEmoji(emoji) {
    navigator.clipboard.writeText(emoji).then(() => {
        alert('Emoji kopyalandı: ' + emoji);
    });
}

// Sayfa yüklendiğinde rastgele emojileri göster
document.addEventListener('DOMContentLoaded', showRandomEmojis);