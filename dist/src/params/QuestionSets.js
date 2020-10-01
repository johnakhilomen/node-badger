"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSets = void 0;
class QuestionSets {
    constructor() {
        this.q1 = [
            {
                type: 'text',
                name: 'rootFolder',
                message: 'Enter a name for your project (small cases)? 🗂',
                default: 'testproject',
            },
            {
                type: 'text',
                name: 'version',
                message: 'Version? 🆚',
                default: '1.0.0',
            },
            {
                type: 'text',
                name: 'description',
                message: 'Description? ⿳',
                default: 'Some test Project',
            },
            {
                type: 'text',
                name: 'entry',
                message: 'Entry point? 📝',
                default: 'index.js',
            },
            {
                type: 'text',
                name: 'repository',
                message: `Git repository? 🗃`,
                default: '',
            },
            {
                type: 'text',
                name: 'authorsName',
                message: `Enter author's name ? 🧐`,
                default: '',
            },
            {
                type: 'text',
                name: 'license',
                message: 'License?',
                default: '',
            },
        ];
        this.q2 = {
            type: 'list',
            name: 'dbType',
            message: 'Use the up and arrow key to select your database type? 📦',
            choices: [
                'mongo',
                'postgres',
            ],
        };
        this.GetQuestionSet1 = () => this.q1;
        this.GetQuestionSet2 = () => this.q2;
    }
}
exports.QuestionSets = QuestionSets;
//# sourceMappingURL=QuestionSets.js.map