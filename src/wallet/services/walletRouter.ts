import Router from 'koa-router';
import { byWallet, deleteRecord, update as updateRecord } from '../../record/repositories/RecordMapper';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { DuplicateWallet } from '../models/Errors';
import { byName, byUser, create, deleteWallet, update } from '../repositories/WalletMapper';

const router = new Router();

router.post('/', async (ctx) => {
    const { username } = ctx.state.token;
    const { name, balance } = ctx.request.body;

    const missingProperties = [];
    if (!name) missingProperties.push('name');
    if (!balance) missingProperties.push('balance');
    if (missingProperties.length) throw new MissingProperty(missingProperties);

    const walletsByUser = byUser(username);
    if ((await walletsByUser).find((wallet) => wallet.name === name)) throw new DuplicateWallet();

    const res = await create(name, balance, username);
    ctx.status = 201;
    ctx.body = JSON.stringify(res);
});

router.get('/', async (ctx) => {
    const decoded = ctx.state.token;
    const result = await byUser(decoded.username);

    ctx.status = 200;
    ctx.body = JSON.stringify(result);
});

router.get('/:name', async (ctx) => {
    const username = ctx.state.token.username;
    const wallet = await byName(ctx.params.name, username);
    if (wallet.owner !== username) throw new ResourceNotAllowed();
    ctx.status = 200;
    ctx.body = JSON.stringify(wallet);
});

router.delete('/:name', async (ctx) => {
    const username = ctx.state.token.username;
    const { name } = ctx.params;
    const walletToDelete = await byName(name, username);
    const recordsByWallet = await byWallet(username, walletToDelete.name);
    recordsByWallet.forEach(async (record) => {
        await deleteRecord(record.id);
    });

    await deleteWallet(name, username);

    ctx.status = 200;
});

router.put('/:name', async (ctx) => {
    const username = ctx.state.token.username;
    const { name } = ctx.params;
    const { name: newName, balance } = ctx.request.body;

    const walletToUpdate = await byName(name, username);
    if (walletToUpdate.name === newName) {
        ctx.status = 200;
        ctx.body = JSON.stringify(walletToUpdate);
        return;
    }

    const walletsByUser = await byUser(username);
    const recordsByWallet = await byWallet(username, name);
    if (walletsByUser.some((wallet) => wallet.name === newName)) throw new DuplicateWallet();

    recordsByWallet.forEach(
        async (record) =>
            await updateRecord(record.id, record.description, record.value, null, record.timestamp, record.owner),
    );

    const editedWallet = await update(name, newName, balance, username);

    recordsByWallet.forEach(async (record) => {
        await updateRecord(
            record.id,
            record.description,
            record.value,
            editedWallet.name,
            record.timestamp,
            record.owner,
        );
    });

    ctx.status = 200;
    ctx.body = JSON.stringify(editedWallet);
});

export default router.routes();
