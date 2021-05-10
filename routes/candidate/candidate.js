module.exports = () => {
    const { Candidate } = require("../../models/candidate");

    return require("./candidate.factory")({
        Candidate,
    });
}