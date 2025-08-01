data "external_schema" "gorm" {
  program = [
    "go",
    "run",
    "-mod=mod",
    "./loader",
  ]
}

env "gorm" {
  src = data.external_schema.gorm.url
  dev = "docker://postgres/15.1/dev"

  migration {
      dir = "file://migrations"
      format = "golang-migrate"
  }
  format {
    migrate {
      diff = "{{ sql . \"  \" }}"
    }
  }
}
