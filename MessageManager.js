const CreateLobby = require('./messages/CreateLobby.js');
const ChatMessage = require('./messages/ChatMessage.js');
const UserLeftGame = require('./messages/UserLeftGame.js');
const StartGame = require('./messages/StartGame.js');
const UserChoseName = require('./messages/UserChoseName.js');
const NightAction = require('./messages/NightAction.js');
const MafiaNightAction = require('./messages/MafiaNightAction.js');
const DayAction = require('./messages/DayAction.js');
const UserCastVote = require('./messages/UserCastVote.js');
const UserVotedGuilty = require('./messages/UserVotedGuilty.js');
const UserVotedInnocent = require('./messages/UserVotedInnocent.js');
const WhisperMessage = require('./messages/WhisperMessage.js');
const UserLeftEndGameLobby = require('./messages/UserLeftEndGameLobby.js');
const UpdateWill = require('./messages/UpdateWill.js');
const SystemCommand = require('./messages/SystemCommand.js');

class MessageManager {
    constructor() {
        this.serverMessages = [];
        this.createMessages();
    }
    createMessages() {
        this.serverMessages[3] = ChatMessage;
        this.serverMessages[8] = WhisperMessage;
        this.serverMessages[9] = StartGame;
        this.serverMessages[10] = UserCastVote;
        this.serverMessages[11] = NightAction;
        this.serverMessages[14] = UserVotedGuilty;
        this.serverMessages[15] = UserVotedInnocent;
        this.serverMessages[16] = DayAction;
        this.serverMessages[17] = UpdateWill;
        this.serverMessages[19] = MafiaNightAction;
        this.serverMessages[21] = UserChoseName;
        this.serverMessages[24] = SystemCommand;
        this.serverMessages[30] = CreateLobby;
        this.serverMessages[39] = UserLeftGame;
        this.serverMessages[63] = UserLeftEndGameLobby;
    }
    parse(message) {
        return this.serverMessages[message];
    }
}

module.exports = new MessageManager;