package models

import (
	"crypto/sha1"
	"database/sql"
	"fmt"
	"vocabulary_notebook/config"
	"vocabulary_notebook/utils"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

var err error

func init() {
	Db, err = sql.Open(config.Config.Driver, "root:@(127.0.0.1)/vocabulary_notebook")
	if err != nil {
		utils.LoggingErrorLog(err)
	}
}

// パスワードを暗号化
func Encrypt(plaintext string) (cryptext string) {
	cryptext = fmt.Sprintf("%x", sha1.Sum([]byte(plaintext)))
	return cryptext
}
