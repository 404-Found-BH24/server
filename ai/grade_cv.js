const express = require('express');
const OpenAI = require('openai');
const { User } = require('../models/user');
const gradingRouter = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

gradingRouter.post('/', async (req, res) => {
    const { userId, cvUrl } = req.body;
    const user = await User.findOne({ userId });

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `Będziesz przeprowadzał próbne rozmowy rekrutacyjne na podstawie informacji które za chwile wygenerujesz. Dostosuj to co wygenerujesz do twoich potrzeb informacji. Na podstawie pliku CV dostępnego pod linkiem: ${cvUrl} wybierz i zapisz informacje. Wejdź pod podany link i go przenalizuj. Nie zadawaj żadnych pytań, twoja jedyna odpowiedź ma być w podanym niżej formacie JSON Następnie przeanalizuj je i określ w rankingu 1-100 jak bardzo dana pozycja pasuje kandydatowi. Stanowiska to: Front-end Dev, Back-end Dev, Full-stack Dev, Java Dev, UI & UX Dev, IT Project Manager, Devops. Punkty rozdzielaj na podstawie realnych umiejętności i mocno wartościuj doświadczenie zawodowe. Weź pod uwagę staż na podobnych stanowiskach, opis kandydata i deklarowane umiejętności. Jeżeli kandydat nie wspomina w swoim pliku o danej umiejętności to nie bój się dać not bliskich zeru. Do analizy użyj znajdująch się w internecie przykładów perfekcyjnych CV dla każdego ze stanowisk. Przyjmij jakiekolwiek doświadczenie na stanowisku jako 30 punktów i zwiększaj razem z czasem doświadczenia i jego jakością.
                    Posłuż się jedynie cv, inne informacje są nieznane. Dane wypisz tylko i wyłącznie w formie JSON'a po polsku, w obiekcie rankings ranking ma być liczbowy w zakresie 1-100, natomiast w obiekcie experience tekstowy, jednym konkretnym zdaniem:
{
  "rankings": {
    "summary": (number),
    "frontend": (number),
    "backend": (number),
    "fullstack": (number),
    "Java": (number),
    "UI": (number),
    "pm": (number),
    "devops": (number)
  },
  "experience": {
    "summary": (text),
    "frontend": (text),
    "backend": (text),
    "fullstack": (text),
    "Java": (text),
    "UI": (text),
    "pm": (text),
    "devops": (text)
  }
} 
                `
            },
            {
                role: 'user',
                content: "Let's start the interview." // Placeholder content
            }
        ],
    });

    const responseContent = response.choices[0].message.content;

    try {
        const jsonResponse = JSON.parse(responseContent);
        res.json(jsonResponse);
    } catch (error) {
        console.error('Failed to parse response:', responseContent);
        res.status(500).json({ error: 'Failed to generate valid JSON', responseContent });
    }
});

module.exports = { gradingRouter };
