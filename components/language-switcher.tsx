"use client"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type Language = "en" | "ja"

type LanguageSwitcherProps = {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage === "en" ? "English" : "日本語"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange("en")}>
          <div className="flex items-center">
            {currentLanguage === "en" && <Check className="mr-2 h-4 w-4" />}
            <span className={currentLanguage === "en" ? "ml-6" : "ml-0"}>English</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange("ja")}>
          <div className="flex items-center">
            {currentLanguage === "ja" && <Check className="mr-2 h-4 w-4" />}
            <span className={currentLanguage === "ja" ? "ml-6" : "ml-0"}>日本語</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
