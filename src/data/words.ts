export type Level = 'B1' | 'B2' | 'C1' | 'C2';
export type Category = 'Academic' | 'Daily Life' | 'Business' | 'Science & Tech';

export interface Word {
  id: number;
  en: string;
  tr: string;
  level: Level;
  category: Category;
  exampleEn: string;
  exampleTr: string;
  imageUrl?: string;
  emoji?: string;
}

export const ieltsWords: Word[] = [
  {
    id: 1,
    en: "Abundant",
    tr: "Bol, bereketli",
    level: "B2",
    category: "Academic",
    exampleEn: "There is an abundant supply of water in this region.",
    exampleTr: "Bu bölgede bol miktarda su kaynağı bulunmaktadır.",
    imageUrl: "https://loremflickr.com/400/400/waterfall",
    emoji: "🌊"
  },
  {
    id: 2,
    en: "Accomplish",
    tr: "Başarmak, sonuçlandırmak",
    level: "B1",
    category: "Daily Life",
    exampleEn: "She will accomplish great things if she stays focused.",
    exampleTr: "Odaklanmaya devam ederse harika şeyler başaracak.",
    imageUrl: "https://loremflickr.com/400/400/mountain,peak",
    emoji: "🏆"
  },
  {
    id: 3,
    en: "Adequate",
    tr: "Yeterli, kafi",
    level: "B2",
    category: "Academic",
    exampleEn: "The room was small but adequate for our needs.",
    exampleTr: "Oda küçüktü ama ihtiyaçlarımız için yeterliydi.",
    imageUrl: "https://loremflickr.com/400/400/cozy,room",
    emoji: "✅"
  },
  {
    id: 4,
    en: "Anticipate",
    tr: "Beklemek, ummak, tahmin etmek",
    level: "B2",
    category: "Business",
    exampleEn: "We anticipate sales will rise next quarter.",
    exampleTr: "Gelecek çeyrekte satışların artmasını bekliyoruz.",
    imageUrl: "https://loremflickr.com/400/400/calendar",
    emoji: "🔮"
  },
  {
    id: 5,
    en: "Assess",
    tr: "Değerlendirmek, değer biçmek",
    level: "B2",
    category: "Academic",
    exampleEn: "The committee will assess the damage to the building.",
    exampleTr: "Komite binadaki hasarı değerlendirecek.",
    imageUrl: "https://loremflickr.com/400/400/checklist",
    emoji: "📋"
  },
  {
    id: 6,
    en: "Cease",
    tr: "Durdurmak, kesmek",
    level: "C1",
    category: "Daily Life",
    exampleEn: "The factory has ceased operations due to the crisis.",
    exampleTr: "Kriz nedeniyle fabrika faaliyetlerini durdurdu.",
    imageUrl: "https://loremflickr.com/400/400/stop,sign",
    emoji: "🛑"
  },
  {
    id: 7,
    en: "Comprehend",
    tr: "Anlamak, kavramak",
    level: "C1",
    category: "Academic",
    exampleEn: "I failed to comprehend the complexity of the issue.",
    exampleTr: "Sorunun karmaşıklığını kavramakta başarısız oldum.",
    imageUrl: "https://loremflickr.com/400/400/brain",
    emoji: "🧠"
  },
  {
    id: 8,
    en: "Crucial",
    tr: "Çok önemli, kritik",
    level: "B2",
    category: "Academic",
    exampleEn: "It is crucial to follow the instructions carefully.",
    exampleTr: "Talimatları dikkatle takip etmek çok önemlidir.",
    imageUrl: "https://loremflickr.com/400/400/exclamation",
    emoji: "❗"
  },
  {
    id: 9,
    en: "Define",
    tr: "Tanımlamak",
    level: "B1",
    category: "Academic",
    exampleEn: "Can you define what success means to you?",
    exampleTr: "Başarının senin için ne anlama geldiğini tanımlayabilir misin?",
    imageUrl: "https://loremflickr.com/400/400/dictionary",
    emoji: "📖"
  },
  {
    id: 10,
    en: "Demonstrate",
    tr: "Göstermek, kanıtlamak",
    level: "B2",
    category: "Academic",
    exampleEn: "These results demonstrate that the theory is correct.",
    exampleTr: "Bu sonuçlar teorinin doğru olduğunu kanıtlıyor.",
    imageUrl: "https://loremflickr.com/400/400/presentation",
    emoji: "📊"
  },
  {
    id: 11,
    en: "Derive",
    tr: "Türetmek, elde etmek",
    level: "C1",
    category: "Science & Tech",
    exampleEn: "Many English words are derived from Latin.",
    exampleTr: "Birçok İngilizce kelime Latince'den türetilmiştir.",
    imageUrl: "https://loremflickr.com/400/400/tree,roots",
    emoji: "🧬"
  },
  {
    id: 12,
    en: "Evaluate",
    tr: "Değerlendirmek",
    level: "B2",
    category: "Academic",
    exampleEn: "We need to evaluate the impact of the new policy.",
    exampleTr: "Yeni politikanın etkisini değerlendirmemiz gerekiyor.",
    imageUrl: "https://loremflickr.com/400/400/scale,balance",
    emoji: "⚖️"
  },
  {
    id: 13,
    en: "Evident",
    tr: "Belirgin, açık",
    level: "B2",
    category: "Academic",
    exampleEn: "It is evident that she is very talented.",
    exampleTr: "Onun çok yetenekli olduğu açıkça belli.",
    imageUrl: "https://loremflickr.com/400/400/magnifying,glass",
    emoji: "🔍"
  },
  {
    id: 14,
    en: "Flunctuate",
    tr: "Dalgalanmak, inip çıkmak",
    level: "C1",
    category: "Business",
    exampleEn: "Prices fluctuate according to supply and demand.",
    exampleTr: "Fiyatlar arz ve talebe göre dalgalanır.",
    imageUrl: "https://loremflickr.com/400/400/chart,wave",
    emoji: "📈"
  },
  {
    id: 15,
    en: "Generate",
    tr: "Üretmek, oluşturmak",
    level: "B1",
    category: "Science & Tech",
    exampleEn: "The solar panels generate electricity for the entire house.",
    exampleTr: "Güneş panelleri tüm ev için elektrik üretiyor.",
    imageUrl: "https://loremflickr.com/400/400/lightbulb",
    emoji: "⚡"
  },
  {
    id: 16,
    en: "Hypothesis",
    tr: "Hipotez, varsayım",
    level: "C1",
    category: "Science & Tech",
    exampleEn: "The scientists set up an experiment to test their hypothesis.",
    exampleTr: "Bilim insanları hipotezlerini test etmek için bir deney kurdular.",
    imageUrl: "https://loremflickr.com/400/400/microscope",
    emoji: "🧪"
  },
  {
    id: 17,
    en: "Identify",
    tr: "Tanımlamak, kimliğini belirlemek",
    level: "B1",
    category: "Academic",
    exampleEn: "The witness could not identify the suspect.",
    exampleTr: "Tanık, şüphelinin kimliğini belirleyemedi.",
    imageUrl: "https://loremflickr.com/400/400/fingerprint",
    emoji: "🕵️"
  },
  {
    id: 18,
    en: "Illustrate",
    tr: "Örneklendirmek, çizimle göstermek",
    level: "B2",
    category: "Academic",
    exampleEn: "Let me illustrate this concept with a simple example.",
    exampleTr: "İzin verin, bu kavramı basit bir örnekle örneklendireyim.",
    imageUrl: "https://loremflickr.com/400/400/paintbrush",
    emoji: "🎨"
  },
  {
    id: 19,
    en: "Interpret",
    tr: "Yorumlamak, çevirmek",
    level: "B2",
    category: "Academic",
    exampleEn: "Different people will interpret the poem differently.",
    exampleTr: "Farklı insanlar şiiri farklı şekilde yorumlayacaktır.",
    imageUrl: "https://loremflickr.com/400/400/translate",
    emoji: "🗣️"
  },
  {
    id: 20,
    en: "Obtain",
    tr: "Elde etmek, edinmek",
    level: "B2",
    category: "Daily Life",
    exampleEn: "You need a prescription to obtain this medicine.",
    exampleTr: "Bu ilacı elde etmek için reçeteye ihtiyacınız var.",
    imageUrl: "https://loremflickr.com/400/400/package",
    emoji: "🛍️"
  },
  {
    id: 21,
    en: "Occur",
    tr: "Meydana gelmek, olmak",
    level: "B1",
    category: "Daily Life",
    exampleEn: "The accident occurred at the intersection.",
    exampleTr: "Kaza kavşakta meydana geldi.",
    imageUrl: "https://loremflickr.com/400/400/clock",
    emoji: "⏱️"
  },
  {
    id: 22,
    en: "Perceive",
    tr: "Algılamak, hissetmek",
    level: "C1",
    category: "Academic",
    exampleEn: "Animals can perceive sounds that humans cannot hear.",
    exampleTr: "Hayvanlar, insanların duyamayacağı sesleri algılayabilirler.",
    imageUrl: "https://loremflickr.com/400/400/eye",
    emoji: "👁️"
  },
  {
    id: 23,
    en: "Qualitative",
    tr: "Niteliksel, kalite ile ilgili",
    level: "C1",
    category: "Science & Tech",
    exampleEn: "The research used both qualitative and quantitative methods.",
    exampleTr: "Araştırma hem nitel hem de nicel yöntemler kullandı.",
    imageUrl: "https://loremflickr.com/400/400/color,palette",
    emoji: "📝"
  },
  {
    id: 24,
    en: "Quantitative",
    tr: "Niceliksel, miktar ile ilgili",
    level: "C1",
    category: "Science & Tech",
    exampleEn: "We need more quantitative data to support our claims.",
    exampleTr: "İddialarımızı desteklemek için daha fazla nicel veriye ihtiyacımız var.",
    imageUrl: "https://loremflickr.com/400/400/abacus",
    emoji: "🔢"
  },
  {
    id: 25,
    en: "Significant",
    tr: "Önemli, kayda değer",
    level: "B2",
    category: "Academic",
    exampleEn: "There has been a significant increase in online shopping.",
    exampleTr: "Online alışverişte kayda değer bir artış oldu.",
    imageUrl: "https://loremflickr.com/400/400/star",
    emoji: "🌟"
  },
];
