import { Client, ClientOptions } from 'discord.js';
import { loadCommands } from './utils/load-commands';
import { Command } from './typings/command';

type BotOptions = {
  token: string,
  prefix: string,
  commandDirectory: string,
  clientOptions: ClientOptions,
}

export class Bot {
  prefix: string;
  client: Client<true>;
  commands: Command[];

  /** 
   * Prefix is the default for each server
  */
  constructor (botOptions: BotOptions) {
    this.prefix = botOptions.prefix;
    this.client = new Client(botOptions.clientOptions);

    this.client.login(botOptions.token);
    this.client.once('ready', () => {
      console.log(`STARTUP > ${this.client.user.username}`);
    });

    this.commands = [];
    loadCommands(botOptions.commandDirectory);
  }
};