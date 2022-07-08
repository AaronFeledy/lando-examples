import {FORWARDS, START} from '@eventstore/db-client';
import {client as eventStore} from './event-store';

interface Purchase {
    purchaseId: string;
    name: string;
    amount: number;
    wasRefunded: boolean;
}

const getAllPurchases = async () => {
    const purchases: Purchase[] = [];
    const getPurchaseById = createGetPurchaseById(purchases);

    const events = eventStore.readAll({
        direction: FORWARDS,
        fromPosition: START,
        maxCount: 1000
    });

    for await (const {event} of events) {
        const data: any = event.data;

        switch (event?.type) {
            case "ProductPurchased":
                purchases.push({
                    purchaseId: data.purchaseId,
                    amount: data.amount,
                    name: data.name,
                    wasRefunded: false
                });
                break;

            case "ProductRefunded":
                getPurchaseById(data.purchaseId).wasRefunded = true;
                break;
        }
    }

    return purchases;
}

const createGetPurchaseById = (purchases: Purchase[]) =>
    (purchaseId: string) => purchases.filter(p => p.purchaseId == purchaseId)[0];

export {
    getAllPurchases,
    Purchase
}
