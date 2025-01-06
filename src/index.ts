import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: "test-group" });

async function main() {
  await producer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [
      {
        value:
          "Hi there Abhilash here trying out the quickstart-event using kafka"
      }
    ]
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: "quickstart-events",
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString()
      });
    }
  });
}

main();
