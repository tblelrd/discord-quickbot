import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { Command } from "../typings/command";

type CheckType = (file: string) => boolean

const getCommands = async (dir: string, checkCommand: CheckType): Promise<Command[]> => {
  const commands = [];
  const files = readdirSync (dir);

  for (const file of files) {
    const stat = lstatSync (join(dir, file));
    if (stat.isDirectory()) {
      commands.push(...await getCommands(
        join(dir, file),
        checkCommand,
      ));
    } else if(checkCommand(file)) {
      const command: Command = await import(join(dir, file));
      commands.push(command);
    }
  }

  return commands;
};

export const loadCommands = async (dir: string, checkCommand?: CheckType) => {
  if (!checkCommand) 
    checkCommand = (file) => file.endsWith('js') || file.endsWith('ts'); 
  
  return await getCommands(dir, checkCommand);
};