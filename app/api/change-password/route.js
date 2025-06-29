import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, currentPassword, newPassword } = await request.json()

  if (!email || !currentPassword || !newPassword) {
    return new Response(JSON.stringify({ message: '全て入力してください！' }), { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return new Response(JSON.stringify({ message: 'ユーザーが見つかりません！' }), { status: 404 })
  }

  const isValid = await bcrypt.compare(currentPassword, user.password)
  if (!isValid) {
    return new Response(JSON.stringify({ message: '現在のパスワードが違います！' }), { status: 401 })
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { email },
    data: { password: hashedNewPassword },
  })

  return new Response(JSON.stringify({ message: 'パスワード変更成功！' }), { status: 200 })
}
