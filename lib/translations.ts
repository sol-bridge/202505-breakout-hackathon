import type { Language } from "@/components/language-switcher"

// 地域名の翻訳
export const locationTranslations: Record<string, Record<Language, string>> = {
  // 国
  "United States": {
    en: "United States",
    ja: "アメリカ合衆国",
  },
  Japan: {
    en: "Japan",
    ja: "日本",
  },
  "United Kingdom": {
    en: "United Kingdom",
    ja: "イギリス",
  },
  Canada: {
    en: "Canada",
    ja: "カナダ",
  },
  Australia: {
    en: "Australia",
    ja: "オーストラリア",
  },
  Singapore: {
    en: "Singapore",
    ja: "シンガポール",
  },
  Malaysia: {
    en: "Malaysia",
    ja: "マレーシア",
  },
  "United Arab Emirates": {
    en: "United Arab Emirates",
    ja: "アラブ首長国連邦",
  },
  China: {
    en: "China",
    ja: "中国",
  },
  "South Korea": {
    en: "South Korea",
    ja: "韓国",
  },
  France: {
    en: "France",
    ja: "フランス",
  },
  Germany: {
    en: "Germany",
    ja: "ドイツ",
  },
  Italy: {
    en: "Italy",
    ja: "イタリア",
  },
  Spain: {
    en: "Spain",
    ja: "スペイン",
  },

  // 日本の都道府県
  Hokkaido: {
    en: "Hokkaido",
    ja: "北海道",
  },
  Tokyo: {
    en: "Tokyo",
    ja: "東京都",
  },
  Osaka: {
    en: "Osaka",
    ja: "大阪府",
  },
  Kyoto: {
    en: "Kyoto",
    ja: "京都府",
  },
  Fukuoka: {
    en: "Fukuoka",
    ja: "福岡県",
  },
  Okinawa: {
    en: "Okinawa",
    ja: "沖縄県",
  },

  // 日本の都市
  Sapporo: {
    en: "Sapporo",
    ja: "札幌市",
  },
  Shinjuku: {
    en: "Shinjuku",
    ja: "新宿区",
  },
  Shibuya: {
    en: "Shibuya",
    ja: "渋谷区",
  },
  "Osaka City": {
    en: "Osaka City",
    ja: "大阪市",
  },
  "Kyoto City": {
    en: "Kyoto City",
    ja: "京都市",
  },
  "Fukuoka City": {
    en: "Fukuoka City",
    ja: "福岡市",
  },
  Naha: {
    en: "Naha",
    ja: "那覇市",
  },

  // アメリカの州と都市
  California: {
    en: "California",
    ja: "カリフォルニア州",
  },
  "New York": {
    en: "New York",
    ja: "ニューヨーク州",
  },
  Texas: {
    en: "Texas",
    ja: "テキサス州",
  },
  "San Francisco": {
    en: "San Francisco",
    ja: "サンフランシスコ",
  },
  "Los Angeles": {
    en: "Los Angeles",
    ja: "ロサンゼルス",
  },
  "New York City": {
    en: "New York City",
    ja: "ニューヨーク市",
  },

  // シンガポール
  "Central Business District": {
    en: "Central Business District",
    ja: "中心業務地区",
  },
  Sentosa: {
    en: "Sentosa",
    ja: "セントーサ島",
  },

  // マレーシア
  "Kuala Lumpur": {
    en: "Kuala Lumpur",
    ja: "クアラルンプール",
  },
  Penang: {
    en: "Penang",
    ja: "ペナン",
  },

  // UAE
  Dubai: {
    en: "Dubai",
    ja: "ドバイ",
  },
  "Abu Dhabi": {
    en: "Abu Dhabi",
    ja: "アブダビ",
  },
}

