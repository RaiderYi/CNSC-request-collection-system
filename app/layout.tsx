import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

/**
 * 企业级需求征集门户 - 根布局
 * 配置全局字体和元数据
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "企业级需求征集门户 | 中核集团",
  description: "中核集团采购与供应链一体化智能服务平台需求征集系统",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3b4db5",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
