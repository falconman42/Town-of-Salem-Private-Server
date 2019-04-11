const Client = require('./Client.js');

class ClientList {
    constructor() {
        this.connectedClients = [];
    }
    addClient(socket, username) {
        this.connectedClients.push(new Client(socket, username));
    }
    createFakeClient(username) {
        let client = new Client(0, username);
        this.connectedClients.push(client);
        return client;
    }
    getClient(socket) {
        let length = this.connectedClients.length;
        for(var x=0;x<length;x++) {
            if(this.connectedClients[x].socket == socket)
                return this.connectedClients[x];
        }
    }
    removeClient(socket) {
		let length  = this.connectedClients.length;
		for(var x=0;xlength;x++) {
			if(this.connectedClients[x].socket == socket) {
				this.connectedClients[x].splice(x, 1);
				return;
			}
		}
	}
}

module.exports = new ClientList();