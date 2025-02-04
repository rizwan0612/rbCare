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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const ask_1 = require("../models/ask");
class TaskController {
    static getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield ask_1.TaskModel.findAll();
                res.json(tasks);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    static getTaskById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield ask_1.TaskModel.findById(parseInt(req.params.id));
                if (!task)
                    return res.status(404).json({ message: 'Task not found' });
                res.json(task);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, completed } = req.body;
                if (!title || !description) {
                    return res.status(400).json({ message: 'Title and description are required' });
                }
                const newTask = yield ask_1.TaskModel.create({
                    title,
                    description,
                    completed: completed || false
                });
                res.status(201).json(newTask);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create task';
                res.status(500).json({ message });
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield ask_1.TaskModel.update(parseInt(req.params.id), req.body);
                res.json(updatedTask);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update task';
                res.status(404).json({ message });
            }
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield ask_1.TaskModel.findById(parseInt(req.params.id));
                if (!task)
                    return res.status(404).json({ message: 'Task not found' });
                yield ask_1.TaskModel.delete(parseInt(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.TaskController = TaskController;
