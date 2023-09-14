FROM python:alpine

COPY build /app/build

RUN adduser -D myuser

WORKDIR /app/build
RUN chown -R myuser:myuser /app/build

USER myuser

CMD ["python", "server.py"]
