package main

import (
	"net/http"
	"text/template"
)

func main() {

	fs := http.FileServer(http.Dir("static"))

	m := http.NewServeMux()

	m.Handle("/static/", http.StripPrefix("/static/", fs))
	m.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		t, _ := template.ParseFiles("static/templates/index.html")
		t.ExecuteTemplate(w, "index", nil)
	})

	s := http.Server{
		Addr:    ":8080",
		Handler: m,
	}

	s.ListenAndServe()
}
