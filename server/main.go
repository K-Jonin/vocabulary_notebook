package main

import (
	"vocabulary_notebook/app/controllers"
	"vocabulary_notebook/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()
	router := gin.Default()

	// CORS設定
	router.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"http://localhost:3000",
		},

		// アクセスを許可したいHTTPメソッド
		AllowMethods: []string{
			"POST",
			"GET",
			"PUT",
		},

		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Methods",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
	}))

	// ログイン
	router.POST("/user/login", controllers.Login)
	// ユーザー登録
	router.POST("/user/register", controllers.RegisterUser)
	// ユーザー編集
	router.PUT("/user/modify/:UserId", controllers.ModifyUser)
	// ユーザー削除
	router.PUT("/user/delete/:UserId", controllers.DeleteUser)

	// フォルダー取得
	router.GET("/folder/:UserId", controllers.GetFolders)
	// フォルダー登録
	router.POST("/folder/register/:UserId", controllers.RegisterFolder)
	// フォルダー編集
	router.PUT("/folder/modify/:FolderId", controllers.ModifyFolder)
	// フォルダー削除
	router.PUT("/folder/delete/:FolderId", controllers.DeleteFolder)

	// 単語取得
	router.GET("/vocabulary/:FolderId", controllers.GetVocabylaryAllByFolderId)
	// 単語登録
	router.POST("/vocabulary/register", controllers.RegisterVocabulary)
	// 単語編集
	router.PUT("/vocabulary/modify", controllers.ModifyVocabylary)
	// 理解度更新
	router.PUT("/vocabulary/modify/comprehension", controllers.ModifyComprehension)
	// 単語削除
	router.PUT("/vocabulary/delete", controllers.DelateVocabulary)

	router.Run()
}
