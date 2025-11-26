# How to Add Your Own Quiz Questions

This guide explains how to add your own questions to the quiz application.

## JSON Format

Your questions should be in JSON format. The application supports two formats:

### Format 1: Array with Multiple "Жавоб" Keys

```json
[
  {
    "№": 1,
    "Савол": "Your question here?",
    "Жавоб": "First answer (CORRECT)",
    "Жавоб": "Second answer (incorrect)",
    "Жавоб": "Third answer (incorrect)",
    "Жавоб": "Fourth answer (incorrect)"
  }
]
```

### Format 2: Array Format (Recommended)

```json
[
  {
    "№": 1,
    "Савол": "Your question here?",
    "Жавоб": [
      "First answer (CORRECT)",
      "Second answer (incorrect)",
      "Third answer (incorrect)",
      "Fourth answer (incorrect)"
    ]
  }
]
```

### Format 3: Named Category Object

```json
{
  "Category_Name": [
    {
      "№": 1,
      "Савол": "Your question here?",
      "Жавоб": [
        "First answer (CORRECT)",
        "Second answer (incorrect)",
        "Third answer (incorrect)",
        "Fourth answer (incorrect)"
      ]
    }
  ]
}
```

## Important Rules

1. **First Answer is Always Correct**: The application assumes the first answer in the array is the correct one.
2. **Minimum 2 Answers**: Each question must have at least 2 answer options.
3. **Maximum 6 Answers**: You can have up to 6 answer options per question.
4. **Question Numbering**: The "№" field is used for question numbering.

## How to Add Questions

### Step 1: Prepare Your JSON File

Create a JSON file with your questions following one of the formats above. For example, create `myquestions.json`:

```json
{
  "My_Category": [
    {
      "№": 1,
      "Савол": "IP manzil nima uchun kerak?",
      "Жавоб": [
        "Tarmoqdagi qurilmani aniqlash uchun",
        "Internet tezligini oshirish uchun",
        "Fayl nomlash uchun",
        "Parolni saqlash uchun"
      ]
    },
    {
      "№": 2,
      "Савол": "HTTP nima?",
      "Жавоб": [
        "Hypertext Transfer Protocol",
        "High Transfer Protocol",
        "Hyperlink Text Protocol",
        "Home Transfer Protocol"
      ]
    }
  ]
}
```

### Step 2: Add the File to Your Project

1. Place your JSON file in the `src/data/` directory
2. For example: `src/data/myquestions.json`

### Step 3: Update the QuizPage Component

Open `src/pages/QuizPage.tsx` and import your questions:

```typescript
// Replace this line:
import questionsData from "@/data/questions.json";

// With your file:
import questionsData from "@/data/myquestions.json";
```

### Step 4: Update the Category Name (Optional)

If you want to display a different category name, update the category prop:

```typescript
// In QuizPage.tsx, find these lines and update "Strategiya" to your category:
<QuestionCard
  // ...
  category="Your Category Name"  // Change this
  // ...
/>

<ResultsCard
  // ...
  category="Your Category Name"  // Change this
  // ...
/>
```

## Using Custom JSON Parser

If your JSON has a complex structure, you can use the built-in parser:

```typescript
import { parseQuizJSON, validateQuizData } from "@/utils/parseQuizData";
import rawQuestionsData from "@/data/myquestions.json";

useEffect(() => {
  // Parse the JSON
  const parsedQuestions = parseQuizJSON(rawQuestionsData);
  
  // Validate the data
  if (validateQuizData(parsedQuestions)) {
    initializeQuiz(parsedQuestions);
  } else {
    console.error("Invalid quiz data");
  }
}, []);
```

## Multiple Quiz Categories

To support multiple categories, you can modify the application to:

1. Create a category selector page
2. Store multiple JSON files
3. Allow users to choose which category to test

Example structure:
```
src/data/
├── strategy.json
├── it.json
├── hr.json
└── finance.json
```

## Testing Your Questions

1. Run `npm run dev`
2. Open the application in your browser
3. Click through a few questions to ensure they work correctly
4. Check that:
   - Questions display correctly
   - First answer is marked as correct
   - Other answers are marked as incorrect
   - Stats update properly

## Tips

- Keep questions concise and clear
- Ensure answers are distinct and not ambiguous
- Test with various answer lengths
- Use proper Uzbek/Cyrillic characters if needed
- Backup your original JSON before making changes

## Troubleshooting

**Problem**: Questions don't appear
- Check console for errors
- Verify JSON is valid (use jsonlint.com)
- Ensure file path is correct

**Problem**: All answers show as correct
- Verify the first answer is actually correct in your data
- Check that you haven't modified the answer checking logic

**Problem**: Special characters don't display
- Save your JSON file with UTF-8 encoding
- Ensure your text editor supports Cyrillic/UTF-8

## Need Help?

Check the `src/data/questions.json` file for a working example.

