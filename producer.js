const { Kafka } = require("kafkajs");
const readline = require("readline");

const kafka = new Kafka({
	clientId: "message-producer",
	brokers: ["localhost:9092"], // for host windows/node.js
	// brokers: ["192.168.29.131:9092"], // inside docker container
});
const producer = kafka.producer();

(async () => {
	await producer.connect();
	console.log("Kafka Producer connected. Enter messages:");

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.on("line", async (message) => {
		await producer.send({
			topic: "message-topic",
			messages: [{ value: message }],
		});
	});
})();

/*

* Docker Kafka UI
- Run it once
docker run -d -p 8080:8080 -e KAFKA_CLUSTERS_0_NAME=my_cluster -e KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=192.168.29.131:9092 --name kafkaui provectuslabs/kafka-ui
- To stop it
docker stop kafkaui
- To start it again
docker start kafkaui 

*/