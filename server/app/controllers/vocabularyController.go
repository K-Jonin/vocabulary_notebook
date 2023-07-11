package controllers

import (
	"database/sql"
	"net/http"
	"strconv"
	vocabularies "vocabulary_notebook/app/models/vocabulary"
	"vocabulary_notebook/app/validation"
	"vocabulary_notebook/utils"

	"github.com/gin-gonic/gin"
)

// 取得：フォルダID
func GetVocabylaryAllByFolderId(ctx *gin.Context) {
	folderId, _ := strconv.Atoi(ctx.Param("FolderId"))
	rows, err := vocabularies.GetAllByFolderId(folderId)

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

	vocabularyList := []vocabularies.Vocabulary{}
	for rows.Next() {
		vocabulary := vocabularies.Vocabulary{}
		rows.Scan(
			&vocabulary.VocabularyId,
			&vocabulary.VocabularyText,
			&vocabulary.Translation,
			&vocabulary.Memo,
			&vocabulary.Comprehension,
			&vocabulary.FolderId,
			&vocabulary.UserId,
			&vocabulary.CreatedAt,
			&vocabulary.DeleteFlag,
		)
		vocabularyList = append(vocabularyList, vocabulary)
	}

	ctx.JSON(http.StatusOK, vocabularyList)
}

// 登録
func RegisterVocabulary(ctx *gin.Context) {
	vocabulary := vocabularies.Vocabulary{}
	vocabulary.VocabularyText = ctx.PostForm("VocabularyText")
	vocabulary.Translation = ctx.PostForm("Translation")
	vocabulary.Memo = ctx.PostForm("Memo")
	vocabulary.Comprehension = 1
	vocabulary.FolderId, _ = strconv.Atoi(ctx.PostForm("FolderId"))
	vocabulary.UserId, _ = strconv.Atoi(ctx.PostForm("UserId"))

	errMsg := validation.ValidateVocabulary(vocabulary)
	if len(errMsg) != 0 {
		ctx.JSON(http.StatusOK, gin.H{"msg": errMsg})
		ctx.Abort()
		return
	}

	err := vocabulary.Insert()

	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}

// 更新
func ModifyVocabylary(ctx *gin.Context) {
	vocabulary := vocabularies.Vocabulary{}
	vocabulary.VocabularyText = ctx.PostForm("VocabularyText")
	vocabulary.Translation = ctx.PostForm("Translation")
	vocabulary.Memo = ctx.PostForm("Memo")
	vocabulary.VocabularyId, _ = strconv.Atoi(ctx.PostForm("VocabularyId"))

	errMsg := validation.ValidateVocabulary(vocabulary)
	if len(errMsg) != 0 {
		ctx.JSON(http.StatusOK, gin.H{"msg": errMsg})
		ctx.Abort()
		return
	}

	err := vocabulary.Update()
	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}

// 更新：理解度
func ModifyComprehension(ctx *gin.Context) {
	vocabulary := vocabularies.Vocabulary{}
	vocabulary.Comprehension, _ = strconv.Atoi(ctx.PostForm("Comprehension"))
	vocabulary.VocabularyId, _ = strconv.Atoi(ctx.PostForm("VocabularyId"))

	err := vocabulary.UpdateComprehension()
	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}

// 削除
func DelateVocabulary(ctx *gin.Context) {
	VocabularyId, _ := strconv.Atoi(ctx.PostForm("VocabularyId"))

	err := vocabularies.Delete(VocabularyId)
	if err != nil {
		utils.LoggingErrorLog(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, gin.H{})
}
