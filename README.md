# My Auth App

## 概要
このアプリは Next.js を用いたシンプルな認証機能の学習用プロジェクトです。  
以下の認証機能を実装しています。

---

## 実装した機能

- **メールアドレスとパスワードでのサインアップ機能**  
  ユーザーはメールアドレスとパスワードを入力してアカウントを作成できます。  
  パスワードは bcrypt によりハッシュ化して SQLite に保存されます。

- **パスワード強度の表示機能**  
  サインアップ時に入力したパスワードの強度をリアルタイムに表示します。

- **ログイン機能**  
  登録したメールアドレスとパスワードを使ってログインできます。

- **パスワード変更機能**  
  ログイン後に現在のパスワードを入力して新しいパスワードへ変更できます。

- **Prisma ORM の利用**  
  ユーザー情報の保存に Prisma を使用しています。

---

## 技術スタック
- Next.js
- Prisma ORM (SQLite)
- bcrypt (パスワードハッシュ化)


## スクリーンショット

![SignUp](https://github.com/user-attachments/assets/c6c7b594-c63a-40fa-8d71-39b1e90d6ee9)
![Login](https://github.com/user-attachments/assets/114b07ef-da82-4373-8a38-43409cb74ae7)
![ChangePassword](https://github.com/user-attachments/assets/0079660b-e710-45c3-9560-14f5dc23ec29)




---

## セットアップ & 起動方法

```bash
# 依存関係のインストール
npm install

# Prisma のマイグレーション
npx prisma migrate dev --name init

# 開発サーバー起動
npm run dev
