FROM jekyll/jekyll:4.2.0

WORKDIR /srv/jekyll

EXPOSE 4001

CMD ["jekyll", "serve", "--host", "0.0.0.0"] 