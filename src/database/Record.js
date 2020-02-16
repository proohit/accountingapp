module.exports = class Record {
    constructor(id=0, value, description, wallet) {
        this.id = id;
        this.value = value;
        this.description = description;
        this.wallet = wallet;
    }
}