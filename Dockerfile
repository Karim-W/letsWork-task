FROM node:16.13.1

ENV PORT 8080 
ENV HOST 0.0.0.0 

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8080
CMD ["npm", "run", "preview"]