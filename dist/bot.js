"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const load_commands_1 = require("./utils/load-commands");
class Bot {
    /**
     * Prefix is the default for each server
    */
    constructor(botOptions) {
        this.prefix = botOptions.prefix;
        this.client = new discord_js_1.Client(botOptions.clientOptions);
        this.client.login(botOptions.token);
        this.client.once('ready', () => {
            console.log(`STARTUP > ${this.client.user.username}`);
        });
        this.commands = [];
        (0, load_commands_1.loadCommands)(botOptions.commandDirectory);
    }
}
exports.Bot = Bot;
;
