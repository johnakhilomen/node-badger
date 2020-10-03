#!/usr/bin/env node

Object.defineProperty(exports, "__esModule", { value: true });
const ProjectStructure_1 = require("../src/impls/ProjectStructure");
const QuestionSets_1 = require("../src/params/QuestionSets");
let questionSets = new QuestionSets_1.QuestionSets();
let projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
let cb = (e, r) => {
    if (e) {
        console.log(e);
    }
    if (!r) {
    }
};
projectStructure.Setup(cb);