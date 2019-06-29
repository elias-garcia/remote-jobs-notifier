variable "region" {}
variable "zone" {}

terraform {
  backend "gcs" {
    credentials = "../.gcp-credentials.json"
    bucket      = "remote-jobs-notifier-terraform-state"
  }
}

provider "google" {
  credentials = "${file("../.gcp-credentials.json")}"
  project     = "remote-jobs-notifier"
  region      = "${var.region}"
  zone        = "${var.zone}"
}

resource "google_compute_instance" "twitter_streaming_app" {
  name         = "twitter-streaming-app"
  machine_type = "f1.micro"
  zone         = "${var.zone}"

  boot_disk {
    initialize_params {
      image = "ubuntu-1804-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }
}
