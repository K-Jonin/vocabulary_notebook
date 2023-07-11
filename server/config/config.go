package config

import (
	"log"

	"gopkg.in/go-ini/ini.v1"
)

type ConfigList struct {
	Port         string
	LogFile      string
	ErrorLogFile string
	Driver       string
}

// 設定
var Config ConfigList

func init() {
	LoadConfig()
}

func LoadConfig() {
	cfg, err := ini.Load("config.ini")
	if err != nil {
		log.Fatalln(err)
	}

	Config = ConfigList{
		Port:         cfg.Section("web").Key("port").MustString("8080"),
		LogFile:      cfg.Section("web").Key("logFile").String(),
		ErrorLogFile: cfg.Section("web").Key("errorLogFile").String(),
		Driver:       cfg.Section("db").Key("driver").String(),
	}
}
