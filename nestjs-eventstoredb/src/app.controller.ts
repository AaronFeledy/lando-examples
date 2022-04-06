import {Body, Controller, Get, Post, Redirect} from '@nestjs/common';
import {getAllPurchases, Purchase} from './views';
import {v4 as uuid} from 'uuid';
import {jsonEvent} from '@eventstore/db-client';
import {client as eventStore} from './event-store';

interface CreatePurchaseRequest {
    amount: string;
    name: string;
}

interface RefundPurchaseRequest {
    purchaseId: string;
}

@Controller()
export class AppController {
    constructor() {
    }

    @Get()
    async getPurchases(): Promise<string> {
        const purchases = await getAllPurchases();

        let html = listAllPurchasesUL(purchases);
        html += renderCreatePurchaseForm();

        return html;
    }

    @Post()
    @Redirect()
    async create(@Body() req: CreatePurchaseRequest) {
        const purchaseId = uuid();
        const purchasedEvent = jsonEvent({
            type: 'ProductPurchased',
            data: {
                purchaseId: purchaseId,
                amount: req.amount,
                name: req.name,
            },
        });

        await eventStore.appendToStream(purchaseId, [purchasedEvent]);

        return {
            url: '/',
        };
    }

    @Post('/refund')
    @Redirect()
    async refund(@Body() req: RefundPurchaseRequest) {
        const refundEvent = jsonEvent({
            type: 'ProductRefunded',
            data: {
                purchaseId: req.purchaseId,
            },
        });

        await eventStore.appendToStream(req.purchaseId, [refundEvent]);

        return {
            url: '/',
        };
    }
}

function listAllPurchasesUL(purchases: Purchase[]) {
    let html = `
    <h1>Existing Purchases:</h1>
    <ul>`;
    for (const p of purchases) {
        html += `
        <li style="${p.wasRefunded ? 'color: red' : ''}">
            <div>Purchase Id: ${p.purchaseId}</div>
            <div>Amount: ${p.amount}</div>
            <div>Name: ${p.name}</div>
            ${p.wasRefunded ? '<div>Was refunded</div>' : ''}
            ${renderRefundButton(p)}    
            <hr />  
        </li>`;
    }
    html += `</ul>`;

    return html;
}

function renderRefundButton(p: Purchase): string {
    if (p.wasRefunded) return '';

    return `
      <form action="/refund" method="POST">
        <input type="hidden" name="purchaseId" value="${p.purchaseId}" />
        <button type="submit">Refund</button>
      </form> 
  `;
}

function renderCreatePurchaseForm() {
    return `
    <h1>Make A Purchase:</h1>
      <form action="/" method="POST">
        <label for="amount">Amount:</label>
        <input type="number" name="amount" />

        <label for="name">Name:</label>
        <input name="name" />

        <button type="submit">Create</button>
      </form>        
    `;
}
