const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "message-consumer",
	brokers: ["localhost:9092"], // for host windows/node.js
	// brokers: ["192.168.29.131:9092"], // inside docker container
});
const consumer = kafka.consumer({ groupId: "message-group" });

(async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: "message-topic", fromBeginning: true });
	console.log("Kafka Consumer connected. Listening for new messages...\n");

	await consumer.run({
		eachMessage: async ({ message }) => {
			console.log(`${message.value.toString()}`);
		},
	});
})();
