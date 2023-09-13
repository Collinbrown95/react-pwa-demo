FROM python:alpine

COPY dist /app/dist

RUN adduser -D myuser

WORKDIR /app/dist
RUN chown -R myuser:myuser /app/dist

USER myuser

CMD ["python", "server.py"]
