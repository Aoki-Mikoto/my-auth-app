import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, password } = await request.json()

  // バリデーション
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email と Password は必須！' }), { status: 400 })
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return new Response(JSON.stringify({ message: '登録成功！' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '登録失敗！' }), { status: 500 })
  }
}
