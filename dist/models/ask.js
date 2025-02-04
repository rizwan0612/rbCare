"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class TaskModel {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM tasks');
            return rows;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM tasks WHERE id = ?', [id]);
            return rows[0] || null;
        });
    }
    static create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.query('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)', [task.title, task.description, task.completed]);
            // Handle potential null with type assertion
            const createdTask = yield this.findById(result.insertId);
            if (!createdTask) {
                throw new Error('Failed to create task');
            }
            return createdTask;
        });
    }
    static update(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', [task.title, task.description, task.completed, id]);
            const updatedTask = yield this.findById(id);
            if (!updatedTask) {
                throw new Error('Task not found after update');
            }
            return updatedTask;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM tasks WHERE id = ?', [id]);
        });
    }
}
exports.TaskModel = TaskModel;
