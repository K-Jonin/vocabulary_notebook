package utils

import (
	"io"
	"log"
	"os"
	"strings"
	"time"
	"vocabulary_notebook/config"
)

func loggingSettings(logFile string) {
	logfile, err := os.OpenFile(logFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalln(err)
	}
	multiLogFile := io.MultiWriter(os.Stdout, logfile)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.SetOutput(multiLogFile)
}

// ログ出力
func LoggingStartApp() {
	loggingSettings(strings.Replace(config.Config.LogFile, "@date@", time.Now().Format("2006-01-02"), -1))

	str := "アプリケーション開始"
	log.Println(str)
}

// エラーログ出力
func LoggingErrorLog(err error) {
	loggingSettings(strings.Replace(config.Config.ErrorLogFile, "@date@", time.Now().Format("2006-01-02"), -1))

	log.Println(err)
}
