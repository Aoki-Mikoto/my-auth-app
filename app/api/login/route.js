import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, password } = await request.json()

  // バリデーション
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'メールとパスワードは必須です！' }), {
      status: 400,
    })
  }

  // ユーザーを探す
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return new Response(JSON.stringify({ message: 'ユーザーが見つかりません！' }), {
      status: 401,
    })
  }

  // パスワード比較
  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return new Response(JSON.stringify({ message: 'パスワードが間違っています！' }), {
      status: 401,
    })
  }

  return new Response(JSON.stringify({ message: 'ログイン成功！' }), { status: 200 })
}
