"use client"

import { useEffect, useState } from "react"
// import { usePrivy } from "@privy-io/react-auth"
import { useLogin, usePrivy } from '@privy-io/react-auth';

import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User, Wallet } from "lucide-react"
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

export function PrivyAuth() {
  const [mounted, setMounted] = useState(false)
  const { ready, authenticated, user, login, logout } = usePrivy()

  // クライアントサイドのハイドレーションが完了するまで何も表示しない
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!ready) {
    return (
      <Button variant="outline" size="sm" className="ml-auto" disabled>
        <span className="animate-pulse">Loading...</span>
      </Button>
    )
  }

  if (!authenticated) {
    return (
      <Button 
      onClick={() => login({
        loginMethods: ['wallet', 'email', 'google'],
        walletChainType: 'solana-only',
        // walletChainType: 'ethereum-only',
        // walletChainType: 'ethereum-and-solana',

        disableSignup: false
    })}

      variant="outline" size="sm" className="ml-auto">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    )
  }

  // ユーザー情報の取得
  const userDisplayName = user?.email?.address || 
    user?.wallet?.address?.slice(0, 6) + "..." || 
    "User"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-auto flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/abstract-geometric-shapes.png" alt={userDisplayName} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{userDisplayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/wallet" className="flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            Wallet
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}