#!/bin/bash
set -e

echo "Checking if WordPress is installed..."

if ! wp core is-installed --allow-root; then
  echo "WordPress is not installed. Installing now..."
  wp core install \
    --url="http://localhost:8080" \
    --title="Gipsy's Vintage Dev Environment" \
    --admin_user="gipsys-vintage" \
    --admin_password="gipsys-vintage" \
    --admin_email="gipsys-vintage@example.com" \
    --skip-email \
    --allow-root
  echo "WordPress installation completed."
else
  echo "WordPress is already installed. Skipping installation."
fi
