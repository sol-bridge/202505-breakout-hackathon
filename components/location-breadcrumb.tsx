"use client"

import { useState, useEffect } from "react"
import { ChevronRight, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { translateLocation, translateUI } from "@/lib/translations"
import type { Language } from "@/components/language-switcher"

// 地域データの型定義
type LocationItem = {
  id: string
  name: string
  children?: LocationItem[]
}

// 日本の都道府県と市町村のデータ
const japanPrefectures: LocationItem[] = [
  {
    id: "jp-hk",
    name: "Hokkaido",
    children: [
      { id: "jp-hk-sp", name: "Sapporo" },
      { id: "jp-hk-as", name: "Asahikawa" },
      { id: "jp-hk-hk", name: "Hakodate" },
    ],
  },
  // 他の都道府県データは省略（既存のデータを使用）
  {
    id: "jp-tk",
    name: "Tokyo",
    children: [
      { id: "jp-tk-sj", name: "Shinjuku" },
      { id: "jp-tk-sb", name: "Shibuya" },
      { id: "jp-tk-mn", name: "Minato" },
      { id: "jp-tk-sc", name: "Setagaya" },
      { id: "jp-tk-nk", name: "Nakano" },
      { id: "jp-tk-kt", name: "Koto" },
      { id: "jp-tk-ed", name: "Edogawa" },
      { id: "jp-tk-ot", name: "Ota" },
      { id: "jp-tk-mc", name: "Machida" },
      { id: "jp-tk-hc", name: "Hachioji" },
    ],
  },
  {
    id: "jp-os",
    name: "Osaka",
    children: [
      { id: "jp-os-os", name: "Osaka City" },
      { id: "jp-os-sb", name: "Sakai" },
      { id: "jp-os-tk", name: "Takatsuki" },
      { id: "jp-os-hy", name: "Hirakata" },
      { id: "jp-os-ty", name: "Toyonaka" },
    ],
  },
  {
    id: "jp-ky",
    name: "Kyoto",
    children: [
      { id: "jp-ky-ky", name: "Kyoto City" },
      { id: "jp-ky-uj", name: "Uji" },
      { id: "jp-ky-km", name: "Kameoka" },
    ],
  },
  {
    id: "jp-fk",
    name: "Fukuoka",
    children: [
      { id: "jp-fk-fk", name: "Fukuoka City" },
      { id: "jp-fk-kt", name: "Kitakyushu" },
      { id: "jp-fk-kr", name: "Kurume" },
    ],
  },
  {
    id: "jp-ok",
    name: "Okinawa",
    children: [
      { id: "jp-ok-nh", name: "Naha" },
      { id: "jp-ok-ok", name: "Okinawa City" },
      { id: "jp-ok-ur", name: "Urasoe" },
    ],
  },
]

// 世界の主要国と都市のデータ
const worldCountries: LocationItem[] = [
  {
    id: "us",
    name: "United States",
    children: [
      {
        id: "us-ca",
        name: "California",
        children: [
          { id: "us-ca-sf", name: "San Francisco" },
          { id: "us-ca-la", name: "Los Angeles" },
          { id: "us-ca-sd", name: "San Diego" },
        ],
      },
      {
        id: "us-ny",
        name: "New York",
        children: [
          { id: "us-ny-nyc", name: "New York City" },
          { id: "us-ny-buf", name: "Buffalo" },
        ],
      },
      {
        id: "us-tx",
        name: "Texas",
        children: [
          { id: "us-tx-aus", name: "Austin" },
          { id: "us-tx-hou", name: "Houston" },
          { id: "us-tx-dal", name: "Dallas" },
        ],
      },
    ],
  },
  {
    id: "jp",
    name: "Japan",
    children: japanPrefectures,
  },
  {
    id: "sg",
    name: "Singapore",
    children: [
      { id: "sg-cbd", name: "Central Business District" },
      { id: "sg-sen", name: "Sentosa" },
      { id: "sg-jur", name: "Jurong" },
      { id: "sg-tam", name: "Tampines" },
      { id: "sg-pun", name: "Punggol" },
    ],
  },
  {
    id: "my",
    name: "Malaysia",
    children: [
      { id: "my-kl", name: "Kuala Lumpur" },
      { id: "my-pen", name: "Penang" },
      { id: "my-joh", name: "Johor Bahru" },
      { id: "my-kot", name: "Kota Kinabalu" },
      { id: "my-kuc", name: "Kuching" },
    ],
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    children: [
      { id: "ae-dub", name: "Dubai" },
      { id: "ae-abu", name: "Abu Dhabi" },
      { id: "ae-sha", name: "Sharjah" },
      { id: "ae-ajm", name: "Ajman" },
      { id: "ae-rak", name: "Ras Al Khaimah" },
    ],
  },
  {
    id: "uk",
    name: "United Kingdom",
    children: [
      { id: "uk-lon", name: "London" },
      { id: "uk-man", name: "Manchester" },
      { id: "uk-bir", name: "Birmingham" },
      { id: "uk-edi", name: "Edinburgh" },
      { id: "uk-gla", name: "Glasgow" },
    ],
  },
  {
    id: "fr",
    name: "France",
    children: [
      { id: "fr-par", name: "Paris" },
      { id: "fr-mar", name: "Marseille" },
      { id: "fr-lyo", name: "Lyon" },
      { id: "fr-nic", name: "Nice" },
      { id: "fr-tou", name: "Toulouse" },
    ],
  },
  {
    id: "de",
    name: "Germany",
    children: [
      { id: "de-ber", name: "Berlin" },
      { id: "de-mun", name: "Munich" },
      { id: "de-ham", name: "Hamburg" },
      { id: "de-fra", name: "Frankfurt" },
      { id: "de-col", name: "Cologne" },
    ],
  },
  {
    id: "cn",
    name: "China",
    children: [
      { id: "cn-bei", name: "Beijing" },
      { id: "cn-sha", name: "Shanghai" },
      { id: "cn-gua", name: "Guangzhou" },
      { id: "cn-she", name: "Shenzhen" },
      { id: "cn-hon", name: "Hong Kong" },
    ],
  },
  {
    id: "kr",
    name: "South Korea",
    children: [
      { id: "kr-seo", name: "Seoul" },
      { id: "kr-bus", name: "Busan" },
      { id: "kr-inc", name: "Incheon" },
      { id: "kr-dae", name: "Daegu" },
    ],
  },
  {
    id: "au",
    name: "Australia",
    children: [
      { id: "au-syd", name: "Sydney" },
      { id: "au-mel", name: "Melbourne" },
      { id: "au-bri", name: "Brisbane" },
      { id: "au-per", name: "Perth" },
      { id: "au-ade", name: "Adelaide" },
    ],
  },
]

type LocationBreadcrumbProps = {
  onLocationChange: (location: { id: string; name: string; path: string[] }) => void
  language: Language
}

export function LocationBreadcrumb({ onLocationChange, language }: LocationBreadcrumbProps) {
  // Japan, Fukuoka をデフォルト選択とする
  const [path, setPath] = useState<{ id: string; name: string }[]>([
    { id: "jp", name: "Japan" },
    { id: "jp-fk", name: "Fukuoka" }
  ])
  
  // 初期レベルはFukuokaの子要素（Fukuoka City, Kitakyushu, Kurume）
  const defaultFukuoka = japanPrefectures.find(p => p.id === "jp-fk")
  const [currentLevel, setCurrentLevel] = useState<LocationItem[]>(
    defaultFukuoka?.children || []
  )
  const [searchTerm, setSearchTerm] = useState("")

  // 初期化時にJapan, Fukuokaの選択を親コンポーネントに通知
  useEffect(() => {
    onLocationChange({
      id: "jp-fk",
      name: "Fukuoka",
      path: ["Japan", "Fukuoka"],
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (item: LocationItem, level: number) => {
    // Update path up to the selected level
    const newPath = [...path.slice(0, level), { id: item.id, name: item.name }]
    setPath(newPath)

    // Update current level items
    if (item.children) {
      setCurrentLevel(item.children)
    } else {
      setCurrentLevel([])
    }

    // Notify parent component
    onLocationChange({
      id: item.id,
      name: item.name,
      path: newPath.map((p) => p.name),
    })
  }

  const navigateToLevel = (level: number) => {
    if (level === 0) {
      // Reset to top level
      setPath([])
      setCurrentLevel(worldCountries)
      return
    }

    // Navigate to the specified level
    const newPath = path.slice(0, level)
    setPath(newPath)

    // Find the correct items for this level
    let items = worldCountries
    for (let i = 0; i < level - 1; i++) {
      const found = items.find((item) => item.id === newPath[i].id)
      if (found && found.children) {
        items = found.children
      }
    }

    const lastItem = items.find((item) => item.id === newPath[level - 1].id)
    if (lastItem && lastItem.children) {
      setCurrentLevel(lastItem.children)
    }
  }

  // Filter current level items based on search term
  const filteredItems = searchTerm
    ? currentLevel.filter((item) => {
        const translatedName = translateLocation(item.name, language).toLowerCase()
        const originalName = item.name.toLowerCase()
        const search = searchTerm.toLowerCase()
        return translatedName.includes(search) || originalName.includes(search)
      })
    : currentLevel

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <MapPin className="h-4 w-4 mr-2 text-purple-600" />
        <span className="text-sm font-medium">{translateUI("Select Location:", language)}</span>
      </div>
      <div className="flex items-center flex-wrap gap-1">
        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => navigateToLevel(0)}>
          {translateUI("All Locations", language)}
        </Button>

        {path.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => navigateToLevel(index + 1)}>
              {translateLocation(item.name, language)}
            </Button>
          </div>
        ))}

        {currentLevel.length > 0 && (
          <div className="flex items-center">
            <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  {translateUI(
                    path.length === 0 ? "Select Country" : path.length === 1 ? "Select Region/City" : "Select City",
                    language,
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-y-auto">
                <div className="px-2 py-2">
                  <div className="flex items-center border rounded-md px-2">
                    <Search className="h-3 w-3 text-gray-400" />
                    <Input
                      placeholder={translateUI("Search...", language)}
                      className="h-7 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <DropdownMenuItem key={item.id} onClick={() => handleSelect(item, path.length)}>
                      {translateLocation(item.name, language)}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-2 py-2 text-xs text-gray-500 text-center">
                    {translateUI("No results found", language)}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}
