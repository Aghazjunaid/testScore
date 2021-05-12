module.exports = () => {
    const { TestScore } = require("../../models/score");

    return require("./testScore.factory")({
        TestScore,
    });
}