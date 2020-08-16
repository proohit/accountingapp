import Router from 'koa-router';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { byName } from '../../wallet/repositories/WalletMapper';
import { allByUser, byId, byWallet, createRecord, deleteRecord, update } from '../repositories/RecordMapper';

const router = new Router();

router.post('/', async (ctx) => {
    const username = ctx.state.token.username;
    const { description, value, walletName, timestamp } = ctx.request.body;
    const missingProperties = [];
    if (!description) missingProperties.push('description');
    if (!value) missingProperties.push('value');
    if (!walletName) missingProperties.push('walletName');
    if (!timestamp) missingProperties.push('timestamp');
    if (missingProperties.length) throw new MissingProperty(missingProperties);

    await byName(walletName, username);
    const res = await createRecord(description, value, walletName, timestamp, username);

    ctx.status = 201;
    ctx.body = JSON.stringify(res);
});

router.get('/', async (ctx) => {
    const decoded = ctx.state.token;
    const records = await allByUser(decoded.username);
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(records);
});

router.delete('/:id', async (ctx) => {
    const requestedId = ctx.params.id;
    const recordToDelete = await byId(requestedId);
    if (recordToDelete.owner !== ctx.state.token.username) throw new ResourceNotAllowed();
    await deleteRecord(requestedId);
    ctx.status = 200;
});

router.get('/:id', async (ctx) => {
    const username = ctx.state.token.username;
    const record = await byId(ctx.params.id);
    if (record.owner !== username) throw new ResourceNotAllowed();
    ctx.status = 200;
    ctx.body = JSON.stringify(record);
});

router.get('/wallet/:wallet', async (ctx) => {
    const decoded = ctx.state.token;
    const result = await byWallet(decoded.username, ctx.params.wallet);
    ctx.status = 200;
    ctx.body = JSON.stringify(result);
});

router.put('/', async (ctx) => {
    const decoded = ctx.state.token;
    const { id, description, value, walletName, timestamp } = ctx.request.body;
    if (!id) throw new MissingProperty(['id']);
    const record = await byId(id);
    if (decoded.username !== record.owner) throw new ResourceNotAllowed();
    const updatedRecord = await update(id, description, value, walletName, timestamp, decoded.username);

    ctx.status = 200;
    ctx.body = JSON.stringify(updatedRecord);
});

export default router.routes();
