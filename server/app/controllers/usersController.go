package controllers

import (
	"database/sql"
	"net/http"
	"strconv"
	"vocabulary_notebook/app/models/users"
	"vocabulary_notebook/utils"

	"github.com/gin-gonic/gin"
)

// ログイン
func Login(ctx *gin.Context) {
	user, err := users.GetUserForLogin(ctx.PostForm("Email"), ctx.PostForm("Password"))

	if err == sql.ErrNoRows {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusNoContent, gin.H{"msg": err.Error()})
		ctx.Abort()
		return
	} else if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

// 登録
func RegisterUser(ctx *gin.Context) {
	user := users.User{}
	user.Name = ctx.PostForm("Name")
	user.Email = ctx.PostForm("Email")
	user.Password = ctx.PostForm("Password")

	err := user.Insert()

	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

// 更新
func ModifyUser(ctx *gin.Context) {
	user := users.User{}
	user.UserId, _ = strconv.Atoi(ctx.Param("UserId"))
	user.Name = ctx.PostForm("Name")
	user.Email = ctx.PostForm("Email")
	user.Password = ctx.PostForm("Password")

	err := user.Update()

	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

// 削除
func DeleteUser(ctx *gin.Context) {
	userId, _ := strconv.Atoi(ctx.Param("UserId"))
	err := users.Delete(userId)

	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{})
}
