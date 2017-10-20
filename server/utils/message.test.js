const expect = require("expect");
const {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message", () => {
        var result = generateMessage("Marcus", "Sup Bitch");
        expect(result).toInclude({
            from: "Marcus",
            text: "Sup Bitch"
        });
        expect(result.createdAt).toBeA("number");
    });
});