package controllers

import (
	"database/sql"
	"net/http"
	"strconv"
	"vocabulary_notebook/app/models/folders"
	"vocabulary_notebook/app/validation"
	"vocabulary_notebook/utils"

	"github.com/gin-gonic/gin"
)

// 取得
func GetFolders(ctx *gin.Context) {
	userId, _ := strconv.Atoi(ctx.Param("UserId"))
	rows, err := folders.GetAllByUserId(userId)

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

	folderList := []folders.Folder{}
	for rows.Next() {
		folder := folders.Folder{}
		rows.Scan(
			&folder.FolderId,
			&folder.FolderName,
			&folder.UserId,
			&folder.CreatedAt,
			&folder.DeleteFlag,
		)
		folderList = append(folderList, folder)
	}

	ctx.JSON(http.StatusOK, folderList)
}

// 登録
func RegisterFolder(ctx *gin.Context) {
	folder := folders.Folder{}
	folder.FolderName = ctx.PostForm("FolderName")
	folder.UserId, _ = strconv.Atoi(ctx.Param("UserId"))

	errMsg := validation.ValidateFolder(folder)
	if len(errMsg) != 0 {
		ctx.JSON(http.StatusOK, gin.H{"msg": errMsg})
		ctx.Abort()
		return
	}

	err := folder.Insert()

	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}

// 更新
func ModifyFolder(ctx *gin.Context) {
	folder := folders.Folder{}
	folder.FolderName = ctx.PostForm("FolderName")
	folder.FolderId, _ = strconv.Atoi(ctx.Param("FolderId"))

	errMsg := validation.ValidateFolder(folder)
	if len(errMsg) != 0 {
		ctx.JSON(http.StatusOK, gin.H{"msg": errMsg})
		ctx.Abort()
		return
	}

	// 更新
	err := folder.Update()
	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}

// 削除
func DeleteFolder(ctx *gin.Context) {
	folderId, _ := strconv.Atoi(ctx.Param("FolderId"))

	err := folders.Delete(folderId)

	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}
