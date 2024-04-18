"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const getCommands = (dir, checkCommand) => __awaiter(void 0, void 0, void 0, function* () {
    const commands = [];
    const files = (0, fs_1.readdirSync)(dir);
    for (const file of files) {
        const stat = (0, fs_1.lstatSync)((0, path_1.join)(dir, file));
        if (stat.isDirectory()) {
            commands.push(...yield getCommands((0, path_1.join)(dir, file), checkCommand));
        }
        else if (checkCommand(file)) {
            const command = yield Promise.resolve(`${(0, path_1.join)(dir, file)}`).then(s => __importStar(require(s)));
            commands.push(command);
        }
    }
    return commands;
});
const loadCommands = (dir, checkCommand) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkCommand)
        checkCommand = (file) => file.endsWith('js') || file.endsWith('ts');
    return yield getCommands(dir, checkCommand);
});
exports.loadCommands = loadCommands;
