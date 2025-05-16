import type { Language } from "@/components/language-switcher"

// APIキーが設定されていない場合のフォールバックレスポンス
export function getFallbackResponse(query: string, language: Language, location?: string): string {
  // 簡単な質問に対する事前定義された応答
  const commonResponses: Record<string, Record<Language, string>> = {
    greeting: {
      en: "Hello! I'm your AI assistant for local information. How can I help you today?",
      ja: "こんにちは！地域情報のAIアシスタントです。今日はどのようにお手伝いできますか？",
    },
    weather: {
      en: "I don't have real-time weather data. In a fully implemented version, I would connect to a weather API to provide current weather information.",
      ja: "リアルタイムの天気データはありません。完全に実装されたバージョンでは、天気APIに接続して現在の天気情報を提供します。",
    },
    events: {
      en: "I don't have access to current event listings. In a production environment, I would connect to event databases to provide up-to-date information.",
      ja: "現在のイベント情報にアクセスできません。本番環境では、イベントデータベースに接続して最新情報を提供します。",
    },
    transportation: {
      en: "I don't have real-time transportation data. In a fully implemented version, I would connect to transportation APIs for accurate information.",
      ja: "リアルタイムの交通データはありません。完全に実装されたバージョンでは、交通APIに接続して正確な情報を提供します。",
    },
    restaurants: {
      en: "I don't have access to restaurant listings. In a production environment, I would connect to restaurant databases or APIs.",
      ja: "レストラン情報にアクセスできません。本番環境では、レストランデータベースやAPIに接続します。",
    },
    jobs: {
      en: "I don't have access to current job listings. In a production environment, I would connect to job databases or APIs.",
      ja: "現在の求人情報にアクセスできません。本番環境では、求人データベースやAPIに接続します。",
    },
    tourist: {
      en: "I can provide general information about tourist attractions, but I don't have access to the latest details. In a production environment, I would connect to tourism databases.",
      ja: "観光スポットに関する一般的な情報を提供できますが、最新の詳細情報にはアクセスできません。本番環境では、観光データベースに接続します。",
    },
    food: {
      en: "I can suggest some popular food options, but I don't have access to the latest restaurant information. In a production environment, I would connect to food databases.",
      ja: "人気の食事オプションをいくつか提案できますが、最新のレストラン情報にはアクセスできません。本番環境では、食品データベースに接続します。",
    },
    fallback: {
      en: "I'm currently running in local mode without an AI provider. In a production environment, I would connect to an AI service to provide more detailed and personalized responses.",
      ja: "現在、AIプロバイダーなしのローカルモードで実行しています。本番環境では、AIサービスに接続して、より詳細でパーソナライズされた回答を提供します。",
    },
  }

  // 地域固有の情報
  const locationInfo: Record<string, Record<Language, string>> = {
    Tokyo: {
      en: "Tokyo is Japan's capital and largest city, known for its modern technology, skyscrapers, anime culture, and historic temples. It's a major global financial center and was the host of the 2020 Summer Olympics.",
      ja: "東京は日本の首都であり最大の都市で、最新技術、高層ビル、アニメ文化、歴史的な寺院で知られています。世界的な金融センターであり、2020年夏季オリンピックの開催地でした。",
    },
    Osaka: {
      en: "Osaka is Japan's second largest metropolitan area, known for its street food, friendly locals, and vibrant nightlife. It's considered Japan's kitchen and is home to Universal Studios Japan.",
      ja: "大阪は日本で2番目に大きな都市圏で、ストリートフード、フレンドリーな地元の人々、活気のある夜の生活で知られています。日本の台所と呼ばれ、ユニバーサル・スタジオ・ジャパンがあります。",
    },
    Kyoto: {
      en: "Kyoto was Japan's capital for over a thousand years and is known for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
      ja: "京都は千年以上にわたって日本の首都であり、古典的な仏教寺院、庭園、皇居、神社、伝統的な木造家屋で知られています。",
    },
    London: {
      en: "London is the capital of England and the United Kingdom, known for its history, architecture, arts, and cultural diversity. It's home to iconic landmarks like Big Ben, Buckingham Palace, and the London Eye.",
      ja: "ロンドンはイングランドとイギリスの首都で、歴史、建築、芸術、文化的多様性で知られています。ビッグベン、バッキンガム宮殿、ロンドン・アイなどの象徴的なランドマークがあります。",
    },
    "New York": {
      en: "New York City is the most populous city in the United States, known for its skyscrapers, Broadway shows, and cultural diversity. It's a global center for finance, arts, fashion, and media.",
      ja: "ニューヨーク市はアメリカ合衆国で最も人口の多い都市で、高層ビル、ブロードウェイショー、文化的多様性で知られています。金融、芸術、ファッション、メディアの世界的中心地です。",
    },
    Paris: {
      en: "Paris is the capital of France, known for its art, fashion, gastronomy, and culture. It's home to iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
      ja: "パリはフランスの首都で、芸術、ファッション、美食、文化で知られています。エッフェル塔、ルーブル美術館、ノートルダム大聖堂などの象徴的なランドマークがあります。",
    },
    Singapore: {
      en: "Singapore is a city-state in Southeast Asia, known for its cleanliness, efficiency, and multicultural environment. It's a global financial center with a tropical climate and remarkable architecture.",
      ja: "シンガポールは東南アジアの都市国家で、清潔さ、効率性、多文化環境で知られています。熱帯気候と素晴らしい建築を持つ世界的な金融センターです。",
    },
    Dubai: {
      en: "Dubai is a city in the United Arab Emirates, known for its ultramodern architecture, luxury shopping, and vibrant nightlife. It's home to Burj Khalifa, the world's tallest building.",
      ja: "ドバイはアラブ首長国連邦の都市で、超近代的な建築、高級ショッピング、活気のある夜の生活で知られています。世界一高いビル、ブルジュ・ハリファがあります。",
    },
  }

  // クエリに基づいて適切な応答を選択
  const lowerQuery = query.toLowerCase()

  // 挨拶の検出
  if (
    lowerQuery.includes("hello") ||
    lowerQuery.includes("hi") ||
    lowerQuery.includes("こんにちは") ||
    lowerQuery.includes("おはよう")
  ) {
    return commonResponses.greeting[language]
  }

  // 天気の検出
  else if (
    lowerQuery.includes("weather") ||
    lowerQuery.includes("天気") ||
    lowerQuery.includes("climate") ||
    lowerQuery.includes("気候")
  ) {
    return commonResponses.weather[language]
  }

  // イベントの検出
  else if (
    lowerQuery.includes("event") ||
    lowerQuery.includes("イベント") ||
    lowerQuery.includes("festival") ||
    lowerQuery.includes("祭り")
  ) {
    return commonResponses.events[language]
  }

  // 交通の検出
  else if (
    lowerQuery.includes("transport") ||
    lowerQuery.includes("train") ||
    lowerQuery.includes("bus") ||
    lowerQuery.includes("交通") ||
    lowerQuery.includes("電車") ||
    lowerQuery.includes("バス")
  ) {
    return commonResponses.transportation[language]
  }

  // レストランの検出
  else if (
    lowerQuery.includes("restaurant") ||
    lowerQuery.includes("food") ||
    lowerQuery.includes("eat") ||
    lowerQuery.includes("レストラン") ||
    lowerQuery.includes("食事") ||
    lowerQuery.includes("飲食")
  ) {
    return commonResponses.restaurants[language]
  }

  // 求人の検出
  else if (
    lowerQuery.includes("job") ||
    lowerQuery.includes("work") ||
    lowerQuery.includes("career") ||
    lowerQuery.includes("求人") ||
    lowerQuery.includes("仕事") ||
    lowerQuery.includes("キャリア")
  ) {
    return commonResponses.jobs[language]
  }

  // 観光の検出
  else if (
    lowerQuery.includes("tourist") ||
    lowerQuery.includes("attraction") ||
    lowerQuery.includes("visit") ||
    lowerQuery.includes("観光") ||
    lowerQuery.includes("名所") ||
    lowerQuery.includes("訪問")
  ) {
    return commonResponses.tourist[language]
  }

  // 地域情報が指定されている場合
  if (location) {
    // 地域名の最後の部分を取得（例: "Japan, Tokyo" -> "Tokyo"）
    const locationParts = location.split(", ")
    const lastLocationPart = locationParts[locationParts.length - 1]

    // 地域固有の情報があるか確認
    for (const [key, info] of Object.entries(locationInfo)) {
      if (lastLocationPart.includes(key)) {
        return (
          info[language] +
          (language === "ja"
            ? "\n\n現在はローカルモードで実行しているため、限られた情報しか提供できません。本番環境では、より詳細な情報を提供します。"
            : "\n\nAs I'm running in local mode, I can only provide limited information. In a production environment, I would offer more detailed information.")
        )
      }
    }

    // 一般的な地域情報の応答
    return language === "ja"
      ? `「${query}」についてのご質問ありがとうございます。${location}に関する情報を提供するには、AIサービスに接続する必要があります。現在はローカルモードで実行しているため、詳細な情報は提供できません。`
      : `Thank you for your question about "${query}". To provide detailed information about ${location}, I would need to connect to an AI service. I'm currently running in local mode, so I can only provide limited information.`
  }

  // デフォルトのフォールバック応答
  return commonResponses.fallback[language]
}
