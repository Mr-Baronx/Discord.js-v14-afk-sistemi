# Discord.js v14 AFK Sistemi

Bu proje, Discord.js v14 kullanılarak geliştirilmiş gelişmiş bir AFK (Away From Keyboard) sistemidir. Kullanıcıların AFK durumuna geçmesini, bildirim tercihlerini yönetmesini ve diğer kullanıcıların AFK durumundaki kişileri etiketlemesini kontrol eder.

## 🌟 Özellikler

- ✅ Slash komut desteği
- ✅ Bildirim tercihi sistemi
- ✅ Otomatik isim değiştirme
- ✅ AFK süre takibi
- ✅ Etiket koruma sistemi
- ✅ Özelleştirilebilir emoji sistemi

## 📋 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/Discord.js-v14-AFK-sistemi.git
cd Discord.js-v14-AFK-sistemi
```

2. Gerekli paketleri yükleyin:
```bash
npm install
```

3. `config.json` dosyasını düzenleyin:
```json
{
    "emojis": {
        "success": "<a:success:1362068750148571196>",
        "info": "<:Info:1362068747904487495>",
        "time": "<:Time:1362068747904487495>",
        "warning": "<:Warning:1362068747904487495>"
    }
}
```

4. Botu başlatın:
```bash
node dex.js
```

## 🛠️ Komutlar

### /afk
- **sebep**: AFK olma sebebiniz (zorunlu)
- **bildirim**: AFK bildirimlerini almak istiyor musunuz? (zorunlu)
  - ✅ Evet: Etiketlendiğinizde mesaj silinir.
  - ❌ Hayır: Etiketlendiğinizde mesaj silinmez.

## 📁 Proje Yapısı

```
Discord.js-v14-AFK-sistemi/
├── commands/
│   └── afk.js          # AFK komut işleyicisi
├── events/
│   └── messageCreate.js # Mesaj olayları işleyicisi
├── config.json         # Bot yapılandırması
├── dex.js             # Ana bot dosyası
└── README.md          # Bu dosya
```

## 🔧 Özelleştirme

### Emojiler
Emojileri `config.json` dosyasından özelleştirebilirsiniz:
```json
"emojis": {
    "success": "<a:success:EMOJI_ID>",
    "info": "<:Info:EMOJI_ID>",
    "time": "<:Time:EMOJI_ID>",
    "warning": "<:Warning:EMOJI_ID>"
}
```

## 📝 Kullanım

1. `/afk` komutunu kullanarak AFK moduna geçin
2. Sebep ve bildirim tercihinizi belirtin
3. Sistem otomatik olarak:
   - İsminize [AFK] tagı ekler
   - AFK durumunuzu kaydeder
   - Etiketlendiğinizde (bildirim açıksa) uyarı verir
   - Mesaj attığınızda AFK modundan çıkar

## ⚠️ Gereksinimler

- Node.js v16.9.0 veya üzeri
- Discord.js v14
- croxydb

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Katkıda Bulunma

Bu proje [Mr. Baron](https://github.com/Mr-Baronx) tarafından geliştirilmiştir. Projeye katkıda bulunmak için:


### Özel Teşekkürler
- [Mr. Baron](https://github.com/Mr-Baronx) - Proje Geliştiricisi

