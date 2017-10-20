const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");

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

describe("generateLocationMessage", () => {
    it("should display correct location message", () => {
        var result = generateLocationMessage("Admin", 5, 5);

        expect(result.from).toBe("Admin");
        expect(result.url).toBe("https://www.google.com/maps?q=5,5");
        expect(result.createdAt).toBeA("number");
        expect(result).toBeA("object");
    });
});