FROM php:8.2

WORKDIR /home/php/app

COPY . .

RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo_sqlite zip

RUN apt-get update && apt-get install -y sqlite3

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer update
CMD php -S 0.0.0.0:80 -t .
EXPOSE 80
