import { CommandInteraction, Guild, GuildMember, Message, PermissionsString, User } from "discord.js";
import { Bot } from "../bot";
import { Channel } from "diagnostics_channel";

export type Command = {
  aliases: string[],
  syntax: string, // !TODO change later.
  description: string,
  slash: boolean,
  nsfw: boolean,
  developer: boolean,
  permissions: PermissionsString,
  run: () => string | void,
};

export type runArguments = {
  message: Message,
  arguments: string[],
  text: string,

  bot: Bot,
  guild: Guild,
  member: GuildMember,
  channel: Channel,
  author: User,
  interaction: CommandInteraction,
}
