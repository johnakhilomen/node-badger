module.exports = {
    "env" : {
        "mocha" : true
    },
    "rules": {
        "no-used-vars" : [
            "error",
            {"varsIgnorePattern": "should|expect"}
        ]
    }

} 