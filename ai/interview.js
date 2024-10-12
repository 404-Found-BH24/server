const express = require('express');
const OpenAI = require('openai');
const {User} = require("../models/user");
const interviewRouter = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});
interviewRouter.post('/:positionId', async (req, res) => {
    try {
        const { positionId } = req.params;
        const position = await User.findById(positionId);

        const assistantResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                role: "user",
                content: `Oceń poniższe CV na podstawie podanych kryteriów. Oto zawartość CV:\n\n${fileBuffer}\n\nDostosuj swoją odpowiedź do poniższej struktury JSON:\n{\n  "rankings": {\n    "Front-end Dev": score,\n    "Back-end Dev": score,\n    "Full-stack Dev": score,\n    "Java Dev": score,\n    "UI & UX Dev": score,\n    "IT Project Manager": score,\n    "DevOps": score\n  },\n  "experience": {\n    "summary": "",\n    "front-end": "",\n    "back-end": "",\n    "full-stack": "",\n    "java-dev": "",\n    "UI/UX": "",\n    "project_management": "",\n    "devops": ""\n  }\n}`
            }],
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { interviewRouter };
