module.exports = class Record {
    constructor() {
    }

    setId(id) { this.id = id; }
    setValue(value) { this.value = value; }
    setDescription(description) { this.description = description; }
    setWallet(wallet) { this.wallet = wallet; }
    setOwner(owner) { this.owner = owner; }
    setTimestamp(timestamp) { this.timestamp = timestamp; }
}