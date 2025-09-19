FROM jekyll/jekyll:latest

WORKDIR /srv/jekyll

EXPOSE 4001

CMD ["jekyll", "serve", "--host", "0.0.0.0"] 