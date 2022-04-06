import {EventStoreDBClient, FORWARDS, START} from "@eventstore/db-client";

declare var process: { env: { EVENTSTORE_HOST: string; }; };
console.log(process.env.EVENTSTORE_HOST);
const client = EventStoreDBClient.connectionString(
    `esdb://${process.env.EVENTSTORE_HOST}?tls=false`
);

const connect = async () => {
    await client.readAll({
        direction: FORWARDS,
        fromPosition: START,
        maxCount: 1
    });
}

export {
    client, connect
};
