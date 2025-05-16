"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function AuthMock() {
  const [authenticated, setAuthenticated] = useState(false)

  // 認証されていない場合のログインボタン
  if (!authenticated) {
    return (
      <Button onClick={() => setAuthenticated(true)} variant="outline" size="sm" className="ml-auto">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    )
  }

  // 認証済みの場合のドロップダウンメニュー
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-auto flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">User</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/wallet">Wallet</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setAuthenticated(false)} className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