// 質問例の翻訳
export const questionTranslations: Record<string, Record<Language, string>> = {
  // 一般的な質問
  "What are popular events happening in {location} this weekend?": {
    en: "What are popular events happening in {location} this weekend?",
    ja: "{location}で今週末に開催される人気のイベントは何ですか？",
  },
  "Tell me about public transportation options in {location}.": {
    en: "Tell me about public transportation options in {location}.",
    ja: "{location}の公共交通機関について教えてください。",
  },
  "What are the best restaurants in {location}?": {
    en: "What are the best restaurants in {location}?",
    ja: "{location}のおすすめレストランを教えてください。",
  },
  "Are there any job opportunities in tech in {location}?": {
    en: "Are there any job opportunities in tech in {location}?",
    ja: "{location}でIT関連の求人はありますか？",
  },
  "What administrative services are available online in {location}?": {
    en: "What administrative services are available online in {location}?",
    ja: "{location}でオンラインで利用できる行政サービスは何ですか？",
  },
  "Tell me about upcoming festivals in {location}.": {
    en: "Tell me about upcoming festivals in {location}.",
    ja: "{location}で今後開催される祭りについて教えてください。",
  },
  "What's the weather like in {location} today?": {
    en: "What's the weather like in {location} today?",
    ja: "{location}の今日の天気はどうですか？",
  },
  "What are the tourist attractions in {location}?": {
    en: "What are the tourist attractions in {location}?",
    ja: "{location}の観光スポットは何ですか？",
  },
  "Are there any local markets in {location}?": {
    en: "Are there any local markets in {location}?",
    ja: "{location}に地元の市場はありますか？",
  },

  // 日本特有の質問
  "What are popular tourist attractions in {location}?": {
    en: "What are popular tourist attractions in {location}?",
    ja: "{location}の人気観光スポットは何ですか？",
  },
  "Tell me about local festivals in {location}.": {
    en: "Tell me about local festivals in {location}.",
    ja: "{location}の地元のお祭りについて教えてください。",
  },
  "What is the best season to visit {location}?": {
    en: "What is the best season to visit {location}?",
    ja: "{location}を訪れるのに最適な季節はいつですか？",
  },
  "What are famous local foods in {location}?": {
    en: "What are famous local foods in {location}?",
    ja: "{location}の有名な郷土料理は何ですか？",
  },
  "How is the public transportation system in {location}?": {
    en: "How is the public transportation system in {location}?",
    ja: "{location}の公共交通機関はどうなっていますか？",
  },
  "Are there any job opportunities in {location}?": {
    en: "Are there any job opportunities in {location}?",
    ja: "{location}で求人はありますか？",
  },
  "What are the major cities in {location}?": {
    en: "What are the major cities in {location}?",
    ja: "{location}の主要都市はどこですか？",
  },

  // UAE特有の質問
  "What are the top attractions in {location}?": {
    en: "What are the top attractions in {location}?",
    ja: "{location}の主要な観光スポットは何ですか？",
  },
  "What is the best time to visit {location}?": {
    en: "What is the best time to visit {location}?",
    ja: "{location}を訪れるのに最適な時期はいつですか？",
  },
  "Tell me about shopping malls in {location}.": {
    en: "Tell me about shopping malls in {location}.",
    ja: "{location}のショッピングモールについて教えてください。",
  },
  "What are the luxury hotels in {location}?": {
    en: "What are the luxury hotels in {location}?",
    ja: "{location}の高級ホテルは何ですか？",
  },
  "What are the visa requirements for visiting {location}?": {
    en: "What are the visa requirements for visiting {location}?",
    ja: "{location}を訪問するためのビザ要件は何ですか？",
  },

  // シンガポール特有の質問
  "What are the must-visit attractions in {location}?": {
    en: "What are the must-visit attractions in {location}?",
    ja: "{location}で必ず訪れるべき観光スポットは何ですか？",
  },
  "Tell me about food options in {location}.": {
    en: "Tell me about food options in {location}.",
    ja: "{location}の食事オプションについて教えてください。",
  },
  "What are the best hawker centers in {location}?": {
    en: "What are the best hawker centers in {location}?",
    ja: "{location}の最高のホーカーセンターはどこですか？",
  },
  "How do I use public transportation in Singapore?": {
    en: "How do I use public transportation in Singapore?",
    ja: "シンガポールの公共交通機関の使い方を教えてください。",
  },
  "What are the shopping areas in {location}?": {
    en: "What are the shopping areas in {location}?",
    ja: "{location}のショッピングエリアはどこですか？",
  },
  "What events are happening in Singapore this month?": {
    en: "What events are happening in Singapore this month?",
    ja: "今月シンガポールで開催されるイベントは何ですか？",
  },

  // マレーシア特有の質問
  "What are popular tourist spots in {location}?": {
    en: "What are popular tourist spots in {location}?",
    ja: "{location}の人気観光スポットは何ですか？",
  },
  "Tell me about local food in {location}.": {
    en: "Tell me about local food in {location}.",
    ja: "{location}の地元料理について教えてください。",
  },
  "What are the cultural attractions in {location}?": {
    en: "What are the cultural attractions in {location}?",
    ja: "{location}の文化的な見どころは何ですか？",
  },
  "How is the weather in {location} right now?": {
    en: "How is the weather in {location} right now?",
    ja: "{location}の現在の天気はどうですか？",
  },
  "What are the shopping malls in {location}?": {
    en: "What are the shopping malls in {location}?",
    ja: "{location}のショッピングモールはどこですか？",
  },
  "What festivals are celebrated in {location}?": {
    en: "What festivals are celebrated in {location}?",
    ja: "{location}ではどのようなお祭りが祝われていますか？",
  },
}

// 翻訳ヘルパー関数
export function translateLocation(name: string, language: Language): string {
  return locationTranslations[name]?.[language] || name
}

export function translateQuestion(question: string, language: Language, location: string): string {
  const translatedQuestion = questionTranslations[question]?.[language] || question
  const translatedLocation = translateLocation(location, language)
  return translatedQuestion.replace("{location}", translatedLocation)
}

// UI要素の翻訳
export const uiTranslations: Record<string, Record<Language, string>> = {
  "Select Location:": {
    en: "Select Location:",
    ja: "地域を選択:",
  },
  "All Locations": {
    en: "All Locations",
    ja: "すべての地域",
  },
  "Select Country": {
    en: "Select Country",
    ja: "国を選択",
  },
  "Select Region/City": {
    en: "Select Region/City",
    ja: "地域/都市を選択",
  },
  "Select City": {
    en: "Select City",
    ja: "都市を選択",
  },
  "Search...": {
    en: "Search...",
    ja: "検索...",
  },
  "No results found": {
    en: "No results found",
    ja: "結果が見つかりません",
  },
  "Sample Questions:": {
    en: "Sample Questions:",
    ja: "質問例:",
  },
  "Ask AI Assistant": {
    en: "Ask AI Assistant",
    ja: "AIアシスタントに質問",
  },
  "Type your message...": {
    en: "Type your message...",
    ja: "メッセージを入力...",
  },
  Send: {
    en: "Send",
    ja: "送信",
  },
}

export function translateUI(key: string, language: Language): string {
  return uiTranslations[key]?.[language] || key
}
